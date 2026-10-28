// lib/portal/schedule.ts
//
// Derives the payout (repasse) schedule and every headline figure of the portal from the contract
// and the purifier list. Pure functions: no I/O, so they run in Server Components and in tests.

import { contract, purifiers, UNIT_PRICE, type Contract } from "@/config/investor";
import { daysInMonth, diffDays, toIso, type IsoDate } from "@/lib/format";

/** The date the portal treats as "today". Overridable (PORTAL_MOCK_TODAY=YYYY-MM-DD) to preview
 * other points of the contract while the data is mocked. */
export function portalToday(): IsoDate {
  const override = process.env.PORTAL_MOCK_TODAY;
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  return "2026-10-28";
}

export type InstallmentStatus = "received" | "next" | "scheduled";

export type Installment = {
  /** 1-based sequence number. */
  number: number;
  year: number;
  month: number;
  periodStart: IsoDate;
  periodEnd: IsoDate;
  /** Days covered by the period; the first period also counts the days since the investment. */
  days: number;
  /** Days of the previous month already covered by this instalment (only the first one has any). */
  bonusDays: number;
  amount: number;
  paymentDate: IsoDate;
  status: InstallmentStatus;
};

export function buildInstallments(c: Contract, today: IsoDate): Installment[] {
  const list: Installment[] = [];
  let year = c.firstCompetence.year;
  let month = c.firstCompetence.month;

  for (let n = 1; n <= c.installments; n++) {
    const last = daysInMonth(year, month);
    const ny = month === 12 ? year + 1 : year;
    const nm = month === 12 ? 1 : month + 1;
    const monthStart = toIso(year, month, 1);
    const periodStart = n === 1 ? c.startDate : monthStart;
    const periodEnd = toIso(year, month, last);
    const paymentDate = toIso(ny, nm, 1);
    list.push({
      number: n,
      year,
      month,
      periodStart,
      periodEnd,
      days: diffDays(periodStart, periodEnd) + 1,
      bonusDays: diffDays(periodStart, monthStart),
      amount: c.installmentValue,
      paymentDate,
      status: diffDays(paymentDate, today) >= 0 ? "received" : "scheduled",
    });
    year = ny;
    month = nm;
  }

  const next = list.find((i) => i.status === "scheduled");
  if (next) next.status = "next";
  return list;
}

export type PortalSummary = {
  today: IsoDate;
  installments: Installment[];
  next: Installment | null;
  daysToNext: number | null;
  units: number;
  unitsInOperation: number;
  unitsAvailable: number;
  unitsInMaintenance: number;
  invested: number;
  monthlyPayout: number;
  totalForecast: number;
  receivedCount: number;
  receivedTotal: number;
  remainingCount: number;
  remainingTotal: number;
  progressPct: number;
};

export function getPortalSummary(): PortalSummary {
  const today = portalToday();
  const installments = buildInstallments(contract, today);
  const next = installments.find((i) => i.status === "next") ?? null;
  const received = installments.filter((i) => i.status === "received");
  const remaining = installments.filter((i) => i.status !== "received");
  const totalForecast = installments.reduce((s, i) => s + i.amount, 0);
  const receivedTotal = received.reduce((s, i) => s + i.amount, 0);

  return {
    today,
    installments,
    next,
    daysToNext: next ? diffDays(today, next.paymentDate) : null,
    units: purifiers.length,
    unitsInOperation: purifiers.filter((p) => p.status === "operation").length,
    unitsAvailable: purifiers.filter((p) => p.status === "available").length,
    unitsInMaintenance: purifiers.filter((p) => p.status === "maintenance").length,
    invested: purifiers.length * UNIT_PRICE,
    monthlyPayout: contract.installmentValue,
    totalForecast,
    receivedCount: received.length,
    receivedTotal,
    remainingCount: remaining.length,
    remainingTotal: totalForecast - receivedTotal,
    progressPct: Math.round((received.length / installments.length) * 100),
  };
}
