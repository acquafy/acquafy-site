// lib/portal/text-search.ts
//
// Accent- and case-insensitive text matching for the help search. Pure.

/** Lower-case, accent-free text, so "repasse" finds "Repasses" and "Recompra" finds "recompra". */
export function normalizeText(s: string): string {
  return s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Every word of the query must appear in at least one of the fields. */
export function matchesQuery(query: string, ...fields: string[]): boolean {
  const haystack = normalizeText(fields.join(" "));
  return normalizeText(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
