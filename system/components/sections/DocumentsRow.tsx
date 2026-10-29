// components/sections/DocumentsRow.tsx
"use client";

import { CalendarDays, Download, Eye, File as FileIcon, Link2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { IconTile } from "@/components/ui/KpiCard";
import { Menu, type MenuItem } from "@/components/ui/Menu";
import { CATEGORY_TILES, DOC_TILES, DOCUMENTS_COPY, type DocumentItem } from "@/config/documents-page";
import { formatBytes } from "@/lib/fileActions";
import { formatDate } from "@/lib/format";

/** Shared by the row and the column header, so the columns always line up. */
export const DOCUMENT_GRID = "grid grid-cols-[auto_minmax(0,1fr)_auto] @[700px]:grid-cols-[auto_minmax(0,1fr)_6.5rem_8.5rem_auto]";

export type DocumentActions = {
  onPreview: (doc: DocumentItem) => void;
  onDownload: (doc: DocumentItem) => void;
  onCopyLink: (doc: DocumentItem) => void;
  onDelete: (doc: DocumentItem) => void;
};

export function DocumentsColumnHeader() {
  return (
    <div aria-hidden="true" className={`${DOCUMENT_GRID} hidden items-center gap-x-4 px-3.5 pb-1 text-[12.5px] font-bold text-ink-soft @[700px]:grid`}>
      <span className="w-12" />
      <span>Documento</span>
      <span>Data</span>
      <span>Tipo · Tamanho</span>
      <span className="w-20 text-right">Ações</span>
    </div>
  );
}

export function DocumentRow({ doc, actions }: { doc: DocumentItem; actions: DocumentActions }) {
  const tile = doc.uploaded ? CATEGORY_TILES[doc.category] : (DOC_TILES[doc.id] ?? CATEGORY_TILES[doc.category]);
  const typeSize = `${doc.kind} · ${formatBytes(doc.sizeBytes)}`;

  const items: MenuItem[] = [
    { label: "Visualizar", icon: Eye, onSelect: () => actions.onPreview(doc) },
    { label: "Baixar", icon: Download, onSelect: () => actions.onDownload(doc) },
    { label: "Copiar link", icon: Link2, onSelect: () => actions.onCopyLink(doc) },
    ...(doc.uploaded ? [{ label: "Excluir", icon: Trash2, tone: "danger" as const, separatorBefore: true, onSelect: () => actions.onDelete(doc) }] : []),
  ];

  return (
    <li id={`doc-${doc.id}`} className={`${DOCUMENT_GRID} scroll-mt-4 items-center gap-x-4 rounded-xl border border-line/80 bg-card p-3.5 transition hover:border-brand/30 `}>
      <IconTile icon={tile.icon} tone={tile.tone} className="size-12" />

      <div className="min-w-0">
        <button
          type="button"
          onClick={() => actions.onPreview(doc)}
          className="text-left text-[15.5px] leading-snug font-bold text-ink hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {doc.title}
        </button>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] leading-snug text-ink-soft">
          {doc.description}
          {doc.uploaded && <Badge tone="violet">{DOCUMENTS_COPY.uploadedBadge}</Badge>}
        </p>
        <p className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[13.5px] text-ink-soft @[700px]:hidden">
          <span className="tabular inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-brand" aria-hidden="true" />
            <span className="sr-only">Data: </span>
            {formatDate(doc.date)}
          </span>
          <span className="tabular inline-flex items-center gap-1.5">
            <FileIcon className="size-4 text-brand" aria-hidden="true" />
            <span className="sr-only">Tipo e tamanho: </span>
            {typeSize}
          </span>
        </p>
      </div>

      <p className="tabular hidden text-[14.5px] text-ink @[700px]:block">
        <span className="sr-only">Data: </span>
        {formatDate(doc.date)}
      </p>
      <p className="tabular hidden text-[14.5px] whitespace-nowrap text-ink @[700px]:block">
        <span className="sr-only">Tipo e tamanho: </span>
        {typeSize}
      </p>

      <div className="flex items-center gap-2">
        <IconButton icon={Download} label={`Baixar ${doc.title}${doc.description ? `, ${doc.description}` : ""}`} bordered className="!rounded-full" onClick={() => actions.onDownload(doc)} />
        <Menu label={`Mais ações de ${doc.title}`} items={items} />
      </div>
    </li>
  );
}
