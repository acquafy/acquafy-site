// components/sections/ContractKpis.tsx
import { CalendarCheck, CircleCheck, CircleDollarSign, Coins, Hourglass } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { contract } from "@/config/investor";
import { diffDays, formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

/** Months between two ISO dates, rounded ("em 35 meses"). */
export function monthsBetween(a: string, b: string): number {
  return Math.max(0, Math.round(diffDays(a, b) / 30.44));
}

export function ContractKpis() {
  const s = getPortalSummary();
  const leasePct = Math.round(contract.leaseShare * 100);
  const monthsLeft = monthsBetween(s.today, contract.endDate);

  // 2 columns → 3 + 2 (spans of a 6-column grid) → 5 in a row, answering to the width of the content column.
  return (
    <div className="grid grid-cols-2 gap-4 @[640px]:grid-cols-6 @[640px]:[&>*]:col-span-2 @max-[999px]:@[640px]:[&>*:nth-child(n+4)]:col-span-3 @[1000px]:grid-cols-5 @[1000px]:[&>*]:col-span-1">
      <KpiCard icon={Coins} tone="blue" label="Investimento total" value={<Money value={s.invested} whole />} caption={`${s.units} purificadores Neo UP`} />
      <KpiCard icon={CircleDollarSign} tone="green" label="Repasse mensal" value={<Money value={s.monthlyPayout} whole />} caption={`${leasePct}% do Lease`} />
      <KpiCard icon={Hourglass} tone="violet" label="Prazo" value={`${contract.termMonths} meses`} caption={`${s.installments.length} parcelas`} />
      <KpiCard icon={CircleCheck} tone="orange" label="Parcelas recebidas" value={`${s.receivedCount}/${s.installments.length}`} caption={`${s.remainingCount} restantes`} />
      <KpiCard icon={CalendarCheck} tone="pink" label="Término" value={formatDate(contract.endDate)} caption={`em ${monthsLeft} meses`} />
    </div>
  );
}
