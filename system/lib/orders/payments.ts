import "server-only";
import type Stripe from "stripe";
import { stripeClient, serviceClient } from "@/lib/enrollment/server";
import { checkoutAmounts, checkoutSettled } from "@/lib/payments/discounts";
import { getParceladoOrder, parceladoOrderId } from "./parceladousa";
export async function processOrderEvent(event: Stripe.Event) {
  if (
    event.livemode !==
    ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live")
  )
    throw Error("Environment mismatch");
  if (
    ![
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
      "checkout.session.async_payment_failed",
      "charge.refunded",
      "charge.dispute.created",
    ].includes(event.type)
  )
    return;
  const stripe = stripeClient(),
    db = serviceClient();
  let orderId: string | undefined;
  const check = (r: { error: unknown }) => {
    if (r.error) throw Error("Order payment update failed");
  };
  if (event.type.startsWith("checkout.session.")) {
    const input = event.data.object as Stripe.Checkout.Session;
    if (input.metadata?.integration === "acquafy_order_payment")
      return reconcilePaymentSession(input.id, event.type);
    if (input.metadata?.integration !== "acquafy_order") return;
    const s = await stripe.checkout.sessions.retrieve(input.id, {
      expand: ["payment_intent.latest_charge"],
    });
    if (s.livemode !== ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live"))
      throw Error("Environment mismatch");
    orderId = s.metadata?.order_id;
    const { data: o, error } = await db
      .from("product_orders")
      .select("*")
      .eq("id", orderId ?? "")
      .single();
    // The quoted total is the pre-discount subtotal; a promotion code lowers the charge.
    const amounts = checkoutAmounts(s);
    if (
      error ||
      !amounts ||
      !o ||
      o.kind !== "purchase" ||
      o.id !== s.client_reference_id ||
      (o.checkout_id && o.checkout_id !== s.id) ||
      o.total_minor !== amounts.subtotal ||
      s.currency !== "usd" ||
      !o.accepted_at
    )
      throw Error("Order payment mismatch");
    const pi = typeof s.payment_intent === "object" ? s.payment_intent : null;
    const charge =
      pi && typeof pi.latest_charge === "object" ? pi.latest_charge : null;
    if (charge && (charge.amount_refunded > 0 || charge.disputed)) {
      check(
        await db
          .from("product_orders")
          .update({ status: "review" })
          .eq("id", o.id),
      );
      return;
    }
    if (
      event.type === "checkout.session.async_payment_failed" &&
      !checkoutSettled(s)
    )
      check(
        await db
          .from("product_orders")
          .update({ checkout_failed: true })
          .eq("id", o.id)
          .eq("checkout_id", s.id)
          .eq("status", "accepted"),
      );
    if (checkoutSettled(s))
      check(
        await db
          .from("product_orders")
          .update({
            status: "paid",
            checkout_id: s.id,
            payment_intent_id:
              (typeof s.payment_intent === "string"
                ? s.payment_intent
                : pi?.id) ?? null,
            paid_minor: amounts.paid,
            discount_minor: amounts.discount,
            promotion: amounts.promotion,
            updated_at: new Date().toISOString(),
          })
          .eq("id", o.id)
          .eq("status", "accepted"),
      );
  } else {
    const object = event.data.object as Stripe.Charge | Stripe.Dispute;
    const charge =
      "charge" in object
        ? await stripe.charges.retrieve(
            typeof object.charge === "string"
              ? object.charge
              : object.charge.id,
          )
        : await stripe.charges.retrieve(object.id);
    const pi =
      typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : charge.payment_intent?.id;
    if (!pi) return;
    const intent = await stripe.paymentIntents.retrieve(pi);
    if (intent.metadata.integration === "acquafy_order_payment") {
      // A full refund of a cancelled order completes it; anything else (partial refund, dispute) goes to staff review.
      const full = event.type === "charge.refunded" && charge.refunded;
      check(
        await db.rpc("order_payment_event", {
          payload: {
            payment_id: intent.metadata.payment_id,
            state: event.type === "charge.refunded" ? "refunded" : "disputed",
            full: full ? "yes" : "no",
          },
        }),
      );
      return;
    }
    if (intent.metadata.integration !== "acquafy_order") return;
    orderId = intent.metadata.order_id;
    check(
      await db
        .from("product_orders")
        .update({ status: "review", updated_at: new Date().toISOString() })
        .eq("id", orderId),
    );
  }
}

/**
 * Fixed-price orders: one Checkout session per payment (order fee or balance), checked by order_payment_event.
 * Also called before opening a new session, so a completed payment is recorded even if its webhook is late.
 */
export async function reconcilePaymentSession(sessionId: string, type = "checkout.session.completed") {
  const stripe = stripeClient();
  const s = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"],
  });
  if (s.livemode !== ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live"))
    throw Error("Environment mismatch");
  const amounts = checkoutAmounts(s);
  const paymentId = s.metadata?.payment_id;
  if (!amounts || !paymentId || s.client_reference_id !== paymentId)
    throw Error("Order payment mismatch");
  const pi = typeof s.payment_intent === "object" ? s.payment_intent : null;
  const charge =
    pi && typeof pi.latest_charge === "object" ? pi.latest_charge : null;
  const settled = checkoutSettled(s);
  // A late event can find the charge already refunded (after a cancellation): report the refund, not a dispute,
  // so the database keeps it as refunded.
  const state = charge?.disputed
    ? "disputed"
    : charge && charge.amount_refunded > 0
      ? "refunded"
      : settled
        ? "paid"
        : type === "checkout.session.async_payment_failed"
          ? "failed"
          : null;
  if (!state) return;
  const db = serviceClient();
  if (state === "paid" && (await strayAttempt(paymentId, s.id))) return;
  const result = await db.rpc("order_payment_event", {
    payload: {
      payment_id: paymentId,
      state,
      session_id: s.id,
      currency: s.currency,
      subtotal_minor: amounts.subtotal,
      paid_minor: amounts.paid,
      discount_minor: amounts.discount,
      promotion: amounts.promotion,
      payment_intent_id:
        (typeof s.payment_intent === "string" ? s.payment_intent : pi?.id) ??
        null,
      full: charge?.refunded ? "yes" : "no",
    },
  });
  if (result.error) throw Error("Order payment update failed");
}

