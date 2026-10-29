// lib/portal/purifiers.ts
//
// Presentation helpers for the purifier list.

import type { Purifier } from "@/config/investor";
import type { IsoDate } from "@/lib/format";

export function locationLabel(p: Purifier): string {
  return p.status === "available" ? `Estoque (${p.state})` : `${p.city}, ${p.state}`;
}

export function mapsUrl(p: Purifier): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${p.city}, ${p.state}, USA`)}`;
}

/** First scheduled review: one year after activation. */
export function reviewDate(activation: IsoDate): IsoDate {
  const [y, m, d] = activation.split("-");
  return `${Number(y) + 1}-${m}-${d}`;
}
