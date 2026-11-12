import { Package, Plus, ShoppingBag } from "lucide-react";
import { context, money, date } from "@/lib/live/data";
import { orderStageCounts, userEmails } from "@/lib/live/admin";
import { orderStages, pageNumber, stageFor } from "@/lib/live/admin-view";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { Area, Consent, Field, Select } from "@/components/live/Fields";
import { FilterTabs } from "@/components/live/FilterTabs";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { Pager } from "@/components/live/PortalPage";
import { StatusPill, statusLabel } from "@/components/live/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DefinitionList, type DefinitionRow } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { buyNow } from "@/lib/flags";
import { orderAction } from "@/lib/orders/actions";
import { formatMinor, type OrderCurrency } from "@/lib/orders/pricing";

type Payment = { id: string; order_id: string; kind: "fee" | "balance"; status: string; amount_minor: number; paid_minor: number | null; discount_minor: number };
const PAYMENT_STATUS: Record<string, string> = {
  open: "a pagar",
  failed: "pagamento recusado · tente de novo",
  paid: "pago",
  refunding: "reembolso solicitado",
  refunded: "reembolsado",
  void: "cancelada",
  review: "em análise",
};

export const metadata = { title: "Pedidos" };

export default async function Orders({ searchParams }: { searchParams: Promise<{ etapa?: string; page?: string; pedido?: string }> }) {
  const ctx = await context();
  const query = await searchParams;
  const admin = ctx.staff === "admin";
  // Only administrators see other people's orders, so only they have enough volume to filter and page.
  const stage = admin ? stageFor(orderStages, query.etapa) : undefined;
  const page = admin ? pageNumber(query.page) : 0;
  const size = admin ? 50 : 100;
  let list = ctx.db.from("product_orders").select("*", { count: "exact" });
  if (stage) list = list.in("status", stage.statuses);
  const result = await list.order("created_at", { ascending: false }).order("id").range(page * size, page * size + size - 1);
  if (result.error) throw Error("Pedidos indisponíveis.");
  const history = await ctx.db.from("order_events").select("*").in("order_id", result.data.map((o) => o.id)).order("created_at", { ascending: true }).limit(2000);
  if (history.error) throw Error("Histórico indisponível.");
  const [paymentRows, settings] = await Promise.all([
    ctx.db.from("order_payments").select("*").in("order_id", result.data.map((o) => o.id)),
    ctx.db.from("order_settings").select("withdrawal_days").single(),
  ]);
  if (paymentRows.error || settings.error) throw Error("Pagamentos indisponíveis.");
  const payments = paymentRows.data as Payment[];
  const withdrawalDays: number = settings.data.withdrawal_days;
  // Rendering happens per request; the withdrawal window is measured from now.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const returned = result.data.find((o) => o.id === query.pedido);
  const canOrder = await buyNow();
  const [counts, emails] = admin ? await Promise.all([orderStageCounts(), userEmails(result.data.map((o) => o.user_id))]) : [{}, new Map<string, string>()];
  const stageCounts = counts as Record<string, number>;

  return (
    <>
      <PageHeader
        title={admin ? "Gestão de pedidos" : "Meus pedidos"}
        subtitle="Acompanhe propostas, pagamento, entrega e instalação de cada pedido."
        action={
          canOrder && (
            <ButtonLink href="/pedido">
              <Plus className="size-5" aria-hidden="true" />
              Novo pedido
            </ButtonLink>
          )
        }
      />
      {admin && (
        <FilterTabs
          label="Filtrar por etapa"
          tabs={[
            { href: "/pedidos", label: "Todos", active: !stage },
            ...orderStages.map((s) => ({ href: "/pedidos?etapa=" + s.key, label: s.label, count: stageCounts[s.key], active: s.key === stage?.key })),
          ]}
        />
      )}
      {returned && (
        <Notice tone="success" title={`Pedido ${returned.id.slice(0, 8).toUpperCase()}`}>
          Se você concluiu o pagamento, a confirmação aparece aqui em instantes. Atualize a página se o status não mudar.
        </Notice>
      )}
      {!result.data.length && (
        <Card>
          <EmptyState
            icon={ShoppingBag}
            title={stage ? "Nenhum pedido nesta etapa" : "Nenhum pedido recebido"}
            description={admin ? "Pedidos de todas as contas aparecem aqui com cada etapa." : "Quando você pedir um produto ou solicitar uma locação, ele aparece aqui com cada etapa."}
            action={canOrder && !admin ? <ButtonLink href="/pedido">Fazer um pedido</ButtonLink> : undefined}
          />
        </Card>
      )}
      {result.data.map((o) => {
        const events = history.data.filter((e) => e.order_id === o.id);
        const mine = o.user_id === ctx.user.id;
        const fixed = o.flow === "fixed";
        const currency = o.currency as OrderCurrency;
        const fee = payments.find((p) => p.order_id === o.id && p.kind === "fee");
        const balance = payments.find((p) => p.order_id === o.id && p.kind === "balance");
        const balanceSettled = !!balance && !["open", "failed"].includes(balance.status);
        const inWithdrawal = !!o.placed_at && now - new Date(o.placed_at).getTime() < withdrawalDays * 86400000;
        const customerCancel = fixed && mine && !balanceSettled && (o.status === "awaiting_fee" || (["placed", "confirmed"].includes(o.status) && inWithdrawal));
        const adminCancel = fixed && admin && !balanceSettled && ["awaiting_fee", "placed", "confirmed"].includes(o.status);
        const details: DefinitionRow[] = [
          ...(admin
            ? [
                { label: "Conta", value: ctx.accounts.find((a) => a.id === o.account_id)?.name ?? o.account_id },
                { label: "Cliente", value: emails.get(o.user_id) ?? "E-mail indisponível" },
              ]
            : []),
          { label: "Tipo", value: o.kind === "lease" ? "Locação" : "Compra" },
          { label: "Pedido feito em", value: date(o.created_at) },
          { label: "Destinatário", value: o.delivery.name },
          { label: "Endereço de entrega", value: o.delivery.address },
          { label: "Telefone", value: o.delivery.phone },
          ...(o.delivery_estimate ? [{ label: "Entrega prevista", value: o.delivery_estimate }] : []),
          ...(o.tracking_reference ? [{ label: "Transportadora / rastreamento", value: o.tracking_reference }] : []),
        ];
        return (
          <Card key={o.id} title={`Pedido ${o.id.slice(0, 8).toUpperCase()}`} action={<StatusPill status={o.status} />}>
            <ul className="mb-3 grid gap-2">
              {(o.items as { title: string; quantity: number; color?: string }[]).map((i, n) => (
                <li key={n} className="flex items-center gap-3 rounded-xl bg-canvas/60 p-3">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Package className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1 text-[15px] font-bold text-ink">
                    {i.title}
                    {i.color && <span className="font-medium text-ink-soft"> · {i.color}</span>}
                  </span>
                  <Badge>× {i.quantity}</Badge>
                </li>
              ))}
            </ul>
            <DefinitionList rows={details} />

            {fixed && (
              <section aria-label="Preço do pedido" className="mt-4 rounded-xl bg-brand-soft p-4">
                <p className="text-[13.5px] font-semibold text-brand">{o.kind === "lease" ? "Mensalidade" : "Preço do pedido"}</p>
                <p className="tabular text-[26px] leading-tight font-extrabold tracking-tight text-ink">
                  {formatMinor(o.total_minor, currency)}
                  {o.kind === "lease" && <span className="text-[15px] font-semibold text-ink-soft"> /mês</span>}
                </p>
                <dl className="mt-2 grid gap-1 text-[14.5px]">
                  {[
                    { label: "Taxa do pedido", payment: fee },
                    ...(o.kind === "purchase" ? [{ label: "Saldo", payment: balance }] : []),
                  ].map(({ label, payment }) => (
                    <div key={label} className="flex flex-wrap justify-between gap-x-4">
                      <dt className="text-ink-soft">{label}</dt>
                      <dd className="tabular font-semibold text-ink">
                        {payment
                          ? `${formatMinor(payment.amount_minor, currency)} · ${PAYMENT_STATUS[payment.status] ?? payment.status}${payment.discount_minor > 0 && payment.paid_minor !== null ? ` (pago ${formatMinor(payment.paid_minor, currency)} com cupom)` : ""}`
                          : `${formatMinor(o.total_minor - (o.fee_minor ?? 0), currency)} · após a confirmação`}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {o.quote_text && (
              <section aria-label="Proposta final" className="mt-4 rounded-xl bg-violet-soft p-4">
                <p className="text-[13.5px] font-semibold text-violet">Proposta final</p>
                <p className="tabular text-[26px] leading-tight font-extrabold tracking-tight text-ink">
                  {money(o.total_minor / 100)}
                  {o.kind === "lease" && <span className="text-[15px] font-semibold text-ink-soft"> /mês</span>}
                </p>
                {o.discount_minor > 0 && o.paid_minor !== null && (
                  <p className="mt-1 text-[14.5px] font-semibold text-ink">
                    Pago com cupom: {money(o.paid_minor / 100)} (desconto de {money(o.discount_minor / 100)})
                  </p>
                )}
                <p className="mt-2 text-[14.5px] whitespace-pre-wrap text-ink [overflow-wrap:anywhere]">{o.quote_text}</p>
              </section>
            )}

            {events.length > 0 && (
              <section aria-label="Acompanhamento" className="mt-4">
                <h3 className="mb-2 text-[15.5px] font-extrabold tracking-tight text-ink">Acompanhamento</h3>
                <ol className="grid gap-0">
                  {events.map((e, n) => {
                    const last = n === events.length - 1;
                    return (
                      <li key={e.id} className="relative flex gap-3 pb-3 last:pb-0">
                        {!last && <span aria-hidden="true" className="absolute top-4 bottom-0 left-[0.4375rem] w-px bg-line" />}
                        <span aria-hidden="true" className={cn("mt-1 size-3.5 shrink-0 rounded-full", last ? "bg-brand ring-4 ring-brand-soft" : "bg-ink-mute/40")} />
                        <span className="min-w-0 text-[14.5px]">
                          <span className={cn("block", last ? "font-bold text-ink" : "text-ink-soft")}>{statusLabel(e.status)}</span>
                          <span className="block text-[13px] text-ink-mute">{date(e.created_at)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </section>
            )}

            {o.accepted_at && (
              <Notice tone="success" className="mt-4" title={fixed ? "Termos do pedido aceitos" : "Proposta aceita"}>
                Aceita por {o.signer} em {date(o.accepted_at)}.
                <span className="mt-1 block text-[12.5px] text-ink-soft">Evidência: {o.evidence_hash}</span>
              </Notice>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {admin && o.status === "requested" && (
                <ActionDialog action={orderAction} title="Publicar proposta aprovada" trigger="Publicar proposta" submit="Publicar proposta" triggerVariant="primary" triggerSize="md" size="lg" description="O cliente recebe o valor e as condições abaixo para aceitar.">
                  <input type="hidden" name="action" value="quote" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Field
                    name="price"
                    label={o.kind === "lease" ? "Mensalidade total final (USD)" : "Total final com frete e tributos (USD)"}
                    type="number"
                  />
                  {o.kind === "lease" && <Field name="share_bps" label="Participação dos investidores (5000 = 50%)" type="number" />}
                  <Area
                    name="quote_text"
                    label="Condições aprovadas: disponibilidade, frete, tributos, entrega, instalação, cancelamento e devolução"
                    rows={8}
                    minLength={100}
                    maxLength={100000}
                  />
                  <Consent name="approved">Confirmo aprovação dos preços e das condições.</Consent>
                </ActionDialog>
              )}
              {mine && o.kind === "purchase" && o.status === "quoted" && (
                <ActionDialog action={orderAction} title="Aceitar proposta" trigger="Aceitar proposta" triggerVariant="primary" triggerSize="md" description="Confira o preço final e as condições da proposta antes de aceitar.">
                  <input type="hidden" name="action" value="accept" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Field name="signer" label="Nome completo do signatário" autoComplete="name" />
                  <Consent name="consent">Li e aceito o pedido, o preço final e as condições acima.</Consent>
                </ActionDialog>
              )}
              {mine && o.kind === "purchase" && o.status === "accepted" && (
                <ActionDialog action={orderAction} title="Pagar pedido" trigger="Pagar pedido" submit="Abrir pagamento seguro Stripe" triggerVariant="primary" triggerSize="md" size="sm" description="Você será levado à página segura do Stripe para concluir o pagamento.">
                  <input type="hidden" name="action" value="checkout" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <p className="text-[14px] text-ink-soft">Tem um cupom? Informe o código promocional na página de pagamento do Stripe.</p>
                </ActionDialog>
              )}
              {mine && fixed && fee && o.status === "awaiting_fee" && (
                <ActionDialog action={orderAction} title="Pagar taxa do pedido" trigger="Pagar taxa do pedido" submit="Abrir pagamento seguro Stripe" triggerVariant="primary" triggerSize="md" size="sm" description="A taxa confirma seu pedido. Você será levado ao Stripe para pagar com cartão.">
                  <input type="hidden" name="action" value="pay" />
                  <input type="hidden" name="payment_id" value={fee.id} />
                  <p className="text-[14px] text-ink-soft">Taxa de {formatMinor(fee.amount_minor, currency)}, abatida do total.</p>
                </ActionDialog>
              )}
              {mine && fixed && balance && o.status === "confirmed" && ["open", "failed"].includes(balance.status) && (
                <ActionDialog action={orderAction} title="Pagar saldo" trigger={`Pagar saldo de ${formatMinor(balance.amount_minor, currency)}`} submit="Abrir pagamento seguro Stripe" triggerVariant="primary" triggerSize="md" size="sm" description="Pagamento do saldo do pedido antes da entrega.">
                  <input type="hidden" name="action" value="pay" />
                  <input type="hidden" name="payment_id" value={balance.id} />
                  <p className="text-[14px] text-ink-soft">Tem um cupom? Informe o código promocional na página de pagamento do Stripe.</p>
                </ActionDialog>
              )}
              {admin && fixed && o.status === "placed" && (
                <ActionDialog action={orderAction} title="Confirmar pedido" trigger="Confirmar pedido" submit="Confirmar pedido" triggerVariant="primary" triggerSize="md" size="lg" description={o.kind === "lease" ? "Confirme disponibilidade e prazo. A locação é criada com a mensalidade de catálogo; depois atribua as unidades em Locações." : "Confirme disponibilidade e prazo. O cliente passa a poder pagar o saldo."}>
                  <input type="hidden" name="action" value="confirm" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Field name="delivery_estimate" label="Entrega prevista (ex.: até 20/12/2026)" minLength={3} maxLength={200} />
                  {o.kind === "lease" && (
                    <>
                      <Field name="share_bps" label="Participação dos investidores (5000 = 50%)" type="number" />
                      <Area name="agreement_text" label="Termos do acordo de locação" rows={8} minLength={100} maxLength={100000} />
                    </>
                  )}
                </ActionDialog>
              )}
              {(customerCancel || adminCancel) && (
                <ActionDialog action={orderAction} title="Cancelar este pedido?" trigger={o.status === "awaiting_fee" ? "Cancelar pedido" : "Cancelar e devolver a taxa"} submit="Cancelar pedido" danger triggerSize="md" size="sm" description={o.status === "awaiting_fee" ? "O pedido será encerrado. Nenhuma cobrança foi feita." : "O pedido será encerrado e a taxa devolvida ao cartão usado."}>
                  <input type="hidden" name="action" value="cancel" />
                  <input type="hidden" name="order_id" value={o.id} />
                </ActionDialog>
              )}
              {o.lease_id && (
                <ButtonLink href="/locacoes" variant="outline">
                  Ver acordo de locação, pagamento e instalação
                </ButtonLink>
              )}
              {admin && ["paid", "processing", "shipped", "installed"].includes(o.status) && (
                <ActionDialog action={orderAction} title="Atualizar entrega" trigger="Atualizar entrega" triggerSize="md" size="sm">
                  <input type="hidden" name="action" value="fulfill" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Select
                    name="status"
                    label="Etapa"
                    options={["processing", "shipped", "installed", "completed"].map((value) => ({ value, label: statusLabel(value) }))}
                  />
                  <Field name="tracking_reference" label="Transportadora e referência de rastreamento" required={false} maxLength={300} />
                </ActionDialog>
              )}
              {mine && ["requested", "quoted", "accepted"].includes(o.status) && !o.checkout_id && !o.lease_id && (
                <ActionDialog action={orderAction} title="Cancelar esta solicitação?" trigger="Cancelar solicitação" submit="Cancelar solicitação" danger triggerSize="md" size="sm" description="O pedido será encerrado e não poderá ser retomado. Você pode fazer um novo pedido depois.">
                  <input type="hidden" name="action" value="cancel" />
                  <input type="hidden" name="order_id" value={o.id} />
                </ActionDialog>
              )}
            </div>
          </Card>
        );
      })}
      {admin && <Pager page={page} count={result.count ?? 0} path={stage ? "/pedidos?etapa=" + stage.key : "/pedidos"} />}
    </>
  );
}
