import Link from "next/link";
import { LifeBuoy, Plus, ShieldAlert, X } from "lucide-react";
import {
  context,
  records,
  date,
  labels,
  type Ticket,
  type Message,
} from "@/lib/live/data";
import { ticketAction } from "@/lib/live/actions";
import { ButtonLink } from "@/components/ui/Button";
import { FilterTabs } from "./FilterTabs";
import { Card } from "@/components/ui/Card";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { EmptyState } from "@/components/ui/EmptyState";
import { FormDialog } from "@/components/ui/FormDialog";
import { cn } from "@/lib/cn";
import { Form, Field, Select, Area } from "./Fields";
import { Notice as NoticeBox } from "./Notice";
import { type Query, Notice, Pager } from "./PortalPage";
import { StatusPill } from "./StatusPill";

export async function Support({
  accountId,
  query,
  queue = false,
}: {
  accountId?: string;
  query: Query;
  queue?: boolean;
}) {
  const { db, staff, accounts } = await context();
  const page = Math.max(0, Math.min(100000, parseInt(query.page || "0") || 0));
  if (queue && !staff)
    return (
      <Card>
        <EmptyState icon={ShieldAlert} title="Acesso restrito à equipe." />
      </Card>
    );
  let tickets: Ticket[];
  let count: number;
  // The staff queue starts with what still needs an answer; resolved tickets are one tab away.
  const filter = queue ? (query.situacao === "resolved" || query.situacao === "all" ? query.situacao : "pending") : "all";
  if (queue) {
    let list = db.from("support_tickets").select("*", { count: "exact" });
    if (filter === "pending") list = list.in("status", ["open", "in_progress"]);
    else if (filter === "resolved") list = list.eq("status", "resolved");
    const r = await list
      .order("updated_at", { ascending: false })
      .order("id")
      .range(page * 50, page * 50 + 49);
    if (r.error) throw new Error("Não foi possível carregar os chamados.");
    tickets = r.data as Ticket[];
    count = r.count ?? 0;
  } else if (accountId) {
    const r = await records<Ticket>("support_tickets", accountId, page);
    tickets = r.rows;
    count = r.count;
  } else return null;
  const selected = tickets.find((t) => t.id === query.ticket);
  let messages: Message[] = [];
  if (selected) {
    const r = await db
      .from("support_messages")
      .select("id,ticket_id,from_staff,body,created_at")
      .eq("ticket_id", selected.id)
      .order("created_at")
      .order("id")
      .limit(500);
    if (r.error) throw new Error("Não foi possível carregar a conversa.");
    messages = r.data as Message[];
  }
  const base = queue ? "/equipe" : "/suporte";
  // Keeps the queue filter in every link, so picking a ticket or paging does not drop it.
  const path = queue && filter !== "pending" ? `${base}?situacao=${filter}` : base;
  const withParams = (params: string) => `${path}${path.includes("?") ? "&" : "?"}${params}`;
  const newTicket = !queue && accountId && (
    <FormDialog
      key={query.assunto ?? "new"}
      trigger="Novo chamado"
      icon={<Plus className="size-5" aria-hidden="true" />}
      title="Abrir chamado"
      description="A equipe recebe este chamado no portal. Não inclua senhas nem dados bancários completos."
      defaultOpen={Boolean(query.novo)}
    >
      <Form action={ticketAction} kind="create" account={accountId} title="Abrir chamado" submit="Enviar chamado">
        <Field name="subject" label="Assunto" defaultValue={query.assunto?.slice(0, 160)} />
        <Area name="body" label="Mensagem" minLength={1} maxLength={5000} rows={6} />
      </Form>
    </FormDialog>
  );
  return (
    <>
      <Notice query={query} />
      {queue && (
        <FilterTabs
          label="Filtrar chamados"
          tabs={[
            { href: base, label: "Pendentes", active: filter === "pending" },
            { href: `${base}?situacao=resolved`, label: "Resolvidos", active: filter === "resolved" },
            { href: `${base}?situacao=all`, label: "Todos", active: filter === "all" },
          ]}
        />
      )}
      <div className="grid items-start gap-4 @4xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <Card title={queue ? "Fila da equipe" : "Chamados da conta"} action={newTicket || undefined}>
          {tickets.length === 0 ? (
            <EmptyState
              icon={LifeBuoy}
              title={queue ? (filter === "pending" ? "Nenhum chamado pendente" : "Nenhum chamado nesta lista") : "Nenhum chamado registrado"}
              description={queue ? "Chamados abertos pelas contas aparecem aqui." : "Precisa de ajuda? Abra um chamado e acompanhe a resposta da equipe por aqui."}
              action={newTicket || undefined}
            />
          ) : (
            <ul className="divide-y divide-line">
              {tickets.map((t) => (
                <li key={t.id}>
                  <Link
                    href={withParams(`page=${page}&ticket=${t.id}`)}
                    aria-current={t.id === selected?.id ? "true" : undefined}
                    className={cn(
                      "flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 rounded-lg px-2 py-3 hover:bg-brand-soft/50 focus-visible:outline-2 focus-visible:outline-brand",
                      t.id === selected?.id && "bg-brand-soft/60",
                    )}
                  >
                    <span className="min-w-0 text-[15px] font-bold text-ink [overflow-wrap:anywhere]">
                      #{t.number} · {t.subject}
                    </span>
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-ink-soft">
                      {queue && accounts.find((a) => a.id === t.account_id)?.name}
                      <StatusPill status={t.status} />
                      <span className="tabular">{date(t.updated_at)}</span>
                      {t.assigned_to && <span>Atribuído à equipe</span>}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Pager page={page} count={count} path={path} />
          </div>
        </Card>
        {selected ? (
          // On narrow screens the conversation comes first, so picking a ticket from the list shows it without scrolling.
          <div className="order-first grid gap-4 @4xl:order-none">
            <Card
              title={`#${selected.number} · ${selected.subject}`}
              action={
                <span className="flex flex-wrap items-center gap-2">
                  <StatusPill status={selected.status} label={labels[selected.status]} />
                  {staff && (
                    <FormDialog
                      trigger="Alterar situação"
                      variant="outline"
                      size="sm"
                      title="Situação do atendimento"
                      description="Ao alterar a situação, o chamado é atribuído a você."
                      dialogSize="sm"
                    >
                      <Form action={ticketAction} kind="status" title="Atendimento">
                        <input type="hidden" name="ticket_id" value={selected.id} />
                        <input type="hidden" name="queue" value={queue ? "1" : "0"} />
                        <input type="hidden" name="page" value={page} />
                        <Select
                          name="status"
                          label="Situação"
                          defaultValue={selected.status}
                          options={["open", "in_progress", "resolved"].map((value) => ({
                            value,
                            label: labels[value],
                          }))}
                        />
                      </Form>
                    </FormDialog>
                  )}
                  <ButtonLink href={withParams(`page=${page}`)} variant="ghost" size="sm">
                    <X className="size-4" aria-hidden="true" />
                    Fechar
                  </ButtonLink>
                </span>
              }
            >
              <ul className="flex flex-col gap-3" aria-label="Mensagens do chamado">
                {messages.map((m) => (
                  <ChatBubble
                    key={m.id}
                    from={m.from_staff === Boolean(staff) ? "me" : "them"}
                    author={m.from_staff ? "Equipe Acquafy" : staff ? "Cliente" : "Você"}
                    time={date(m.created_at)}
                  >
                    {m.body}
                  </ChatBubble>
                ))}
              </ul>
              {messages.length === 500 && (
                <NoticeBox tone="warn" className="mt-4">
                  Exibindo as primeiras 500 mensagens. Solicite à equipe o histórico
                  completo.
                </NoticeBox>
              )}
            </Card>
            <Form action={ticketAction} kind="reply" title="Responder" submit="Enviar resposta">
              <input type="hidden" name="ticket_id" value={selected.id} />
              <input type="hidden" name="queue" value={queue ? "1" : "0"} />
              <input type="hidden" name="page" value={page} />
              <Area name="body" label="Sua resposta" rows={3} maxLength={5000} minLength={1} />
            </Form>
          </div>
        ) : (
          tickets.length > 0 && (
            <Card className="hidden @4xl:block">
              <EmptyState icon={LifeBuoy} title="Selecione um chamado" description="A conversa e a resposta aparecem aqui." />
            </Card>
          )
        )}
      </div>
    </>
  );
}
