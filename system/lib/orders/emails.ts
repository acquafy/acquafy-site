// Order e-mails (one per step). Portuguese for orders in BRL, English for orders in USD (the website language that
// placed them). Plain, short messages that link to the order page, where the next step is.
import { formatMinor, type OrderCurrency } from "./pricing";
import { windowLabel } from "./tasks";

export type NotificationKind = "placed" | "confirmed" | "paid" | "installation_booked" | "shipped" | "installed" | "cancelled" | "refunded";

export type EmailOrder = {
  id: string;
  kind: "purchase" | "lease";
  currency: OrderCurrency;
  total_minor: number;
  fee_minor: number | null;
  /** Trade-in credit taken off the balance (R$ 100 for an old purifier on a Neo UP). */
  trade_in_minor?: number;
  delivery_estimate: string | null;
  tracking_reference: string | null;
  items: { title: string; quantity: number; color?: string }[];
};

type Copy = { subject: string; lead: string };

function copy(kind: NotificationKind, o: EmailOrder, pt: boolean, booking?: { starts_at: string; ends_at: string }): Copy {
  const money = (minor: number) => formatMinor(minor, o.currency);
  const balance = o.total_minor - (o.fee_minor ?? 0) - (o.trade_in_minor ?? 0);
  const lease = o.kind === "lease";
  if (pt)
    switch (kind) {
      case "placed":
        return { subject: "Recebemos seu pedido", lead: `A taxa de ${money(o.fee_minor ?? 0)} foi paga e seu pedido está feito. Agora confirmamos a disponibilidade e a data de entrega.` };
      case "confirmed":
        return {
          subject: "Pedido confirmado",
          lead: lease
            ? `Seu pedido foi confirmado${o.delivery_estimate ? ` com entrega prevista ${o.delivery_estimate}` : ""}. O próximo passo é aceitar o acordo de locação.`
            : `Seu pedido foi confirmado${o.delivery_estimate ? ` com entrega prevista ${o.delivery_estimate}` : ""}. O próximo passo é pagar o saldo de ${money(balance)}.`,
        };
      case "paid":
        return { subject: "Pagamento recebido", lead: "Recebemos o pagamento. O próximo passo é agendar a instalação." };
      case "installation_booked":
        return { subject: "Instalação agendada", lead: `Sua instalação está agendada para ${booking ? windowLabel(booking.starts_at, booking.ends_at) : "a data escolhida"}. Você pode remarcar até 48 horas antes.` };
      case "shipped":
        return { subject: "Pedido enviado", lead: `Seu pedido foi enviado.${o.tracking_reference ? ` Rastreamento: ${o.tracking_reference}.` : ""}` };
      case "installed":
        return { subject: "Purificador instalado", lead: "Seu purificador está instalado. Configure o app Acquafy para acompanhar filtros e consumo." };
      case "cancelled":
        return { subject: "Pedido cancelado", lead: "Seu pedido foi cancelado. Se houve pagamento, o reembolso vai para o cartão usado." };
      case "refunded":
        return { subject: "Reembolso feito", lead: "O reembolso foi feito no cartão usado. Ele aparece na fatura em alguns dias, conforme o banco." };
    }
  switch (kind) {
    case "placed":
      return { subject: "We received your order", lead: `The ${money(o.fee_minor ?? 0)} order fee is paid and your order is placed. We'll now confirm availability and the delivery date.` };
    case "confirmed":
      return {
        subject: "Order confirmed",
        lead: lease
          ? `Your order is confirmed${o.delivery_estimate ? `, estimated delivery ${o.delivery_estimate}` : ""}. Next, accept the lease agreement.`
          : `Your order is confirmed${o.delivery_estimate ? `, estimated delivery ${o.delivery_estimate}` : ""}. Next, pay the balance of ${money(balance)}.`,
      };
    case "paid":
      return { subject: "Payment received", lead: "We received your payment. Next, book your installation." };
    case "installation_booked":
      return { subject: "Installation booked", lead: `Your installation is booked for ${booking ? windowLabel(booking.starts_at, booking.ends_at) : "the chosen date"} (Brasília time). You can reschedule up to 48 hours before.` };
    case "shipped":
      return { subject: "Order shipped", lead: `Your order has shipped.${o.tracking_reference ? ` Tracking: ${o.tracking_reference}.` : ""}` };
    case "installed":
      return { subject: "Purifier installed", lead: "Your purifier is installed. Set up the Acquafy app to follow filters and usage." };
    case "cancelled":
      return { subject: "Order cancelled", lead: "Your order is cancelled. Anything you paid goes back to the card you used." };
    case "refunded":
      return { subject: "Refund issued", lead: "The refund was issued to the card you used. Your bank shows it within a few days." };
  }
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Subject, HTML and text of one order e-mail. `origin` is the public site (the order page lives at /app/pedidos/<id>). */
export function renderOrderEmail(kind: NotificationKind, o: EmailOrder, origin: string, booking?: { starts_at: string; ends_at: string }) {
  const pt = o.currency === "brl";
  const { subject, lead } = copy(kind, o, pt, booking);
  const number = o.id.slice(0, 8).toUpperCase();
  const url = `${origin}/app/pedidos/${o.id}`;
  const product = o.items.map((i) => `${i.title}${i.color ? ` · ${i.color}` : ""} × ${i.quantity}`).join(", ");
  const button = pt ? "Ver meu pedido" : "View my order";
  const text = `${subject} · ${pt ? "Pedido" : "Order"} ${number}\n\n${lead}\n\n${product}\n\n${button}: ${url}\n\nAcquafy`;
  const html = `<!doctype html><html><body style="margin:0;background:#f6f9fe;font-family:Avenir,Arial,sans-serif;color:#1f2e91">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e8ecf4;border-radius:12px">
<tr><td style="padding:28px 28px 8px;font-size:13px;color:#4b5563">${pt ? "Pedido" : "Order"} ${number}</td></tr>
<tr><td style="padding:0 28px;font-size:22px;font-weight:800">${escape(subject)}</td></tr>
<tr><td style="padding:12px 28px 0;font-size:15px;line-height:22px;color:#1f2e91">${escape(lead)}</td></tr>
<tr><td style="padding:12px 28px 0;font-size:13px;color:#4b5563">${escape(product)}</td></tr>
<tr><td style="padding:24px 28px 28px"><a href="${url}" style="display:inline-block;background:#0233c3;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:12px 22px;border-radius:14px">${button}</a></td></tr>
</table>
<p style="font-size:12px;color:#8a8f97;margin:16px 0 0">Acquafy</p>
</td></tr></table></body></html>`;
  return { subject: `${subject} · ${pt ? "Pedido" : "Order"} ${number}`, html, text };
}
