// components/base/previews/types.ts
import type { ReactNode } from "react";

/**
 * What the gallery shows for one organism:
 * - `node`: the live organism (already given its props or wrapped in what it needs). `tall` gives an app panel a fixed
 *   height so the sheets it opens fit inside; `note` adds a line under the title.
 * - `opensFrom`: it cannot stand alone; the block says what shows it (and `reason`, why).
 */
export type PreviewSpec = { node: ReactNode; tall?: boolean; note?: string } | { opensFrom: string; reason?: string };

/** Organism name (file name without extension) → preview. Built lazily: props come from `getPortalSummary()` and the configs. */
export type PreviewMap = Record<string, () => PreviewSpec>;
