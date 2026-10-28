// lib/portal/projection.ts
//
// Pure maths for the "Solicitar Mais Purificadores" simulation, plus the per-step validation of the
// request wizard. No I/O: runs on server and client.

import { LITERS_PER_UNIT_YEAR, QUANTITY_MAX, QUANTITY_MIN, US_STATES, type PortalRequest, type RequestDraft, type RequestStepId } from "@/config/request-page";
import type { IsoDate } from "@/lib/format";

/** What the investor already has, derived from `getPortalSummary()` on the server. */
export type ProjectionBaseline = {
  /** Purifiers owned today. */
  units: number;
  /** Current monthly payout, in USD. */
  monthlyPayout: number;
  /** Number of monthly instalments of the contract. */
  installments: number;
  /** Price of one Neo UP, in USD. */
  unitPrice: number;
};

export type Projection = {
  quantity: number;
  investment: number;
  /** Payout each purifier yields per month (current payout ÷ current units). */
  payoutPerUnit: number;
  /** Extra monthly payout the new units add. */
  monthlyPayout: number;
  installments: number;
  /** Extra payout over all instalments. */
  totalPayout: number;
  netGain: number;
  /** Return over the amount invested, in percent. */
  roiPct: number;
  /** Months until the payouts repay the investment. */
  paybackMonths: number;
  litersPerYear: number;
  /** Fleet and monthly payout after the new units are running. */
  newTotalUnits: number;
  newMonthlyPayout: number;
};

export function clampQuantity(n: number): number {
  return Math.min(QUANTITY_MAX, Math.max(QUANTITY_MIN, Math.round(n)));
}

export function projectRequest(quantity: number, base: ProjectionBaseline): Projection {
  const qty = Number.isFinite(quantity) ? Math.max(0, Math.round(quantity)) : 0;
  const payoutPerUnit = base.units > 0 ? base.monthlyPayout / base.units : 0;
  const investment = qty * base.unitPrice;
  const monthlyPayout = qty * payoutPerUnit;
  const totalPayout = monthlyPayout * base.installments;
  const netGain = totalPayout - investment;
  return {
    quantity: qty,
    investment,
    payoutPerUnit,
    monthlyPayout,
    installments: base.installments,
    totalPayout,
    netGain,
    roiPct: investment > 0 ? (netGain / investment) * 100 : 0,
    paybackMonths: monthlyPayout > 0 ? Math.ceil(investment / monthlyPayout) : 0,
    litersPerYear: qty * LITERS_PER_UNIT_YEAR,
    newTotalUnits: base.units + qty,
    newMonthlyPayout: base.monthlyPayout + monthlyPayout,
  };
}

/** "SOL-2026-0003": next free protocol of the year of `today`. */
export function nextRequestProtocol(existing: PortalRequest[], today: IsoDate): string {
  const year = today.slice(0, 4);
  const prefix = `SOL-${year}-`;
  const last = existing.reduce((max, r) => (r.id.startsWith(prefix) ? Math.max(max, Number(r.id.slice(prefix.length)) || 0) : max), 0);
  return `${prefix}${String(last + 1).padStart(4, "0")}`;
}

export type DraftErrors = Partial<Record<"quantity" | "state" | "city" | "address" | "zip" | "accepted", string>>;

const ZIP = /^\d{5}(-\d{4})?$/;

/** Errors of one wizard step; an empty object means the step is valid. */
export function validateStep(step: RequestStepId, d: RequestDraft): DraftErrors {
  const errors: DraftErrors = {};

  if (step === "quantity") {
    if (!Number.isInteger(d.quantity) || d.quantity < QUANTITY_MIN || d.quantity > QUANTITY_MAX) {
      errors.quantity = `Informe uma quantidade entre ${QUANTITY_MIN} e ${QUANTITY_MAX}.`;
    }
  }

  if (step === "install" && d.install === "address") {
    if (!d.state) errors.state = "Selecione o estado.";
    if (!d.city) errors.city = "Selecione a cidade.";
    if (d.address.trim().length < 5) errors.address = "Informe o endereço completo (rua e número).";
    if (!d.zip.trim()) errors.zip = "Informe o CEP (ZIP code).";
    else if (!ZIP.test(d.zip.trim())) errors.zip = "ZIP inválido. Use 5 dígitos (ex.: 32819) ou ZIP+4 (ex.: 32819-1234).";
  }

  if (step === "payment" && !d.accepted) {
    errors.accepted = "Aceite os termos para continuar.";
  }

  return errors;
}

/** First step that has errors, or null when the whole draft is valid. */
export function firstInvalidStep(d: RequestDraft, steps: readonly RequestStepId[]): RequestStepId | null {
  return steps.find((s) => Object.keys(validateStep(s, d)).length > 0) ?? null;
}

export function formatLocation(d: RequestDraft): string {
  if (d.install === "stock") return "Estoque Acquafy";
  return `${d.address.trim()}, ${d.city}, ${d.state} ${d.zip.trim()}`;
}

export function citiesOf(state: string): string[] {
  return US_STATES.find((s) => s.value === state)?.cities ?? [];
}
