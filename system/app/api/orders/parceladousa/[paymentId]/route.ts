import { after } from "next/server";
import { publicOrigin, serviceClient } from "@/lib/enrollment/server";
import { CHECKED_RECENTLY, reconcileParcelado } from "@/lib/orders/payments";
import { isParceladoRef, parceladoRef } from "@/lib/orders/parceladousa";

export const runtime = "nodejs";

// ParceladoUSA callback of one order payment (the URL is set per payment when its ParceladoUSA order is created).
// GET = the customer coming back from the payment page; POST = ParceladoUSA's status notification.
// Neither is trusted: the payment state is read from ParceladoUSA's API (reconcileParcelado), and only a
// ParceladoUSA order bound to this payment is accepted.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const ORDER_ID = /^[\w-]{1,64}$/;

async function settle(paymentId: string, orderId: string | null) {
  const db = serviceClient();
  const { data: pay } = await db.from("order_payments").select("order_id,checkout_id").eq("id", paymentId).maybeSingle();
  if (!pay) return null;
  // Without an order id (the customer's return), the payment's current ParceladoUSA order is checked.
  const ref = orderId ? parceladoRef(orderId) : isParceladoRef(pay.checkout_id) ? pay.checkout_id : null;
  if (ref) await reconcileParcelado(paymentId, ref, { throttle: true });
  return pay.order_id as string;
}

async function notify() {
  // Payment steps queue order e-mails: send them now instead of waiting for the cron.
  try {
    const { sendPendingNotifications } = await import("@/lib/orders/notifications");
    after(() => sendPendingNotifications().catch(() => undefined));
  } catch {
    /* sent by the cron */
  }
}

export async function GET(request: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  const raw = new URL(request.url).searchParams.get("orderId");
  let orderId: string | null = null;
  try {
    if (UUID.test(paymentId)) {
      orderId = await settle(paymentId, raw && ORDER_ID.test(raw) ? raw : null);
      await notify();
    }
  } catch {
    // The notification or the next visit records it; the customer still lands on the order.
  }
  const target = publicOrigin() + "/app/pedidos" + (orderId ? "/" + orderId : "");
  return Response.redirect(target, 303);
}

export async function POST(request: Request, { params }: { params: Promise<{ paymentId: string }> }) {
  const { paymentId } = await params;
  if (Number(request.headers.get("content-length")) > 65536) return new Response("Payload too large", { status: 413 });
  const text = await request.text();
  if (text.length > 65536) return new Response("Payload too large", { status: 413 });
  let orderId: unknown;
  try {
    orderId = (JSON.parse(text) as Record<string, unknown>).orderId;
  } catch {
    orderId = new URLSearchParams(text).get("orderId");
  }
  if (typeof orderId === "number") orderId = String(orderId);
  if (!UUID.test(paymentId) || typeof orderId !== "string" || !ORDER_ID.test(orderId)) return new Response("Invalid callback", { status: 400 });
  try {
    if (!(await settle(paymentId, orderId))) return new Response("Unknown payment", { status: 404 });
  } catch (error) {
    if (error instanceof Error && error.message === CHECKED_RECENTLY) return new Response("Retry later", { status: 503, headers: { "Retry-After": "10" } });
    console.error("ParceladoUSA callback failed", { paymentId, kind: error instanceof Error ? error.message : "error" });
    return new Response("Retry delivery", { status: 503 });
  }
  await notify();
  return Response.json({ received: true }, { headers: { "Cache-Control": "no-store" } });
}
