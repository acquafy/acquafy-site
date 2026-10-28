// components/sections/SupportTicketForm.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Paperclip, Send, X } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FieldFrame, Select, TextArea, TextField } from "@/components/ui/Field";
import { ATTACHMENT_MAX_BYTES, PRIORITY_OPTIONS, TICKET_CATEGORIES, type Ticket, type TicketCategory, type TicketPriority } from "@/config/support-page";
import type { IsoDate } from "@/lib/format";

type Props = {
  today: IsoDate;
  /** Used to number the next ticket (#10NN). */
  tickets: Ticket[];
  onCreate: (ticket: Ticket) => void;
  initialSubject?: string;
};

type Errors = Partial<Record<"subject" | "category" | "description" | "file", string>>;

const MB = 1024 * 1024;
const formatSize = (bytes: number) => (bytes >= MB ? `${(bytes / MB).toFixed(1).replace(".", ",")} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

export function nextTicketId(tickets: Ticket[]): string {
  return String(tickets.reduce((max, t) => Math.max(max, Number(t.id) || 0), 1000) + 1);
}

export function SupportTicketForm({ today, tickets, onCreate, initialSubject = "" }: Props) {
  const toast = useToast();
  const [subject, setSubject] = useState(initialSubject);
  const [category, setCategory] = useState<TicketCategory | "">("");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileKey, setFileKey] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const form = useRef<HTMLFormElement>(null);

  const clearFile = () => {
    setFile(null);
    setFileKey((k) => k + 1);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const pickFile = (picked: File | null) => {
    if (!picked) return clearFile();
    if (picked.size > ATTACHMENT_MAX_BYTES) {
      setFile(null);
      setFileKey((k) => k + 1);
      setErrors((e) => ({ ...e, file: `O arquivo “${picked.name}” tem ${formatSize(picked.size)}. O limite é 5 MB.` }));
      return;
    }
    setFile(picked);
    setErrors((e) => ({ ...e, file: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const found: Errors = { file: errors.file };
    if (subject.trim().length < 5) found.subject = "Descreva o assunto em pelo menos 5 caracteres.";
    if (!category) found.category = "Selecione uma categoria.";
    if (description.trim().length < 20) found.description = "Conte um pouco mais: a descrição precisa ter pelo menos 20 caracteres.";
    const invalid = Object.values(found).some(Boolean);
    setErrors(found);
    if (invalid) {
      window.setTimeout(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(), 0);
      return;
    }

    const id = nextTicketId(tickets);
    onCreate({
      id,
      subject: subject.trim(),
      category: category as TicketCategory,
      priority,
      status: "open",
      createdAt: today,
      updatedAt: today,
      messages: [{ id: `${id}-1`, from: "me", author: "Você", date: today, text: description.trim(), attachment: file?.name }],
    });
    toast({ title: `Chamado #${id} aberto`, description: "Nossa equipe responde em até 1 dia útil. Acompanhe em Meus chamados." });
    setSubject("");
    setCategory("");
    setPriority("medium");
    setDescription("");
    clearFile();
    setErrors({});
  };

  return (
    <Card id="abrir-chamado" container title="Abrir chamado">
      <form ref={form} onSubmit={submit} noValidate className="grid gap-4">
        <TextField
          label="Assunto"
          value={subject}
          maxLength={120}
          placeholder="Resuma o que você precisa"
          error={errors.subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setErrors((x) => ({ ...x, subject: undefined }));
          }}
        />
        <div className="grid gap-4 @md:grid-cols-2">
          <Select
            label="Categoria"
            options={TICKET_CATEGORIES}
            value={category}
            error={errors.category}
            onChange={(e) => {
              setCategory(e.target.value as TicketCategory | "");
              setErrors((x) => ({ ...x, category: undefined }));
            }}
          />
          <Select label="Prioridade" options={PRIORITY_OPTIONS} value={priority} onChange={(e) => setPriority(e.target.value as TicketPriority)} />
        </div>
        <TextArea
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
                className="block w-full cursor-pointer rounded-lg border border-line bg-card text-[14px] text-ink-soft file:mr-3 file:cursor-pointer file:border-0 file:bg-brand-soft file:px-4 file:py-2.5 file:text-[14px] file:font-semibold file:text-brand hover:file:bg-[#d6e5ff] focus-visible:outline-2 focus-visible:outline-brand/40"
              />
              {file && (
                <p className="mt-2 flex items-center gap-2 text-[13.5px] text-ink-soft">
                  <Paperclip className="size-4 shrink-0 text-brand" aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">
                    {file.name} · {formatSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={clearFile}
                    aria-label={`Remover anexo ${file.name}`}
                    className="rounded-md p-1 text-ink-soft hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </p>
              )}
            </>
          )}
        </FieldFrame>
        <Button type="submit" size="lg" className="w-full">
          <Send className="size-5" aria-hidden="true" />
          Enviar chamado
        </Button>
      </form>
    </Card>
  );
}
