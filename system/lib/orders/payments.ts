import "server-only";
import type Stripe from "stripe";
import { stripeClient, serviceClient } from "@/lib/enrollment/server";
import { checkoutAmounts, checkoutSettled } from "@/lib/payments/discounts";
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
