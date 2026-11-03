// components/sections/DocumentsUploadModal.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FieldFrame, Select, TextArea, TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { focusFirstInvalid, useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { ACCEPTED_EXTENSIONS, MAX_STORED_BYTES, MAX_UPLOAD_BYTES, UPLOAD_CATEGORIES, type DocCategory, type DocumentItem } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import type { IsoDate } from "@/lib/format";

const FORM_ID = "documents-upload-form";
const ACCEPT = ACCEPTED_EXTENSIONS.map((e) => `.${e}`).join(",");
const LIST = "PDF, PNG, JPG, ZIP, DOC, DOCX ou XLSX";

type Errors = Partial<Record<"file" | "title" | "description", string>>;

function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i < 0 ? "" : name.slice(i + 1).toLowerCase();
}

function validateFile(file: File | null): string | undefined {
  if (!file) return "Selecione um arquivo para enviar.";
  const ext = extensionOf(file.name);
  if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) return `Tipo de arquivo não aceito. Envie ${LIST}.`;
  if (file.size > MAX_UPLOAD_BYTES) return `O arquivo tem ${formatBytes(file.size)}; o limite é ${formatBytes(MAX_UPLOAD_BYTES)}.`;
  if (file.size === 0) return "O arquivo está vazio.";
  return undefined;
}

function readAsDataUrl(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });
}

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (doc: DocumentItem) => void;
  today: IsoDate;
};

/**"Enviar documento": picks a file (type and size checked), a category and a description. Only metadata is kept. */
export function DocumentsUploadModal({ open, onClose, onSubmit, today }: Props) {
  const body = useRef<HTMLFormElement>(null);
  useFocusOnOpen(open, body);

  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [title, setTitle] = useState("");
  const [titleEdited, setTitleEdited] = useState(false);
  const [category, setCategory] = useState<DocCategory>("comprovantes");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const close = () => {
    setFile(null);
    setInputKey((k) => k + 1);
    setTitle("");
    setTitleEdited(false);
    setCategory("comprovantes");
    setDescription("");
    setErrors({});
    setBusy(false);
    onClose();
  };

  const pick = (picked: File | null) => {
    setFile(picked);
    setErrors((e) => ({ ...e, file: picked ? validateFile(picked) : undefined }));
    if (picked && !titleEdited) setTitle(picked.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      file: validateFile(file),
      title: title.trim().length < 3 ? "Dê um título de pelo menos 3 caracteres." : undefined,
      description: description.length > 200 ? "A descrição pode ter no máximo 200 caracteres." : undefined,
    };
    setErrors(next);
    if (next.file || next.title || next.description || !file) {
      focusFirstInvalid(body.current);
      return;
    }

    setBusy(true);
    const dataUrl = file.size <= MAX_STORED_BYTES ? await readAsDataUrl(file) : null;
    const ext = extensionOf(file.name);
    onSubmit({
      id: `up-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || "Documento enviado por você",
      category,
      date: today,
      kind: ext === "jpeg" ? "JPG" : ext.toUpperCase(),
      sizeBytes: file.size,
      file: null,
      dataUrl,
      uploaded: true,
      filename: file.name,
    });
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Enviar documento"
      description="Anexe um arquivo ao seu portal. Ele fica visível só para você."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={busy}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} loading={busy}>
            <Upload className="size-4" aria-hidden="true" />
            Enviar documento
          </Button>
        </>
      }
    >
      <form id={FORM_ID} ref={body} onSubmit={submit} noValidate className="grid gap-4">
        <FieldFrame label="Arquivo" hint={file && !errors.file ? `${file.name} · ${formatBytes(file.size)}` : `${LIST} · até ${formatBytes(MAX_UPLOAD_BYTES)}`} error={errors.file}>
          {({ id, describedBy, invalid }) => (
            <input
              key={inputKey}
              id={id}
              type="file"
              accept={ACCEPT}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(e) => pick(e.target.files?.[0] ?? null)}
              className="block w-full cursor-pointer rounded-lg border border-dashed border-brand/40 bg-brand-soft/40 p-2.5 text-[14px] text-ink-soft file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-brand file:px-4 file:py-2 file:text-[14px] file:font-semibold file:text-white hover:bg-brand-soft/70 focus-visible:outline-2 focus-visible:outline-brand/40 aria-[invalid=true]:border-danger"
            />
          )}
        </FieldFrame>
        <TextField
          label="Título"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleEdited(true);
          }}
          error={errors.title}
          maxLength={80}
          placeholder="Ex.: Comprovante de endereço"
        />
        <Select label="Categoria" value={category} onChange={(e) => setCategory(e.target.value as DocCategory)} options={UPLOAD_CATEGORIES} />
        <TextArea
          label="Descrição (opcional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          hint={`${description.length}/200`}
          rows={3}
          placeholder="Do que se trata este documento?"
        />
      </form>
    </Modal>
  );
}
