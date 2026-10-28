// lib/format.ts
//
// Money and date formatting for the portal. Dates travel as ISO "YYYY-MM-DD" strings (never `Date`
// objects crossing the server/client boundary) and are parsed by hand so a viewer's timezone can
// never shift a payment by a day.

const MONTHS_SHORT = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"] as const;
const MONTHS_LONG = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

export type IsoDate = string;

export function parseIso(iso: IsoDate): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

export function toIso(y: number, m: number, d: number): IsoDate {
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function daysInMonth(y: number, m: number): number {
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

/** Whole days from `a` to `b` (negative when `b` is earlier). */
export function diffDays(a: IsoDate, b: IsoDate): number {
  const pa = parseIso(a);
  const pb = parseIso(b);
  return Math.round((Date.UTC(pb.y, pb.m - 1, pb.d) - Date.UTC(pa.y, pa.m - 1, pa.d)) / 86_400_000);
}

/** 2026-12-01 → "01/12/2026" */
export function formatDate(iso: IsoDate): string {
  const { y, m, d } = parseIso(iso);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

/** 2026-12-01 → "01/12" */
export function formatDayMonth(iso: IsoDate): string {
  const { m, d } = parseIso(iso);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
}

/** 2026-12-01 → "01 de dezembro de 2026" */
export function formatDateLong(iso: IsoDate): string {
  const { y, m, d } = parseIso(iso);
  return `${String(d).padStart(2, "0")} de ${MONTHS_LONG[m - 1].toLowerCase()} de ${y}`;
}

/** (2026, 11) → "Nov/2026" */
export function formatCompetence(y: number, m: number): string {
  return `${MONTHS_SHORT[m - 1]}/${y}`;
}

/** (2026, 11) → "Nov/26" */
export function formatCompetenceShort(y: number, m: number): string {
  return `${MONTHS_SHORT[m - 1]}/${String(y).slice(2)}`;
}

export function monthName(m: number): string {
  return MONTHS_LONG[m - 1];
}

export function monthShort(m: number): string {
  return MONTHS_SHORT[m - 1];
}

const MONEY_2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const MONEY_0 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** 400 → "US$ 400,00" */
export function formatUsd(value: number): string {
  return `US$ ${MONEY_2.format(value)}`;
}

/** 14000 → "US$ 14.000" (whole dollars, for headline figures) */
export function formatUsdWhole(value: number): string {
  return `US$ ${MONEY_0.format(value)}`;
}

/** 400 → "400,00" (table cells under a "(US$)" header) */
export function formatAmount(value: number): string {
  return MONEY_2.format(value);
}
