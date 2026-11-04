import { context, money, date } from "@/lib/live/data";
import { ActionForm } from "@/components/enrollment/ActionForm";
import { Field, Select } from "@/components/live/Fields";
import { leaseAction } from "@/lib/leases/actions";
export const metadata = { title: "Locações" };
export default async function Leases() {
  const ctx = await context();
  const [leases, units, revenue, receipts] = await Promise.all([
    ctx.db
      .from("customer_leases")
      .select("*")
      .order("created_at", { ascending: false }),
    ctx.db.from("purifiers").select("id,serial,status"),
    ctx.db.from("lease_revenue").select("*"),
    ctx.db.from("lease_receipts").select("*"),
  ]);
  if (leases.error || units.error || revenue.error || receipts.error)
    throw Error("Não foi possível carregar as locações.");
  return (
    <>
      <h1>Locações</h1>
      <p>
        Locação mensal recorrente em USD, sem transferência de propriedade.
        Cancelamento no fim do período pago. A instalação é confirmada pela
        equipe após pagamento.
      </p>
      {ctx.staff === "admin" && (
        <ActionForm action={leaseAction} title="Publicar locação aprovada">
          <input type="hidden" name="action" value="create" />
          <Select
            name="account_id"
            label="Conta do cliente (com acesso já provisionado)"
            options={ctx.accounts
              .filter((a) => a.status === "active")
              .map((a) => ({ value: a.id, label: a.name }))}
          />
          <Field name="title" label="Título" />
          <Field
            name="monthly_price"
            label="Mensalidade total final (USD)"
            type="number"
          />
          <Field
            name="share_bps"
            label="Participação dos investidores (pontos-base: 5000 = 50%)"
            type="number"
          />
          <Field
            name="location"
            label="Endereço da instalação"
            maxLength={300}
          />
          <label>
            Texto integral aprovado
            <textarea
              required
              name="agreement_text"
              minLength={100}
              maxLength={100000}
              rows={8}
            />
          </label>
          <label>
            <input required type="checkbox" name="approved" value="yes" />{" "}
            Termos, preço final e participação aprovados para locação mensal com
            cancelamento ao fim do período pago.
          </label>
        </ActionForm>
      )}
      {leases.data.map((l) => (
        <section key={l.id} className="live-card">
          <h2>{l.title}</h2>
          <p>
            {l.status} · {money(l.monthly_minor / 100)}/mês · {l.location}
          </p>
          <p style={{ whiteSpace: "pre-wrap" }}>{l.agreement_text}</p>
          {l.accepted_at && (
            <p>
              Aceito por {l.signer} em {date(l.accepted_at)} · Evidência
              SHA-256: {l.evidence_hash}
            </p>
          )}
          {l.status === "offered" && (
            <>
              <ActionForm action={leaseAction} title="Aceitar locação">
                <input type="hidden" name="action" value="accept" />
                <input type="hidden" name="lease_id" value={l.id} />
                <Field name="signer" label="Nome completo do signatário" />
                <label>
                  <input required type="checkbox" name="consent" value="yes" />{" "}
                  Li o acordo e autorizo a cobrança mensal recorrente no valor
                  acima.
                </label>
              </ActionForm>
              {ctx.staff === "admin" && (
                <ActionForm
                  action={leaseAction}
                  title="Alocar purificador do investidor"
                >
                  <input type="hidden" name="action" value="assign" />
                  <input type="hidden" name="lease_id" value={l.id} />
                  <Select
                    name="purifier_id"
                    label="Unidade disponível"
                    options={units.data
                      .filter((u) => u.status === "available")
                      .map((u) => ({ value: u.id, label: u.serial }))}
                  />
                </ActionForm>
              )}
            </>
          )}
          {l.status === "accepted" && (
            <ActionForm
              action={leaseAction}
              title="Iniciar pagamento recorrente"
              submit="Abrir Stripe Checkout"
            >
              <input type="hidden" name="action" value="checkout" />
              <input type="hidden" name="lease_id" value={l.id} />
            </ActionForm>
          )}
          {l.subscription_id && (
            <>
              <ActionForm
                action={leaseAction}
                title="Atualizar forma de pagamento e consultar faturas"
                submit="Abrir Stripe"
              >
                <input type="hidden" name="action" value="billing" />
                <input type="hidden" name="lease_id" value={l.id} />
              </ActionForm>
              {!l.cancel_at_period_end && l.status !== "ended" && (
                <ActionForm
                  action={leaseAction}
                  title="Cancelar ao fim do período pago"
                >
                  <input type="hidden" name="action" value="cancel" />
                  <input type="hidden" name="lease_id" value={l.id} />
                </ActionForm>
              )}
            </>
          )}
          {l.cancel_at_period_end && (
            <p>Cancelamento programado no Stripe para o fim do período pago.</p>
          )}
          {ctx.staff === "admin" &&
            l.status === "active" &&
            !l.installed_at && (
              <ActionForm action={leaseAction} title="Confirmar instalação">
                <input type="hidden" name="action" value="install" />
                <input type="hidden" name="lease_id" value={l.id} />
              </ActionForm>
            )}
          <h3>Recebimentos</h3>
          {receipts.data
            .filter((r) => r.lease_id === l.id)
            .map((r) => (
              <p key={r.invoice_id}>
                {date(r.period_start)} – {date(r.period_end)} ·{" "}
                {money(r.amount_minor / 100)} · {r.state}
              </p>
            ))}
        </section>
      ))}
      <section className="live-card">
        <h2>Receita atribuída aos investidores</h2>
        <p>
          Apuração por unidade sobre mensalidades verificadas. Valores em
          análise não estão disponíveis para repasse. A liquidação dos repasses
          é controlada pela equipe.
        </p>
        {revenue.data.map((r) => (
          <p key={r.invoice_id + r.purifier_id}>
            Fatura {r.invoice_id} · unidade {r.purifier_id} ·{" "}
            {money(r.amount_minor / 100)} · {r.state}
          </p>
        ))}
      </section>
    </>
  );
}
