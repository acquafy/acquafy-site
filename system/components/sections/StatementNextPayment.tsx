// components/sections/StatementNextPayment.tsx
import { CalendarDays, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Money } from "@/components/ui/Money";
import { contract } from "@/config/investor";
import { daysInMonth, diffDays, formatDateLong, formatDayMonth, monthName, parseIso, toIso } from "@/lib/format";
import { cn } from "@/lib/cn";
import { getPortalSummary } from "@/lib/portal/schedule";

type Step = { label: string; caption: string; state: "done" | "current" | "todo" };

export function StatementNextPayment() {
  const s = getPortalSummary();
  const next = s.next;
  if (!next) return null;

  const after = s.installments[next.number];
  const start = parseIso(contract.startDate);
  const closing = toIso(start.y, start.m, daysInMonth(start.y, start.m));
  const steps: Step[] = [
    { label: formatDayMonth(contract.startDate), caption: "Investimento", state: "done" },
    { label: formatDayMonth(closing), caption: `Fechamento ${monthName(start.m)}`, state: diffDays(closing, s.today) >= 0 ? "done" : "todo" },
    { label: formatDayMonth(next.paymentDate), caption: `Pagamento (${s.daysToNext} dias)`, state: "current" },
    ...(after ? [{ label: formatDayMonth(after.paymentDate), caption: "Próximo", state: "todo" as const }] : []),
  ];

  return (
    <Card
      title={
        <span className="flex items-center gap-2">
          <CalendarDays className="size-6 text-brand" aria-hidden="true" />
          Próximo pagamento
        </span>
      }
    >
      <p className="flex flex-wrap items-center gap-2 text-[15.5px] font-bold text-ink">
        {formatDateLong(next.paymentDate)}
        <Badge tone="violet">Em breve</Badge>
      </p>
      <p className="tabular text-[28px] leading-tight font-extrabold text-ink">
        <Money value={next.amount} />
      </p>
      <p className="mt-1 text-[14.5px] font-semibold text-ink">Repasse referente a {next.days} dias</p>
      {next.bonusDays > 0 && (
        <p className="text-[13px] text-ink-soft">
          ({next.bonusDays} dias de {monthName(start.m).toLowerCase()} + {next.days - next.bonusDays} dias de {monthName(next.month).toLowerCase()})
        </p>
      )}

      <ol className="mt-5 grid grid-flow-col auto-cols-fr gap-1 text-center text-[12px]" aria-label="Linha do tempo do próximo pagamento">
        {steps.map((t, idx) => (
          <li key={t.caption} className="relative flex flex-col items-center gap-1" aria-current={t.state === "current" ? "step" : undefined}>
            {idx > 0 && <span aria-hidden="true" className={cn("absolute top-[9px] right-1/2 h-0.5 w-full", t.state === "todo" ? "bg-line" : "bg-ok/60")} />}
            <span
              aria-hidden="true"
              className={cn(
                "relative z-10 size-[18px] rounded-full border-2 border-card ring-2",
                t.state === "done" ? "bg-ok ring-ok" : t.state === "current" ? "bg-brand ring-brand" : "bg-line ring-line",
              )}
            />
            <span className="tabular font-bold text-ink">{t.label}</span>
            <span className="leading-tight text-ink-soft">{t.caption}</span>
          </li>
        ))}
      </ol>

      <p className="mt-4 flex gap-2 rounded-lg bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        No primeiro pagamento, você recebe todos os dias desde o investimento, sem perder nenhum dia.
      </p>
    </Card>
  );
}
