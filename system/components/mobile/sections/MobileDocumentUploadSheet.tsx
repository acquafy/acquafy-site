// components/mobile/sections/MobileDocumentUploadSheet.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Upload } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSelect, MobileTextArea, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { FieldFrame } from "@/components/ui/Field";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { MAX_UPLOAD_BYTES, UPLOAD_CATEGORIES, type DocCategory, type DocumentItem } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import type { IsoDate } from "@/lib/format";
import { ACCEPT_ATTR, ACCEPTED_LIST, buildUploadedDocument, validateUploadFile } from "@/lib/portal/document-upload";

const FORM_ID = "m-documents-upload-form";

type Errors = Partial<Record<"file" | "title" | "description", string>>;

type Props = { open: boolean; onClose: () => void; onSubmit: (doc: DocumentItem) => void; today: IsoDate };

/** "Enviar documento": file (type and size checked), title, category and description. */
export function MobileDocumentUploadSheet({ open, onClose, onSubmit, today }: Props) {
  const body = useRef<HTMLFormElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [inputKey, setInputKey] = useState(0);
  const [title, setTitle] = useState("");
  const [titleEdited, setTitleEdited] = useState(false);
  const [category, setCategory] = useState<DocCategory>("comprovantes");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);

  const reset = () => {
    setFile(null);
    setInputKey((k) => k + 1);
    setTitle("");
    setTitleEdited(false);
    setCategory("comprovantes");
    setDescription("");
    setErrors({});
    setBusy(false);
  };

  const close = () => {
    onClose();
    window.setTimeout(reset, 260);
  };

  const pick = (picked: File | null) => {
    setFile(picked);
    setErrors((e) => ({ ...e, file: picked ? validateUploadFile(picked) : undefined }));
    if (picked && !titleEdited) setTitle(picked.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      file: validateUploadFile(file),
      title: title.trim().length < 3 ? "Dê um título de pelo menos 3 caracteres." : undefined,
      description: description.length > 200 ? "A descrição pode ter no máximo 200 caracteres." : undefined,
    };
    setErrors(next);
    if (next.file || next.title || next.description || !file) {
      focusFirstInvalid(body.current);
      return;
    }
    setBusy(true);
    onSubmit(await buildUploadedDocument({ file, title, description, category, today }));
    close();
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Enviar documento"
      description="O arquivo fica visível só para você."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full loading={busy}>
          <Upload className="size-5" aria-hidden="true" />
          Enviar documento
        </MobileButton>
      }
    >
      <form id={FORM_ID} ref={body} onSubmit={submit} noValidate className="grid gap-4">
        <FieldFrame label="Arquivo" hint={file && !errors.file ? `${file.name} · ${formatBytes(file.size)}` : `${ACCEPTED_LIST} · até ${formatBytes(MAX_UPLOAD_BYTES)}`} error={errors.file}>
          {({ id, describedBy, invalid }) => (
            <input
              key={inputKey}
              id={id}
              type="file"
              accept={ACCEPT_ATTR}
              aria-invalid={invalid || undefined}
              aria-describedby={describedBy}
              onChange={(e) => pick(e.target.files?.[0] ?? null)}
              className="block w-full cursor-pointer rounded-[12px] border border-dashed border-brand/40 bg-brand-soft/40 p-2.5 text-[15px] text-ink-soft file:mr-3 file:min-h-11 file:cursor-pointer file:rounded-[10px] file:border-0 file:bg-brand file:px-4 file:text-[15px] file:font-semibold file:text-white focus-visible:outline-2 focus-visible:outline-brand/40 aria-[invalid=true]:border-danger"
            />
          )}
        </FieldFrame>
        <MobileTextField
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
        <MobileSelect label="Categoria" value={category} onChange={(e) => setCategory(e.target.value as DocCategory)} options={UPLOAD_CATEGORIES} />
        <MobileTextArea label="Descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} hint={`${description.length}/200`} rows={3} placeholder="Do que se trata este documento?" />
      </form>
    </MobileSheet>
  );
}
