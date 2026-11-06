import Form from "next/form";
import Link from "next/link";
import {
  Building2,
  CalendarClock,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  Download,
  FilePenLine,
  Headset,
  Link2Off,
  ScrollText,
  Undo2,
  Wrench,
} from "lucide-react";
import {
  context,
  records,
  money,
  date,
  labels,
  type Contract,
  type Unit,
  type Payout,
  type Document,
} from "@/lib/live/data";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink, buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/Field";
import { KpiCard } from "@/components/ui/KpiCard";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { DataTable } from "./DataTable";
import { FilterTabs } from "./FilterTabs";
import { Notice as NoticeBox } from "./Notice";
import { PageHeader } from "./PageHeader";
import { literalSearch } from "@/lib/live/admin-view";
import { ReplaceRoute } from "./ReplaceRoute";
import { StatusPill } from "./StatusPill";
import { SignOutButton } from "./SignOutButton";
import { Support } from "./Support";

export type Query = {
  page?: string;
  saved?: string;
  error?: string;
  ticket?: string;
  /** `/suporte?novo=1&assunto=…` opens the new-ticket dialog with that subject. */
  novo?: string;
  assunto?: string;
  /** Filter by status (statement: `scheduled` | `settled`; purifiers: a unit status). */
  situacao?: string;
  /** Document title search. */
  q?: string;
};

export function Notice({ query }: { query: Query }) {
  if (query.error)
    return (
      <NoticeBox tone="danger">
        {query.error === "account"
          ? "A conta selecionada mudou. Confira os dados e tente novamente."
          : query.error === "duplicate"
            ? "Já existe um registro com esse número, série ou período."
            : query.error === "file"
              ? "Envie um PDF válido de até 10 MB."
              : "Não foi possível salvar. Confira os campos e suas permissões e tente novamente."}
      </NoticeBox>
    );
  return query.saved ? <NoticeBox tone="success">Registro salvo.</NoticeBox> : null;
}

/** "N registros" plus Anterior / Próxima, 50 per page (`?page=`, zero-based). */
export function Pager({
  page,
  count,
  path,
}: {
  page: number;
  count: number;
  path: string;
}) {
  const hasPrev = page > 0;
  const hasNext = (page + 1) * 50 < count;
  // `path` may already carry filters (`/pedidos?etapa=proposta`).
  const link = (target: number) =>
    `${path}${path.includes("?") ? "&" : "?"}page=${target}`;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[14px] text-ink-soft" aria-live="polite">
        {count} {count === 1 ? "registro" : "registros"}
      </p>
      {(hasPrev || hasNext) && (
        <nav aria-label="Paginação" className="flex items-center gap-2">
          {hasPrev && (
            <ButtonLink href={link(page - 1)} variant="outline" size="sm">
              ← Anterior
            </ButtonLink>
          )}
          {hasNext && (
            <ButtonLink href={link(page + 1)} variant="outline" size="sm">
              Próxima →
            </ButtonLink>
          )}
        </nav>
      )}
    </div>
  );
}

const titles: Record<string, string> = {
  home: "Visão geral",
  dashboard: "Dashboard",
  contrato: "Meus contratos",
  purificadores: "Meus purificadores",
  extrato: "Extrato de repasses",
  calendario: "Calendário de repasses",
  documentos: "Documentos",
  perfil: "Minha conta",
  solicitar: "Novas solicitações",
  suporte: "Suporte",
};

const requests = [
  { subject: "Nova aquisição de purificadores", hint: "Ampliar sua parceria com mais equipamentos.", icon: PurifierIcon },
  { subject: "Manutenção de purificador", hint: "Informe a série e o problema observado.", icon: Wrench },
  { subject: "Aditivo contratual", hint: "Alterar condições de um contrato existente.", icon: FilePenLine },
  { subject: "Recompra de equipamentos", hint: "Pedir a recompra prevista no contrato.", icon: Undo2 },
] as const;

const fileLink = buttonClass({ variant: "outline", size: "sm" });

