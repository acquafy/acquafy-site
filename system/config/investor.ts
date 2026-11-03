// config/investor.ts
//
// Mock data for the Investor Portal until the real API is connected. Everything the screens show
// (KPIs, schedule, statement) is derived from these records by lib/portal/*, so the numbers always
// agree with each other. Replace this file's exports with API calls; the shapes are the contract.

import type { IsoDate } from "@/lib/format";

export type Investor = {
  name: string;
  role: string;
  initials: string;
  currency: "USD";
};

export type Contract = {
  title: string;
  /** Day the investment was made; accrual starts here. */
  startDate: IsoDate;
  /** Contract length in months. */
  termMonths: number;
  /** Number of monthly instalments (the first covers the days since `startDate`). */
  installments: number;
  /** First month paid (competence) — the instalment of this month is paid on day 1 of the next. */
  firstCompetence: { year: number; month: number };
  /** Gross value of each instalment, in USD. */
  installmentValue: number;
  /** Share of the lease revenue that is passed on to the investor. */
  leaseShare: number;
  /** Optional buy-back at the end, as a share of the amount invested. */
  buybackShare: number;
  paymentMethod: string;
  endDate: IsoDate;
  /** First scheduled review of the contract. */
  nextReview: IsoDate;
};

export type PurifierStatus = "operation" | "available" | "maintenance";

export type Purifier = {
  id: number;
  model: string;
  serial: string;
  status: PurifierStatus;
  /** Null while the unit is in stock. */
  activationDate: IsoDate | null;
  city: string;
  state: string;
  /** Stock units have no end customer yet. */
  endCustomer: boolean;
};

export const investor: Investor = {
  name: "Carlos Silva",
  role: "Investidor",
  initials: "CS",
  currency: "USD",
};

export const contract: Contract = {
  title: "Contrato de Participação Acquafy WaaS",
  startDate: "2026-10-26",
  termMonths: 36,
  installments: 35,
  firstCompetence: { year: 2026, month: 11 },
  installmentValue: 400,
  leaseShare: 0.5,
  buybackShare: 0.3,
  paymentMethod: "Transferência bancária (USD)",
  endDate: "2029-10-25",
  nextReview: "2027-11-10",
};

/** Price of one Neo UP, in USD. Total invested = units × this. */
export const UNIT_PRICE = 400;

/** Activation offsets (days after 2026-11-10) of the 18 units already in operation. */
const ACTIVATION_OFFSETS = [0, 2, 5, 8, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38];
const CITIES: ReadonlyArray<readonly [string, string]> = [
  ["Orlando", "FL"],
  ["Orlando", "FL"],
  ["Orlando", "FL"],
  ["Miami", "FL"],
  ["Orlando", "FL"],
  ["Tampa", "FL"],
  ["Orlando", "FL"],
  ["Miami", "FL"],
  ["Orlando", "FL"],
];

function addDaysIso(base: IsoDate, days: number): IsoDate {
  const [y, m, d] = base.split("-").map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + days));
  return `${t.getUTCFullYear()}-${String(t.getUTCMonth() + 1).padStart(2, "0")}-${String(t.getUTCDate()).padStart(2, "0")}`;
}

/** Units #4 and #10 of the first page are still in stock; the rest are installed. */
const IN_STOCK = new Set([4, 10]);

export const purifiers: Purifier[] = (() => {
  const list: Purifier[] = [];
  let activations = 0;
  for (let id = 1; id <= 20; id++) {
    const stock = IN_STOCK.has(id);
    const [city, state] = stock ? ["Estoque", "FL"] : CITIES[activations % CITIES.length];
    list.push({
      id,
      model: "Neo UP",
      serial: `AU2401A${3566 + id}`,
      status: stock ? "available" : "operation",
      activationDate: stock ? null : addDaysIso("2026-11-10", ACTIVATION_OFFSETS[activations]),
      city,
      state,
      endCustomer: !stock,
    });
    if (!stock) activations++;
  }
  return list;
})();
