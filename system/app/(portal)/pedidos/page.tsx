import { Package, Plus, ShoppingBag } from "lucide-react";
import { context, money, date } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Area, Consent, Field, Select } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { StatusPill, statusLabel } from "@/components/live/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { DefinitionList, type DefinitionRow } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { buyNow } from "@/lib/flags";
import { orderAction } from "@/lib/orders/actions";

export const metadata = { title: "Pedidos" };

export default async function Orders() {
  const ctx = await context();
  const result = await ctx.db.from("product_orders").select("*").order("created_at", { ascending: false }).limit(100);
  const history = await ctx.db.from("order_events").select("*").order("created_at", { ascending: true }).limit(2000);
  if (history.error) throw Error("Histórico indisponível.");
  if (result.error) throw Error("Pedidos indisponíveis.");
  const admin = ctx.staff === "admin";
  const canOrder = await buyNow();

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
      {!result.data.length && (
        <Card>
          <EmptyState
            icon={ShoppingBag}
            title="Nenhum pedido recebido"
            description="Quando você pedir um produto ou solicitar uma locação, ele aparece aqui com cada etapa."
            action={canOrder ? <ButtonLink href="/pedido">Fazer um pedido</ButtonLink> : undefined}
          />
        </Card>
      )}
      {result.data.map((o) => {
        const events = history.data.filter((e) => e.order_id === o.id);
        const mine = o.user_id === ctx.user.id;
        const details: DefinitionRow[] = [
          { label: "Tipo", value: o.kind === "lease" ? "Locação" : "Compra" },
          { label: "Pedido feito em", value: date(o.created_at) },
          { label: "Destinatário", value: o.delivery.name },
          { label: "Endereço de entrega", value: o.delivery.address },
          { label: "Telefone", value: o.delivery.phone },
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
              <Notice tone="success" className="mt-4" title="Proposta aceita">
                Aceita por {o.signer} em {date(o.accepted_at)}.
                <span className="mt-1 block text-[12.5px] text-ink-soft">Evidência: {o.evidence_hash}</span>
              </Notice>
            )}

            <div className="mt-4 grid gap-3">
              {admin && o.status === "requested" && (
                <ActionForm bare action={orderAction} title="Publicar proposta aprovada">
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
                </ActionForm>
              )}
              {mine && o.kind === "purchase" && o.status === "quoted" && (
                <ActionForm bare action={orderAction} title="Aceitar proposta" submit="Aceitar proposta">
                  <input type="hidden" name="action" value="accept" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Field name="signer" label="Nome completo do signatário" autoComplete="name" />
                  <Consent name="consent">Li e aceito o pedido, o preço final e as condições acima.</Consent>
                </ActionForm>
              )}
              {mine && o.kind === "purchase" && o.status === "accepted" && (
                <ActionForm bare action={orderAction} title="Pagar pedido" submit="Abrir pagamento seguro Stripe">
                  <input type="hidden" name="action" value="checkout" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <p className="text-[14px] text-ink-soft">Tem um cupom? Informe o código promocional na página de pagamento do Stripe.</p>
                </ActionForm>
              )}
              {o.lease_id && (
                <div>
                  <ButtonLink href="/locacoes" variant="outline">
                    Ver acordo de locação, pagamento e instalação
                  </ButtonLink>
                </div>
              )}
              {mine && ["requested", "quoted", "accepted"].includes(o.status) && !o.checkout_id && !o.lease_id && (
                <ActionForm bare action={orderAction} title="Cancelar solicitação" submit="Cancelar solicitação">
                  <input type="hidden" name="action" value="cancel" />
                  <input type="hidden" name="order_id" value={o.id} />
                </ActionForm>
              )}
              {admin && ["paid", "processing", "shipped", "installed"].includes(o.status) && (
                <ActionForm bare action={orderAction} title="Atualizar entrega" submit="Atualizar entrega">
                  <input type="hidden" name="action" value="fulfill" />
                  <input type="hidden" name="order_id" value={o.id} />
                  <Select
                    name="status"
                    label="Etapa"
                    options={["processing", "shipped", "installed", "completed"].map((value) => ({ value, label: statusLabel(value) }))}
                  />
                  <Field name="tracking_reference" label="Transportadora e referência de rastreamento" required={false} maxLength={300} />
                </ActionForm>
              )}
            </div>
          </Card>
        );
      })}
    </>
  );
}
