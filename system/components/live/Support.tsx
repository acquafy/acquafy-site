import Link from "next/link";
import { LifeBuoy, ShieldAlert } from "lucide-react";
import {
  context,
  records,
  date,
  labels,
  type Ticket,
  type Message,
} from "@/lib/live/data";
import { ticketAction } from "@/lib/live/actions";
import { Card } from "@/components/ui/Card";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { EmptyState } from "@/components/ui/EmptyState";
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
  const { db, staff } = await context();
  const page = Math.max(0, Math.min(100000, parseInt(query.page || "0") || 0));
  if (queue && !staff)
    return (
      <Card>
        <EmptyState icon={ShieldAlert} title="Acesso restrito à equipe." />
      </Card>
    );
  let tickets: Ticket[];
  let count: number;
  if (queue) {
    const r = await db
      .from("support_tickets")
      .select("*", { count: "exact" })
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
  const path = queue ? "/equipe" : "/suporte";
  return (
    <>
      <Notice query={query} />
      {!queue && accountId && (
        <Form
          action={ticketAction}
          kind="create"
          account={accountId}
          title="Abrir chamado"
        >
          <Field name="subject" label="Assunto" />
          <Area
            name="body"
            label="Mensagem"
            minLength={1}
            maxLength={5000}
            hint="A equipe recebe este chamado no portal. Não inclua senhas nem dados bancários completos."
          />
        </Form>
      )}
      <Card title={queue ? "Fila da equipe" : "Chamados da conta"}>
        {tickets.length === 0 ? (
          <EmptyState
            icon={LifeBuoy}
            title="Nenhum chamado registrado"
            description="Quando você abrir um chamado, ele aparece aqui com a situação do atendimento."
          />
        ) : (
          <ul className="divide-y divide-line">
            {tickets.map((t) => (
              <li key={t.id}>
                <Link
                  href={`${path}?page=${page}&ticket=${t.id}`}
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
      {selected && (
        <>
          <Card
            title={`#${selected.number} · ${selected.subject}`}
            action={<StatusPill status={selected.status} label={labels[selected.status]} />}
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
          <Form action={ticketAction} kind="reply" title="Responder">
            <input type="hidden" name="ticket_id" value={selected.id} />
            <input type="hidden" name="queue" value={queue ? "1" : "0"} />
            <input type="hidden" name="page" value={page} />
            <Area name="body" label="Mensagem" rows={3} maxLength={5000} minLength={1} />
          </Form>
          {staff && (
            <Form action={ticketAction} kind="status" title="Atendimento">
              <input type="hidden" name="ticket_id" value={selected.id} />
              <input type="hidden" name="queue" value={queue ? "1" : "0"} />
              <input type="hidden" name="page" value={page} />
              <Select
                name="status"
                label="Situação (atribui a você)"
                options={["open", "in_progress", "resolved"].map((value) => ({
                  value,
                  label: labels[value],
                }))}
              />
            </Form>
          )}
        </>
      )}
    </>
  );
}
