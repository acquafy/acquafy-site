import { sendPendingNotifications } from "@/lib/orders/notifications";

export const runtime = "nodejs";

/** Vercel Cron (vercel.json at the repository root): sends the order e-mails waiting in the outbox. */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) return new Response("Unauthorized", { status: 401 });
  try {
    return Response.json(await sendPendingNotifications(50), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return new Response("Outbox unavailable", { status: 503 });
  }
}
