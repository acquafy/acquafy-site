import "server-only";
import { publicOrigin, serviceClient, stripeClient } from "@/lib/enrollment/server";
import { reconcileParcelado, reconcilePaymentSession } from "./payments";
import { createParceladoOrder, isParceladoRef, parceladoConfigured, parceladoRef, type ParceladoCustomer } from "./parceladousa";

type Payment = { id: string; order_id: string; kind: "fee" | "balance"; currency: string; amount_minor: number; status: string; checkout_id: string | null };

/**
 * Stripe Checkout URL for one payment of a fixed-price order (the order fee or the balance), or null when the
 * bound session was already completed: that payment is reconciled now instead of opening a second charge.
 * Reuses the open session; a new one is bound (order_payment_bind, compare-and-set on the previous session)
 * before the customer is sent to it, so the webhook can check the session, amount and currency against the payment.
 */
export async function paymentCheckoutUrl(payment: Payment): Promise<string | null> {
  if (!["open", "failed"].includes(payment.status)) throw Error("Payment unavailable");
  // Switching from ParceladoUSA: never while its order may still be paid, and record it if it already was.
  if (isParceladoRef(payment.checkout_id) && !(await parceladoReplaceable(payment))) return null;
  const stripe = stripeClient();
  let session = payment.checkout_id && !isParceladoRef(payment.checkout_id) ? await stripe.checkout.sessions.retrieve(payment.checkout_id) : null;
  if (session?.status === "complete" && payment.status === "open") {
    // Paid, but the webhook has not arrived yet: record it from Stripe now and never create a second session.
    await reconcilePaymentSession(session.id);
    return null;
  }
  if (session && (session.status !== "open" || payment.status === "failed")) session = null;
  if (!session) {
    const metadata = { integration: "acquafy_order_payment", payment_id: payment.id, order_id: payment.order_id };
    const label = payment.kind === "fee" ? "Taxa do pedido" : "Saldo do pedido";
    session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        integration_identifier: "acquafy_orders_qmvtlxpa",
        // Coupons apply to the balance; the order fee is the same for everyone.
        allow_promotion_codes: payment.kind === "balance",
        client_reference_id: payment.id,
        metadata,
        payment_intent_data: { metadata },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: payment.currency,
              unit_amount: payment.amount_minor,
              product_data: { name: `Acquafy · ${label} ${payment.order_id.slice(0, 8).toUpperCase()}` },
            },
          },
        ],
        success_url: publicOrigin() + "/app/pedidos?pedido=" + payment.order_id,
        cancel_url: publicOrigin() + "/app/pedidos?pedido=" + payment.order_id,
      },
      { idempotencyKey: "order-payment-" + payment.id + "-" + (payment.checkout_id ?? "initial") },
    );
    const bound = await serviceClient().rpc("order_payment_bind", {
      payload: { payment_id: payment.id, session_id: session.id, previous_session_id: payment.checkout_id ?? "" },
    });
    if (bound.error) throw Error("Binding failed");
  }
  if (!session.url) throw Error("Checkout unavailable");
  return session.url;
}

/** Thrown when a ParceladoUSA order of the payment is still being processed: no second payment may be opened. */
export const PAYMENT_IN_PROGRESS = "Payment in progress";

/**
 * Whether the payment's ParceladoUSA order can be replaced by a new payment page: only when the customer left it
 * (open), it was aborted or cancelled before paying. An approved order is recorded now (false); pending or in
 * analysis throws PAYMENT_IN_PROGRESS.
 */
async function parceladoReplaceable(payment: Payment) {
  const status = await reconcileParcelado(payment.id, payment.checkout_id!);
  if (status === "approved") return false;
  if (status === "pending" || status === "analysis") throw Error(PAYMENT_IN_PROGRESS);
  return true;
}

/** Whether the balance of this order can be paid in installments with ParceladoUSA. */
export function parceladoAvailable(payment: { kind: string; currency: string }) {
  return payment.kind === "balance" && payment.currency === "brl" && parceladoConfigured();
}

/**
 * ParceladoUSA payment page for the balance of a BRL order, or null when the payment was already made (recorded
 * now). An open Stripe session of the payment is closed first, so only one way to pay stays open.
 */
export async function parceladoCheckoutUrl(payment: Payment, customer: ParceladoCustomer): Promise<string | null> {
  if (!["open", "failed"].includes(payment.status) || !parceladoAvailable(payment)) throw Error("Payment unavailable");
  if (isParceladoRef(payment.checkout_id)) {
    if (!(await parceladoReplaceable(payment))) return null;
  } else if (payment.checkout_id) {
    const session = await stripeClient().checkout.sessions.retrieve(payment.checkout_id);
    if (session.status === "complete") {
      if (payment.status === "open") {
        await reconcilePaymentSession(session.id);
        return null;
      }
    } else if (session.status === "open") await stripeClient().checkout.sessions.expire(session.id);
  }
  const order = await createParceladoOrder({
    amountMinor: payment.amount_minor,
    currency: payment.currency as "usd" | "brl",
    customer,
    // Both the customer's return and ParceladoUSA's notification land here; the status is read from ParceladoUSA.
    callback: publicOrigin() + "/app/api/orders/parceladousa/" + payment.id,
  });
  const bound = await serviceClient().rpc("order_payment_bind", {
    payload: { payment_id: payment.id, session_id: parceladoRef(order.orderId), previous_session_id: payment.checkout_id ?? "" },
  });
  if (bound.error) throw Error("Binding failed");
  return order.url;
}

/** Expires an open Checkout session so a cancelled order can no longer be paid; a finished session is left alone. */
export async function expireCheckout(checkoutId: string | null) {
  // A ParceladoUSA order cannot be closed through its API; a payment on it after the cancellation goes to review.
  if (!checkoutId || isParceladoRef(checkoutId)) return;
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(checkoutId);
  if (session.status === "open") await stripe.checkout.sessions.expire(checkoutId);
}

/** Full refund of a paid order payment, after the order was cancelled (status 'refunding'). The webhook records it. */
export async function refundPayment(payment: { id: string; payment_intent_id: string | null }) {
  if (!payment.payment_intent_id) throw Error("Payment reference missing");
  // ParceladoUSA refunds are made by staff in its dashboard; its callback then records the refund.
  if (isParceladoRef(payment.payment_intent_id)) throw Error("Manual refund");
  await stripeClient().refunds.create(
    { payment_intent: payment.payment_intent_id, metadata: { integration: "acquafy_order_payment", payment_id: payment.id } },
    { idempotencyKey: "order-refund-" + payment.id },
  );
}
