import { after } from "next/server";
import { serviceClient } from "@/lib/enrollment/server";
import { reconcileParcelado } from "@/lib/orders/payments";
import { parceladoRef, parceladoWebhookValid } from "@/lib/orders/parceladousa";

export const runtime = "nodejs";

// ParceladoUSA webhook: the URL set on the API key in the ParceladoUSA panel (Integrações), called on every status
// change of an order created through the API. Signed with the key's whsec_ token (PARCELADOUSA_WEBHOOK_SECRET);
// even then the status is read from ParceladoUSA's API, as its documentation requires.

export async function POST(request: Request) {
  if (!process.env.PARCELADOUSA_WEBHOOK_SECRET) return new Response("Webhook unavailable", { status: 503 });
  if (Number(request.headers.get("content-length")) > 65536) return new Response("Payload too large", { status: 413 });
  const raw = await request.text();
  if (raw.length > 65536) return new Response("Payload too large", { status: 413 });
  if (!parceladoWebhookValid(raw, request.headers.get("parceladousa-webhook-timestamp"), request.headers.get("parceladousa-webhook-signature")))
    return new Response("Invalid signature", { status: 401 });
  let orderId: unknown;
  try {
    orderId = (JSON.parse(raw) as Record<string, unknown>).orderId;
  } catch {
    return new Response("Invalid payload", { status: 400 });
  }
  if (typeof orderId === "number") orderId = String(orderId);
  if (typeof orderId !== "string" || !/^[\w-]{1,64}$/.test(orderId)) return new Response("Invalid payload", { status: 400 });
  const ref = parceladoRef(orderId);
  const { data: attempt } = await serviceClient().from("order_payment_attempts").select("payment_id").eq("ref", ref).maybeSingle();
  // Not one of ours (another integration of the same account): acknowledge so it is not sent again.
  if (!attempt) return Response.json({ received: true, ignored: true });
  try {
    await reconcileParcelado(attempt.payment_id as string, ref);
  } catch (error) {
    console.error("ParceladoUSA webhook failed", { orderId, kind: error instanceof Error ? error.message : "error" });
    return new Response("Retry delivery", { status: 503 });
  }
  // Payment steps queue order e-mails: send them now instead of waiting for the cron.
  try {
    const { sendPendingNotifications } = await import("@/lib/orders/notifications");
    after(() => sendPendingNotifications().catch(() => undefined));
  } catch {
    /* sent by the cron */
  }
  return Response.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
}
