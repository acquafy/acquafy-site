// components/base/previews/DocumentsDemos.tsx
"use client";

import { useState } from "react";
import { MobileDocumentPreviewSheet } from "@/components/mobile/sections/MobileDocumentPreviewSheet";
import { MobileDocumentRow } from "@/components/mobile/sections/MobileDocumentRow";
import { MobileDocumentUploadSheet } from "@/components/mobile/sections/MobileDocumentUploadSheet";
import { DocumentsAside } from "@/components/sections/DocumentsAside";
import { DocumentsPreviewModal } from "@/components/sections/DocumentsPreviewModal";
import { DocumentRow, DocumentsColumnHeader, type DocumentActions } from "@/components/sections/DocumentsRow";
import { DocumentsUploadModal } from "@/components/sections/DocumentsUploadModal";
import { useToast } from "@/components/providers/ToastProvider";
import type { DocumentItem } from "@/config/documents-page";
import type { IsoDate } from "@/lib/format";
import { countByCategory } from "@/lib/portal/documents";
import { useDocumentActions } from "@/lib/useDocumentActions";
import { OpenDemo } from "./OpenDemo";

export function DocumentsAsideDemo({ documents }: { documents: DocumentItem[] }) {
  const toast = useToast();
  const totalBytes = documents.reduce((s, d) => s + d.sizeBytes, 0);
  const lastUpdate = documents.reduce<string | null>((m, d) => (m === null || d.date > m ? d.date : m), null);
  return (
    <div className="max-w-sm">
      <DocumentsAside
        total={documents.length}
        byCategory={countByCategory(documents)}
        mine={0}
        totalBytes={totalBytes}
        lastUpdate={lastUpdate}
        onUpload={() => toast({ tone: "info", title: "Enviar documento", description: "Abre o formulário de envio (veja DocumentsUploadModal)." })}
      />
    </div>
  );
}

export function DocumentsPreviewModalDemo({ doc }: { doc: DocumentItem }) {
  const { download, openTab } = useDocumentActions();
  return <OpenDemo>{(open, setOpen) => <DocumentsPreviewModal doc={open ? doc : null} onClose={() => setOpen(false)} onDownload={download} onOpenTab={openTab} />}</OpenDemo>;
}

/** The column header and one row; its actions open the real preview modal and the other handlers. */
export function DocumentRowDemo({ doc }: { doc: DocumentItem }) {
  const { download, copyLink, openTab } = useDocumentActions();
  const [preview, setPreview] = useState<DocumentItem | null>(null);
  const actions: DocumentActions = { onPreview: setPreview, onDownload: download, onCopyLink: copyLink, onDelete: () => {} };
  return (
    <>
      <DocumentsColumnHeader />
      <ul className="flex flex-col gap-2.5">
        <DocumentRow doc={doc} actions={actions} />
      </ul>
      <DocumentsPreviewModal doc={preview} onClose={() => setPreview(null)} onDownload={download} onOpenTab={openTab} />
    </>
  );
}

export function DocumentsUploadModalDemo({ today }: { today: IsoDate }) {
  const toast = useToast();
  return (
    <OpenDemo label="Abrir">
      {(open, setOpen) => <DocumentsUploadModal open={open} onClose={() => setOpen(false)} today={today} onSubmit={(doc) => toast({ title: "Documento enviado", description: doc.title })} />}
    </OpenDemo>
  );
}

export function MobileDocumentPreviewSheetDemo({ doc }: { doc: DocumentItem }) {
  const { download, openTab } = useDocumentActions();
  return <OpenDemo app>{(open, setOpen) => <MobileDocumentPreviewSheet doc={open ? doc : null} onClose={() => setOpen(false)} onDownload={download} onOpenTab={openTab} />}</OpenDemo>;
}

export function MobileDocumentRowDemo({ doc }: { doc: DocumentItem }) {
  const { download, openTab } = useDocumentActions();
  const [preview, setPreview] = useState<DocumentItem | null>(null);
  return (
    <>
      <ul className="grid gap-2.5">
        <MobileDocumentRow doc={doc} actions={{ onPreview: setPreview, onDownload: download, onMore: setPreview }} />
      </ul>
      <MobileDocumentPreviewSheet doc={preview} onClose={() => setPreview(null)} onDownload={download} onOpenTab={openTab} />
    </>
  );
}

export function MobileDocumentUploadSheetDemo({ today }: { today: IsoDate }) {
  const toast = useToast();
  return (
    <OpenDemo app>
      {(open, setOpen) => <MobileDocumentUploadSheet open={open} onClose={() => setOpen(false)} today={today} onSubmit={(doc) => toast({ title: "Documento enviado", description: doc.title })} />}
    </OpenDemo>
  );
}
