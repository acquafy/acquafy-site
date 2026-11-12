import "server-only";
import { publicOrigin, serviceClient, stripeClient } from "@/lib/enrollment/server";
import { reconcilePaymentSession } from "./payments";

type Payment = { id: string; order_id: string; kind: "fee" | "balance"; currency: string; amount_minor: number; status: string; checkout_id: string | null };

/**
 * Stripe Checkout URL for one payment of a fixed-price order (the order fee or the balance), or null when the
 * bound session was already completed: that payment is reconciled now instead of opening a second charge.
 * Reuses the open session; a new one is bound (order_payment_bind, compare-and-set on the previous session)
 * before the customer is sent to it, so the webhook can check the session, amount and currency against the payment.
 */
export async function paymentCheckoutUrl(payment: Payment): Promise<string | null> {
  if (!["open", "failed"].includes(payment.status)) throw Error("Payment unavailable");
  const stripe = stripeClient();
  let session = payment.checkout_id ? await stripe.checkout.sessions.retrieve(payment.checkout_id) : null;
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

/** Expires an open Checkout session so a cancelled order can no longer be paid; a finished session is left alone. */
export async function expireCheckout(checkoutId: string | null) {
  if (!checkoutId) return;
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(checkoutId);
  if (session.status === "open") await stripe.checkout.sessions.expire(checkoutId);
}

/** Full refund of a paid order payment, after the order was cancelled (status 'refunding'). The webhook records it. */
export async function refundPayment(payment: { id: string; payment_intent_id: string | null }) {
  if (!payment.payment_intent_id) throw Error("Payment reference missing");
  await stripeClient().refunds.create(
    { payment_intent: payment.payment_intent_id, metadata: { integration: "acquafy_order_payment", payment_id: payment.id } },
    { idempotencyKey: "order-refund-" + payment.id },
  );
}
