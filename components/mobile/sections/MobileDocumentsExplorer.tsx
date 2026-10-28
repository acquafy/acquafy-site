// components/mobile/sections/MobileDocumentsExplorer.tsx
"use client";

import { useMemo, useState } from "react";
import { BookOpen, Circle, CircleDot, Download, Eye, FileSearch, FileText, Link2, ListFilter, Receipt, ScrollText, Square, SquareCheck, Trash2, Upload } from "lucide-react";
import { MobileActionSheet, type ActionSheetItem } from "@/components/mobile/ui/MobileActionSheet";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { MobileConfirmSheet } from "@/components/mobile/ui/MobileConfirmSheet";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSearchField } from "@/components/mobile/ui/MobileFields";
import { useToast } from "@/components/providers/ToastProvider";
import { CATEGORY_LABELS, DOCUMENTS_COPY, officialDocuments, SORT_OPTIONS, type DocCategory, type DocumentItem, type SortKey } from "@/config/documents-page";
import type { IsoDate } from "@/lib/format";
import { useHeld } from "@/lib/mobile/useHeld";
import { countByCategory, filterDocuments } from "@/lib/portal/documents";
import { useDocumentActions } from "@/lib/useDocumentActions";
import { usePersistentState } from "@/lib/usePersistentState";
import { MobileDocumentPreviewSheet } from "./MobileDocumentPreviewSheet";
import { MobileDocumentRow, type MobileDocumentActions } from "./MobileDocumentRow";
import { MobileDocumentUploadSheet } from "./MobileDocumentUploadSheet";

type TabId = "all" | DocCategory;

const TAB_ICONS = { all: FileText, contratos: ScrollText, comprovantes: Receipt, manuais: BookOpen, outros: FileText } as const;

