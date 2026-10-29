// components/sections/SupportTickets.tsx
"use client";

import { useState, type FormEvent } from "react";
import { Inbox, MessageSquareText, Paperclip, RotateCcw, Send, CircleCheck } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { EmptyState } from "@/components/ui/EmptyState";
import { TextArea } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { Modal } from "@/components/ui/Modal";
import { Pagination } from "@/components/ui/Pagination";
import { TabPanel, Tabs, type TabItem } from "@/components/ui/Tabs";
import { TICKET_PRIORITY, TICKET_STATUS, categoryLabel, type Ticket, type TicketStatus } from "@/config/support-page";
import { formatDate, type IsoDate } from "@/lib/format";

const PAGE_SIZE = 6;
type Filter = "all" | TicketStatus;

type Props = { tickets: Ticket[]; today: IsoDate; onUpdate: (id: string, change: (t: Ticket) => Ticket) => void; onOpenForm: () => void };

function StatusBadge({ status }: { status: TicketStatus }) {
  const s = TICKET_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: Ticket["priority"] }) {
  const p = TICKET_PRIORITY[priority];
  return <Badge tone={p.tone}>{p.label}</Badge>;
}

export function SupportTickets({ tickets, today, onUpdate, onOpenForm }: Props) {
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState<string | undefined>();

  const sorted = [...tickets].sort((a, b) => (a.updatedAt === b.updatedAt ? Number(b.id) - Number(a.id) : a.updatedAt < b.updatedAt ? 1 : -1));
  const count = (s: TicketStatus) => tickets.filter((t) => t.status === s).length;
  const tabs: TabItem<Filter>[] = [
    { id: "all", label: "Todos", count: tickets.length },
    { id: "open", label: "Abertos", count: count("open") },
    { id: "progress", label: "Em andamento", count: count("progress") },
    { id: "resolved", label: "Resolvidos", count: count("resolved") },
  ];

  const rows = filter === "all" ? sorted : sorted.filter((t) => t.status === filter);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const open = tickets.find((t) => t.id === openId) ?? null;

  const openTicket = (id: string) => {
    setReply("");
    setReplyError(undefined);
    setOpenId(id);
  };

  const sendReply = (e: FormEvent) => {
    e.preventDefault();
    if (!open) return;
    const text = reply.trim();
    if (!text) {
      setReplyError("Escreva uma mensagem antes de enviar.");
      return;
    }
    onUpdate(open.id, (t) => ({
      ...t,
      updatedAt: today,
      messages: [...t.messages, { id: `${t.id}-${t.messages.length + 1}`, from: "me", author: "Você", date: today, text }],
    }));
    setReply("");
    setReplyError(undefined);
    toast({ title: "Resposta enviada", description: `Chamado #${open.id} atualizado.` });
  };

  const setStatus = (status: TicketStatus) => {
    if (!open) return;
    onUpdate(open.id, (t) => ({ ...t, status, updatedAt: today }));
    toast(
      status === "resolved"
        ? { title: "Chamado resolvido", description: `#${open.id} foi marcado como resolvido.` }
        : { title: "Chamado reaberto", description: `#${open.id} voltou para a fila da equipe.` },
    );
  };

  return (
    <Card
      id="meus-chamados"
      container
      title="Meus chamados"
      action={
        <Button variant="soft" size="sm" onClick={onOpenForm}>
          Novo chamado
        </Button>
      }
    >
      <Tabs
        items={tabs}
        value={filter}
        onChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        label="Filtrar chamados por status"
        idPrefix="tickets"
        className="mb-3"
      />
      <TabPanel idPrefix="tickets" value={filter}>
        {rows.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="Nenhum chamado nesse filtro"
            description={tickets.length === 0 ? "Você ainda não abriu chamados." : "Escolha outro status para ver seus chamados."}
            action={tickets.length === 0 ? <Button onClick={onOpenForm}>Abrir chamado</Button> : undefined}
          />
        ) : (
          <div className="rounded-lg border border-line">
            <table className="w-full text-left text-[14px]">
              <caption className="sr-only">Chamados de suporte</caption>
              <thead>
                <tr className="bg-canvas/70 text-[12.5px] font-bold text-ink">
                  <th scope="col" className="rounded-tl-xl px-3 py-2.5">
                    Chamado
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[760px]:table-cell">
                    Categoria
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[560px]:table-cell">
                    Prioridade
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[900px]:table-cell">
                    Criado em
                  </th>
                  <th scope="col" className="hidden px-3 py-2.5 @[660px]:table-cell">
                    Atualizado
                  </th>
                  <th scope="col" className="px-3 py-2.5">
                    Status
                  </th>
                  <th scope="col" className="rounded-tr-xl px-3 py-2.5 text-right">
                    <span className="sr-only">Abrir</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((t) => (
                  <tr key={t.id} className="border-t border-line/70">
                    <th scope="row" className="min-w-0 px-3 py-2.5 text-left font-normal">
                      <button
                        type="button"
                        onClick={() => openTicket(t.id)}
                        className="block max-w-full rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        <span className="tabular text-[13px] font-bold text-brand">#{t.id}</span>
                        <span className="block max-w-[26rem] truncate font-semibold text-ink hover:text-brand">{t.subject}</span>
                      </button>
                    </th>
                    <td className="hidden px-3 py-2.5 whitespace-nowrap @[760px]:table-cell">{categoryLabel(t.category)}</td>
                    <td className="hidden px-3 py-2.5 @[560px]:table-cell">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="tabular hidden px-3 py-2.5 whitespace-nowrap @[900px]:table-cell">{formatDate(t.createdAt)}</td>
                    <td className="tabular hidden px-3 py-2.5 whitespace-nowrap @[660px]:table-cell">{formatDate(t.updatedAt)}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge status={t.status} />
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex justify-end">
                        <IconButton icon={MessageSquareText} label={`Abrir conversa do chamado #${t.id}`} bordered onClick={() => openTicket(t.id)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pages > 1 && (
          <Pagination
            className="mt-3"
            page={current}
            pages={pages}
            onChange={setPage}
            summary={`Exibindo ${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, rows.length)} de ${rows.length} chamados`}
          />
        )}
      </TabPanel>

      <Modal
        open={!!open}
        onClose={() => setOpenId(null)}
        size="lg"
        title={open ? `Chamado #${open.id}` : "Chamado"}
        description={open?.subject}
        footer={
          open && (
            <>
              {open.status === "resolved" ? (
                <Button variant="outline" onClick={() => setStatus("open")}>
                  <RotateCcw className="size-4" aria-hidden="true" />
                  Reabrir chamado
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setStatus("resolved")}>
                  <CircleCheck className="size-4" aria-hidden="true" />
                  Marcar como resolvido
                </Button>
              )}
              <Button type="submit" form="ticket-reply-form" disabled={open.status === "resolved"}>
                <Send className="size-4" aria-hidden="true" />
                Enviar resposta
              </Button>
            </>
          )
        }
      >
        {open && (
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={open.status} />
              <PriorityBadge priority={open.priority} />
              <Badge tone="neutral">{categoryLabel(open.category)}</Badge>
              <span className="tabular text-[13px] text-ink-soft">
                Criado em {formatDate(open.createdAt)} · Atualizado em {formatDate(open.updatedAt)}
              </span>
            </div>
            <ul aria-label="Conversa do chamado" className="grid gap-4">
              {open.messages.map((m) => (
                <ChatBubble key={m.id} from={m.from === "team" ? "them" : "me"} author={m.author} time={formatDate(m.date)}>
                  {m.text}
                  {m.attachment && (
                    <span className="mt-2 flex items-center gap-1.5 text-[13px] opacity-90">
                      <Paperclip className="size-3.5" aria-hidden="true" />
                      {m.attachment}
                    </span>
                  )}
                </ChatBubble>
              ))}
            </ul>
            <form id="ticket-reply-form" onSubmit={sendReply} noValidate>
              {open.status === "resolved" && <p className="mb-2 rounded-lg bg-ok-soft px-3.5 py-2.5 text-[13.5px] text-ok">Este chamado está resolvido. Reabra-o para enviar novas mensagens.</p>}
              <TextArea
                label="Sua resposta"
                rows={3}
                value={reply}
                disabled={open.status === "resolved"}
                error={replyError}
                placeholder="Escreva uma mensagem para a equipe Acquafy…"
                onChange={(e) => {
                  setReply(e.target.value);
                  setReplyError(undefined);
                }}
              />
            </form>
          </div>
        )}
      </Modal>
    </Card>
  );
}
