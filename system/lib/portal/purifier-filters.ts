// lib/portal/purifier-filters.ts
//
// Search and status filter of the purifier list. Pure; shared by every screen that lists purifiers.

import type { Purifier, PurifierStatus } from "@/config/investor";
import { locationLabel } from "./purifiers";

export type PurifierStatusFilter = "all" | PurifierStatus;

export function filterPurifiers(list: Purifier[], status: PurifierStatusFilter, query: string): Purifier[] {
  const q = query.trim().toLowerCase();
  return list.filter((p) => (status === "all" || p.status === status) && (!q || p.serial.toLowerCase().includes(q) || locationLabel(p).toLowerCase().includes(q)));
}

export function countByStatus(list: Purifier[]): Record<PurifierStatusFilter, number> {
  return {
    all: list.length,
    operation: list.filter((p) => p.status === "operation").length,
    available: list.filter((p) => p.status === "available").length,
    maintenance: list.filter((p) => p.status === "maintenance").length,
  };
}
