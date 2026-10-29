// components/sections/DocumentsLibrary.tsx
"use client";

import { useMemo, useState } from "react";
import { BookOpen, Circle, CircleDot, FileSearch, FileText, ListFilter, Receipt, ScrollText, Square, SquareCheck, Trash2, Upload } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/Field";
import { IconButton } from "@/components/ui/IconButton";
import { MenuItems, type MenuItem } from "@/components/ui/Menu";
import { Modal } from "@/components/ui/Modal";
import { Popover } from "@/components/ui/Popover";
import { Tabs, TabPanel, type TabItem } from "@/components/ui/Tabs";
import { CATEGORY_LABELS, DOCUMENTS_COPY, MAX_STORED_BYTES, SORT_OPTIONS, officialDocuments, type DocCategory, type DocumentItem, type SortKey } from "@/config/documents-page";
import { absoluteUrl, copyText, downloadFromUrl, formatBytes, openInNewTab } from "@/lib/fileActions";
import type { IsoDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";
import { DocumentRow, DocumentsColumnHeader, type DocumentActions } from "./DocumentsRow";
import { DocumentsAside } from "./DocumentsAside";
import { DocumentsPreviewModal } from "./DocumentsPreviewModal";
import { DocumentsUploadModal } from "./DocumentsUploadModal";

type TabId = "all" | DocCategory;

const TAB_ICONS: Record<TabId, TabItem<TabId>["icon"]> = { all: FileText, contratos: ScrollText, comprovantes: Receipt, manuais: BookOpen, outros: FileText };

/** Lower-case, accent-free text, so "comprovante" finds "Comprovante" and "politica" finds "Política". */
const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const COMPARE: Record<SortKey, (a: DocumentItem, b: DocumentItem) => number> = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  name: (a, b) => a.title.localeCompare(b.title, "pt-BR") || a.description.localeCompare(b.description, "pt-BR"),
  type: (a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title, "pt-BR"),
};

