// The customer's task list for a fixed-price order (Tesla-style "next steps"), derived from what is already stored:
// order status, payments, the installation booking. No task state of its own.

export type TaskState = "done" | "todo" | "waiting" | "later";
export type TaskKey = "fee" | "address" | "confirmation" | "balance" | "lease" | "trade_in" | "installation" | "installed" | "app";
export type OrderTask = { key: TaskKey; title: string; state: TaskState; detail?: string };

export type TaskOrder = {
  kind: "purchase" | "lease";
  status: string;
  delivery_estimate: string | null;
  placed_at: string | null;
  /** declared → received | missing (the technician's check at installation); null when there is no trade-in. */
  trade_in_status?: string | null;
};
export type TaskPayment = { kind: "fee" | "balance"; status: string };
export type TaskBooking = { starts_at: string; ends_at: string } | null;

const AFTER_PAYMENT = ["paid", "processing", "shipped", "installed", "completed"];
const rank = (status: string) => ["awaiting_fee", "placed", "confirmed", "accepted", ...AFTER_PAYMENT].indexOf(status);

/** Installation window as shown to the customer, in Brasília time ("seg., 15/12 · 08:00–12:00"). */
export function windowLabel(starts: string, ends: string) {
  const day = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", weekday: "short", day: "2-digit", month: "2-digit" }).format(new Date(starts));
  const time = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit" });
  return `${day} · ${time.format(new Date(starts))}–${time.format(new Date(ends))}`;
}

/** Trade-in offer of the order: whether its products qualify, and the credit as shown to the customer. */
export type TradeInOffer = { eligible: boolean; credit: string } | null;

export function orderTasks(order: TaskOrder, payments: TaskPayment[], booking: TaskBooking, tradeIn: TradeInOffer = null): OrderTask[] {
  const r = rank(order.status);
  const settled = (kind: TaskPayment["kind"]) => payments.some((p) => p.kind === kind && ["paid", "refunding", "refunded"].includes(p.status));
  const paidStage = AFTER_PAYMENT.includes(order.status);
  const installed = ["installed", "completed"].includes(order.status);
  const confirmed = r >= rank("confirmed");
  const lease = order.kind === "lease";

  const tasks: OrderTask[] = [
    { key: "fee", title: "Pagar a taxa do pedido", state: settled("fee") ? "done" : "todo" },
    {
      key: "address",
      title: "Confirmar endereço e contato",
      state: confirmed ? "done" : settled("fee") ? "todo" : "later",
      detail: confirmed ? undefined : "Você pode corrigir até a Acquafy confirmar o pedido.",
    },
    {
      key: "confirmation",
      title: "Confirmação da Acquafy",
      state: confirmed ? "done" : order.status === "placed" ? "waiting" : "later",
      detail: order.delivery_estimate ? `Entrega prevista: ${order.delivery_estimate}` : "Confirmamos disponibilidade e data de entrega.",
    },
    lease
      ? {
          key: "lease",
          title: "Aceitar o acordo de locação e pagar a 1ª mensalidade",
          state: paidStage ? "done" : order.status === "accepted" || order.status === "confirmed" ? "todo" : "later",
          detail: "Em Locações, depois que a Acquafy reservar a unidade.",
        }
      : { key: "balance", title: "Pagar o saldo", state: settled("balance") ? "done" : order.status === "confirmed" ? "todo" : "later" },
    {
      key: "installation",
      title: "Agendar a instalação",
      state: booking ? "done" : paidStage && !installed ? "todo" : installed ? "done" : "later",
      detail: booking ? windowLabel(booking.starts_at, booking.ends_at) : undefined,
    },
    ...tradeInTask(order, tradeIn, installed),
    { key: "installed", title: "Instalação", state: installed ? "done" : booking ? "waiting" : "later" },
    { key: "app", title: "Configurar o app Acquafy", state: installed ? "todo" : "later" },
  ];
  return tasks;
}

/** Same rule as order_command 'cancel' for fixed-price orders: until preparation starts (a lease, until its first charge). */
export function canCancel(
  order: TaskOrder & { flow: string },
  who: { owner: boolean; admin: boolean },
  withdrawalDays: number,
  now: number,
) {
  if (order.flow !== "fixed") return false;
  const states = order.kind === "lease" ? ["awaiting_fee", "placed", "confirmed", "accepted"] : ["awaiting_fee", "placed", "confirmed", "paid"];
  if (!states.includes(order.status)) return false;
  if (who.admin) return true;
  const inWithdrawal = !!order.placed_at && now - new Date(order.placed_at).getTime() < withdrawalDays * 86400000;
  return who.owner && (order.status === "awaiting_fee" || inWithdrawal);
}

/**
 * Trade-in ("Seu purificador antigo vale um UP"): offered on eligible purchases until Acquafy confirms the order;
 * once declared, the old unit is handed in at installation and staff record the technician's check.
 */
function tradeInTask(order: TaskOrder, offer: TradeInOffer, installed: boolean): OrderTask[] {
  const status = order.trade_in_status ?? null;
  if (status === "received") return [{ key: "trade_in", title: "Purificador antigo entregue", state: "done", detail: offer ? `Desconto de ${offer.credit} no saldo.` : undefined }];
  if (status === "missing")
    return [{ key: "trade_in", title: "Purificador antigo não recebido", state: "done", detail: "O técnico não recebeu o purificador antigo. Fale com o suporte." }];
  if (status === "declared")
    return [
      {
        key: "trade_in",
        title: "Entregar o purificador antigo na instalação",
        state: installed ? "waiting" : "later",
        detail: offer ? `Desconto de ${offer.credit} no saldo.` : undefined,
      },
    ];
  if (order.kind === "purchase" && offer?.eligible && ["awaiting_fee", "placed"].includes(order.status))
    return [{ key: "trade_in", title: `Tem um purificador antigo? Ganhe ${offer.credit} (opcional)`, state: "todo", detail: "Entregue-o ao técnico na instalação." }];
  return [];
}