/**
 * A session or ParceladoUSA order that is no longer the one bound to the payment (the customer opened another one
 * or switched method) was paid anyway: the payment and the order go to staff review instead of being rejected.
 * Returns true when `ref` is such a replaced attempt of this payment.
 */
async function strayAttempt(paymentId: string, ref: string) {
  const db = serviceClient();
  const { data: pay, error } = await db.from("order_payments").select("checkout_id").eq("id", paymentId).single();
  if (error || !pay) throw Error("Order payment mismatch");
  if (pay.checkout_id === ref) return false;
  const stray = await db.rpc("order_payment_stray", { payload: { payment_id: paymentId, ref } });
  if (stray.error) throw Error("Order payment mismatch");
  return true;
}

/**
 * Records the state of a ParceladoUSA order of a payment, read from ParceladoUSA (never from the callback):
 * approved = paid; aborted = failed; canceled = refunded once paid (failed before); open, pending and analysis
 * wait for the next callback. Returns the order's status.
 */
export async function reconcileParcelado(paymentId: string, ref: string) {
  const db = serviceClient();
  const { data: attempt } = await db.from("order_payment_attempts").select("payment_id").eq("ref", ref).maybeSingle();
  if (!attempt || attempt.payment_id !== paymentId) throw Error("Order payment mismatch");
  const { data: pay, error } = await db.from("order_payments").select("id,status,currency,amount_minor,checkout_id").eq("id", paymentId).single();
  if (error || !pay) throw Error("Order payment mismatch");
  const order = await getParceladoOrder(parceladoOrderId(ref));
  if ((order.amountMinor !== null && order.amountMinor !== pay.amount_minor) || (order.currency !== null && order.currency !== pay.currency))
    throw Error("Order payment mismatch");
  const state =
    order.status === "approved"
      ? "paid"
      : order.status === "aborted" || (order.status === "canceled" && ["open", "failed"].includes(pay.status))
        ? "failed"
        : order.status === "canceled"
          ? "refunded"
          : null;
  if (!state) return order.status;
  if (pay.checkout_id !== ref) {
    // A replaced order: only a payment on it matters.
    if (state === "paid") await strayAttempt(paymentId, ref);
    return order.status;
  }
  const result = await db.rpc("order_payment_event", {
    payload: {
      payment_id: paymentId,
      state,
      session_id: ref,
      currency: pay.currency,
      subtotal_minor: pay.amount_minor,
      paid_minor: pay.amount_minor,
      discount_minor: 0,
      payment_intent_id: ref,
      full: "yes",
    },
  });
  if (result.error) throw Error("Order payment update failed");
  return order.status;
}
