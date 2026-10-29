// lib/portal/documents.ts
//
// Search, filter and sort of the document library. Pure; shared by every screen that lists documents.

import { CATEGORY_LABELS, type DocCategory, type DocumentItem, type SortKey } from "@/config/documents-page";

/** Lower-case, accent-free text, so "comprovante" finds "Comprovante" and "politica" finds "Política". */
export const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

export const COMPARE: Record<SortKey, (a: DocumentItem, b: DocumentItem) => number> = {
  "date-desc": (a, b) => b.date.localeCompare(a.date),
  "date-asc": (a, b) => a.date.localeCompare(b.date),
  name: (a, b) => a.title.localeCompare(b.title, "pt-BR") || a.description.localeCompare(b.description, "pt-BR"),
  type: (a, b) => a.kind.localeCompare(b.kind) || a.title.localeCompare(b.title, "pt-BR"),
};

export type DocFilters = { category: "all" | DocCategory; query: string; sort: SortKey; onlyMine: boolean };

export function filterDocuments(all: DocumentItem[], { category, query, sort, onlyMine }: DocFilters): DocumentItem[] {
  const q = fold(query.trim());
  return all
    .filter((d) => category === "all" || d.category === category)
    .filter((d) => !onlyMine || d.uploaded)
    .filter((d) => !q || fold(`${d.title} ${d.description} ${d.kind} ${CATEGORY_LABELS[d.category]}`).includes(q))
    .sort(COMPARE[sort]);
}

export function countByCategory(all: DocumentItem[]): Record<DocCategory, number> {
  const counts: Record<DocCategory, number> = { contratos: 0, comprovantes: 0, manuais: 0, outros: 0 };
  for (const d of all) counts[d.category]++;
  return counts;
}
