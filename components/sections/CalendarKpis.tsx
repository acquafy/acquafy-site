// components/sections/CalendarKpis.tsx
import { CalendarDays, CircleCheck, CircleDollarSign, Coins } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { contract } from "@/config/investor";
import { formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

export function CalendarKpis() {
  const s = getPortalSummary();
  const next = s.next;
  return (
    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-4">
      <KpiCard icon={CalendarDays} tone="violet" label="Próximo repasse" value={next ? formatDate(next.paymentDate) : "—"} caption={s.daysToNext !== null ? `Em ${s.daysToNext} dias` : undefined} />
      <KpiCard
        icon={CircleDollarSign}
        tone="blue"
        label="Valor do próximo repasse"
        value={next ? <Money value={next.amount} /> : "—"}
        caption={`${Math.round(contract.leaseShare * 100)}% do Lease (${s.units} unidades)`}
      />
      <KpiCard icon={Coins} tone="violet" label="Total previsto" value={<Money value={s.totalForecast} whole />} caption={`em ${s.installments.length} parcelas`} />
      <KpiCard icon={CircleCheck} tone="green" label="Repasses realizados" value={`${s.receivedCount} de ${s.installments.length}`}>
        <div className="mt-1.5 flex items-center gap-2">
          <ProgressBar value={s.progressPct} label="Repasses realizados" />
          <span className="tabular text-[13px] text-ink-soft">{s.progressPct}%</span>
        </div>
      </KpiCard>
    </div>
  );
}
