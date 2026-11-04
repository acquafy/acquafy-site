import Link from "next/link";
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
      <p role="alert" className="live-note live-error">
        {query.error === "account"
          ? "A conta selecionada mudou. Confira os dados e tente novamente."
          : query.error === "duplicate"
            ? "Já existe um registro com esse número, série ou período."
            : query.error === "file"
              ? "Envie um PDF válido de até 10 MB."
              : "Não foi possível salvar. Confira os campos e suas permissões e tente novamente."}
      </p>
    );
  return query.saved ? (
    <p role="status" className="live-note live-success">
      Registro salvo.
    </p>
  ) : null;
}
function Table({
  headings,
  rows,
}: {
  headings: string[];
  rows: React.ReactNode[][];
}) {
  return rows.length ? (
    <div className="live-card">
      <table className="live-table">
        <thead>
          <tr>
            {headings.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="live-card live-muted">
      Nenhum registro cadastrado para esta conta.
    </p>
  );
}
function Pager({
  page,
  count,
  path,
}: {
  page: number;
  count: number;
  path: string;
}) {
  return (
    <div className="live-pager">
      <span>{count} registros</span>
      {page > 0 && <Link href={`${path}?page=${page - 1}`}>← Anterior</Link>}
      {(page + 1) * 50 < count && (
        <Link href={`${path}?page=${page + 1}`}>Próxima →</Link>
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
      <h1>{titles[view]}</h1>
      <p className="live-muted">{account?.name ?? "Nenhuma conta vinculada"}</p>
      <Notice query={query} />
      {!account ? (
        <div className="live-card">
          <h2>Seu acesso está ativo</h2>
          <p>
            Um administrador precisa vincular uma conta para liberar contratos,
            equipamentos e documentos.
          </p>
          {ctx.staff === "admin" && (
            <Link className="live-link" href="/admin">
              Criar ou vincular uma conta
            </Link>
          )}
        </div>
      ) : view === "suporte" ? (
        <Support accountId={account.id} query={query} />
      ) : view === "home" || view === "dashboard" ? (
        await Overview(account.id)
      ) : view === "perfil" ? (
        <div className="live-card">
          <h2>Identidade autenticada</h2>
          <p>{ctx.user.email}</p>
          <p className="live-note">
            Perfil e dados bancários não são editáveis nesta versão. Para
            alterar dados ou recuperar acesso, abra um chamado. Não envie senhas
            nem números completos de contas bancárias.
          </p>
          <Link className="live-link" href="/suporte">
            Abrir chamado
          </Link>
        </div>
      ) : view === "solicitar" ? (
        <div className="live-card">
          <h2>Converse com a equipe</h2>
          <p>
            Novas aquisições, manutenção, aditivos e recompra são tratados pelo
            suporte nesta versão. Nenhum pagamento é iniciado pelo portal.
          </p>
          <Link className="live-link" href="/suporte">
            Enviar solicitação à equipe
          </Link>
        </div>
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
      <div className="live-grid">
        {[
          ["Contratos", s.contracts],
          ["Purificadores", s.units],
          ["Investimento registrado", money(s.invested)],
          ["Repasses liquidados", money(s.settled)],
          ["Repasses programados", money(s.scheduled)],
        ].map(([label, value]) => (
          <div className="live-card" key={label}>
            <p className="live-muted">{label}</p>
            <p className="live-metric">{value}</p>
          </div>
        ))}
      </div>
      <p className="live-note">
        Valores em USD, conforme os registros publicados pela equipe. A data de
        vencimento não confirma a liquidação de um repasse.
      </p>
      <div className="live-card">
        <h2>Atalhos</h2>
        <div className="live-pager">
          <Link className="live-link" href="/documentos">
            Documentos
          </Link>
          <Link className="live-link" href="/extrato">
            Extrato
          </Link>
          <Link className="live-link" href="/suporte">
            Falar com a equipe
          </Link>
        </div>
      </div>
    </>
  );
}
async function Contracts(account: string, page: number) {
  const { rows, count } = await records<Contract>("contracts", account, page);
  const {db}=await context();
  const enrolled=rows.length?await db.from('investor_enrollments').select('id,contract_id').eq('account_id',account).in('contract_id',rows.map(row=>row.id)):{data:[],error:null};
  if(enrolled.error)throw new Error('Não foi possível carregar os acordos.');
  return (
    <>
      <Table
        headings={[
          "Contrato",
          "Título",
          "Situação",
          "Início",
          "Término",
          "Investimento (USD)",
          "Acordo",
        ]}
        rows={rows.map((c) => [
          c.number,
          c.title,
          labels[c.status],
          date(c.starts_on),
          date(c.ends_on),
          money(c.invested_amount),
          enrolled.data?.find(e=>e.contract_id===c.id)?<a key={c.id} className="live-link" href={'/app/api/agreements/'+enrolled.data.find(e=>e.contract_id===c.id)!.id}>Baixar acordo aceito</a>:<Link key={c.id} className="live-link" href="/documentos">Documentos</Link>,
        ])}
      />
      <Pager page={page} count={count} path="/contrato" />
      <p className="live-note">
        Consulte os arquivos publicados em Documentos para conferir o contrato
        assinado. Alterações contratuais devem ser solicitadas pelo suporte.
      </p>
    </>
  );
}
async function Units(account: string, page: number) {
  const { rows, count } = await records<Unit>("purifiers", account, page);
  return (
    <>
      <Table
        headings={["Série", "Modelo", "Situação", "Localização", "Ativação"]}
        rows={rows.map((u) => [
          u.serial,
          u.model,
          labels[u.status],
          [u.city, u.state].filter(Boolean).join(", ") || "—",
          date(u.activation_date),
        ])}
      />
      <Pager page={page} count={count} path="/purificadores" />
      <Link className="live-link" href="/suporte">
        Solicitar manutenção
      </Link>
    </>
  );
}
async function Documents(account: string, page: number) {
  const { rows, count } = await records<Document>("documents", account, page);
  const {db}=await context();const agreements=await db.from('investor_enrollments').select('id,created_at').eq('account_id',account).in('status',['accepted','payment_pending','active','payment_review']).order('created_at',{ascending:false}).limit(100);
  if(agreements.error)throw new Error('Não foi possível carregar os acordos.');
  return (
    <>
      <p className="live-note">
        Arquivos privados publicados pela equipe para esta conta.
      </p>
      <Table
        headings={["Documento", "Publicado em", "Tamanho", "Arquivo"]}
        rows={rows.map((d) => [
          d.title,
          date(d.created_at),
          `${Math.ceil(d.size_bytes / 1024)} KB`,
          <a
            className="live-link"
            key={d.id}
            href={`/app/api/documents/${d.id}`}
          >
            Baixar PDF
          </a>,
        ])}
      />
      <Pager page={page} count={count} path="/documentos" />
      {agreements.data.length>0&&<section className="live-card"><h2>Acordos aceitos na plataforma</h2><ul>{agreements.data.map(agreement=><li key={agreement.id}><a className="live-link" href={'/app/api/agreements/'+agreement.id}>Acordo e evidência do aceite · {date(agreement.created_at)}</a></li>)}</ul></section>}
    </>
  );
}
async function Payouts(account: string, page: number, view: string) {
  const { rows, count } = await records<Payout>("payouts", account, page);
  return (
    <>
      <p className="live-note">
        Programado: obrigação registrada, sem confirmação de pagamento.
        Liquidado: a equipe registrou data e referência de liquidação. O portal
        não executa transferências.
      </p>
      <Table
        headings={[
          "Período",
          "Vencimento",
          "Valor (USD)",
          "Situação",
          "Liquidação",
          "Referência",
        ]}
        rows={rows.map((p) => [
          `${date(p.period_start)} – ${date(p.period_end)}`,
          date(p.due_on),
          money(p.amount),
          p.status === "scheduled" &&
          p.due_on < new Date().toISOString().slice(0, 10)
            ? "Programado · vencido"
            : labels[p.status],
          date(p.settled_on),
          p.reference || "—",
        ])}
      />
      <Pager page={page} count={count} path={`/${view}`} />
    </>
  );
}
