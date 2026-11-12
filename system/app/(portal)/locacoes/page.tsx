import { CreditCard, Plus, Repeat, Wrench } from "lucide-react";
import { context, date } from "@/lib/live/data";
import { formatMinor, type OrderCurrency } from "@/lib/orders/pricing";
import { ActionDialog } from "@/components/enrollment/ActionDialog";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { DataTable } from "@/components/live/DataTable";
import { Area, Consent, Field, Select } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { StatusPill } from "@/components/live/StatusPill";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { FormDialog } from "@/components/ui/FormDialog";
import { leaseAction } from "@/lib/leases/actions";

export const metadata = { title: "Locações" };

export default async function Leases() {
  const ctx = await context();
  const [leases, units, revenue, receipts, assignments] = await Promise.all([
    ctx.db.from("customer_leases").select("*").order("created_at", { ascending: false }),
    ctx.db.from("purifiers").select("id,serial,status"),
    ctx.db.from("lease_revenue").select("*"),
    ctx.db.from("lease_receipts").select("*"),
    ctx.db.from("lease_units").select("lease_id,purifier_id"),
  ]);
  if (leases.error || units.error || revenue.error || receipts.error || assignments.error) throw Error("Não foi possível carregar as locações.");
  const admin = ctx.staff === "admin";

  return (
    <>
      <PageHeader
        title="Locações"
        subtitle="Locação mensal recorrente em USD, sem transferência de propriedade. Cancelamento no fim do período pago. A instalação é confirmada pela equipe após pagamento."
        action={
          admin && (
            <FormDialog trigger="Publicar locação" icon={<Plus className="size-5" aria-hidden="true" />} title="Publicar locação aprovada" description="A locação fica disponível para a conta do cliente aceitar e pagar." dialogSize="lg">
              <ActionForm action={leaseAction} title="Publicar locação aprovada" submit="Publicar locação">
                <input type="hidden" name="action" value="create" />
                <Select
                  name="account_id"
                  label="Conta do cliente (com acesso já provisionado)"
                  options={ctx.accounts.filter((a) => a.status === "active").map((a) => ({ value: a.id, label: a.name }))}
                />
                <Field name="title" label="Título" />
                <div className="grid gap-3.5 sm:grid-cols-2">
                  <Field name="monthly_price" label="Mensalidade total final (USD)" type="number" />
                  <Field name="share_bps" label="Participação dos investidores (5000 = 50%)" type="number" />
                </div>
                <Field name="location" label="Endereço da instalação" maxLength={300} />
                <Area name="agreement_text" label="Texto integral aprovado" rows={8} minLength={100} maxLength={100000} />
                <Consent name="approved">Termos, preço final e participação aprovados para locação mensal com cancelamento ao fim do período pago.</Consent>
              </ActionForm>
            </FormDialog>
          )
        }
      />
      {!leases.data.length && admin && (
        <Card>
          <EmptyState icon={Repeat} title="Nenhuma locação publicada" description="Use “Publicar locação” para oferecer uma locação aprovada a uma conta de cliente." />
        </Card>
      )}
      {!leases.data.length && !admin && (
        <Card>
          <EmptyState icon={Repeat} title="Nenhuma locação por aqui" description="Quando uma proposta de locação for aprovada pela equipe, o acordo, o pagamento e a instalação aparecem nesta tela." />
        </Card>
      )}
      {leases.data.map((l) => {
        const rows = receipts.data.filter((r) => r.lease_id === l.id);
        const allocated = assignments.data.some((u) => u.lease_id === l.id);
        return (
          <Card key={l.id} title={l.title} action={<StatusPill status={l.status} />}>
            <DefinitionList
              rows={[
                ...(admin ? [{ label: "Conta", value: ctx.accounts.find((a) => a.id === l.account_id)?.name ?? l.account_id }] : []),
                { label: "Mensalidade", value: `${formatMinor(l.monthly_minor, l.currency as OrderCurrency)}/mês` },
                { label: "Endereço da instalação", value: l.location },
                ...(l.installed_at ? [{ label: "Instalação confirmada em", value: date(l.installed_at) }] : []),
              ]}
            />
            <details className="group mt-3 rounded-xl bg-canvas/60 p-4">
              <summary className="cursor-pointer text-[14.5px] font-bold text-ink focus-visible:outline-2 focus-visible:outline-brand">Acordo de locação</summary>
              <p className="mt-3 text-[14.5px] whitespace-pre-wrap text-ink [overflow-wrap:anywhere]">{l.agreement_text}</p>
            </details>
            {l.accepted_at && (
              <Notice tone="success" className="mt-3" title="Acordo aceito">
                Aceito por {l.signer} em {date(l.accepted_at)}.
                <span className="mt-1 block text-[12.5px] text-ink-soft">Evidência SHA-256: {l.evidence_hash}</span>
              </Notice>
            )}
            {l.cancel_at_period_end && (
              <Notice tone="warn" className="mt-3">
                Cancelamento programado no Stripe para o fim do período pago.
              </Notice>
            )}

            <LeaseActions lease={l} allocated={allocated} admin={admin} units={units.data} />

            <section aria-label="Recebimentos" className="mt-4">
              <h3 className="mb-1 text-[15.5px] font-extrabold tracking-tight text-ink">Recebimentos</h3>
              {rows.length ? (
                <DefinitionList
                  rows={rows.map((r) => ({
                    label: `${date(r.period_start)} – ${date(r.period_end)}`,
                    value: (
                      <span className="inline-flex flex-wrap items-center justify-end gap-2">
                        {formatMinor(r.amount_minor, r.currency as OrderCurrency)}
                        {r.discount_minor > 0 && <span className="text-ink-soft">(desconto de {formatMinor(r.discount_minor, r.currency as OrderCurrency)})</span>}
                        <StatusPill status={r.state} />
                      </span>
                    ),
                  }))}
                />
              ) : (
                <p className="text-[14.5px] text-ink-soft">Nenhuma cobrança registrada ainda.</p>
              )}
            </section>
          </Card>
        );
      })}
      {ctx.user.app_metadata.portal_role !== "customer" && (
        <>
          <Notice title="Receita atribuída aos investidores">
            Apuração por unidade sobre mensalidades verificadas. Valores em análise não estão disponíveis para repasse. A liquidação dos repasses é controlada pela equipe.
          </Notice>
          {revenue.data.length > 0 && (
            <DataTable
              caption="Receita de locação atribuída por fatura e unidade"
              columns={[{ heading: "Fatura" }, { heading: "Unidade", secondary: true }, { heading: "Valor", align: "right" }, { heading: "Situação" }]}
              rows={revenue.data.map((r) => [r.invoice_id, r.purifier_id, formatMinor(r.amount_minor, r.currency as OrderCurrency), <StatusPill key={r.invoice_id + r.purifier_id} status={r.state} />])}
              empty="Nenhuma receita de locação apurada ainda."
            />
          )}
        </>
      )}
    </>
  );
}

