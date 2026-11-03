// lib/portal/ics.ts
//
// iCalendar (RFC 5545) all-day events for the scheduled payouts.

import type { Installment } from "./schedule";

const compact = (iso: string) => iso.replaceAll("-", "");

function nextDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + 1));
  return `${t.getUTCFullYear()}${String(t.getUTCMonth() + 1).padStart(2, "0")}${String(t.getUTCDate()).padStart(2, "0")}`;
}

export function buildIcs(installments: Installment[]): string {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Acquafy//Investor Portal//PT", "CALSCALE:GREGORIAN"];
  for (const i of installments) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:repasse-${i.number}@acquafy.com`,
      `DTSTAMP:${compact(i.paymentDate)}T000000Z`,
      `DTSTART;VALUE=DATE:${compact(i.paymentDate)}`,
      `DTEND;VALUE=DATE:${nextDay(i.paymentDate)}`,
      `SUMMARY:Repasse Acquafy US$ ${i.amount.toFixed(2)}`,
      `DESCRIPTION:Parcela ${i.number} - competência ${String(i.month).padStart(2, "0")}/${i.year}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}