/** State owner of Documentos: category chips with counts, search, sort menu, the list, preview / actions / upload / delete sheets. */
export function MobileDocumentsExplorer({ today }: { today: IsoDate }) {
  const toast = useToast();
  const { download, copyLink, openTab } = useDocumentActions();
  const [uploads, setUploads] = usePersistentState<DocumentItem[]>("documents-uploads", []);

  const [tab, setTab] = useState<TabId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date-desc");
  const [onlyMine, setOnlyMine] = useState(false);

  const [sortOpen, setSortOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [preview, setPreview] = useState<DocumentItem | null>(null);
  const [more, setMore] = useState<DocumentItem | null>(null);
  const [toDelete, setToDelete] = useState<DocumentItem | null>(null);

  const all = useMemo(() => [...uploads, ...officialDocuments], [uploads]);
  const byCategory = useMemo(() => countByCategory(all), [all]);

  const tabs = ([["all", "Todos", all.length]] as [TabId, string, number][])
    .concat((["contratos", "comprovantes", "manuais", "outros"] as const).map((c) => [c, CATEGORY_LABELS[c], byCategory[c]] as [TabId, string, number]))
    .filter(([id, , count]) => id !== "outros" || count > 0);
  const activeTab: TabId = tabs.some(([id]) => id === tab) ? tab : "all";

  const visible = useMemo(() => filterDocuments(all, { category: activeTab, query, sort, onlyMine }), [all, activeTab, query, sort, onlyMine]);
  const filtered = query.trim() !== "" || onlyMine;
  const clearFilters = () => {
    setQuery("");
    setOnlyMine(false);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setUploads((list) => list.filter((d) => d.id !== toDelete.id));
    toast({ title: "Documento excluído", description: toDelete.title });
    setToDelete(null);
  };

  const actions: MobileDocumentActions = { onPreview: setPreview, onDownload: download, onMore: setMore };

  const target = useHeld(more);
  const moreItems: ActionSheetItem[] = target
    ? [
        { id: "preview", label: "Visualizar", icon: Eye, onSelect: () => setPreview(target) },
        { id: "download", label: "Baixar", icon: Download, onSelect: () => download(target) },
        { id: "link", label: "Copiar link", icon: Link2, onSelect: () => void copyLink(target) },
        ...(target.uploaded ? [{ id: "delete", label: "Excluir", icon: Trash2, danger: true, onSelect: () => setToDelete(target) }] : []),
      ]
    : [];
  const deleting = useHeld(toDelete);

  const sortItems: ActionSheetItem[] = [
    ...SORT_OPTIONS.map((o) => ({ id: o.value, label: o.label, icon: sort === o.value ? CircleDot : Circle, selected: sort === o.value, onSelect: () => setSort(o.value) })),
    { id: "mine", label: "Somente enviados por mim", icon: onlyMine ? SquareCheck : Square, selected: onlyMine, onSelect: () => setOnlyMine((v) => !v) },
  ];
  const menuActive = sort !== "date-desc" || onlyMine;

  return (
    <>
      <MobileChipRow label="Categorias de documentos">
        {tabs.map(([id, label, count]) => (
          <MobileChip key={id} selected={activeTab === id} icon={TAB_ICONS[id]} count={count} onClick={() => setTab(id)}>
            {label}
          </MobileChip>
        ))}
      </MobileChipRow>

      <div className="flex items-start gap-2">
        <MobileSearchField label={DOCUMENTS_COPY.searchLabel} placeholder={DOCUMENTS_COPY.searchPlaceholder} value={query} onValueChange={setQuery} wrapperClassName="flex-1" />
        <button
          type="button"
          onClick={() => setSortOpen(true)}
          aria-haspopup="dialog"
          aria-label={menuActive ? "Ordenar e filtrar (filtros ativos)" : "Ordenar e filtrar"}
          className="relative grid size-11 shrink-0 place-items-center rounded-[12px] border border-line bg-card text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft"
        >
          <ListFilter className="size-5" aria-hidden="true" />
          {menuActive && <span aria-hidden="true" className="absolute top-1.5 right-1.5 size-2.5 rounded-full border-2 border-card bg-brand" />}
        </button>
      </div>

      <div className="-mb-2 flex items-center justify-between gap-3 px-1">
        <p className="text-[13.5px] text-ink-soft" aria-live="polite">
          Exibindo {visible.length} de {activeTab === "all" ? all.length : byCategory[activeTab]}
        </p>
        <MobileButton variant="ghost" size="sm" onClick={() => setUploadOpen(true)}>
          <Upload className="size-4" aria-hidden="true" />
          {DOCUMENTS_COPY.uploadButton}
        </MobileButton>
      </div>

      {visible.length === 0 ? (
        <MobileEmptyState
          icon={FileSearch}
          title={DOCUMENTS_COPY.emptyTitle}
          description={filtered ? DOCUMENTS_COPY.emptySearch : DOCUMENTS_COPY.emptyCategory}
          action={
            filtered ? (
              <MobileButton variant="secondary" onClick={clearFilters}>
                Limpar busca e filtros
              </MobileButton>
            ) : (
              <MobileButton onClick={() => setUploadOpen(true)}>
                <Upload className="size-5" aria-hidden="true" />
                {DOCUMENTS_COPY.uploadButton}
              </MobileButton>
            )
          }
        />
      ) : (
        <ul aria-label="Lista de documentos" className="grid gap-2.5">
          {visible.map((doc) => (
            <MobileDocumentRow key={doc.id} doc={doc} actions={actions} />
          ))}
        </ul>
      )}

      <MobileActionSheet open={sortOpen} onClose={() => setSortOpen(false)} title="Ordenar e filtrar" items={sortItems} />
      <MobileActionSheet open={!!more} onClose={() => setMore(null)} title={target?.title ?? "Documento"} description={target?.description} items={moreItems} />
      <MobileDocumentPreviewSheet doc={preview} onClose={() => setPreview(null)} onDownload={download} onOpenTab={openTab} />
      <MobileDocumentUploadSheet
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        today={today}
        onSubmit={(doc) => {
          setUploads((list) => [doc, ...list]);
          setTab(doc.category);
          clearFilters();
          toast({ title: "Documento enviado", description: `${doc.title} foi adicionado em ${CATEGORY_LABELS[doc.category]}.` });
        }}
      />
      <MobileConfirmSheet open={!!toDelete} title="Excluir documento?" description="Esta ação remove o documento da sua lista e não pode ser desfeita." confirmLabel="Excluir" danger onConfirm={confirmDelete} onCancel={() => setToDelete(null)}>
        {deleting && (
          <p className="text-[15px] text-ink">
            <strong>{deleting.title}</strong>
            <span className="block text-ink-soft">{deleting.description}</span>
          </p>
        )}
      </MobileConfirmSheet>
    </>
  );
}
