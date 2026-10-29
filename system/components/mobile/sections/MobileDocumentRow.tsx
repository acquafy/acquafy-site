// components/mobile/sections/MobileDocumentRow.tsx
"use client";

import { CalendarDays, Download, EllipsisVertical, File as FileIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/KpiCard";
import { CATEGORY_TILES, DOC_TILES, DOCUMENTS_COPY, type DocumentItem } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

export type MobileDocumentActions = {
  onPreview: (doc: DocumentItem) => void;
  onDownload: (doc: DocumentItem) => void;
  onMore: (doc: DocumentItem) => void;
};

/** One document: coloured tile, title/description, date and "TYPE · size", a download button and a "…" menu. Tapping the text previews it. */
export function MobileDocumentRow({ doc, actions }: { doc: DocumentItem; actions: MobileDocumentActions }) {
  const tile = doc.uploaded ? CATEGORY_TILES[doc.category] : (DOC_TILES[doc.id] ?? CATEGORY_TILES[doc.category]);
  return (
    <li id={`doc-${doc.id}`} className="flex min-w-0 items-center gap-1 rounded-[14px] bg-card py-2 pr-1 pl-3">
      <button
        type="button"
        onClick={() => actions.onPreview(doc)}
        aria-label={`Visualizar ${doc.title}, ${doc.description}`}
        className="flex min-h-[72px] min-w-0 flex-1 items-center gap-3 rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:opacity-70"
      >
        <IconTile icon={tile.icon} tone={tile.tone} className="size-12" />
        <span className="min-w-0 flex-1">
          <span className="block text-[15.5px] leading-snug font-bold text-ink">{doc.title}</span>
          <span className="flex flex-wrap items-center gap-x-2 text-[13.5px] leading-snug text-ink-soft">
            {doc.description}
            {doc.uploaded && <Badge tone="violet">{DOCUMENTS_COPY.uploadedBadge}</Badge>}
          </span>
          <span className="mt-0.5 flex flex-wrap gap-x-3 text-[12.5px] text-ink-soft">
            <span className="tabular inline-flex items-center gap-1">
              <CalendarDays className="size-3.5 text-brand" aria-hidden="true" />
              {formatDate(doc.date)}
            </span>
            <span className="tabular inline-flex items-center gap-1">
              <FileIcon className="size-3.5 text-brand" aria-hidden="true" />
              {doc.kind} · {formatBytes(doc.sizeBytes)}
            </span>
          </span>
        </span>
      </button>
      <button
        type="button"
        onClick={() => actions.onDownload(doc)}
        aria-label={`Baixar ${doc.title}`}
        className="grid size-11 shrink-0 place-items-center rounded-full text-brand focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft"
      >
        <span className="grid size-9 place-items-center rounded-full border border-line">
          <Download className="size-[18px]" aria-hidden="true" />
        </span>
      </button>
      <button
        type="button"
        onClick={() => actions.onMore(doc)}
        aria-haspopup="dialog"
        aria-label={`Mais ações de ${doc.title}`}
        className="grid size-11 shrink-0 place-items-center rounded-full text-ink-soft focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft"
      >
        <EllipsisVertical className="size-5" aria-hidden="true" />
      </button>
    </li>
  );
}
