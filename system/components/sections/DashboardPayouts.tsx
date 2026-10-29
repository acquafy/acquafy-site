// components/sections/DashboardPayouts.tsx
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Money } from "@/components/ui/Money";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/Badge";
import { formatCompetence, formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

const UPCOMING = 4;

/** How much of the contract has been paid, and the next payouts in line. */
export function DashboardPayouts() {
  const s = getPortalSummary();
  const upcoming = s.installments.filter((i) => i.status !== "received").slice(0, UPCOMING);

  return (
    <Card
      title="Andamento dos repasses"
      className="h-full"
      action={
        <Link href="/calendario" className="text-[13.5px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
          Ver calendário
        </Link>
      }
    >
      <div className="flex items-end justify-between gap-3">
        <p>
          <span className="tabular block text-[28px] leading-tight font-extrabold text-ink">
            {s.receivedCount} <span className="text-[18px] font-bold text-ink-soft">de {s.installments.length}</span>
          </span>
          <span className="text-[13.5px] text-ink-soft">parcelas pagas</span>
        </p>
        <p className="text-right text-[13.5px] text-ink-soft">
          <span className="tabular block text-[18px] font-extrabold text-ink">
            <Money value={s.receivedTotal} whole />
          </span>
          de <Money value={s.totalForecast} whole />
        </p>
      </div>
      <ProgressBar value={s.progressPct} label="Parcelas pagas do contrato" className="mt-3 h-2" />

      <h3 className="mt-5 mb-1 text-[13px] font-bold tracking-wider text-ink-mute uppercase">Próximos pagamentos</h3>
      <ul className="divide-y divide-line">
        {upcoming.map((i) => (
          <li key={i.number} className="flex items-center gap-3 py-2.5 text-[14px]">
            <span className="min-w-0 flex-1">
              <span className="block font-semibold text-ink">{formatCompetence(i.year, i.month)}</span>
              <span className="tabular block text-[12.5px] text-ink-soft">{formatDate(i.paymentDate)}</span>
            </span>
            <StatusBadge kind={i.status === "next" ? "next" : "scheduled"} />
            <span className="tabular w-24 text-right font-bold text-ink">
              <Money value={i.amount} />
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
