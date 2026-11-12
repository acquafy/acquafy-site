import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { context, date } from "@/lib/live/data";
import { liveNavigation } from "@/config/live-navigation";
import { orderImage } from "@/config/order-images";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { FlowShell, FlowStage } from "@/components/flow/FlowShell";
import { StatusPill, statusLabel } from "@/components/live/StatusPill";
import { OrderTasks } from "@/components/sections/OrderTasks";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { cn } from "@/lib/cn";
import { orderAction } from "@/lib/orders/actions";
import { formatMinor, type OrderCurrency } from "@/lib/orders/pricing";
import { canCancel, orderTasks, type TaskPayment } from "@/lib/orders/tasks";

export const metadata = { title: "Pedido" };

type Payment = { id: string; kind: "fee" | "balance"; status: string; amount_minor: number; paid_minor: number | null; discount_minor: number };
const PAYMENT_STATUS: Record<string, string> = {
  open: "a pagar",
  failed: "recusado · tente de novo",
  paid: "pago",
  refunding: "reembolso solicitado",
  refunded: "reembolsado",
  void: "cancelado",
  review: "em análise",
};

/** One order (Tesla-style): the product on the left; status, next steps, payments and history on the right. */
export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const ctx = await context();
  const admin = ctx.staff === "admin";
  const { data: o } = await ctx.db.from("product_orders").select("*").eq("id", id).maybeSingle();
  if (!o) notFound();
  const owner = o.user_id === ctx.user.id;
  // Rendered per request; the 48-hour and withdrawal windows are measured from now.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const region = String(o.delivery?.state ?? "").toUpperCase();

  const [events, paymentRows, booking, settings, open, reserved] = await Promise.all([
    ctx.db.from("order_events").select("*").eq("order_id", id).order("created_at", { ascending: true }),
    ctx.db.from("order_payments").select("*").eq("order_id", id),
    ctx.db.from("installation_bookings").select("window_id,installation_windows(starts_at,ends_at)").eq("order_id", id).maybeSingle(),
    ctx.db.from("order_settings").select("withdrawal_days").single(),
    // Bookable windows (active, 48 hours ahead, with room), filtered in the database before the limit.
    /^[A-Z]{2}$/.test(region)
      ? ctx.db.rpc("installation_windows_open", { region_code: region, max_rows: 12 })
      : Promise.resolve({ data: [] as { id: string; starts_at: string; ends_at: string; free: number }[], error: null }),
    ctx.db.from("order_stock_reservations").select("id", { count: "exact", head: true }).eq("order_id", id),
  ]);
  if (events.error || paymentRows.error || booking.error || settings.error || open.error || reserved.error) throw Error("Pedido indisponível.");
  const payments = paymentRows.data as Payment[];
  const booked = (booking.data?.installation_windows ?? null) as { starts_at: string; ends_at: string } | null;
  const windows = (open.data as { id: string; starts_at: string; ends_at: string; free: number }[]).filter((w) => w.id !== booking.data?.window_id);

  const fixed = o.flow === "fixed";
  const currency = o.currency as OrderCurrency;
  const first = (o.items as { product: string; title: string; quantity: number; color?: string }[])[0];
  const tasks = fixed ? orderTasks(o, payments as TaskPayment[], booked) : [];
  const canRebook = !!booked && new Date(booked.starts_at).getTime() - now > 48 * 3600000 && ["paid", "processing", "shipped"].includes(o.status);
  const cancellable = canCancel(o, { owner, admin }, settings.data.withdrawal_days, now);
  const number = o.id.slice(0, 8).toUpperCase();

  return (
    <FlowShell
      step={4}
      account={{ email: ctx.user.email ?? "" }}
      nav={liveNavigation(admin ? "admin" : "customer")
        .filter((item) => ["/pedidos", "/locacoes", "/suporte", "/perfil"].includes(item.href))
        .map(({ href, label }) => ({ href, label }))}
      stage={
        <FlowStage
          image={orderImage(first?.product, undefined)}
          title={first ? `${first.title}${o.items.length > 1 ? ` + ${o.items.length - 1}` : ""}` : "Pedido"}
          detail={[
            first?.color,
            o.kind === "lease" ? "Locação" : "Compra",
            (reserved.count ?? 0) > 0 ? "Unidade reservada do estoque" : null,
            o.delivery_estimate ? `Entrega prevista ${o.delivery_estimate}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        />
      }
    >
      <Link href="/pedidos" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand hover:underline">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Meus pedidos
      </Link>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-[26px] leading-tight font-black tracking-tight text-ink">Pedido {number}</h1>
        <StatusPill status={o.status} />
      </div>

      {fixed && (
        <OrderTasks
          orderId={o.id}
          tasks={tasks}
          currency={currency}
          payments={payments}
          delivery={Object.fromEntries(Object.entries(o.delivery ?? {}).map(([k, v]) => [k, String(v ?? "")]))}
          owner={owner}
          windows={windows}
          canRebook={canRebook}
        />
      )}

      {fixed && (
        <Card title={o.kind === "lease" ? "Mensalidade e pagamentos" : "Preço e pagamentos"}>
          <p className="tabular text-[24px] leading-tight font-black tracking-tight text-ink">
            {formatMinor(o.total_minor, currency)}
            {o.kind === "lease" && <span className="text-[14px] font-semibold text-ink-soft"> /mês</span>}
          </p>
          <dl className="mt-2 grid gap-1 text-[14px]">
            {payments
              .sort((a, b) => (a.kind === "fee" ? -1 : b.kind === "fee" ? 1 : 0))
              .map((p) => (
                <div key={p.id} className="flex flex-wrap justify-between gap-x-4">
                  <dt className="text-ink-soft">{p.kind === "fee" ? "Taxa do pedido" : "Saldo"}</dt>
                  <dd className="tabular font-semibold text-ink">
                    {formatMinor(p.amount_minor, currency)} · {PAYMENT_STATUS[p.status] ?? p.status}
                    {p.discount_minor > 0 && p.paid_minor !== null ? ` (pago ${formatMinor(p.paid_minor, currency)} com cupom)` : ""}
                  </dd>
                </div>
              ))}
          </dl>
        </Card>
      )}

      <Card title="Entrega">
        <DefinitionList
          rows={[
            { label: "Destinatário", value: o.delivery?.name },
            { label: "Endereço", value: o.delivery?.address },
            { label: "Telefone", value: o.delivery?.phone },
            ...(o.tracking_reference ? [{ label: "Rastreamento", value: o.tracking_reference }] : []),
          ]}
        />
      </Card>

      {events.data.length > 0 && (
        <Card title="Histórico">
          <ol className="grid gap-0">
            {events.data.map((e, n) => {
              const last = n === events.data.length - 1;
              return (
                <li key={e.id} className="relative flex gap-3 pb-3 last:pb-0">
                  {!last && <span aria-hidden="true" className="absolute top-4 bottom-0 left-[0.4375rem] w-px bg-line" />}
                  <span aria-hidden="true" className={cn("mt-1 size-3.5 shrink-0 rounded-full", last ? "bg-brand ring-4 ring-brand-soft" : "bg-ink-mute/40")} />
                  <span className="min-w-0 text-[14px]">
                    <span className={cn("block", last ? "font-bold text-ink" : "text-ink-soft")}>{statusLabel(e.status)}</span>
                    <span className="block text-[12.5px] text-ink-mute">{date(e.created_at)}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </Card>
      )}

      {cancellable && (
        <ActionDialog
          action={orderAction}
          title="Cancelar este pedido?"
          trigger={o.status === "awaiting_fee" ? "Cancelar pedido" : "Cancelar e receber reembolso"}
          submit="Cancelar pedido"
          danger
          triggerVariant="ghost"
          triggerSize="sm"
          size="sm"
          description={o.status === "awaiting_fee" ? "O pedido será encerrado. Nenhuma cobrança foi feita." : "O pedido será encerrado e tudo o que foi pago volta para o cartão usado."}
        >
          <input type="hidden" name="action" value="cancel" />
          <input type="hidden" name="order_id" value={o.id} />
        </ActionDialog>
      )}
    </FlowShell>
  );
}