export function DocumentsLibrary({ today }: { today: IsoDate }) {
  const toast = useToast();
  const [uploads, setUploads] = usePersistentState<DocumentItem[]>("documents-uploads", []);

  const [tab, setTab] = useState<TabId>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("date-desc");
  const [onlyMine, setOnlyMine] = useState(false);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [preview, setPreview] = useState<DocumentItem | null>(null);
  const [toDelete, setToDelete] = useState<DocumentItem | null>(null);

  const all = useMemo(() => [...uploads, ...officialDocuments], [uploads]);

  const byCategory = useMemo(() => {
    const counts: Record<DocCategory, number> = { contratos: 0, comprovantes: 0, manuais: 0, outros: 0 };
    for (const d of all) counts[d.category]++;
    return counts;
  }, [all]);

  const tabs: TabItem<TabId>[] = (
    [
      ["all", "Todos", all.length],
      ["contratos", CATEGORY_LABELS.contratos, byCategory.contratos],
      ["comprovantes", CATEGORY_LABELS.comprovantes, byCategory.comprovantes],
      ["manuais", CATEGORY_LABELS.manuais, byCategory.manuais],
      ["outros", CATEGORY_LABELS.outros, byCategory.outros],
    ] as const
  )
    .filter(([id, , count]) => id !== "outros" || count > 0)
    .map(([id, label, count]) => ({ id, label, count, icon: TAB_ICONS[id] }));
  const activeTab: TabId = tabs.some((t) => t.id === tab) ? tab : "all";

  const visible = useMemo(() => {
    const q = fold(query.trim());
    return all
      .filter((d) => activeTab === "all" || d.category === activeTab)
      .filter((d) => !onlyMine || d.uploaded)
      .filter((d) => !q || fold(`${d.title} ${d.description} ${d.kind} ${CATEGORY_LABELS[d.category]}`).includes(q))
      .sort(COMPARE[sort]);
  }, [all, activeTab, onlyMine, query, sort]);

  const filtered = query.trim() !== "" || onlyMine;
  const clearFilters = () => {
    setQuery("");
    setOnlyMine(false);
  };

  // ---- actions -------------------------------------------------------------------------------------------

  const download = (doc: DocumentItem) => {
    const href = doc.file ?? doc.dataUrl;
    if (!href) {
      toast({
        tone: "info",
        title: "Conteúdo não armazenado",
        description: `${doc.filename} é maior que ${formatBytes(MAX_STORED_BYTES)} e foi registrado só com nome, tamanho e tipo.`,
      });
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

  const confirmDelete = () => {
    if (!toDelete) return;
    setUploads((list) => list.filter((d) => d.id !== toDelete.id));
    toast({ title: "Documento excluído", description: toDelete.title });
    setToDelete(null);
  };

  const actions: DocumentActions = { onPreview: setPreview, onDownload: download, onCopyLink: copyLink, onDelete: setToDelete };

  // ---- sort / filter menu --------------------------------------------------------------------------------

  const menuItems: MenuItem[] = [
    ...SORT_OPTIONS.map((o) => ({ label: o.label, icon: sort === o.value ? CircleDot : Circle, onSelect: () => setSort(o.value) })),
    { label: "Somente enviados por mim", icon: onlyMine ? SquareCheck : Square, separatorBefore: true, onSelect: () => setOnlyMine((v) => !v) },
  ];
  const menuActive = sort !== "date-desc" || onlyMine;

  // ---- derived summary -----------------------------------------------------------------------------------

  const totalBytes = all.reduce((s, d) => s + d.sizeBytes, 0);
  const lastUpdate = all.reduce<string | null>((m, d) => (m === null || d.date > m ? d.date : m), null);

  return (
    <div className="grid items-start gap-4 @[1000px]:grid-cols-[minmax(0,1fr)_340px]">
      <Card
        container
        title="Meus documentos"
        action={
          <Button size="sm" onClick={() => setUploadOpen(true)}>
            <Upload className="size-4" aria-hidden="true" />
            {DOCUMENTS_COPY.uploadButton}
          </Button>
        }
      >
        <Tabs items={tabs} value={activeTab} onChange={setTab} label="Categorias de documentos" idPrefix="documents" />

        <div className="mt-4 flex items-start gap-3">
          <SearchInput label={DOCUMENTS_COPY.searchLabel} placeholder={DOCUMENTS_COPY.searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} wrapperClassName="flex-1" />
          <Popover
            role="menu"
            label="Ordenar e filtrar documentos"
            panelClassName="min-w-72"
            trigger={(props) => (
              <span className="relative block">
                <IconButton icon={ListFilter} label="Ordenar e filtrar" bordered className="!size-11 !rounded-lg" {...props} />
                {menuActive && <span aria-hidden="true" className="absolute -top-1 -right-1 size-3 rounded-full border-2 border-card bg-brand" />}
              </span>
            )}
          >
            {({ close }) => <MenuItems items={menuItems} close={close} />}
          </Popover>
        </div>

        <p className="mt-3 mb-2 text-[13.5px] text-ink-soft" aria-live="polite">
          Exibindo {visible.length} de {activeTab === "all" ? all.length : byCategory[activeTab]} documentos
        </p>

        <TabPanel idPrefix="documents" value={activeTab}>
          {visible.length === 0 ? (
            <EmptyState
              icon={FileSearch}
              title={DOCUMENTS_COPY.emptyTitle}
              description={filtered ? DOCUMENTS_COPY.emptySearch : DOCUMENTS_COPY.emptyCategory}
              action={
                filtered ? (
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Limpar busca e filtros
                  </Button>
                ) : (
                  <Button size="sm" onClick={() => setUploadOpen(true)}>
                    <Upload className="size-4" aria-hidden="true" />
                    {DOCUMENTS_COPY.uploadButton}
                  </Button>
                )
              }
            />
          ) : (
            <>
              <DocumentsColumnHeader />
              <ul aria-label="Lista de documentos" className="flex flex-col gap-2.5">
                {visible.map((doc) => (
                  <DocumentRow key={doc.id} doc={doc} actions={actions} />
                ))}
              </ul>
            </>
          )}
        </TabPanel>
      </Card>

      <DocumentsAside total={all.length} byCategory={byCategory} mine={uploads.length} totalBytes={totalBytes} lastUpdate={lastUpdate} onUpload={() => setUploadOpen(true)} />

      <DocumentsUploadModal
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

      <DocumentsPreviewModal doc={preview} onClose={() => setPreview(null)} onDownload={download} onOpenTab={openTab} />

      <DeleteDialog doc={toDelete} onCancel={() => setToDelete(null)} onConfirm={confirmDelete} />
    </div>
  );
}

function DeleteDialog({ doc, onCancel, onConfirm }: { doc: DocumentItem | null; onCancel: () => void; onConfirm: () => void }) {
  return (
    <Modal
      open={!!doc}
      onClose={onCancel}
      size="sm"
      title="Excluir documento?"
      description="Esta ação remove o documento da sua lista e não pode ser desfeita."
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            <Trash2 className="size-4" aria-hidden="true" />
            Excluir
          </Button>
        </>
      }
    >
      {doc && (
        <p className="text-[14.5px] text-ink">
          <strong>{doc.title}</strong>
          <span className="block text-ink-soft">{doc.description}</span>
        </p>
      )}
    </Modal>
  );
}
