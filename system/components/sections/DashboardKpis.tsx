// components/sections/DashboardKpis.tsx
import { ChartNoAxesColumn, CircleDollarSign, ReceiptText } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { KpiCard } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { contract, UNIT_PRICE } from "@/config/investor";
import { getPortalSummary } from "@/lib/portal/schedule";

export function DashboardKpis() {
  const s = getPortalSummary();
  return (
    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-4">
      <KpiCard icon={PurifierIcon} tone="blue" label="Purificadores adquiridos" value={s.units} caption="Neo UP" />
      <KpiCard
        icon={CircleDollarSign}
        tone="violet"
        label="Investimento total"
        value={<Money value={s.invested} whole />}
        caption={
          <>
            {s.units} x <Money value={UNIT_PRICE} whole />
          </>
        }
      />
      <KpiCard icon={ReceiptText} tone="green" label="Repasse mensal" value={<Money value={s.monthlyPayout} whole />} caption={`(${Math.round(contract.leaseShare * 100)}% do lease)`} />
      <KpiCard icon={ChartNoAxesColumn} tone="violet" label="Total previsto" value={<Money value={s.totalForecast} whole />} caption={`em ${s.installments.length} parcelas`} />
    </div>
  );
}
