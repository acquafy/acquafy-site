import "server-only";
import type Stripe from "stripe";
import { serviceClient, stripeClient } from "@/lib/enrollment/server";
import { checkoutAmounts, invoiceAmounts } from "@/lib/payments/discounts";
export async function processLeaseEvent(event: Stripe.Event) {
  if (
    event.type.startsWith("checkout.session.") &&
    (event.data.object as Stripe.Checkout.Session).metadata?.integration !==
      "acquafy_lease"
  )
    return;
  const db = serviceClient(),
    stripe = stripeClient();
  const check = (r: { error: unknown }) => {
    if (r.error) throw Error("Lease synchronization failed");
  };
  if (
    event.livemode !==
    ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live")
  )
    throw Error("Environment mismatch");
  if (event.type === "checkout.session.completed") {
    const s = await stripe.checkout.sessions.retrieve(
      (event.data.object as { id: string }).id,
    );
    if (s.metadata?.integration !== "acquafy_lease") return;
    if (
      s.mode !== "subscription" ||
      !s.subscription ||
      s.client_reference_id !== s.metadata.lease_id
    )
      throw Error("Invalid lease checkout");
    const { data: l, error } = await db
      .from("customer_leases")
      .select("*")
      .eq("id", s.client_reference_id)
      .single();
    // The monthly price is the pre-discount subtotal; a coupon only lowers invoices.
    const amounts = checkoutAmounts(s);
    if (
      error ||
      !l ||
      !amounts ||
      !l.accepted_at ||
      amounts.subtotal !== l.monthly_minor ||
      s.currency !== l.currency ||
      (l.checkout_id && l.checkout_id !== s.id)
    )
      throw Error("Lease mismatch");
    const sub = await stripe.subscriptions.retrieve(
      typeof s.subscription === "string" ? s.subscription : s.subscription.id,
    );
    check(
      await db
        .from("customer_leases")
        .update({
          checkout_id: s.id,
          subscription_id: sub.id,
          customer_id:
            typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        })
        .eq("id", l.id),
    );
    if (sub.latest_invoice) {
      const invoice = await stripe.invoices.retrieve(
        typeof sub.latest_invoice === "string"
          ? sub.latest_invoice
          : sub.latest_invoice.id,
      );
      if (invoice.status === "paid") await collect(invoice);
    }
  } else if (["invoice.paid", "invoice.payment_failed"].includes(event.type)) {
    const i = await stripe.invoices.retrieve(
      (event.data.object as { id: string }).id,
    );
    const sub = i.parent?.subscription_details?.subscription;
    if (!sub) return;
    const id = typeof sub === "string" ? sub : sub.id;
    const s = await stripe.subscriptions.retrieve(id);
    if (s.metadata.integration !== "acquafy_lease") return;
    if (event.type === "invoice.paid" && i.status === "paid") await collect(i);
    else
      check(
        await db
          .from("customer_leases")
          .update({ status: "past_due" })
          .eq("subscription_id", id)
          .in("status", ["accepted", "active", "past_due"]),
      );
  } else if (event.type.startsWith("customer.subscription.")) {
    const s = await stripe.subscriptions.retrieve(
      (event.data.object as { id: string }).id,
    );
    if (s.metadata.integration !== "acquafy_lease") return;
    const status = ["canceled", "incomplete_expired"].includes(s.status)
      ? "ended"
      : ["past_due", "unpaid", "paused"].includes(s.status)
        ? "past_due"
        : null;
    check(
      await db
        .from("customer_leases")
        .update({
          ...(status ? { status } : {}),
          cancel_at_period_end: s.cancel_at_period_end,
        })
        .eq("subscription_id", s.id),
    );
  } else if (
    [
      "charge.refunded",
      "charge.dispute.created",
      "radar.early_fraud_warning.created",
    ].includes(event.type)
  ) {
    const object = event.data.object as
      Stripe.Charge | Stripe.Dispute | Stripe.Radar.EarlyFraudWarning;
    const charge =
      "charge" in object
        ? await stripe.charges.retrieve(
            typeof object.charge === "string"
              ? object.charge
              : object.charge.id,
          )
        : (object as Stripe.Charge);
    const pi =
      typeof charge.payment_intent === "string"
        ? charge.payment_intent
        : charge.payment_intent?.id;
    if (!pi) return;
    const payments = await stripe.invoicePayments.list({
      payment: { type: "payment_intent", payment_intent: pi },
    });
    for (const payment of payments.data) {
      const invoiceId =
        typeof payment.invoice === "string"
          ? payment.invoice
          : payment.invoice.id;
      const receipt = await db
        .from("lease_receipts")
        .select("lease_id")
        .eq("invoice_id", invoiceId)
        .maybeSingle();
      check(receipt);
      if (receipt.data) {
        check(
          await db
            .from("lease_receipts")
            .update({ state: "review" })
            .eq("invoice_id", invoiceId),
        );
        check(
          await db
            .from("lease_revenue")
            .update({ state: "review" })
            .eq("invoice_id", invoiceId),
        );
        check(
          await db
            .from("customer_leases")
            .update({ status: "review" })
            .eq("id", receipt.data.lease_id),
        );
      }
    }
  }
  async function collect(i: Stripe.Invoice) {
    const sub = i.parent?.subscription_details?.subscription;
    const amounts = invoiceAmounts(i);
    if (!sub || !amounts || i.amount_remaining !== 0)
      throw Error("Unpaid invoice");
    const id = typeof sub === "string" ? sub : sub.id;
    // Each lease is billed in its own currency (USD, or BRL for orders placed in Brazil).
    const bound = await db.from("customer_leases").select("currency").eq("subscription_id", id).maybeSingle();
    if (bound.error || (bound.data && bound.data.currency !== i.currency))
      throw Error("Invoice currency mismatch");
    const current = await stripe.subscriptions.retrieve(id);
    const payments = await stripe.invoicePayments.list({ invoice: i.id });
    let risk = false;
    for (const payment of payments.data) {
      const pi = payment.payment.payment_intent;
      if (!pi) continue;
      const intent = await stripe.paymentIntents.retrieve(
        typeof pi === "string" ? pi : pi.id,
        { expand: ["latest_charge"] },
      );
      const charge =
        typeof intent.latest_charge === "object" ? intent.latest_charge : null;
      if (charge && (charge.amount_refunded > 0 || charge.disputed))
        risk = true;
    }
    check(
      await db.rpc("lease_collect", {
        payload: {
          subscription_id: id,
          invoice_id: i.id,
          subtotal_minor: amounts.subtotal,
          amount_minor: amounts.paid,
          discount_minor: amounts.discount,
          period_start: i.period_start,
          period_end: i.period_end,
        },
      }),
    );
    if (risk) {
      check(
        await db
          .from("lease_receipts")
          .update({ state: "review" })
          .eq("invoice_id", i.id),
      );
      check(
        await db
          .from("lease_revenue")
          .update({ state: "review" })
          .eq("invoice_id", i.id),
      );
      check(
        await db
          .from("customer_leases")
          .update({ status: "review" })
          .eq("subscription_id", id),
      );
    } else if (current.status !== "active") {
      check(
        await db
          .from("customer_leases")
          .update({
            status: ["canceled", "incomplete_expired"].includes(current.status)
              ? "ended"
              : "past_due",
          })
          .eq("subscription_id", id)
          .neq("status", "review"),
      );
    }
  }
}
