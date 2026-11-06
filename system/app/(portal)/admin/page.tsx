import { notFound } from "next/navigation";
import { CalendarPlus, FilePlus2, FileText, Plus, UserPlus } from "lucide-react";
import {
  context,
  records,
  date,
  money,
  labels,
  type Contract,
  type Document,
  type Unit,
  type Payout,
} from "@/lib/live/data";
import { userEmails } from "@/lib/live/admin";
import { adminAction, uploadDocument } from "@/lib/live/actions";
import { DataTable } from "@/components/live/DataTable";
import { Form, Field, Select } from "@/components/live/Fields";
import { Notice } from "@/components/live/Notice";
import { PageHeader } from "@/components/live/PageHeader";
import { Notice as ResultNotice, type Query } from "@/components/live/PortalPage";
import { StatusPill } from "@/components/live/StatusPill";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FormDialog } from "@/components/ui/FormDialog";

export const metadata = { title: "Administração" };

const opts = (values: string[]) =>
  values.map((value) => ({ value, label: labels[value] ?? value }));

const ENTITIES: Record<string, string> = {
  accounts: "Conta",
  staff_role_grants: "Função da equipe",
  account_memberships: "Membro",
  contracts: "Contrato",
  purifiers: "Purificador",
  payouts: "Repasse",
  documents: "Documento",
  support_tickets: "Chamado",
  support_messages: "Mensagem de chamado",
};
const OPERATIONS: Record<string, string> = { INSERT: "Criado", UPDATE: "Alterado", DELETE: "Removido" };

const HELP = "text-[13.5px] text-ink-soft";

