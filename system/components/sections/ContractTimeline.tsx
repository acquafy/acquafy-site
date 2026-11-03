// components/sections/ContractTimeline.tsx
import { CalendarCheck, CircleDollarSign, Flag, ShieldCheck, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { contract } from "@/config/investor";
import { diffDays, formatDate } from "@/lib/format";
import { getPortalSummary } from "@/lib/portal/schedule";

function relative(days: number): string {
  if (days === 0) return "hoje";
  const abs = Math.abs(days);
  const text = abs < 60 ? `${abs} ${abs === 1 ? "dia" : "dias"}` : `${Math.round(abs / 30.44)} meses`;
  return days > 0 ? `em ${text}` : `há ${text}`;
}

type Milestone = { id: string; label: string; date: string; icon: LucideIcon };

/** Life of the contract: progress bar proportional to today's date, with the main milestones under it. */
export function ContractTimeline() {
  const s = getPortalSummary();
  const total = diffDays(contract.startDate, contract.endDate);
  const elapsed = Math.min(total, Math.max(0, diffDays(contract.startDate, s.today)));
  const pct = (elapsed / total) * 100;
  const pctLabel = pct < 10 ? pct.toFixed(1).replace(".", ",") : String(Math.round(pct));

  const milestones: Milestone[] = [
    { id: "inicio", label: "Início do contrato", date: contract.startDate, icon: CalendarCheck },
    { id: "repasse", label: "Primeiro repasse", date: s.installments[0].paymentDate, icon: CircleDollarSign },
    { id: "revisao", label: "Revisão anual", date: contract.nextReview, icon: ShieldCheck },
    { id: "fim", label: "Término do contrato", date: contract.endDate, icon: Flag },
  ];
  const nextId = milestones.find((m) => diffDays(s.today, m.date) > 0)?.id;

  // Keeps the "Hoje" label inside the card near both ends of the bar.
  const todayShift = pct < 12 ? "translate-x-0" : pct > 88 ? "-translate-x-full" : "-translate-x-1/2";

  return (
    <Card
      container
      title="Linha do tempo do contrato"
      action={
        <span className="tabular text-[14px] text-ink-soft">
          {elapsed} de {total} dias · <strong className="font-bold text-ink">{pctLabel}%</strong>
        </span>
      }
    >
      <div className="px-1 pt-1">
        <div className="relative h-9">
          <span className={`absolute bottom-0 flex flex-col whitespace-nowrap ${todayShift} ${pct < 12 ? "items-start" : pct > 88 ? "items-end" : "items-center"}`} style={{ left: `${pct}%` }}>
            <span className="rounded-full bg-brand px-2.5 py-0.5 text-[12px] font-bold text-white">Hoje · {formatDate(s.today)}</span>
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Andamento do contrato"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          aria-valuetext={`${elapsed} de ${total} dias decorridos`}
          className="relative h-3 rounded-full bg-line"
        >
          <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${Math.max(pct, 1.2)}%` }} />
          {[0, diffDays(contract.startDate, contract.nextReview) / total, 1].map((p, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-card bg-navy-800 shadow"
              style={{ left: `${Math.min(Math.max(p * 100, 1.2), 98.8)}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[12.5px] text-ink-soft">
          <span>{formatDate(contract.startDate)}</span>
          <span>{formatDate(contract.endDate)}</span>
        </div>
      </div>

      <ol aria-label="Marcos do contrato" className="mt-4 grid grid-cols-2 gap-3 @[560px]:grid-cols-4">
        {milestones.map((m) => {
          const days = diffDays(s.today, m.date);
          const done = days <= 0;
          const tone: Tone = done ? "green" : m.id === nextId ? "blue" : "violet";
          return (
            <li key={m.id} className="flex min-w-0 flex-col items-start gap-2.5 rounded-xl border border-line/80 p-3.5">
              <IconTile icon={m.icon} tone={tone} className="size-10" />
              <div className="min-w-0 leading-snug">
                <p className="text-[13.5px] font-semibold text-ink">{m.label}</p>
                <p className="tabular text-[14.5px] font-bold text-ink">{formatDate(m.date)}</p>
                <p className="text-[12.5px] text-ink-soft">{done ? `Concluído ${relative(days)}` : `Previsto ${relative(days)}`}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
