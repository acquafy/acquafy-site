// lib/useDocumentActions.ts
"use client";

import { useToast } from "@/components/providers/ToastProvider";
import { MAX_STORED_BYTES, type DocumentItem } from "@/config/documents-page";
import { absoluteUrl, copyText, downloadFromUrl, formatBytes, openInNewTab } from "@/lib/fileActions";

/** Download / copy link / open-in-tab of a document, each with its toast. Shared by every screen that lists documents. */
export function useDocumentActions() {
  const toast = useToast();

  const download = (doc: DocumentItem) => {
    const href = doc.file ?? doc.dataUrl;
    if (!href) {
      toast({ tone: "info", title: "Conteúdo não armazenado", description: `${doc.filename} é maior que ${formatBytes(MAX_STORED_BYTES)} e foi registrado só com nome, tamanho e tipo.` });
      return;
    }
    downloadFromUrl(href, doc.filename);
    toast({ title: "Download iniciado", description: doc.filename });
  };

  const copyLink = async (doc: DocumentItem) => {
    const ok = await copyText(absoluteUrl(doc.file ?? `/documentos#doc-${doc.id}`));
    toast(
      ok
        ? { title: "Link copiado", description: doc.file ? "O link direto do arquivo está na área de transferência." : "O link para este documento está na área de transferência." }
        : { tone: "error", title: "Não foi possível copiar", description: "Seu navegador bloqueou o acesso à área de transferência." },
    );
  };

  const openTab = (doc: DocumentItem, url: string) => {
    if (!openInNewTab(url)) toast({ tone: "error", title: "Pop-up bloqueado", description: `Permita pop-ups para abrir ${doc.title} em uma nova aba.` });
  };

  return { download, copyLink, openTab };
}
