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
  if (isParceladoRef(payment.checkout_id)) {
    const current = await parceladoState(payment);
    if (current.state === "paid") return null;
    if (current.state === "open" && !(await parceladoAbandoned(payment.checkout_id))) throw Error(PARCELADO_OPEN);
  }
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
        // Stripe promotion codes apply to the order fee and the balance (restrict them in Stripe as needed).
        allow_promotion_codes: true,
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

/** Thrown when a ParceladoUSA order of the payment may still be paid: no other way to pay may be opened. */
export const PAYMENT_IN_PROGRESS = "Payment in progress";
/** Thrown when the customer has an open ParceladoUSA page and asks for Stripe: they must finish or leave it first. */
export const PARCELADO_OPEN = "ParceladoUSA page open";
// ParceladoUSA's API cannot cancel an order, so an open page could be paid after switching to Stripe. A page left
// open this long is treated as abandoned (a later payment on it still goes to staff review as a stray payment).
const PARCELADO_ABANDONED_HOURS = 24;

/**
 * State of the payment's current ParceladoUSA order, recorded now: "paid" when it was approved (nothing to open),
 * "open" with its page while the customer can still pay it, or "closed" when it can no longer be paid (aborted,
 * cancelled before paying). Pending or in analysis throws PAYMENT_IN_PROGRESS.
 */
async function parceladoState(payment: Payment) {
  const { status, url } = await reconcileParcelado(payment.id, payment.checkout_id!);
  if (status === "approved" || status === "delivered") return { state: "paid" as const };
  if (status === "pending" || status === "analysis") throw Error(PAYMENT_IN_PROGRESS);
  if (status === "open") return { state: "open" as const, url };
  return { state: "closed" as const };
}

/** Whether a ParceladoUSA page opened at `createdAt` counts as abandoned. */
async function parceladoAbandoned(ref: string) {
  const { data } = await serviceClient().from("order_payment_attempts").select("created_at").eq("ref", ref).single();
  return !!data && Date.now() - new Date(data.created_at).getTime() > PARCELADO_ABANDONED_HOURS * 3600_000;
}

/** Whether the balance of this order can be paid in installments with ParceladoUSA. */
export function parceladoAvailable(payment: { kind: string; currency: string }) {
  return payment.kind === "balance" && payment.currency === "brl" && parceladoConfigured();
}

/**
 * ParceladoUSA payment page for the balance of a BRL order, or null when the payment was already made (recorded
 * now). An open ParceladoUSA page of the payment is reused; an open Stripe session is closed first, so only one
 * way to pay stays open.
 */
export async function parceladoCheckoutUrl(payment: Payment, customer: ParceladoCustomer): Promise<string | null> {
  if (!["open", "failed"].includes(payment.status) || !parceladoAvailable(payment)) throw Error("Payment unavailable");
  if (isParceladoRef(payment.checkout_id)) {
    const current = await parceladoState(payment);
    if (current.state === "paid") return null;
    // The open page is reused: a second ParceladoUSA order could be paid as well.
    if (current.state === "open" && current.url) return current.url;
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
    payload: { payment_id: payment.id, session_id: parceladoRef(order.orderId), previous_session_id: payment.checkout_id ?? "", url: order.url },
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
