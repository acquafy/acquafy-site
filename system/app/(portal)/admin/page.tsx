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
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import type { Query } from "@/components/live/PortalPage";
import { Card } from "@/components/ui/Card";
const opts = (values: string[]) =>
  values.map((value) => ({ value, label: labels[value] ?? value }));

/** Result of the last admin action, from the redirect's query string. */
function QueryNotice({ query }: { query: Query }) {
  if (query.error)
    return (
      <Notice tone="danger">
        {query.error === "account"
          ? "A conta selecionada mudou. Confira os dados e tente novamente."
          : query.error === "duplicate"
            ? "Já existe um registro com esse número, série ou período."
            : query.error === "file"
              ? "Envie um PDF válido de até 10 MB."
              : "Não foi possível salvar. Confira os campos e suas permissões e tente novamente."}
      </Notice>
    );
  return query.saved ? <Notice tone="success">Registro salvo.</Notice> : null;
}

const HELP = "text-[13.5px] text-ink-soft";
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
      <PageHeader title="Administração" subtitle="Cadastre somente registros reais e conferidos. Nenhuma transferência é executada aqui." />
      <QueryNotice query={await searchParams} />
      <div className="grid items-start gap-4 @4xl:grid-cols-2">
        <Form action={adminAction} kind="account" title="Criar conta">
          <Field name="name" label="Nome da pessoa ou empresa" />
        </Form>
      </div>
      {account && (
        <>
          <h2 className="pt-2 text-[20px] leading-tight font-extrabold tracking-tight text-ink">Conta selecionada: {account.name}</h2>
          <div className="grid items-start gap-4 @4xl:grid-cols-2">
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
              <p className={HELP}>
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
              <div>
                <label htmlFor="admin-document-file" className="mb-1.5 block text-[13.5px] font-semibold text-ink">
                  PDF (até 10 MB)
                </label>
                <input
                  id="admin-document-file"
                  type="file"
                  name="file"
                  accept="application/pdf"
                  required
                  className="w-full cursor-pointer rounded-lg border border-line bg-card px-3.5 py-2.5 text-[15px] text-ink file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-soft file:px-3 file:py-1.5 file:text-[13.5px] file:font-semibold file:text-brand focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/30"
                />
              </div>
              <p className={HELP}>
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
                  <p className={HELP}>
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
          <p className={HELP}>
            Seletores exibem os 50 registros mais recentes da conta. O extrato e
            as listas do portal oferecem paginação.
          </p>
        </>
      )}
      <Card title="Últimas alterações auditadas">
        {audit?.length ? (
          <ul className="divide-y divide-line text-[14.5px]">
            {audit.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                <span className="text-ink-soft">
                  {date(e.created_at)} · {e.entity}
                </span>
                <span className="font-bold text-ink">{e.operation}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className={HELP}>Nenhuma alteração registrada.</p>
        )}
      </Card>
    </>
  );
}
