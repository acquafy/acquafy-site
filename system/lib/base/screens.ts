// lib/base/screens.ts
import "server-only";
import { PRODUCTION_GROUPS, SCREENS, type Platform, type ScreenDef } from "@/config/base-registry";
import { mobileScreenExists, organisms, referenceExists, type OrganismFile } from "./inventory";

export type PlatformState = { platform: Platform; href: string | null; state: "ready" | "pending" | "none" };

export type ResolvedScreen = Omit<ScreenDef, "references"> & {
  /** 1-based position in the production order. */
  order: number;
  group: { id: string; title: string };
  platforms: PlatformState[];
  references: { name: string; exists: boolean }[];
  organismFiles: OrganismFile[];
};

export type ProductionGroup = { id: string; letter: string; title: string; description: string; screens: ResolvedScreen[] };

function resolve(s: ScreenDef, order: number, group: { id: string; title: string }, all: OrganismFile[]): ResolvedScreen {
  const platforms: PlatformState[] = [
    { platform: "desktop", href: s.desktop, state: s.desktop ? "ready" : "none" },
    ...(["ios", "android"] as const).map((p): PlatformState => {
      if (!s.mobile || !s.mobileGroup) return { platform: p, href: null, state: "none" };
      const href = `/m/${p}/${s.mobile}`;
      return { platform: p, href, state: mobileScreenExists(p, s.mobileGroup, s.mobile) ? "ready" : "pending" };
    }),
  ];
  return {
    ...s,
    order,
    group,
    platforms,
    references: s.references.map((name) => ({ name, exists: referenceExists(name) })),
    organismFiles: all.filter((o) => s.organisms.includes(o.prefix)),
  };
}

/** Screens in production order (see PRODUCTION_GROUPS), numbered from 1; registry entries missing from the groups go last. */
export function resolveScreens(): ResolvedScreen[] {
  const all = organisms();
  const byId = new Map(SCREENS.map((s) => [s.id, s]));
  const queue: { s: ScreenDef; group: { id: string; title: string } }[] = [];
  for (const g of PRODUCTION_GROUPS) {
    for (const id of g.screens) {
      const s = byId.get(id);
      if (s) queue.push({ s, group: { id: g.id, title: g.title } });
      byId.delete(id);
    }
  }
  for (const s of byId.values()) queue.push({ s, group: { id: "other", title: "Outras" } });
  return queue.map(({ s, group }, i) => resolve(s, i + 1, group, all));
}

/** The production order split into its lettered sections (A, B, C…). */
export function productionGroups(screens: ResolvedScreen[]): ProductionGroup[] {
  const meta = [...PRODUCTION_GROUPS.map((g) => ({ id: g.id, title: g.title, description: g.description })), { id: "other", title: "Outras", description: "Telas fora da sequência." }];
  return meta.map((g, i) => ({ ...g, letter: String.fromCharCode(65 + i), screens: screens.filter((s) => s.group.id === g.id) })).filter((g) => g.screens.length > 0);
}

export type ScreenProgress = "done" | "partial" | "queued";

/** All applicable platforms ready → done; some → partial; none → queued. */
export function screenProgress(s: ResolvedScreen): ScreenProgress {
  const applicable = s.platforms.filter((p) => p.state !== "none");
  const ready = applicable.filter((p) => p.state === "ready").length;
  return ready === applicable.length ? "done" : ready === 0 ? "queued" : "partial";
}

/** First screen (in production order) still pending on `platform`: the next in that platform's queue. */
export function nextInQueue(screens: ResolvedScreen[], platform: Platform): ResolvedScreen | null {
  return screens.find((s) => s.platforms.find((p) => p.platform === platform)?.state === "pending") ?? null;
}

export function platformCounts(screens: ResolvedScreen[]): Record<Platform, { ready: number; total: number }> {
  const out = { desktop: { ready: 0, total: 0 }, ios: { ready: 0, total: 0 }, android: { ready: 0, total: 0 } };
  for (const s of screens) {
    for (const p of s.platforms) {
      if (p.state === "none") continue;
      out[p.platform].total += 1;
      if (p.state === "ready") out[p.platform].ready += 1;
    }
  }
  return out;
}

export const PLATFORM_LABEL: Record<Platform, string> = { desktop: "Desktop", ios: "iOS", android: "Android" };
