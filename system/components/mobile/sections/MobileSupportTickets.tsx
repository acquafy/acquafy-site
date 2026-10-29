// components/mobile/sections/MobileSupportTickets.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { CircleCheck, Inbox, Paperclip, Plus, RotateCcw, Send, X } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSelect, MobileTextArea, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { ChatBubble } from "@/components/ui/ChatBubble";
import { FieldFrame } from "@/components/ui/Field";
import {
  ATTACHMENT_MAX_BYTES,
  PRIORITY_OPTIONS,
  TICKET_CATEGORIES,
  TICKET_PRIORITY,
  TICKET_STATUS,
  categoryLabel,
  type Ticket,
  type TicketCategory,
  type TicketPriority,
  type TicketStatus,
} from "@/config/support-page";
import { formatBytes } from "@/lib/fileActions";
import { formatDate, type IsoDate } from "@/lib/format";
import { useHeld } from "@/lib/mobile/useHeld";

type Filter = "all" | TicketStatus;
type Errors = Partial<Record<"subject" | "category" | "description" | "file", string>>;

const NEW_FORM_ID = "m-ticket-form";
const REPLY_FORM_ID = "m-ticket-reply-form";

export function nextTicketId(tickets: Ticket[]): string {
  return String(tickets.reduce((max, t) => Math.max(max, Number(t.id) || 0), 1000) + 1);
}

function StatusBadge({ status }: { status: TicketStatus }) {
  const s = TICKET_STATUS[status];
  return (
    <Badge tone={s.tone} dot>
      {s.label}
    </Badge>
  );
}

function NewTicketSheet({
  open,
  onClose,
  today,
  tickets,
  initialSubject,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  today: IsoDate;
  tickets: Ticket[];
  initialSubject: string;
  onCreate: (t: Ticket) => void;
}) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [category, setCategory] = useState<TicketCategory | "">("");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const subjectValue = subject ?? initialSubject;

  const reset = () => {
    setSubject(null);
    setCategory("");
    setPriority("medium");
    setDescription("");
    setFile(null);
    setFileKey((k) => k + 1);
    setErrors({});
  };
  const close = () => {
    onClose();
    window.setTimeout(reset, 260);
  };

  const pickFile = (picked: File | null) => {
    if (!picked) {
      setFile(null);
      setErrors((e) => ({ ...e, file: undefined }));
      return;
    }
    if (picked.size > ATTACHMENT_MAX_BYTES) {
      setFile(null);
      setFileKey((k) => k + 1);
      setErrors((e) => ({ ...e, file: `O arquivo “${picked.name}” tem ${formatBytes(picked.size)}. O limite é 5 MB.` }));
      return;
    }
    setFile(picked);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: Errors = { file: errors.file };
    if (subjectValue.trim().length < 5) found.subject = "Descreva o assunto em pelo menos 5 caracteres.";
    if (!category) found.category = "Selecione uma categoria.";
    if (description.trim().length < 20) found.description = "Conte um pouco mais: a descrição precisa ter pelo menos 20 caracteres.";
    setErrors(found);
    if (Object.values(found).some(Boolean)) {
      window.setTimeout(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }
    const id = nextTicketId(tickets);
    onCreate({
      id,
      subject: subjectValue.trim(),
      category: category as TicketCategory,
      priority,
      status: "open",
      createdAt: today,
      updatedAt: today,
      messages: [{ id: `${id}-1`, from: "me", author: "Você", date: today, text: description.trim(), attachment: file?.name }],
    });
    toast({ title: `Chamado #${id} aberto`, description: "Nossa equipe responde em até 1 dia útil. Acompanhe em Meus chamados." });
    close();
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Abrir chamado"
      description="Conte o que você precisa; respondemos em até 1 dia útil."
      footer={
        <MobileButton type="submit" form={NEW_FORM_ID} size="lg" full>
          <Send className="size-5" aria-hidden="true" />
          Enviar chamado
        </MobileButton>
      }
    >
      <form id={NEW_FORM_ID} ref={form} onSubmit={submit} noValidate className="grid gap-4">
        <MobileTextField
          label="Assunto"
          value={subjectValue}
          maxLength={120}
          placeholder="Resuma o que você precisa"
          error={errors.subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setErrors((x) => ({ ...x, subject: undefined }));
          }}
        />
        <MobileSelect
          label="Categoria"
          options={TICKET_CATEGORIES}
          value={category}
          error={errors.category}
          onChange={(e) => {
            setCategory(e.target.value as TicketCategory | "");
            setErrors((x) => ({ ...x, category: undefined }));
          }}
        />
        <MobileSelect label="Prioridade" options={PRIORITY_OPTIONS} value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)} />
        <MobileTextArea
          label="Descrição"
          rows={5}
          value={description}
          maxLength={2000}
          placeholder="Explique com detalhes: o que aconteceu, datas, números de série…"
          error={errors.description}
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((x) => ({ ...x, description: undefined }));
          }}
        />
        <FieldFrame label="Anexo (opcional)" hint={file ? undefined : "PNG, JPG, PDF ou documento de até 5 MB."} error={errors.file}>
          {({ id, describedBy, invalid }) => (
            <>
              <input
                key={fileKey}
                id={id}
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.txt"
                aria-invalid={invalid || undefined}
                aria-describedby={describedBy}
                onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                className="block w-full cursor-pointer rounded-[12px] bg-card text-[15px] text-ink-soft file:mr-3 file:min-h-11 file:cursor-pointer file:border-0 file:bg-brand-soft file:px-4 file:text-[15px] file:font-semibold file:text-brand focus-visible:outline-2 focus-visible:outline-brand/40"
              />
              {file && (
                <p className="mt-2 flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <Paperclip className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">
                    {file.name} · {formatBytes(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setFileKey((k) => k + 1);
                    }}
                    aria-label={`Remover anexo ${file.name}`}
                    className="grid size-11 place-items-center rounded-md text-ink-soft focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </p>
              )}
            </>
          )}
        </FieldFrame>
      </form>
    </MobileSheet>
  );
}

