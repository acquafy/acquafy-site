// components/sections/DocumentsPreviewModal.tsx
"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileX2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { CATEGORY_LABELS, type DocumentItem } from "@/config/documents-page";
import { dataUrlToBlobUrl, formatBytes } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

type Props = {
  doc: DocumentItem | null;
  onClose: () => void;
  onDownload: (doc: DocumentItem) => void;
  onOpenTab: (doc: DocumentItem, url: string) => void;
};

/** Visualizar: PDFs open in an embedded viewer, images inline; other types explain how to open them. */
export function DocumentsPreviewModal({ doc, onClose, onDownload, onOpenTab }: Props) {
  const isImage = doc ? ["PNG", "JPG"].includes(doc.kind) : false;
  const isPdf = doc?.kind === "PDF";

  // Uploaded files live in a data URL; frames show a blob URL of it more reliably.
  const dataUrl = doc?.dataUrl ?? null;
  const wantsBlob = dataUrl !== null && (isPdf || isImage);
  const blobUrl = useMemo(() => (wantsBlob && dataUrl ? dataUrlToBlobUrl(dataUrl) : null), [wantsBlob, dataUrl]);
  useEffect(
    () => () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    },
    [blobUrl],
  );

  const src = doc?.file ?? blobUrl;
  const canEmbed = !!src && (isPdf || isImage);

  return (
    <Modal
      open={!!doc}
      onClose={onClose}
      size="lg"
      title={doc?.title ?? "Documento"}
      description={doc ? `${doc.description} · ${formatDate(doc.date)} · ${doc.kind} · ${formatBytes(doc.sizeBytes)} · ${CATEGORY_LABELS[doc.category]}` : undefined}
      footer={
        doc && (
          <>
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            {canEmbed && src && (
              <Button variant="soft" onClick={() => onOpenTab(doc, src)}>
                <ExternalLink className="size-4" aria-hidden="true" />
                Abrir em nova aba
              </Button>
            )}
            <Button onClick={() => onDownload(doc)}>
              <Download className="size-4" aria-hidden="true" />
              Baixar
            </Button>
          </>
        )
      }
    >
      {doc &&
        (canEmbed && src ? (
          isPdf ? (
            <object data={src} type="application/pdf" aria-label={`Pré-visualização de ${doc.title}`} className="h-[60dvh] w-full rounded-lg border border-line bg-canvas">
              <EmptyState icon={FileX2} title="Seu navegador não exibe PDFs aqui" description="Abra o documento em uma nova aba ou baixe o arquivo para ler." />
            </object>
          ) : (
            <Image src={src} alt={doc.title} width={1200} height={800} unoptimized className="mx-auto h-auto max-h-[60dvh] w-auto max-w-full rounded-lg object-contain" />
          )
        ) : (
          <EmptyState
            icon={FileX2}
            title={`Sem pré-visualização para ${doc.kind}`}
            description={
              doc.uploaded && !doc.dataUrl
                ? "Este arquivo foi registrado apenas com seus dados (nome, tamanho e tipo); o conteúdo não é guardado pelo portal de demonstração."
                : "Baixe o arquivo para abri-lo no seu computador."
            }
          />
        ))}
    </Modal>
  );
}
