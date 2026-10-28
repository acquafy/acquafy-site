// lib/base/organism-groups.ts
import "server-only";
import { PRODUCTION_GROUPS, SCREENS } from "@/config/base-registry";
import { organisms, type OrganismFile } from "./inventory";

export type OrganismGroup = {
  /** URL segment of /base/organismos/<slug>: the id of the first screen that uses these organisms. */
  slug: string;
  title: string;
  items: OrganismFile[];
};

export const SHARED_SLUG = "compartilhados";

/**
 * Organisms grouped by the screen that uses them. Screens that share the same organisms (Perfil, Segurança and Ajuda)
 * make one group, named after the first of them; whatever no screen claims goes to "Compartilhados".
 */
export function organismGroups(kind?: OrganismFile["kind"]): OrganismGroup[] {
  const all = organisms().filter((o) => !kind || o.kind === kind);
  // Production order of the screens (same numbering as /base/telas).
  const rank = new Map(PRODUCTION_GROUPS.flatMap((g) => g.screens).map((id, i) => [id, i]));
  const ordered = [...SCREENS].sort((a, b) => (rank.get(a.id) ?? 999) - (rank.get(b.id) ?? 999));
  const groups = ordered
    .filter((s, i, arr) => arr.findIndex((x) => x.organisms.join() === s.organisms.join()) === i)
    .map((s) => ({
      slug: s.id,
      title: s.title,
      items: all.filter((o) => s.organisms.includes(o.prefix)),
    }));
  const used = new Set(groups.flatMap((g) => g.items.map((i) => i.file)));
  const shared = { slug: SHARED_SLUG, title: "Compartilhados", items: all.filter((o) => !used.has(o.file)) };
  return [...groups, shared].filter((g) => g.items.length > 0);
}
