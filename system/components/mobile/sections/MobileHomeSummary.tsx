// components/mobile/sections/MobileHomeSummary.tsx
"use client";

import { useId, useState } from "react";
import { CalendarDays, ChartNoAxesColumn, ChevronDown, Coins, Droplet, TrendingUp, Wrench, type LucideIcon } from "lucide-react";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { IconTile } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { cn } from "@/lib/cn";

export type HomeSummaryData = {
  units: number;
  invested: number;
  monthlyPayout: number;
  /** Already formatted ("01 Dez 2026"), or null when every payout was made. */
  nextPayout: string | null;
  inOperation: number;
  available: number;
  inMaintenance: number;
  totalForecast: number;
  installments: number;
};

function Row({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: React.ReactNode }) {
  return (
    <div className="flex min-h-10 items-center gap-3 border-b border-line py-1.5 last:border-b-0">
      <Icon className="size-[18px] shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
      <dt className="min-w-0 flex-1 text-[14.5px] text-ink-soft">{label}</dt>
      <dd className="tabular text-[16px] font-extrabold text-brand">{value}</dd>
    </div>
  );
}

/** "Resumo do investimento": the four headline figures, with a chevron that expands the breakdown. */
export function MobileHomeSummary({ data }: { data: HomeSummaryData }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();

  return (
    <MobileCard as="section" aria-label="Resumo do investimento" padding="sm" className="p-3.5">
      <div className="flex items-center gap-3">
        <IconTile icon={ChartNoAxesColumn} tone="blue" className="size-10 !rounded-full" />
        <h2 className="min-w-0 flex-1 text-[18px] font-bold tracking-tight text-ink">Resumo do investimento</h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={detailId}
          aria-label={open ? "Mostrar menos detalhes do investimento" : "Mostrar mais detalhes do investimento"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 shrink-0 place-items-center rounded-full text-brand focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft"
        >
          <ChevronDown className={cn("size-6 transition-transform", open && "rotate-180")} aria-hidden="true" />
        </button>
      </div>

      <dl className="mt-1">
        <Row icon={Droplet} label="Purificadores adquiridos" value={data.units} />
        <Row icon={Coins} label="Valor investido" value={<Money value={data.invested} whole />} />
        <Row icon={TrendingUp} label="Repasse mensal estimado" value={<Money value={data.monthlyPayout} whole />} />
        <Row icon={CalendarDays} label="Próximo repasse" value={data.nextPayout ?? "Concluído"} />
      </dl>

      <dl id={detailId} hidden={!open} className="mt-1 border-t border-line pt-1">
        <Row icon={PurifierIcon} label="Em operação" value={data.inOperation} />
        <Row icon={PurifierIcon} label="Disponíveis (estoque)" value={data.available} />
        <Row icon={Wrench} label="Em manutenção" value={data.inMaintenance} />
        <Row icon={ChartNoAxesColumn} label={`Total previsto (${data.installments} parcelas)`} value={<Money value={data.totalForecast} whole />} />
      </dl>
    </MobileCard>
  );
}
