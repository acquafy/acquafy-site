// lib/portal/statement.ts
//
// Filters of the statement (Extrato / Financeiro). Pure; shared by every screen that lists payouts.

import { contract } from "@/config/investor";
import { formatCompetence, formatDate, formatUsd } from "@/lib/format";
import { formatPeriod } from "@/lib/mobile/format";
import type { Installment } from "./schedule";

export type PayoutFilter = "all" | "received" | "pending";

export function filterInstallments(list: Installment[], filter: PayoutFilter, year: string): Installment[] {
  return list.filter((i) => (filter === "all" || (filter === "received") === (i.status === "received")) && (year === "all" || i.paymentDate.startsWith(year)));
}

/** Years in which a payment falls, in order. */
export function paymentYears(list: Installment[]): string[] {
  return [...new Set(list.map((i) => i.paymentDate.slice(0, 4)))];
}

/** Plain-text receipt of a received payout (mock until the real receipt PDF exists). */
export function receiptText(i: Installment): string {
  return [
    "COMPROVANTE DE REPASSE - ACQUAFY",
    "",
    `Contrato: ${contract.title}`,
    `Parcela: ${i.number} de ${contract.installments}`,
    `Competência: ${formatCompetence(i.year, i.month)}`,
    `Período: ${formatPeriod(i.periodStart, i.periodEnd)} (${i.days} dias)`,
    `Valor: ${formatUsd(i.amount)}`,
    `Data do pagamento: ${formatDate(i.paymentDate)}`,
    `Forma de pagamento: ${contract.paymentMethod}`,
    `Status: ${i.status === "received" ? "Recebido" : "Pendente"}`,
  ].join("\r\n");
}

/** CSV rows (header included) for the given instalments, in the same layout as the desktop export. */
export function statementCsvRows(rows: Installment[]): (string | number)[][] {
  const head = ["#", "Competência", "Período", "Dias", "Valor (US$)", "Data do Pagamento", "Status"];
  return [head, ...rows.map((i) => [i.number, formatCompetence(i.year, i.month), formatPeriod(i.periodStart, i.periodEnd), i.days, i.amount.toFixed(2), formatDate(i.paymentDate), i.status === "received" ? "Recebido" : "Pendente"])];
}