const FILE_INPUT =
  "w-full cursor-pointer rounded-lg border border-line bg-card px-3.5 py-2.5 text-[15px] text-ink file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-brand-soft file:px-3 file:py-1.5 file:text-[13.5px] file:font-semibold file:text-brand focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/30";

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const ctx = await context();
  if (ctx.staff !== "admin") notFound();
  const account = ctx.account;
  const [contracts, units, payouts, documents, members] = account
    ? await Promise.all([
        records<Contract>("contracts", account.id),
        records<Unit>("purifiers", account.id),
        records<Payout>("payouts", account.id),
        records<Document>("documents", account.id),
        ctx.db.from("account_memberships").select("user_id,role,active").eq("account_id", account.id),
      ])
    : [{ rows: [], count: 0 }, { rows: [], count: 0 }, { rows: [], count: 0 }, { rows: [], count: 0 }, { data: [], error: null }];
  if (members.error) throw new Error("Não foi possível carregar os membros.");
  const memberRows = (members.data ?? []) as { user_id: string; role: string; active: boolean }[];
  const emails = await userEmails(memberRows.map((m) => m.user_id));
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
  const today = new Date().toISOString().slice(0, 10);
  const query = await searchParams;

  const createAccount = (
    <FormDialog
      trigger="Criar conta"
      icon={<Plus className="size-5" aria-hidden="true" />}
      title="Criar conta"
      description="A nova conta abre em seguida, pronta para receber membros, contratos e documentos."
      dialogSize="sm"
    >
      <Form action={adminAction} kind="account" title="Criar conta" submit="Criar conta">
        <Field name="name" label="Nome da pessoa ou empresa" />
      </Form>
    </FormDialog>
  );

  const statusOptions = opts(["available", "operation", "maintenance", "retired"]);

  return (
    <>
      <PageHeader
        title="Administração"
        subtitle="Cadastre somente registros reais e conferidos. Nenhuma transferência é executada aqui."
        action={createAccount}
      />
      <ResultNotice query={query} />
      {!account && (
        <Notice title="Nenhuma conta aberta">
          Membros, contratos, documentos, purificadores e repasses são cadastrados dentro de uma conta. Crie uma nova ou abra uma existente.
          <div className="mt-2">
            <ButtonLink href="/contas" variant="outline" size="sm">
              Ver todas as contas
            </ButtonLink>
          </div>
        </Notice>
      )}
      {account && (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h2 className="text-[20px] leading-tight font-extrabold tracking-tight text-ink [overflow-wrap:anywhere]">{account.name}</h2>
              <StatusPill status={account.status} label={account.status === "active" ? "Ativa" : "Suspensa"} />
            </div>
            <FormDialog
              trigger="Alterar situação da conta"
              variant="outline"
              size="sm"
              title="Situação da conta"
              description="Uma conta suspensa bloqueia o acesso dos seus membros. Nenhum dado é apagado."
              dialogSize="sm"
            >
              <Form action={adminAction} kind="account_status" account={account.id} title="Situação da conta">
                <Select
                  name="status"
                  label="Situação"
                  defaultValue={account.status}
                  options={[
                    { value: "active", label: "Ativa" },
                    { value: "suspended", label: "Suspensa (bloqueia membros)" },
                  ]}
                />
              </Form>
            </FormDialog>
          </div>

          <DataTable
            title="Membros"
            caption="Membros da conta"
            empty="Nenhum membro vinculado. Vincule um usuário já aprovado no Auth para que ele veja esta conta."
            action={
              <FormDialog
                trigger="Vincular membro"
                icon={<UserPlus className="size-4" aria-hidden="true" />}
                size="sm"
                title="Vincular membro"
                description="O usuário deve existir no Supabase Auth, ter e-mail confirmado e portal_role atribuído. Esta ação não cria identidade nem envia e-mail."
              >
                <Form action={adminAction} kind="membership" account={account.id} title="Vincular membro" submit="Vincular">
                  <Field name="email" label="E-mail do usuário" type="email" />
                  <MemberFields />
                </Form>
              </FormDialog>
            }
            columns={[{ heading: "Usuário" }, { heading: "Papel", secondary: true }, { heading: "Acesso" }, { heading: "Ações" }]}
            rows={memberRows.map((m) => {
              const email = emails.get(m.user_id) ?? "E-mail indisponível";
              return [
                email,
                m.role === "owner" ? "Representante da conta" : "Leitura e suporte",
                <StatusPill key="s" status={m.active ? "active" : "suspended"} label={m.active ? "Ativo" : "Revogado"} />,
                emails.has(m.user_id) ? (
                  <FormDialog key="a" trigger="Alterar acesso" triggerLabel={`Alterar acesso de ${email}`} variant="outline" size="sm" title="Alterar acesso" description={email} dialogSize="sm">
                    <Form action={adminAction} kind="membership" account={account.id} title="Alterar acesso">
                      <input type="hidden" name="email" value={email} />
                      <MemberFields role={m.role} active={m.active} />
                    </Form>
                  </FormDialog>
                ) : (
                  "—"
                ),
              ];
            })}
          />

          <DataTable
            title="Contratos"
            caption="Contratos da conta"
            empty="Nenhum contrato cadastrado. Cadastre o primeiro para registrar purificadores e repasses."
            action={
              <FormDialog trigger="Novo contrato" icon={<FilePlus2 className="size-4" aria-hidden="true" />} size="sm" title="Cadastrar contrato">
                <Form action={adminAction} kind="contract" account={account.id} title="Cadastrar contrato" submit="Cadastrar">
                  <Field name="number" label="Número único" maxLength={80} />
                  <Field name="title" label="Título" maxLength={200} />
                  <Select name="status" label="Situação" options={opts(["draft", "active", "ended"])} />
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field name="starts_on" label="Início" type="date" />
                    <Field name="ends_on" label="Término" type="date" />
                  </div>
                  <Field name="invested_amount" label="Investimento registrado (USD)" type="number" />
                </Form>
              </FormDialog>
            }
            columns={[{ heading: "Contrato" }, { heading: "Situação" }, { heading: "Vigência", secondary: true }, { heading: "Investimento (USD)", align: "right" }]}
            rows={contracts.rows.map((c) => [
              <span key="c" className="grid">
                <span className="font-bold text-ink">{c.number}</span>
                <span className="text-ink-soft">{c.title}</span>
              </span>,
              <StatusPill key="s" status={c.status} />,
              `${date(c.starts_on)} – ${date(c.ends_on)}`,
              money(c.invested_amount),
            ])}
          />

          <DataTable
            title="Purificadores"
            caption="Purificadores da conta"
            empty={contracts.rows.length ? "Nenhum purificador cadastrado." : "Cadastre um contrato antes de registrar purificadores."}
            action={
              contracts.rows.length > 0 && (
                <FormDialog trigger="Novo purificador" icon={<Plus className="size-4" aria-hidden="true" />} size="sm" title="Cadastrar purificador">
                  <Form action={adminAction} kind="purifier" account={account.id} title="Cadastrar purificador" submit="Cadastrar">
                    <Select name="contract_id" label="Contrato" options={contractOptions} />
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field name="serial" label="Número de série" maxLength={100} />
                      <Field name="model" label="Modelo" maxLength={100} />
                    </div>
                    <Select name="status" label="Situação" options={statusOptions} />
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field name="city" label="Cidade" required={false} />
                      <Field name="state" label="Estado" required={false} />
                    </div>
                    <Field name="activation_date" label="Data de ativação" type="date" required={false} />
                  </Form>
                </FormDialog>
              )
            }
            columns={[{ heading: "Série" }, { heading: "Modelo", secondary: true }, { heading: "Situação" }, { heading: "Local", secondary: true }, { heading: "Ações" }]}
            rows={units.rows.map((u) => [
              u.serial,
              u.model,
              <StatusPill key="s" status={u.status} />,
              [u.city, u.state].filter(Boolean).join(", ") || "—",
              <FormDialog key="a" trigger="Alterar situação" triggerLabel={`Alterar situação do purificador ${u.serial}`} variant="outline" size="sm" title="Situação do purificador" description={`Série ${u.serial}`} dialogSize="sm">
                <Form action={adminAction} kind="unit_status" account={account.id} title="Situação do purificador">
                  <input type="hidden" name="unit_id" value={u.id} />
                  <Select name="status" label="Situação" defaultValue={u.status} options={statusOptions} />
                </Form>
              </FormDialog>,
            ])}
          />

          <DataTable
            title="Repasses"
            caption="Repasses da conta"
            empty={contracts.rows.length ? "Nenhum repasse registrado." : "Cadastre um contrato antes de registrar repasses."}
            action={
              contracts.rows.length > 0 && (
                <FormDialog trigger="Registrar repasse" icon={<CalendarPlus className="size-4" aria-hidden="true" />} size="sm" title="Registrar repasse">
                  <Form action={adminAction} kind="payout" account={account.id} title="Registrar repasse" submit="Registrar">
                    <Select name="contract_id" label="Contrato" options={contractOptions} />
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field name="period_start" label="Período inicial" type="date" />
                      <Field name="period_end" label="Período final" type="date" />
                      <Field name="due_on" label="Vencimento" type="date" />
                      <Field name="amount" label="Valor (USD)" type="number" />
                    </div>
                    <Select name="status" label="Situação" options={opts(["scheduled", "settled"])} />
                    <div className="grid gap-3.5 sm:grid-cols-2">
                      <Field name="settled_on" label="Data da liquidação" type="date" required={false} />
                      <Field name="reference" label="Referência bancária" required={false} />
                    </div>
                    <p className={HELP}>
                      Liquidado exige data e referência do pagamento efetivamente conferido. Um vencimento passado não confirma pagamento.
                    </p>
                  </Form>
                </FormDialog>
              )
            }
            columns={[{ heading: "Período", secondary: true }, { heading: "Vencimento" }, { heading: "Valor (USD)", align: "right" }, { heading: "Situação" }, { heading: "Ações" }]}
            rows={payouts.rows.map((p) => [
              `${date(p.period_start)} – ${date(p.period_end)}`,
              date(p.due_on),
              money(p.amount),
              <StatusPill key="s" status={p.status} label={p.status === "scheduled" && p.due_on < today ? "Programado · vencido" : undefined} />,
              p.status === "scheduled" ? (
                <FormDialog key="a" trigger="Confirmar liquidação" triggerLabel={`Confirmar liquidação do repasse de ${date(p.due_on)}`} variant="outline" size="sm" title="Confirmar liquidação" description={`${date(p.due_on)} · ${money(p.amount)}`} dialogSize="sm">
                  <Form action={adminAction} kind="settle_payout" account={account.id} title="Confirmar liquidação" submit="Confirmar liquidação">
                    <input type="hidden" name="payout_id" value={p.id} />
                    <Field name="settled_on" label="Data da liquidação verificada" type="date" />
                    <Field name="reference" label="Referência bancária verificada" />
                  </Form>
                </FormDialog>
              ) : (
                p.reference || "—"
              ),
            ])}
          />

          <DataTable
            title="Documentos"
            caption="Documentos publicados na conta"
            empty="Nenhum documento publicado."
            action={
              <FormDialog trigger="Publicar documento" icon={<FileText className="size-4" aria-hidden="true" />} size="sm" title="Publicar documento privado" description="Publique apenas PDFs revisados de fontes confiáveis. O arquivo fica disponível para os membros desta conta.">
                <Form action={uploadDocument} kind="document" account={account.id} title="Publicar documento privado" submit="Publicar">
                  <Field name="title" label="Título" maxLength={200} />
                  <Select required={false} name="contract_id" label="Contrato (opcional)" options={[{ value: "", label: "Documento da conta" }, ...contractOptions]} />
                  <div>
                    <label htmlFor="admin-document-file" className="mb-1.5 block text-[13.5px] font-semibold text-ink">
                      PDF (até 10 MB)
                    </label>
                    <input id="admin-document-file" type="file" name="file" accept="application/pdf" required className={FILE_INPUT} />
                  </div>
                </Form>
              </FormDialog>
            }
            columns={[{ heading: "Documento" }, { heading: "Publicado em", secondary: true }, { heading: "Tamanho", align: "right", secondary: true }]}
            rows={documents.rows.map((d) => [d.title, date(d.created_at), `${Math.ceil(d.size_bytes / 1024)} KB`])}
          />
          <p className={HELP}>Cada lista mostra os 50 registros mais recentes da conta. As telas do portal oferecem paginação.</p>
        </>
      )}
      <Card title="Últimas alterações auditadas">
        {audit?.length ? (
          <ul className="divide-y divide-line text-[14.5px]">
            {audit.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5">
                <span className="text-ink-soft">{date(e.created_at)}</span>
                <span className="font-bold text-ink">
                  {ENTITIES[e.entity] ?? e.entity} · {OPERATIONS[e.operation] ?? e.operation}
                </span>
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

/** Role and access fields of the membership form (shared by "link" and "change"). */
function MemberFields({ role = "viewer", active = true }: { role?: string; active?: boolean }) {
  return (
    <>
      <Select
        name="role"
        label="Papel"
        defaultValue={role}
        options={[
          { value: "viewer", label: "Leitura e suporte" },
          { value: "owner", label: "Representante da conta" },
        ]}
      />
      <Select
        name="active"
        label="Acesso"
        defaultValue={String(active)}
        options={[
          { value: "true", label: "Ativo" },
          { value: "false", label: "Revogado" },
        ]}
      />
    </>
  );
}
