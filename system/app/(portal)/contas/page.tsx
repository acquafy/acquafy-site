import Form from "next/form";
import { Plus } from "lucide-react";
import { requireAdmin, userEmails } from "@/lib/live/admin";
import { literalSearch, pageNumber } from "@/lib/live/admin-view";
import { money, type Account } from "@/lib/live/data";
import { adminAction, setAccountStatus } from "@/lib/live/actions";
import { DataTable } from "@/components/live/DataTable";
import { Field, Form as ActionFormCard } from "@/components/live/Fields";
import { FilterTabs } from "@/components/live/FilterTabs";
import { OpenAccountButtons } from "@/components/live/OpenAccountButtons";
import { PageHeader } from "@/components/live/PageHeader";
import { Notice, Pager, type Query } from "@/components/live/PortalPage";
import { StatusPill } from "@/components/live/StatusPill";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/Field";
import { FormDialog } from "@/components/ui/FormDialog";

export const metadata = { title: "Contas" };

type Params = Query & { q?: string; situacao?: string };

export default async function Accounts({ searchParams }: { searchParams: Promise<Params> }) {
  const ctx = await requireAdmin();
  const query = await searchParams;
  const term = (query.q ?? "").trim();
  const status = query.situacao === "active" || query.situacao === "suspended" ? query.situacao : undefined;
  const page = pageNumber(query.page);

  // Account names are searched directly; an exact e-mail resolves to the accounts that person belongs to.
  let onlyIds: string[] | undefined;
  if (term.includes("@")) {
    const { data: userId, error } = await ctx.db.rpc("enrollment_lookup_user", { email_address: term });
    if (error) throw new Error("Não foi possível pesquisar o e-mail.");
    const members = userId ? await ctx.db.from("account_memberships").select("account_id").eq("user_id", userId) : { data: [], error: null };
    if (members.error) throw new Error("Não foi possível pesquisar o e-mail.");
    onlyIds = (members.data ?? []).map((m) => m.account_id as string);
  }
  let list = ctx.db.from("accounts").select("id,name,status", { count: "exact" });
  if (onlyIds) list = list.in("id", onlyIds);
  else if (term) list = list.ilike("name", `%${literalSearch(term)}%`);
  if (status) list = list.eq("status", status);
  const { data, error, count } = await list.order("name").order("id").range(page * 50, page * 50 + 49);
  if (error) throw new Error("Não foi possível carregar as contas.");
  const accounts = data as Account[];
  const ids = accounts.map((a) => a.id);

  const [members, contracts, enrollments, orders] = await Promise.all([
    ctx.db.from("account_memberships").select("account_id,user_id,role,active").in("account_id", ids),
    ctx.db.from("contracts").select("account_id,status,invested_amount").in("account_id", ids),
    ctx.db.from("investor_enrollments").select("account_id").in("account_id", ids),
    ctx.db.from("product_orders").select("account_id").in("account_id", ids),
  ]);
  if (members.error || contracts.error || enrollments.error || orders.error) throw new Error("Não foi possível carregar as contas.");
  const emails = await userEmails(members.data.map((m) => m.user_id as string));

  const filters = new URLSearchParams();
  if (term) filters.set("q", term);
  const tab = (situacao?: string) => {
    const params = new URLSearchParams(filters);
    if (situacao) params.set("situacao", situacao);
    return "/contas" + (params.size ? "?" + params : "");
  };

  return (
    <>
      <PageHeader
        title="Contas"
        subtitle="Todas as contas de investidores e clientes. Abra uma conta para consultá-la ou gerenciá-la."
        action={
          <FormDialog trigger="Criar conta" icon={<Plus className="size-5" aria-hidden="true" />} title="Criar conta" description="A nova conta abre em seguida, pronta para receber membros, contratos e documentos." dialogSize="sm">
            <ActionFormCard action={adminAction} kind="account" title="Criar conta" submit="Criar conta">
              <Field name="name" label="Nome da pessoa ou empresa" />
            </ActionFormCard>
          </FormDialog>
        }
      />
      <Notice query={query} />
      <Form action="/contas" className="flex flex-wrap items-center gap-2">
        <SearchInput label="Pesquisar por nome da conta ou e-mail completo" name="q" defaultValue={term} placeholder="Nome da conta ou e-mail completo" maxLength={254} wrapperClassName="min-w-0 flex-1" />
        {status && <input type="hidden" name="situacao" value={status} />}
        <Button type="submit" variant="outline">
          Pesquisar
        </Button>
      </Form>
      <FilterTabs
        label="Filtrar por situação"
        tabs={[
          { href: tab(), label: "Todas", active: !status },
          { href: tab("active"), label: "Ativas", active: status === "active" },
          { href: tab("suspended"), label: "Suspensas", active: status === "suspended" },
        ]}
      />
      <DataTable
        caption="Contas cadastradas"
        columns={[{ heading: "Conta" }, { heading: "Membros", secondary: true }, { heading: "Contratos", align: "right", secondary: true }, { heading: "Investimento (USD)", align: "right", secondary: true }, { heading: "Ações" }]}
        empty={term || status ? "Nenhuma conta encontrada com esses filtros." : "Nenhuma conta cadastrada. Use o botão “Criar conta” para cadastrar a primeira."}
        rows={accounts.map((a) => {
          const own = contracts.data.filter((c) => c.account_id === a.id && c.status !== "draft");
          const investor = own.length > 0 || enrollments.data.some((e) => e.account_id === a.id);
          const customer = orders.data.some((o) => o.account_id === a.id);
          const people = members.data.filter((m) => m.account_id === a.id && m.active);
          return [
            <div key="name" className="grid justify-items-start gap-1.5">
              <span className="font-bold text-ink">{a.name}</span>
              <span className="flex flex-wrap gap-1.5">
                <StatusPill status={a.status} label={a.status === "active" ? "Ativa" : "Suspensa"} />
                {investor && <Badge tone="violet">Investidor</Badge>}
                {customer && <Badge tone="brand">Cliente</Badge>}
              </span>
            </div>,
            people.length ? (
              <ul key="members" className="grid gap-0.5">
                {people.map((m) => (
                  <li key={m.user_id}>
                    {emails.get(m.user_id) ?? "E-mail indisponível"}
                    {m.role === "owner" && <span className="text-ink-soft"> · Representante</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <span key="members" className="text-ink-soft">
                Sem membros
              </span>
            ),
            own.length,
            money(own.reduce((sum, c) => sum + Number(c.invested_amount), 0)),
            <div key="actions" className="flex flex-wrap items-center gap-2">
              <OpenAccountButtons accountId={a.id} name={a.name} />
              {a.status === "suspended" ? (
                <form action={setAccountStatus}>
                  <input type="hidden" name="account_id" value={a.id} />
                  <input type="hidden" name="status" value="active" />
                  <Button type="submit" variant="ghost" size="sm" aria-label={`Reativar ${a.name}`}>
                    Reativar
                  </Button>
                </form>
              ) : (
                <FormDialog trigger="Suspender" triggerLabel={`Suspender ${a.name}`} variant="danger" size="sm" title={`Suspender ${a.name}?`} description="Os membros perdem o acesso até a reativação. Nenhum dado é apagado." dialogSize="sm">
                  <ActionFormCard action={setAccountStatus} kind="account_status" account={a.id} title="Suspender conta" submit="Confirmar suspensão" variant="danger">
                    <input type="hidden" name="status" value="suspended" />
                  </ActionFormCard>
                </FormDialog>
              )}
            </div>,
          ];
        })}
      />
      <Pager page={page} count={count ?? 0} path={tab(status)} />
    </>
  );
}
