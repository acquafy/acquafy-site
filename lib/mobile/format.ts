// lib/mobile/format.ts
//
// Compact date strings for the mobile layouts (built on lib/format.ts: ISO in, never `Date`).

import { formatDayMonth, monthShort, parseIso, type IsoDate } from "@/lib/format";

const pad = (n: number) => String(n).padStart(2, "0");

/** 2026-12-01 → "01 Dez 2026" */
export function formatDateShort(iso: IsoDate): string {
  const { y, m, d } = parseIso(iso);
  return `${pad(d)} ${monthShort(m)} ${y}`;
}

/** 2026-12-01 → { day: "01", month: "DEZ", year: "2026" } (the date block of a statement row). */
export function dateBlock(iso: IsoDate): { day: string; month: string; year: string } {
  const { y, m, d } = parseIso(iso);
  return { day: pad(d), month: monthShort(m).toUpperCase(), year: String(y) };
}

/** Period of an instalment: "01/11 a 30/11/2026". */
export function formatPeriod(start: IsoDate, end: IsoDate): string {
  return `${formatDayMonth(start)} a ${formatDayMonth(end)}/${parseIso(end).y}`;
}
