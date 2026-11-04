import { notFound } from "next/navigation";
import {
  context,
  records,
  date,
  money,
  labels,
  type Contract,
  type Unit,
  type Payout,
} from "@/lib/live/data";
import { adminAction, uploadDocument } from "@/lib/live/actions";
import { Form, Field, Select } from "@/components/live/Fields";
import { Notice, type Query } from "@/components/live/PortalPage";
const opts = (values: string[]) =>
  values.map((value) => ({ value, label: labels[value] ?? value }));
export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const ctx = await context();
  if (ctx.staff !== "admin") notFound();
  const account = ctx.account;
  const [contracts, units, payouts] = account
    ? await Promise.all([
        records<Contract>("contracts", account.id),
        records<Unit>("purifiers", account.id),
        records<Payout>("payouts", account.id),
      ])
    : [{ rows: [] }, { rows: [] }, { rows: [] }];
  const contractOptions = contracts.rows.map((c) => ({
    value: c.id,
    label: `${c.number} · ${c.title}`,
  }));
  const { data: audit, error: auditError } = await ctx.db
    .from("audit_events")
    .select("id,entity,operation,created_at")
    .order("id", { ascending: false })
    .limit(20);
  if (auditError) throw new Error("Não foi possível carregar a auditoria.");
  return (
    <>
      <h1>Administração</h1>
      <p className="live-muted">
        Cadastre somente registros reais e conferidos. Nenhuma transferência é
        executada aqui.
      </p>
      <Notice query={await searchParams} />
      <div className="live-grid">
        <Form action={adminAction} kind="account" title="Criar conta">
          <Field name="name" label="Nome da pessoa ou empresa" />
        </Form>
      </div>
      {account && (
        <>
          <h2 className="mt-8">Conta selecionada: {account.name}</h2>
          <div className="live-grid">
            <Form
              action={adminAction}
              kind="membership"
              account={account.id}
              title="Vincular ou revogar membro"
            >
              <Field
                name="email"
                label="E-mail de usuário já aprovado no Auth"
                type="email"
              />
              <Select
                name="role"
                label="Papel"
                options={[
                  { value: "viewer", label: "Leitura e suporte" },
                  { value: "owner", label: "Representante da conta" },
                ]}
              />
              <Select
                name="active"
                label="Acesso"
                options={[
                  { value: "true", label: "Ativo" },
                  { value: "false", label: "Revogado" },
                ]}
              />
              <p className="live-muted">
                O usuário deve existir no Supabase Auth, ter e-mail confirmado e
                portal_role atribuído pelo administrador. Esta ação não cria
                identidade nem envia e-mail.
              </p>
            </Form>
            <Form
              action={adminAction}
              kind="account_status"
              account={account.id}
              title="Situação da conta"
            >
              <Select
                name="status"
                label="Situação"
                options={[
                  { value: "active", label: "Ativa" },
                  { value: "suspended", label: "Suspensa (bloqueia membros)" },
                ]}
              />
            </Form>
            <Form
              action={adminAction}
              kind="contract"
              account={account.id}
              title="Cadastrar contrato"
            >
              <Field name="number" label="Número único" maxLength={80} />
              <Field name="title" label="Título" maxLength={200} />
              <Select
                name="status"
                label="Situação"
                options={opts(["draft", "active", "ended"])}
              />
              <Field name="starts_on" label="Início" type="date" />
              <Field name="ends_on" label="Término" type="date" />
              <Field
                name="invested_amount"
                label="Investimento registrado (USD)"
                type="number"
              />
            </Form>
            <Form
              action={uploadDocument}
              kind="document"
              account={account.id}
              title="Publicar documento privado"
            >
              <Field name="title" label="Título" maxLength={200} />
              <Select
                required={false}
                name="contract_id"
                label="Contrato (opcional)"
                options={[
                  { value: "", label: "Documento da conta" },
                  ...contractOptions,
                ]}
              />
              <label className="live-field">
                PDF (até 10 MB)
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  required
                />
              </label>
              <p className="live-muted">
                Publique apenas PDFs revisados de fontes confiáveis. O arquivo
                fica disponível para os membros desta conta.
              </p>
            </Form>
            {contracts.rows.length > 0 && (
              <>
                <Form
                  action={adminAction}
                  kind="purifier"
                  account={account.id}
                  title="Cadastrar purificador"
                >
                  <Select
                    name="contract_id"
                    label="Contrato"
                    options={contractOptions}
                  />
                  <Field
                    name="serial"
                    label="Número de série"
                    maxLength={100}
                  />
                  <Field name="model" label="Modelo" maxLength={100} />
                  <Select
                    name="status"
                    label="Situação"
                    options={opts([
                      "available",
                      "operation",
                      "maintenance",
                      "retired",
                    ])}
                  />
                  <Field name="city" label="Cidade" required={false} />
                  <Field name="state" label="Estado" required={false} />
                  <Field
                    name="activation_date"
                    label="Data de ativação"
                    type="date"
                    required={false}
                  />
                </Form>
                <Form
                  action={adminAction}
                  kind="payout"
                  account={account.id}
                  title="Registrar repasse"
                >
                  <Select
                    name="contract_id"
                    label="Contrato"
                    options={contractOptions}
                  />
                  <Field
                    name="period_start"
                    label="Período inicial"
                    type="date"
                  />
                  <Field name="period_end" label="Período final" type="date" />
                  <Field name="due_on" label="Vencimento" type="date" />
                  <Field name="amount" label="Valor (USD)" type="number" />
                  <Select
                    name="status"
                    label="Situação"
                    options={opts(["scheduled", "settled"])}
                  />
                  <Field
                    name="settled_on"
                    label="Data da liquidação (obrigatória se liquidado)"
                    type="date"
                    required={false}
                  />
                  <Field
                    name="reference"
                    label="Referência bancária (obrigatória se liquidado)"
                    required={false}
                  />
                  <p className="live-muted">
                    Liquidado exige data e referência do pagamento efetivamente
                    conferido. Um vencimento passado não confirma pagamento.
                  </p>
                </Form>
              </>
            )}
            {units.rows.length > 0 && (
              <Form
                action={adminAction}
                kind="unit_status"
                account={account.id}
                title="Atualizar situação do purificador"
              >
                <Select
                  name="unit_id"
                  label="Purificador"
                  options={units.rows.map((u) => ({
                    value: u.id,
                    label: u.serial,
                  }))}
                />
                <Select
                  name="status"
                  label="Situação"
                  options={opts([
                    "available",
                    "operation",
                    "maintenance",
                    "retired",
                  ])}
                />
              </Form>
            )}
            {payouts.rows.some((p) => p.status === "scheduled") && (
              <Form
                action={adminAction}
                kind="settle_payout"
                account={account.id}
                title="Confirmar liquidação de repasse"
              >
                <Select
                  name="payout_id"
                  label="Repasse programado"
                  options={payouts.rows
                    .filter((p) => p.status === "scheduled")
                    .map((p) => ({
                      value: p.id,
                      label: `${date(p.due_on)} · ${money(p.amount)}`,
                    }))}
                />
                <Field
                  name="settled_on"
                  label="Data da liquidação verificada"
                  type="date"
                />
                <Field
                  name="reference"
                  label="Referência bancária verificada"
                />
              </Form>
            )}
          </div>
          <p className="live-muted mt-4">
            Seletores exibem os 50 registros mais recentes da conta. O extrato e
            as listas do portal oferecem paginação.
          </p>
        </>
      )}
      <div className="live-card">
        <h2>Últimas alterações auditadas</h2>
        <ul>
          {audit?.map((e) => (
            <li key={e.id}>
              {date(e.created_at)} · {e.entity} · {e.operation}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
