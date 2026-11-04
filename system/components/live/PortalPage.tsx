import {
  CalendarClock,
  CircleCheck,
  CircleDollarSign,
  Download,
  FileText,
  Headset,
  Link2Off,
  ReceiptText,
  ScrollText,
} from "lucide-react";
import {
  context,
  records,
  money,
  date,
  type Contract,
  type Unit,
  type Payout,
  type Document,
} from "@/lib/live/data";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { EmptyState } from "@/components/ui/EmptyState";
import { KpiCard } from "@/components/ui/KpiCard";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { DataTable } from "./DataTable";
import { Notice as NoticeBox } from "./Notice";
import { PageHeader } from "./PageHeader";
import { StatusPill } from "./StatusPill";
import { Support } from "./Support";

export type Query = {
  page?: string;
  saved?: string;
  error?: string;
  ticket?: string;
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
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[14px] text-ink-soft" aria-live="polite">
        {count} {count === 1 ? "registro" : "registros"}
      </p>
      {(hasPrev || hasNext) && (
        <nav aria-label="Paginação" className="flex items-center gap-2">
          {hasPrev && (
            <ButtonLink href={`${path}?page=${page - 1}`} variant="outline" size="sm">
              ← Anterior
            </ButtonLink>
          )}
          {hasNext && (
            <ButtonLink href={`${path}?page=${page + 1}`} variant="outline" size="sm">
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
  const page = Math.max(
    0,
    Math.min(100000, Number.parseInt(query.page || "0", 10) || 0),
  );
  return (
    <>
      <PageHeader
        title={titles[view]}
        subtitle={account?.name ?? "Nenhuma conta vinculada"}
      />
      <Notice query={query} />
      {!account ? (
        <Card>
          <EmptyState
            icon={Link2Off}
            title="Seu acesso está ativo"
            description="Um administrador precisa vincular uma conta para liberar contratos, equipamentos e documentos."
            action={
              ctx.staff === "admin" ? (
                <ButtonLink href="/admin" variant="outline">
                  Criar ou vincular uma conta
                </ButtonLink>
              ) : undefined
            }
          />
        </Card>
      ) : view === "suporte" ? (
        <Support accountId={account.id} query={query} />
      ) : view === "home" || view === "dashboard" ? (
        await Overview(account.id)
      ) : view === "perfil" ? (
        <Card title="Identidade autenticada">
          <DefinitionList
            rows={[
              { label: "E-mail", value: ctx.user.email ?? "—" },
              { label: "Conta", value: account.name },
            ]}
          />
          <NoticeBox className="mt-4">
            Perfil e dados bancários não são editáveis nesta versão. Para alterar
            dados ou recuperar acesso, abra um chamado. Não envie senhas nem
            números completos de contas bancárias.
          </NoticeBox>
          <div className="mt-4">
            <ButtonLink href="/suporte" variant="outline">
              <Headset className="size-4" aria-hidden="true" />
              Abrir chamado
            </ButtonLink>
          </div>
        </Card>
      ) : view === "solicitar" ? (
        <Card title="Converse com a equipe">
          <p className="max-w-2xl text-[14.5px] text-ink-soft">
            Novas aquisições, manutenção, aditivos e recompra são tratados pelo
            suporte nesta versão. Nenhum pagamento é iniciado pelo portal.
          </p>
          <div className="mt-4">
            <ButtonLink href="/suporte">
              <Headset className="size-4" aria-hidden="true" />
              Enviar solicitação à equipe
            </ButtonLink>
          </div>
        </Card>
      ) : view === "contrato" ? (
        await Contracts(account.id, page)
      ) : view === "purificadores" ? (
        await Units(account.id, page)
      ) : view === "documentos" ? (
        await Documents(account.id, page)
      ) : (
        await Payouts(account.id, page, view)
      )}
    </>
  );
}

async function Overview(account: string) {
  const { db } = await context();
  const { data, error } = await db.rpc("portal_summary", { account });
  if (error) throw new Error("Não foi possível carregar o resumo.");
  const s = data as {
    contracts: number;
    units: number;
    invested: number;
    settled: number;
    scheduled: number;
  };
  return (
    <>
      <div className="grid gap-4 @2xl:grid-cols-2 @5xl:grid-cols-3">
        <KpiCard icon={ScrollText} tone="blue" label="Contratos" value={s.contracts} />
        <KpiCard icon={PurifierIcon} tone="violet" label="Purificadores" value={s.units} />
        <KpiCard icon={CircleDollarSign} tone="blue" label="Investimento registrado" value={money(s.invested)} />
        <KpiCard icon={CircleCheck} tone="green" label="Repasses liquidados" value={money(s.settled)} />
        <KpiCard icon={CalendarClock} tone="orange" label="Repasses programados" value={money(s.scheduled)} />
      </div>
      <NoticeBox>
        Valores em USD, conforme os registros publicados pela equipe. A data de
        vencimento não confirma a liquidação de um repasse.
      </NoticeBox>
      <Card title="Atalhos">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/documentos" variant="outline">
            <FileText className="size-4" aria-hidden="true" />
            Documentos
          </ButtonLink>
          <ButtonLink href="/extrato" variant="outline">
            <ReceiptText className="size-4" aria-hidden="true" />
            Extrato
          </ButtonLink>
          <ButtonLink href="/suporte" variant="outline">
            <Headset className="size-4" aria-hidden="true" />
            Falar com a equipe
          </ButtonLink>
        </div>
      </Card>
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
        Consulte os arquivos publicados em Documentos para conferir o contrato
        assinado. Alterações contratuais devem ser solicitadas pelo suporte.
      </NoticeBox>
    </>
  );
}

async function Units(account: string, page: number) {
  const { rows, count } = await records<Unit>("purifiers", account, page);
  return (
    <>
      <DataTable
        caption="Purificadores da conta"
        columns={[
          { heading: "Série" },
          { heading: "Modelo", secondary: true },
          { heading: "Situação" },
          { heading: "Localização" },
          { heading: "Ativação", secondary: true },
        ]}
        rows={rows.map((u) => [
          u.serial,
          u.model,
          <StatusPill key="s" status={u.status} />,
          [u.city, u.state].filter(Boolean).join(", ") || "—",
          date(u.activation_date),
        ])}
      />
      <Pager page={page} count={count} path="/purificadores" />
      <div>
        <ButtonLink href="/suporte" variant="outline">
          <Headset className="size-4" aria-hidden="true" />
          Solicitar manutenção
        </ButtonLink>
      </div>
    </>
  );
}

async function Documents(account: string, page: number) {
  const { rows, count } = await records<Document>("documents", account, page);
  const { db } = await context();
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
      <DataTable
        caption="Documentos publicados"
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
      <Pager page={page} count={count} path="/documentos" />
      {agreements.data.length > 0 && (
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

async function Payouts(account: string, page: number, view: string) {
  const { rows, count } = await records<Payout>("payouts", account, page);
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <NoticeBox>
        Programado: obrigação registrada, sem confirmação de pagamento.
        Liquidado: a equipe registrou data e referência de liquidação. O portal
        não executa transferências.
      </NoticeBox>
      <DataTable
        caption="Repasses da conta"
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
      <Pager page={page} count={count} path={`/${view}`} />
    </>
  );
}
