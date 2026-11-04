import "server-only";
import type Stripe from "stripe";
import { stripeClient, serviceClient } from "./server";
export function sessionState(
  session: Pick<Stripe.Checkout.Session, "payment_status" | "status">,
  risk?: { refunded: boolean; disputed: boolean },
) {
  if (risk?.refunded) return "refunded";
  if (risk?.disputed) return "disputed";
  if (session.payment_status === "paid") return "paid";
  if (session.status === "expired") return "expired";
  return "processing";
}
export async function applySession(
  sessionId: string,
  event: { id: string; type: string; created: number },
  failed = false,
) {
  const stripe = stripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["payment_intent.latest_charge"],
  });
  if (session.metadata?.integration !== "acquafy_investor") return;
  if (
    session.livemode !==
    ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live")
  )
    throw new Error("Payment environment mismatch");
  const attemptId = session.metadata.attempt_id;
  if (!attemptId || session.client_reference_id !== attemptId)
    throw new Error("Invalid checkout reference");
  const service = serviceClient();
  const row = await service
    .from("enrollment_checkouts")
    .select("id,stripe_session_id,enrollment_id")
    .eq("id", attemptId)
    .maybeSingle();
  if (row.error) throw new Error("Checkout reference unavailable");
  if (!row.data) {
    const recorded = await service
      .from("stripe_events")
      .upsert(
        {
          event_id: event.id,
          event_type: "unmatched." + event.type,
          object_id: session.id,
        },
        { onConflict: "event_id", ignoreDuplicates: true },
      );
    if (recorded.error) throw new Error("Cannot record unmatched payment");
    console.warn("Verified Stripe event has no enrollment binding", {
      eventId: event.id,
      sessionId: session.id,
    });
    return;
  }
  if (row.data.enrollment_id !== session.metadata.enrollment_id)
    throw new Error("Checkout reference unavailable");
  if (!row.data.stripe_session_id) {
    const bound = await service.rpc("enrollment_gateway", {
      operation: "bind",
      payload: {
        attempt_id: attemptId,
        session_id: session.id,
        amount_minor: session.amount_total,
        currency: session.currency,
        livemode: session.livemode,
      },
    });
    if (bound.error) throw new Error("Cannot bind verified checkout");
  }
  const intent =
    typeof session.payment_intent === "object" ? session.payment_intent : null;
  const charge =
    intent && typeof intent.latest_charge === "object"
      ? intent.latest_charge
      : null;
  const risk = {
    refunded: !!charge && charge.amount_refunded > 0,
    disputed: !!charge && charge.disputed,
  };
  let state = sessionState(session, risk);
  if (failed && state === "processing") state = "failed";
  const result = await service.rpc("enrollment_gateway", {
    operation: "event",
    payload: {
      attempt_id: attemptId,
      event_id: event.id,
      event_type: event.type,
      session_id: session.id,
      amount_minor: session.amount_total,
      currency: session.currency,
      livemode: session.livemode,
      state,
      payment_intent_id:
        intent?.id ??
        (typeof session.payment_intent === "string"
          ? session.payment_intent
          : null),
      paid_at: event.created,
    },
  });
  if (result.error)
    throw new Error("Payment state rejected: " + result.error.code);
}
export async function processStripeEvent(event: Stripe.Event) {
  const prior = await serviceClient()
    .from("stripe_events")
    .select("event_id")
    .eq("event_id", event.id)
    .maybeSingle();
  if (prior.error) throw new Error("Event history unavailable");
  if (prior.data) return;
  if (
    event.livemode !==
    ((process.env.STRIPE_ENVIRONMENT ?? "test") === "live")
  )
    throw new Error("Webhook environment mismatch");
  if (event.type.startsWith("checkout.session.")) {
    if (
      ![
        "checkout.session.completed",
        "checkout.session.async_payment_succeeded",
        "checkout.session.async_payment_failed",
        "checkout.session.expired",
      ].includes(event.type)
    )
      return;
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.integration !== "acquafy_investor") return;
    await applySession(
      session.id,
      { id: event.id, type: event.type, created: event.created },
      event.type === "checkout.session.async_payment_failed",
    );
  } else if (
    [
      "charge.refunded",
      "charge.dispute.created",
      "charge.dispute.closed",
    ].includes(event.type)
  ) {
    const stripe = stripeClient();
    const object = event.data.object as Stripe.Charge | Stripe.Dispute;
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
    const intent = await stripe.paymentIntents.retrieve(pi);
    if (intent.metadata.integration !== "acquafy_investor") return;
    const row = await serviceClient()
      .from("enrollment_checkouts")
      .select("stripe_session_id")
      .eq("id", intent.metadata.attempt_id)
      .maybeSingle();
    if (row.error || !row.data?.stripe_session_id)
      throw new Error("Payment binding is pending");
    await applySession(row.data.stripe_session_id, {
      id: event.id,
      type: event.type,
      created: event.created,
    });
  }
}
