import "server-only";
import { publicOrigin, serviceClient } from "@/lib/enrollment/server";
import { renderOrderEmail, type EmailOrder, type NotificationKind } from "./emails";
import { sendSesEmail, sesConfigured } from "./ses";

type Row = {
  id: number;
  order_id: string;
  kind: NotificationKind;
  to_email: string;
  attempts: number;
  /** The order (and appointment) captured when the e-mail was queued; every attempt renders the same message. */
  payload: EmailOrder & { booking?: { starts_at: string; ends_at: string } };
};

/** E-mail is configured when Amazon SES and the sender address exist; otherwise e-mails wait in the outbox. */
export function emailConfigured() {
  return sesConfigured() && !!process.env.ORDER_EMAIL_FROM;
}

/**
 * Sends the queued order e-mails (public.order_notifications, filled by database triggers) through Amazon SES.
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
      // The row is claimed ("sending") before this call, so parallel runs never send it twice.
      const messageId = await sendSesEmail({ from: process.env.ORDER_EMAIL_FROM!, to: row.to_email, subject: email.subject, html: email.html, text: email.text });
      await db.from("order_notifications").update({ status: "sent", sent_at: new Date().toISOString(), provider_id: messageId, last_error: null }).eq("id", row.id);
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
