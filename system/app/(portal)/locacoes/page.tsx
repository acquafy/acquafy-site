import { Repeat } from "lucide-react";
import { context, money, date } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { DataTable } from "@/components/live/DataTable";
import { Area, Consent, Field, Select } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { StatusPill } from "@/components/live/StatusPill";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
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
      />
      {admin && (
        <ActionForm action={leaseAction} title="Publicar locação aprovada">
          <input type="hidden" name="action" value="create" />
          <Select
            name="account_id"
            label="Conta do cliente (com acesso já provisionado)"
            options={ctx.accounts.filter((a) => a.status === "active").map((a) => ({ value: a.id, label: a.name }))}
          />
          <Field name="title" label="Título" />
          <Field name="monthly_price" label="Mensalidade total final (USD)" type="number" />
          <Field name="share_bps" label="Participação dos investidores (pontos-base: 5000 = 50%)" type="number" />
          <Field name="location" label="Endereço da instalação" maxLength={300} />
          <Area name="agreement_text" label="Texto integral aprovado" rows={8} minLength={100} maxLength={100000} />
          <Consent name="approved">Termos, preço final e participação aprovados para locação mensal com cancelamento ao fim do período pago.</Consent>
        </ActionForm>
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
                { label: "Mensalidade", value: `${money(l.monthly_minor / 100)}/mês` },
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

            <div className="mt-4 grid gap-3">
              {l.status === "offered" && (
                <>
                  {allocated ? (
                    <ActionForm bare action={leaseAction} title="Aceitar locação" submit="Aceitar locação">
                      <input type="hidden" name="action" value="accept" />
                      <input type="hidden" name="lease_id" value={l.id} />
                      <Field name="signer" label="Nome completo do signatário" autoComplete="name" />
                      <Consent name="consent">Li o acordo e autorizo a cobrança mensal recorrente no valor acima.</Consent>
                    </ActionForm>
                  ) : (
                    <Notice>Aguardando a equipe confirmar a disponibilidade e alocar o equipamento.</Notice>
                  )}
                  {admin && (
                    <ActionForm bare action={leaseAction} title="Alocar purificador do investidor" submit="Alocar unidade">
                      <input type="hidden" name="action" value="assign" />
                      <input type="hidden" name="lease_id" value={l.id} />
                      <Select
                        name="purifier_id"
                        label="Unidade disponível"
                        options={units.data.filter((u) => u.status === "available").map((u) => ({ value: u.id, label: u.serial }))}
                      />
                    </ActionForm>
                  )}
                </>
              )}
              {l.status === "accepted" && (
                <ActionForm bare action={leaseAction} title="Iniciar pagamento recorrente" submit="Abrir Stripe Checkout">
                  <input type="hidden" name="action" value="checkout" />
                  <input type="hidden" name="lease_id" value={l.id} />
                  <p className="text-[14px] text-ink-soft">Tem um cupom? Informe o código promocional na página de pagamento do Stripe.</p>
                </ActionForm>
              )}
              {l.subscription_id && (
                <>
                  <ActionForm bare action={leaseAction} title="Atualizar forma de pagamento e consultar faturas" submit="Abrir Stripe">
                    <input type="hidden" name="action" value="billing" />
                    <input type="hidden" name="lease_id" value={l.id} />
                  </ActionForm>
                  {!l.cancel_at_period_end && l.status !== "ended" && (
                    <ActionForm bare action={leaseAction} title="Cancelar ao fim do período pago" submit="Cancelar locação">
                      <input type="hidden" name="action" value="cancel" />
                      <input type="hidden" name="lease_id" value={l.id} />
                    </ActionForm>
                  )}
                </>
              )}
              {admin && l.status === "active" && !l.installed_at && (
                <ActionForm bare action={leaseAction} title="Confirmar instalação" submit="Confirmar instalação">
                  <input type="hidden" name="action" value="install" />
                  <input type="hidden" name="lease_id" value={l.id} />
                </ActionForm>
              )}
            </div>

            <section aria-label="Recebimentos" className="mt-4">
              <h3 className="mb-1 text-[15.5px] font-extrabold tracking-tight text-ink">Recebimentos</h3>
              {rows.length ? (
                <DefinitionList
                  rows={rows.map((r) => ({
                    label: `${date(r.period_start)} – ${date(r.period_end)}`,
                    value: (
                      <span className="inline-flex flex-wrap items-center justify-end gap-2">
                        {money(r.amount_minor / 100)}
                        {r.discount_minor > 0 && <span className="text-ink-soft">(desconto de {money(r.discount_minor / 100)})</span>}
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
          <DataTable
            caption="Receita de locação atribuída por fatura e unidade"
            columns={[{ heading: "Fatura" }, { heading: "Unidade", secondary: true }, { heading: "Valor", align: "right" }, { heading: "Situação" }]}
            rows={revenue.data.map((r) => [r.invoice_id, r.purifier_id, money(r.amount_minor / 100), <StatusPill key={r.invoice_id + r.purifier_id} status={r.state} />])}
            empty="Nenhuma receita de locação apurada ainda."
          />
        </>
      )}
    </>
  );
}