export async function PortalPage({
  view,
  query = {},
}: {
  view: string;
  query?: Query;
}) {
  const ctx = await context();
  const account = ctx.account;
  // The investor overview needs an account: an administrator without one starts on the global panel.
  const toPanel = !account && ctx.staff === "admin" && (view === "home" || view === "dashboard");
  const page = Math.max(
    0,
    Math.min(100000, Number.parseInt(query.page || "0", 10) || 0),
  );
  return (
    <>
      <PageHeader
        title={titles[view]}
        subtitle={
          account?.name ??
          (ctx.staff === "admin"
            ? "Visão global · nenhuma conta aberta"
            : ctx.staff
              ? "Equipe · sem conta vinculada"
              : "Nenhuma conta vinculada")
        }
      />
      <Notice query={query} />
      {toPanel && <ReplaceRoute href="/painel" />}
      {view === "perfil" ? (
        <>
          <Card title="Identidade autenticada" action={<SignOutButton />}>
            <DefinitionList
              rows={[
                { label: "E-mail", value: ctx.user.email ?? "—" },
                {
                  label: "Perfil",
                  value: ctx.staff === "admin" ? "Equipe · Administração" : ctx.staff ? "Equipe · Atendimento" : ctx.user.app_metadata.portal_role === "customer" ? "Cliente" : "Parceiro",
                },
                {
                  label: "Conta aberta",
                  value:
                    account?.name ??
                    (ctx.staff === "admin" ? "Visão global" : "Nenhuma conta vinculada"),
                },
              ]}
            />
          </Card>
          <ProfileAccess />
          <Card title="Precisa alterar algo?">
            <p className="max-w-2xl text-[14.5px] text-ink-soft">
              Perfil e dados bancários não são editáveis nesta versão. Para alterar dados ou recuperar acesso, abra um chamado. Não envie senhas nem números completos de contas bancárias.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <ButtonLink href={`/suporte?novo=1&assunto=${encodeURIComponent("Alteração de dados cadastrais")}`} variant="outline">
                <Headset className="size-4" aria-hidden="true" />
                Pedir alteração de dados
              </ButtonLink>
              <ButtonLink href={`/suporte?novo=1&assunto=${encodeURIComponent("Recuperação de acesso")}`} variant="outline">
                <Headset className="size-4" aria-hidden="true" />
                Recuperar acesso
              </ButtonLink>
            </div>
          </Card>
        </>
      ) : !account ? (
        <Card>
          {ctx.staff === "admin" ? (
            <EmptyState
              icon={Building2}
              title="Selecione uma conta para visualizar"
              description="Esta tela mostra os dados de uma conta. Abra uma conta para consultá-la como o investidor a vê."
              action={
                toPanel ? (
                  <ButtonLink href="/painel">Abrir painel global</ButtonLink>
                ) : (
                  <ButtonLink href="/contas">Ver todas as contas</ButtonLink>
                )
              }
            />
          ) : ctx.staff === "support" ? (
            <EmptyState
              icon={Link2Off}
              title="Esta tela mostra os dados de uma conta"
              description="Sua função atende chamados de todas as contas pela fila de atendimento."
              action={
                <ButtonLink href="/equipe" variant="outline">
                  Abrir fila de atendimento
                </ButtonLink>
              }
            />
          ) : (
            <EmptyState
              icon={Link2Off}
              title="Seu acesso está ativo"
              description="Um administrador precisa vincular uma conta para liberar contratos, equipamentos e documentos."
            />
          )}
        </Card>
      ) : view === "suporte" ? (
        <Support accountId={account.id} query={query} />
      ) : view === "home" || view === "dashboard" ? (
        await Overview(account.id)
      ) : view === "solicitar" ? (
        <Card title="O que você precisa?">
          <p className="max-w-2xl text-[14.5px] text-ink-soft">
            Novas aquisições, manutenção, aditivos e recompra são tratados pelo
            suporte nesta versão. Escolha o assunto e abriremos o chamado já
            preenchido. Nenhum pagamento é iniciado pelo portal.
          </p>
          <ul className="mt-4 grid gap-3 @2xl:grid-cols-2">
            {requests.map((r) => (
              <li key={r.subject}>
                <Link
                  href={`/suporte?novo=1&assunto=${encodeURIComponent(r.subject)}`}
                  className="flex h-full items-start gap-3 rounded-xl bg-canvas/60 p-4 hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                    <r.icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-bold text-ink">{r.subject}</span>
                    <span className="block text-[13.5px] text-ink-soft">{r.hint}</span>
                  </span>
                  <ChevronRight className="mt-2.5 size-4 shrink-0 text-ink-mute" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : view === "contrato" ? (
        await Contracts(account.id, page)
      ) : view === "purificadores" ? (
        await Units(account.id, page, query.situacao)
      ) : view === "documentos" ? (
        await Documents(account.id, page, query.q)
      ) : (
        await Payouts(account.id, page, view, query.situacao)
      )}
    </>
  );
}

/** Accounts the signed-in person belongs to, with their role: who they are in each one. */
async function ProfileAccess() {
  const { db, user, accounts } = await context();
  const { data, error } = await db.from("account_memberships").select("account_id,role,active").eq("user_id", user.id);
  if (error) throw new Error("Não foi possível carregar seus acessos.");
  if (!data.length) return null;
  return (
    <Card title="Contas com acesso">
      <ul className="divide-y divide-line">
        {data.map((m) => (
          <li key={m.account_id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 text-[14.5px]">
            <span className="min-w-0 font-semibold text-ink [overflow-wrap:anywhere]">{accounts.find((a) => a.id === m.account_id)?.name ?? "Conta"}</span>
            <span className="flex items-center gap-2 text-ink-soft">
              {m.role === "owner" ? "Representante" : "Leitura e suporte"}
              <Badge tone={m.active ? "ok" : "neutral"} dot>
                {m.active ? "Ativo" : "Revogado"}
              </Badge>
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

async function Overview(account: string) {
  const { db } = await context();
  const [summary, next, recent] = await Promise.all([
    db.rpc("portal_summary", { account }),
    db.from("payouts").select("id,due_on,amount").eq("account_id", account).eq("status", "scheduled").order("due_on").order("id").limit(4),
    db.from("documents").select("id,title,created_at").eq("account_id", account).order("created_at", { ascending: false }).order("id").limit(4),
  ]);
  if (summary.error || next.error || recent.error) throw new Error("Não foi possível carregar o resumo.");
  const s = summary.data as {
    contracts: number;
    units: number;
    invested: number;
    settled: number;
    scheduled: number;
  };
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = next.data as Pick<Payout, "id" | "due_on" | "amount">[];
  const overdue = upcoming.filter((p) => p.due_on < today).length;
  const docs = recent.data as Pick<Document, "id" | "title" | "created_at">[];
  return (
    <>
      {s.contracts === 0 && (
        <NoticeBox title="Sua conta ainda não tem contratos publicados">
          Contratos, purificadores e repasses aparecem aqui assim que a equipe os publicar. Se você esperava vê-los, fale com a equipe.
          <span className="mt-2 block">
            <ButtonLink href="/suporte?novo=1" variant="outline" size="sm">
              <Headset className="size-4" aria-hidden="true" />
              Falar com a equipe
            </ButtonLink>
          </span>
        </NoticeBox>
      )}
      <div className="grid gap-4 @2xl:grid-cols-2 @4xl:grid-cols-3">
        <KpiCard icon={ScrollText} tone="blue" label="Contratos" value={s.contracts} caption="Ver contratos" captionHref="/contrato" />
        <KpiCard icon={PurifierIcon} tone="violet" label="Purificadores" value={s.units} caption="Ver purificadores" captionHref="/purificadores" />
        <KpiCard icon={CircleDollarSign} tone="blue" label="Investimento registrado" value={money(s.invested)} />
        <KpiCard icon={CircleCheck} tone="green" label="Repasses liquidados" value={money(s.settled)} caption="Ver extrato" captionHref="/extrato" />
        <KpiCard icon={CalendarClock} tone={overdue ? "pink" : "orange"} label="Repasses programados" value={money(s.scheduled)} caption={overdue ? `${overdue} com vencimento passado` : "Ver calendário"} captionHref="/calendario" />
      </div>
      <div className="grid items-start gap-4 @4xl:grid-cols-2">
        <Card title="Próximos repasses" action={<ButtonLink href="/calendario" variant="ghost" size="sm">Ver calendário</ButtonLink>}>
          {upcoming.length === 0 ? (
            <p className="text-[14.5px] text-ink-soft">Nenhum repasse programado no momento.</p>
          ) : (
            <ul className="divide-y divide-line">
              {upcoming.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 text-[14.5px]">
                  <span className="flex items-center gap-2 text-ink">
                    {date(p.due_on)}
                    {p.due_on < today && (
                      <Badge tone="danger" dot>
                        Vencido
                      </Badge>
                    )}
                  </span>
                  <span className="tabular font-bold text-ink">{money(p.amount)}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card title="Documentos recentes" action={<ButtonLink href="/documentos" variant="ghost" size="sm">Ver todos</ButtonLink>}>
          {docs.length === 0 ? (
            <p className="text-[14.5px] text-ink-soft">Nenhum documento publicado ainda.</p>
          ) : (
            <ul className="divide-y divide-line">
              {docs.map((d) => (
                <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2.5 text-[14.5px]">
                  <span className="min-w-0 text-ink [overflow-wrap:anywhere]">
                    {d.title}
                    <span className="block text-[13px] text-ink-soft">{date(d.created_at)}</span>
                  </span>
                  <a className={fileLink} href={`/app/api/documents/${d.id}`} aria-label={`Baixar ${d.title}`}>
                    <Download className="size-4" aria-hidden="true" />
                    Baixar
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <NoticeBox>
        Valores em USD, conforme os registros publicados pela equipe. A data de
        vencimento não confirma a liquidação de um repasse.
      </NoticeBox>
    </>
  );
}

async function Contracts(account: string, page: number) {
  const { rows, count } = await records<Contract>("contracts", account, page);
  const { db } = await context();
  const enrolled = rows.length
    ? await db
        .from("investor_enrollments")
        .select("id,contract_id")
        .eq("account_id", account)
        .in(
          "contract_id",
          rows.map((row) => row.id),
        )
    : { data: [], error: null };
  if (enrolled.error) throw new Error("Não foi possível carregar os acordos.");
  return (
    <>
      <DataTable
        caption="Contratos da conta"
        columns={[
          { heading: "Contrato" },
          { heading: "Título" },
          { heading: "Situação" },
          { heading: "Início", secondary: true },
          { heading: "Término", secondary: true },
          { heading: "Investimento (USD)", align: "right" },
          { heading: "Acordo" },
        ]}
        rows={rows.map((c) => {
          const agreement = enrolled.data?.find((e) => e.contract_id === c.id);
          return [
            c.number,
            c.title,
            <StatusPill key="s" status={c.status} />,
            date(c.starts_on),
            date(c.ends_on),
            money(c.invested_amount),
            agreement ? (
              <a
                key={c.id}
                className={fileLink}
                href={"/app/api/agreements/" + agreement.id}
              >
                <Download className="size-4" aria-hidden="true" />
                Baixar acordo aceito
              </a>
            ) : (
              <ButtonLink key={c.id} href="/documentos" variant="outline" size="sm">
                Documentos
              </ButtonLink>
            ),
          ];
        })}
      />
      <Pager page={page} count={count} path="/contrato" />
      <NoticeBox>
        <span className="block">
          Consulte os arquivos publicados em Documentos para conferir o contrato
          assinado. Alterações contratuais devem ser solicitadas pelo suporte.
        </span>
        <span className="mt-2 block">
          <ButtonLink href={`/suporte?novo=1&assunto=${encodeURIComponent("Aditivo contratual")}`} variant="outline" size="sm">
            <FilePenLine className="size-4" aria-hidden="true" />
            Solicitar aditivo
          </ButtonLink>
        </span>
      </NoticeBox>
    </>
  );
}

const unitStatuses = ["operation", "available", "maintenance", "retired"] as const;

async function Units(account: string, page: number, situacao?: string) {
  const { db } = await context();
  const status = unitStatuses.find((value) => value === situacao);
  let list = db.from("purifiers").select("*", { count: "exact" }).eq("account_id", account);
  if (status) list = list.eq("status", status);
  const { data, error, count } = await list.order("serial").order("id").range(page * 50, page * 50 + 49);
  if (error) throw new Error("Não foi possível carregar os registros. Tente novamente.");
  const rows = data as Unit[];
  const tab = (value?: string) => (value ? `/purificadores?situacao=${value}` : "/purificadores");
  return (
    <>
      <FilterTabs
        label="Filtrar por situação"
        tabs={[{ href: tab(), label: "Todos", active: !status }, ...unitStatuses.map((value) => ({ href: tab(value), label: labels[value], active: status === value }))]}
      />
      <DataTable
        caption="Purificadores da conta"
        empty={status ? "Nenhum purificador com esta situação." : "Nenhum purificador publicado nesta conta ainda."}
        columns={[
          { heading: "Série" },
          { heading: "Modelo", secondary: true },
          { heading: "Situação" },
          { heading: "Localização" },
          { heading: "Ativação", secondary: true },
          { heading: "Ajuda" },
        ]}
        rows={rows.map((u) => [
          u.serial,
          u.model,
          <StatusPill key="s" status={u.status} />,
          [u.city, u.state].filter(Boolean).join(", ") || "—",
          date(u.activation_date),
          <Link
            key="h"
            href={`/suporte?novo=1&assunto=${encodeURIComponent(`Manutenção do purificador ${u.serial}`)}`}
            aria-label={`Reportar problema no purificador ${u.serial}`}
            className="font-semibold whitespace-nowrap text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand"
          >
            Reportar problema
          </Link>,
        ])}
      />
      <Pager page={page} count={count ?? 0} path={tab(status)} />
      <div>
        <ButtonLink href={`/suporte?novo=1&assunto=${encodeURIComponent("Manutenção de purificador")}`} variant="outline">
          <Wrench className="size-4" aria-hidden="true" />
          Solicitar manutenção
        </ButtonLink>
      </div>
    </>
  );
}

async function Documents(account: string, page: number, q?: string) {
  const { db } = await context();
  const term = (q ?? "").trim().slice(0, 160);
  let list = db.from("documents").select("*", { count: "exact" }).eq("account_id", account);
  if (term) list = list.ilike("title", `%${literalSearch(term)}%`);
  const found = await list.order("created_at", { ascending: false }).order("id").range(page * 50, page * 50 + 49);
  if (found.error) throw new Error("Não foi possível carregar os registros. Tente novamente.");
  const rows = found.data as Document[];
  const count = found.count ?? 0;
  const agreements = await db
    .from("investor_enrollments")
    .select("id,created_at")
    .eq("account_id", account)
    .in("status", ["accepted", "payment_pending", "active", "payment_review"])
    .order("created_at", { ascending: false })
    .limit(100);
  if (agreements.error) throw new Error("Não foi possível carregar os acordos.");
  return (
    <>
      {(count > 0 || term) && (
        <Form action="/documentos" className="flex flex-wrap items-center gap-2">
          <SearchInput label="Pesquisar documentos pelo título" name="q" defaultValue={term} placeholder="Pesquisar documentos pelo título" maxLength={160} wrapperClassName="min-w-0 flex-1" />
          <Button type="submit" variant="outline">
            Pesquisar
          </Button>
          {term && (
            <ButtonLink href="/documentos" variant="ghost">
              Limpar
            </ButtonLink>
          )}
        </Form>
      )}
      <DataTable
        caption="Documentos publicados"
        empty={term ? "Nenhum documento encontrado com esse título." : "Nenhum documento publicado nesta conta ainda."}
        columns={[
          { heading: "Documento" },
          { heading: "Publicado em", secondary: true },
          { heading: "Tamanho", secondary: true, align: "right" },
          { heading: "Arquivo" },
        ]}
        rows={rows.map((d) => [
          d.title,
          date(d.created_at),
          `${Math.ceil(d.size_bytes / 1024)} KB`,
          <a key={d.id} className={fileLink} href={`/app/api/documents/${d.id}`}>
            <Download className="size-4" aria-hidden="true" />
            Baixar PDF
          </a>,
        ])}
      />
      <Pager page={page} count={count} path={term ? `/documentos?q=${encodeURIComponent(term)}` : "/documentos"} />
      {agreements.data.length > 0 && !term && (
        <Card title="Acordos aceitos na plataforma">
          <ul className="divide-y divide-line">
            {agreements.data.map((agreement) => (
              <li key={agreement.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-[14.5px]">
                <span className="min-w-0 text-ink">
                  Acordo e evidência do aceite · {date(agreement.created_at)}
                </span>
                <a className={fileLink} href={"/app/api/agreements/" + agreement.id}>
                  <Download className="size-4" aria-hidden="true" />
                  Baixar
                </a>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
}

async function Payouts(account: string, page: number, view: string, situacao?: string) {
  const { db } = await context();
  // The calendar looks ahead (scheduled, nearest due date first); the statement is the full history, filterable.
  const calendar = view === "calendario";
  const status = calendar ? "scheduled" : situacao === "scheduled" || situacao === "settled" ? situacao : undefined;
  let list = db.from("payouts").select("*", { count: "exact" }).eq("account_id", account);
  if (status) list = list.eq("status", status);
  list = calendar ? list.order("due_on").order("id") : list.order("due_on", { ascending: false }).order("id");
  const { data, error, count } = await list.range(page * 50, page * 50 + 49);
  if (error) throw new Error("Não foi possível carregar os registros. Tente novamente.");
  const rows = data as Payout[];
  const today = new Date().toISOString().slice(0, 10);
  const base = `/${view}`;
  const tab = (value?: string) => (value ? `${base}?situacao=${value}` : base);
  return (
    <>
      {!calendar && (
        <FilterTabs
          label="Filtrar por situação"
          tabs={[
            { href: tab(), label: "Todos", active: !status },
            { href: tab("scheduled"), label: "Programados", active: status === "scheduled" },
            { href: tab("settled"), label: "Liquidados", active: status === "settled" },
          ]}
        />
      )}
      {calendar ? (
        <DataTable
          caption="Próximos repasses programados"
          empty="Nenhum repasse programado no momento."
          columns={[{ heading: "Vencimento" }, { heading: "Período", secondary: true }, { heading: "Valor (USD)", align: "right" }, { heading: "Situação" }]}
          rows={rows.map((p) => {
            const days = Math.round((Date.parse(p.due_on) - Date.parse(today)) / 86_400_000);
            return [
              <span key="d" className="grid">
                <span className="font-semibold text-ink">{date(p.due_on)}</span>
                <span className="text-[13px] text-ink-soft">{days === 0 ? "Vence hoje" : days > 0 ? `Em ${days} ${days === 1 ? "dia" : "dias"}` : `Há ${-days} ${days === -1 ? "dia" : "dias"}`}</span>
              </span>,
              `${date(p.period_start)} – ${date(p.period_end)}`,
              money(p.amount),
              p.due_on < today ? (
                <Badge key="s" tone="danger" dot>
                  Programado · vencido
                </Badge>
              ) : (
                <StatusPill key="s" status={p.status} />
              ),
            ];
          })}
        />
      ) : (
        <DataTable
          caption="Repasses da conta"
          empty={status ? "Nenhum repasse com esta situação." : undefined}
          columns={[
            { heading: "Período" },
            { heading: "Vencimento" },
            { heading: "Valor (USD)", align: "right" },
            { heading: "Situação" },
            { heading: "Liquidação", secondary: true },
            { heading: "Referência", secondary: true },
          ]}
          rows={rows.map((p) => [
            `${date(p.period_start)} – ${date(p.period_end)}`,
            date(p.due_on),
            money(p.amount),
            p.status === "scheduled" && p.due_on < today ? (
              <Badge key="s" tone="danger" dot>
                Programado · vencido
              </Badge>
            ) : (
              <StatusPill key="s" status={p.status} />
            ),
            date(p.settled_on),
            p.reference || "—",
          ])}
        />
      )}
      <Pager page={page} count={count ?? 0} path={status && !calendar ? tab(status) : base} />
      <NoticeBox>
        Programado: obrigação registrada, sem confirmação de pagamento.
        Liquidado: a equipe registrou data e referência de liquidação. O portal
        não executa transferências.
      </NoticeBox>
    </>
  );
}