type LeaseRow = { id: string; status: string; subscription_id: string | null; cancel_at_period_end: boolean; installed_at: string | null };

/** What the person looking at a lease can do next: each step opens a dialog, destructive ones ask for confirmation. */
function LeaseActions({ lease: l, allocated, admin, units }: { lease: LeaseRow; allocated: boolean; admin: boolean; units: { id: string; serial: string; status: string }[] }) {
  const hidden = <input type="hidden" name="lease_id" value={l.id} />;
  const buttons = [
    l.status === "offered" && allocated && (
      <ActionDialog key="accept" action={leaseAction} title="Aceitar locação" trigger="Aceitar locação" triggerVariant="primary" triggerSize="md" description="Leia o acordo acima antes de confirmar. O aceite autoriza a cobrança mensal recorrente.">
        <input type="hidden" name="action" value="accept" />
        {hidden}
        <Field name="signer" label="Nome completo do signatário" autoComplete="name" />
        <Consent name="consent">Li o acordo e autorizo a cobrança mensal recorrente no valor acima.</Consent>
      </ActionDialog>
    ),
    l.status === "offered" && admin && (
      <ActionDialog key="assign" action={leaseAction} title="Alocar purificador do investidor" trigger="Alocar unidade" triggerSize="md" size="sm">
        <input type="hidden" name="action" value="assign" />
        {hidden}
        <Select
          name="purifier_id"
          label="Unidade disponível"
          options={units.filter((u) => u.status === "available").map((u) => ({ value: u.id, label: u.serial }))}
        />
      </ActionDialog>
    ),
    l.status === "accepted" && (
      <ActionDialog key="checkout" action={leaseAction} title="Iniciar pagamento recorrente" trigger="Pagar no Stripe" icon={<CreditCard className="size-4" aria-hidden="true" />} submit="Abrir Stripe Checkout" triggerVariant="primary" triggerSize="md" description="Você será levado à página segura do Stripe para concluir a assinatura mensal." size="sm">
        <input type="hidden" name="action" value="checkout" />
        {hidden}
        <p className="text-[14px] text-ink-soft">Tem um cupom? Informe o código promocional na página de pagamento do Stripe.</p>
      </ActionDialog>
    ),
    l.subscription_id && (
      <ActionDialog key="billing" action={leaseAction} title="Forma de pagamento e faturas" trigger="Forma de pagamento e faturas" icon={<CreditCard className="size-4" aria-hidden="true" />} submit="Abrir Stripe" triggerSize="md" description="Atualize a forma de pagamento e consulte as faturas no portal seguro do Stripe." size="sm">
        <input type="hidden" name="action" value="billing" />
        {hidden}
      </ActionDialog>
    ),
    admin && l.status === "active" && !l.installed_at && (
      <ActionDialog key="install" action={leaseAction} title="Confirmar instalação" trigger="Confirmar instalação" icon={<Wrench className="size-4" aria-hidden="true" />} triggerSize="md" description="Registre que a equipe concluiu a instalação do equipamento no endereço da locação." size="sm">
        <input type="hidden" name="action" value="install" />
        {hidden}
      </ActionDialog>
    ),
    l.subscription_id && !l.cancel_at_period_end && l.status !== "ended" && (
      <ActionDialog key="cancel" action={leaseAction} title="Cancelar ao fim do período pago?" trigger="Cancelar locação" submit="Cancelar locação" danger triggerSize="md" description="A locação segue ativa até o fim do período já pago e não será renovada." size="sm">
        <input type="hidden" name="action" value="cancel" />
        {hidden}
      </ActionDialog>
    ),
  ].filter(Boolean);
  return (
    <>
      {l.status === "offered" && !allocated && <Notice className="mt-4">Aguardando a equipe confirmar a disponibilidade e alocar o equipamento.</Notice>}
      {buttons.length > 0 && <div className="mt-4 flex flex-wrap gap-3">{buttons}</div>}
    </>
  );
}
