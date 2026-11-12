import "server-only";
import { publicOrigin, serviceClient } from "@/lib/enrollment/server";
import { renderOrderEmail, type EmailOrder, type NotificationKind } from "./emails";

type Row = {
  id: number;
  order_id: string;
  kind: NotificationKind;
  to_email: string;
  attempts: number;
  /** The order (and appointment) captured when the e-mail was queued; every attempt renders the same message. */
  payload: EmailOrder & { booking?: { starts_at: string; ends_at: string } };
};

/** Resend is configured when the API key and the sender address exist; otherwise e-mails wait in the outbox. */
export function emailConfigured() {
  return !!process.env.RESEND_API_KEY && !!process.env.ORDER_EMAIL_FROM;
}

/**
 * Sends the queued order e-mails (public.order_notifications, filled by database triggers) through Resend.
 * Claims a batch so parallel runs never send the same row; a failed send goes back to the queue and is retried
 * up to 5 times. Called by the cron route and right after order actions and Stripe events.
 */
export async function sendPendingNotifications(batch = 20) {
  if (!emailConfigured()) return { sent: 0, failed: 0, skipped: true };
  const db = serviceClient();
  const claimed = await db.rpc("order_notifications_claim", { batch });
  if (claimed.error) throw Error("Outbox unavailable");
  let sent = 0,
    failed = 0;
  for (const row of (claimed.data ?? []) as Row[]) {
    try {
      if (!row.payload?.id) throw Error("Payload missing");
      const email = renderOrderEmail(row.kind, row.payload, publicOrigin(), row.payload.booking);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          // Same row, same key: a retried request after a timeout is not sent twice.
          "Idempotency-Key": `order-notification-${row.id}`,
        },
        body: JSON.stringify({ from: process.env.ORDER_EMAIL_FROM, to: [row.to_email], subject: email.subject, html: email.html, text: email.text }),
        signal: AbortSignal.timeout(10000),
      });
      const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
      if (!res.ok) throw Error(`Resend ${res.status}: ${body.message ?? "error"}`);
      await db.from("order_notifications").update({ status: "sent", sent_at: new Date().toISOString(), provider_id: body.id ?? null, last_error: null }).eq("id", row.id);
      sent++;
    } catch (e) {
      failed++;
      await db
        .from("order_notifications")
        .update({ status: row.attempts >= 5 ? "failed" : "pending", last_error: (e instanceof Error ? e.message : "error").slice(0, 300) })
        .eq("id", row.id);
    }
  }
  return { sent, failed, skipped: false };
}
