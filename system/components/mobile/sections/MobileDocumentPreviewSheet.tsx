// components/mobile/sections/MobileDocumentPreviewSheet.tsx
"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileX2 } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { CATEGORY_LABELS, type DocumentItem } from "@/config/documents-page";
import { dataUrlToBlobUrl, formatBytes } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";
import { useHeld } from "@/lib/mobile/useHeld";

type Props = {
  doc: DocumentItem | null;
  onClose: () => void;
  onDownload: (doc: DocumentItem) => void;
  onOpenTab: (doc: DocumentItem, url: string) => void;
};

/** Visualizar: PDFs in an embedded viewer, images inline; other types explain how to open them. */
export function MobileDocumentPreviewSheet({ doc: current, onClose, onDownload, onOpenTab }: Props) {
  const doc = useHeld(current);
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
    <MobileSheet
      open={!!current}
      onClose={onClose}
      size="full"
      title={doc?.title ?? "Documento"}
      description={doc ? `${doc.description} · ${formatDate(doc.date)} · ${doc.kind} · ${formatBytes(doc.sizeBytes)} · ${CATEGORY_LABELS[doc.category]}` : undefined}
      footer={
        doc && (
          <div className="grid grid-cols-2 gap-2.5">
            <MobileButton variant="secondary" disabled={!canEmbed || !src} onClick={() => src && onOpenTab(doc, src)}>
              <ExternalLink className="size-5" aria-hidden="true" />
              Abrir
            </MobileButton>
            <MobileButton onClick={() => onDownload(doc)}>
              <Download className="size-5" aria-hidden="true" />
              Baixar
            </MobileButton>
          </div>
        )
      }
    >
      {doc &&
        (canEmbed && src ? (
          isPdf ? (
            <object data={src} type="application/pdf" aria-label={`Pré-visualização de ${doc.title}`} className="h-[52dvh] w-full rounded-[12px] border border-line bg-canvas">
              <div className="grid place-items-center gap-2 p-6 text-center">
                <FileX2 className="size-8 text-ink-mute" aria-hidden="true" />
                <p className="text-[15px] font-bold text-ink">Seu navegador não exibe PDFs aqui</p>
                <p className="text-[14px] text-ink-soft">Abra o documento ou baixe o arquivo para ler.</p>
              </div>
            </object>
          ) : (
            <Image src={src} alt={doc.title} width={1200} height={800} unoptimized className="mx-auto h-auto max-h-[52dvh] w-auto max-w-full rounded-[12px] object-contain" />
          )
        ) : (
          <div className="grid place-items-center gap-2 rounded-[14px] bg-canvas/50 px-5 py-10 text-center">
            <FileX2 className="size-9 text-ink-mute" aria-hidden="true" />
            <p className="text-[16px] font-bold text-ink">Sem pré-visualização para {doc.kind}</p>
            <p className="max-w-[18rem] text-[14px] text-ink-soft">
              {doc.uploaded && !doc.dataUrl
                ? "Este arquivo foi registrado apenas com seus dados (nome, tamanho e tipo); o conteúdo não é guardado pelo portal de demonstração."
                : "Baixe o arquivo para abri-lo no seu aparelho."}
            </p>
          </div>
        ))}
    </MobileSheet>
  );
}
