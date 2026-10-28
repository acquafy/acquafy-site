// lib/portal/document-upload.ts
//
// Validation and conversion of a file the investor uploads in "Documentos" (mock: only metadata, plus the content of
// small files as a data URL). Client-side only (uses FileReader).

import { ACCEPTED_EXTENSIONS, MAX_STORED_BYTES, MAX_UPLOAD_BYTES, type DocCategory, type DocumentItem } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import type { IsoDate } from "@/lib/format";

export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map((e) => `.${e}`).join(",");
export const ACCEPTED_LIST = "PDF, PNG, JPG, ZIP, DOC, DOCX ou XLSX";

export function extensionOf(name: string): string {
  const i = name.lastIndexOf(".");
  return i < 0 ? "" : name.slice(i + 1).toLowerCase();
}

/** Error message for a file that cannot be uploaded, or undefined when it is fine. */
export function validateUploadFile(file: File | null): string | undefined {
  if (!file) return "Selecione um arquivo para enviar.";
  const ext = extensionOf(file.name);
  if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) return `Tipo de arquivo não aceito. Envie ${ACCEPTED_LIST}.`;
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

/** The library record of an uploaded file (small files keep their content so they can be downloaded again). */
export async function buildUploadedDocument(input: { file: File; title: string; description: string; category: DocCategory; today: IsoDate }): Promise<DocumentItem> {
  const { file, title, description, category, today } = input;
  const dataUrl = file.size <= MAX_STORED_BYTES ? await readAsDataUrl(file) : null;
  const ext = extensionOf(file.name);
  return {
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
  };
}