type Props = {
  tickets: Ticket[];
  today: IsoDate;
  onCreate: (t: Ticket) => void;
  onUpdate: (id: string, change: (t: Ticket) => Ticket) => void;
  newTicket: { open: boolean; subject: string };
  onNewTicket: (open: boolean, subject?: string) => void;
};

/** "Meus chamados": status filter chips, one row per ticket, the conversation sheet (reply / resolve / reopen) and the new-ticket sheet. */
export function MobileSupportTickets({ tickets, today, onCreate, onUpdate, newTicket, onNewTicket }: Props) {
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [replyError, setReplyError] = useState<string | undefined>();
  const open = useHeld(tickets.find((t) => t.id === openId) ?? null);

  const sorted = [...tickets].sort((a, b) => (a.updatedAt === b.updatedAt ? Number(b.id) - Number(a.id) : a.updatedAt < b.updatedAt ? 1 : -1));
  const count = (s: TicketStatus) => tickets.filter((t) => t.status === s).length;
  const rows = filter === "all" ? sorted : sorted.filter((t) => t.status === filter);

  const sendReply = (e: FormEvent) => {
    e.preventDefault();
    if (!open) return;
    const text = reply.trim();
    if (!text) {
      setReplyError("Escreva uma mensagem antes de enviar.");
      return;
    }
    onUpdate(open.id, (t) => ({ ...t, updatedAt: today, messages: [...t.messages, { id: `${t.id}-${t.messages.length + 1}`, from: "me", author: "Você", date: today, text }] }));
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
    <section aria-label="Meus chamados" className="grid grid-cols-[minmax(0,1fr)] gap-3">
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 className="text-[18px] font-bold tracking-tight text-ink">Meus chamados</h2>
        <MobileButton variant="soft" size="sm" onClick={() => onNewTicket(true)}>
          <Plus className="size-4" aria-hidden="true" />
          Novo chamado
        </MobileButton>
      </div>
      <MobileChipRow label="Filtrar chamados por status">
        <MobileChip selected={filter === "all"} count={tickets.length} onClick={() => setFilter("all")}>
          Todos
        </MobileChip>
        {(["open", "progress", "resolved"] as const).map((s) => (
          <MobileChip key={s} selected={filter === s} count={count(s)} onClick={() => setFilter(s)}>
            {TICKET_STATUS[s].label}
          </MobileChip>
        ))}
      </MobileChipRow>

      {rows.length === 0 ? (
        <MobileEmptyState
          icon={Inbox}
          title="Nenhum chamado nesse filtro"
          description={tickets.length === 0 ? "Você ainda não abriu chamados." : "Escolha outro status para ver seus chamados."}
          action={tickets.length === 0 && <MobileButton onClick={() => onNewTicket(true)}>Abrir chamado</MobileButton>}
        />
      ) : (
        <ul className="grid gap-2.5">
          {rows.map((t) => (
            <li key={t.id} className="min-w-0">
              <button
                type="button"
                onClick={() => {
                  setReply("");
                  setReplyError(undefined);
                  setOpenId(t.id);
                }}
                aria-label={`Chamado ${t.id}: ${t.subject}, ${TICKET_STATUS[t.status].label}. Abrir conversa`}
                className="flex min-h-[72px] w-full items-center gap-3 rounded-[14px] bg-card p-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60"
              >
                <span className="min-w-0 flex-1">
                  <span className="tabular block text-[13px] font-bold text-brand">#{t.id}</span>
                  <span className="block truncate text-[15px] font-semibold text-ink">{t.subject}</span>
                  <span className="tabular block text-[12.5px] text-ink-soft">
                    {categoryLabel(t.category)} · atualizado em {formatDate(t.updatedAt)}
                  </span>
                </span>
                <StatusBadge status={t.status} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <MobileSheet
        open={!!openId}
        onClose={() => setOpenId(null)}
        size="full"
        title={open ? `Chamado #${open.id}` : "Chamado"}
        description={open?.subject}
        footer={
          open && (
            <div className="grid grid-cols-2 gap-2.5">
              {open.status === "resolved" ? (
                <MobileButton variant="secondary" onClick={() => setStatus("open")}>
                  <RotateCcw className="size-[18px]" aria-hidden="true" />
                  Reabrir
                </MobileButton>
              ) : (
                <MobileButton variant="secondary" onClick={() => setStatus("resolved")}>
                  <CircleCheck className="size-[18px]" aria-hidden="true" />
                  Resolvido
                </MobileButton>
              )}
              <MobileButton type="submit" form={REPLY_FORM_ID} disabled={open.status === "resolved"}>
                <Send className="size-[18px]" aria-hidden="true" />
                Responder
              </MobileButton>
            </div>
          )
        }
      >
        {open && (
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={open.status} />
              <Badge tone={TICKET_PRIORITY[open.priority].tone}>{TICKET_PRIORITY[open.priority].label}</Badge>
              <Badge tone="neutral">{categoryLabel(open.category)}</Badge>
            </div>
            <p className="tabular -mt-2 text-[13px] text-ink-soft">
              Criado em {formatDate(open.createdAt)} · Atualizado em {formatDate(open.updatedAt)}
            </p>
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
            <form id={REPLY_FORM_ID} onSubmit={sendReply} noValidate>
              {open.status === "resolved" && <p className="mb-2 rounded-[12px] bg-ok-soft px-3.5 py-2.5 text-[13.5px] text-ok">Este chamado está resolvido. Reabra-o para enviar novas mensagens.</p>}
              <MobileTextArea
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
      </MobileSheet>

      <NewTicketSheet open={newTicket.open} onClose={() => onNewTicket(false)} today={today} tickets={tickets} initialSubject={newTicket.subject} onCreate={onCreate} />
    </section>
  );
}
