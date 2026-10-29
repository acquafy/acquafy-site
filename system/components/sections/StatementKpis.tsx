// components/sections/StatementKpis.tsx
import { CalendarCheck, ChartNoAxesColumn, Clock3, Coins } from "lucide-react";
import { KpiCard } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { getPortalSummary } from "@/lib/portal/schedule";

export function StatementKpis() {
  const s = getPortalSummary();
  return (
    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-4">
      <KpiCard icon={Coins} tone="green" labelFirst={false} label="Total recebido" value={<Money value={s.receivedTotal} whole />} caption="Ver detalhes" captionHref="#detalhamento" />
      <KpiCard icon={ChartNoAxesColumn} tone="violet" labelFirst={false} label="Saldo a receber" value={<Money value={s.remainingTotal} whole />} caption="Ver projeção" captionHref="#historico" />
      <KpiCard icon={CalendarCheck} tone="blue" labelFirst={false} label="Pagamentos realizados" value={s.receivedCount} caption="Ver histórico" captionHref="#detalhamento" />
      <KpiCard icon={Clock3} tone="orange" labelFirst={false} label="Pagamentos restantes" value={s.remainingCount} caption="Ver calendário" captionHref="/calendario" />
    </div>
  );
}
