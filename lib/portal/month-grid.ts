// lib/portal/month-grid.ts
//
// Day cells of a month calendar (weeks start on Sunday), padded with the neighbouring months' days. Pure.

import { daysInMonth, toIso, type IsoDate } from "@/lib/format";

export const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

export type MonthCell = { iso: IsoDate; day: number; inMonth: boolean };

export function monthGrid(year: number, month: number): MonthCell[] {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const cells: MonthCell[] = [];
  const prevY = month === 1 ? year - 1 : year;
  const prevM = month === 1 ? 12 : month - 1;
  const prevDays = daysInMonth(prevY, prevM);
  for (let i = first - 1; i >= 0; i--) cells.push({ iso: toIso(prevY, prevM, prevDays - i), day: prevDays - i, inMonth: false });
  for (let d = 1; d <= daysInMonth(year, month); d++) cells.push({ iso: toIso(year, month, d), day: d, inMonth: true });
  const nextY = month === 12 ? year + 1 : year;
  const nextM = month === 12 ? 1 : month + 1;
  for (let d = 1; cells.length % 7 !== 0; d++) cells.push({ iso: toIso(nextY, nextM, d), day: d, inMonth: false });
  return cells;
}

/** Month shifted by `delta` months: ({y:2026,m:12}, 1) → {y:2027,m:1}. */
export function shiftMonth(cursor: { y: number; m: number }, delta: number): { y: number; m: number } {
  const t = cursor.m - 1 + delta;
  return { y: cursor.y + Math.floor(t / 12), m: (((t % 12) + 12) % 12) + 1 };
}
