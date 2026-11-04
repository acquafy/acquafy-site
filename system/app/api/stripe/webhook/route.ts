import { stripeClient } from "@/lib/enrollment/server";
import { processStripeEvent } from "@/lib/enrollment/payments";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET,
    signature = request.headers.get("stripe-signature");
  if (!secret) return new Response("Webhook unavailable", { status: 503 });
  if (!signature) return new Response("Invalid signature", { status: 400 });
  if (Number(request.headers.get("content-length")) > 524288)
    return new Response("Payload too large", { status: 413 });
  const reader = request.body?.getReader();
  if (!reader) return new Response("Invalid payload", { status: 400 });
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    size += part.value.length;
    if (size > 524288) {
      await reader.cancel();
      return new Response("Payload too large", { status: 413 });
    }
    chunks.push(part.value);
  }
  let event;
  try {
    event = stripeClient().webhooks.constructEvent(
      Buffer.concat(chunks),
      signature,
      secret,
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }
  try {
    await processStripeEvent(event);
  } catch (error) {
    console.error("Stripe enrollment event failed", {
      eventId: event.id,
      type: event.type,
      kind: error instanceof Error ? error.message : "error",
    });
    return new Response("Retry delivery", { status: 503 });
  }
  return Response.json(
    { received: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
