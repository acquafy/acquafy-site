// components/sections/CalendarMonth.tsx
"use client";

import { Check, ChevronLeft, ChevronRight, CircleDollarSign } from "lucide-react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/cn";
import { daysInMonth, monthName, toIso, type IsoDate } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"] as const;

type Cell = { iso: IsoDate; day: number; inMonth: boolean };

function monthGrid(year: number, month: number): Cell[] {
  const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const cells: Cell[] = [];
  const prevY = month === 1 ? year - 1 : year;
  const prevM = month === 1 ? 12 : month - 1;
  const prevDays = daysInMonth(prevY, prevM);
  for (let i = first - 1; i >= 0; i--) cells.push({ iso: toIso(prevY, prevM, prevDays - i), day: prevDays - i, inMonth: false });
  for (let d = 1; d <= daysInMonth(year, month); d++) cells.push({ iso: toIso(year, month, d), day: d, inMonth: true });
  const nextY = month === 12 ? year + 1 : year;
  const nextM = month === 12 ? 1 : month + 1;
  for (let d = 1; cells.length % 7 !== 0; d++) cells.push({ iso: toIso(nextY, nextM, d), day: d, inMonth: false });
  return cells;
}

const LEGEND = [
  { color: "bg-ok", label: "Repasse realizado" },
  { color: "bg-violet", label: "Próximo repasse" },
  { color: "bg-brand/70", label: "Programado" },
];

type Props = {
  installments: Installment[];
  today: IsoDate;
  cursor: { y: number; m: number };
  onCursor: (cursor: { y: number; m: number }) => void;
  selectedNumber: number | null;
  onSelect: (installment: Installment) => void;
};

export function CalendarMonth({ installments, today, cursor, onCursor, selectedNumber, onSelect }: Props) {
  const { money } = useCurrency();
  const byDate = new Map(installments.map((i) => [i.paymentDate, i]));
  const cells = monthGrid(cursor.y, cursor.m);

  const go = (delta: number) => {
    const t = cursor.m - 1 + delta;
    onCursor({ y: cursor.y + Math.floor(t / 12), m: (((t % 12) + 12) % 12) + 1 });
  };
  const [ty, tm] = today.split("-").map(Number);

  return (
    <Card container className="!p-4">
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <IconButton icon={ChevronLeft} label="Mês anterior" bordered onClick={() => go(-1)} />
        <h2 className="min-w-44 text-[clamp(1.25rem,1rem+1cqw,1.5rem)] font-extrabold tracking-tight text-ink" aria-live="polite">
          {monthName(cursor.m)} de {cursor.y}
        </h2>
        <IconButton icon={ChevronRight} label="Próximo mês" bordered onClick={() => go(1)} />
        <Button variant="outline" size="sm" onClick={() => onCursor({ y: ty, m: tm })}>
          Hoje
        </Button>
        <ul className="ml-auto flex flex-wrap gap-x-4 gap-y-1 text-[12.5px] text-ink-soft" aria-label="Legenda">
          {LEGEND.map((l) => (
            <li key={l.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={cn("size-2.5 rounded-full", l.color)} />
              {l.label}
            </li>
          ))}
        </ul>
      </div>

      <div role="grid" aria-label={`Calendário de ${monthName(cursor.m)} de ${cursor.y}`} className="overflow-hidden rounded-lg border border-line">
        <div role="row" className="grid grid-cols-7 bg-canvas/80 text-center text-[13px] font-bold">
          {WEEKDAYS.map((w) => (
            <div key={w} role="columnheader" className="py-2.5">
              {w}
            </div>
          ))}
        </div>
        <div role="rowgroup" className="grid grid-cols-7">
          {cells.map((c) => {
            const pay = byDate.get(c.iso);
            const isToday = c.iso === today;
            const received = pay?.status === "received";
            const isNext = pay?.status === "next";
            const selected = pay && pay.number === selectedNumber;
            return (
              <div
                key={c.iso}
                role="gridcell"
                aria-selected={selected || undefined}
                className={cn(
                  "min-h-[4.5rem] border-t border-l border-line p-1.5 text-[13px] nth-[7n+1]:border-l-0",
                  c.inMonth ? "bg-card" : "bg-canvas/40 text-ink-mute/60",
                  isNext && "bg-violet-soft",
                  selected && "ring-2 ring-brand ring-inset",
                )}
              >
                <span className={cn("tabular inline-grid size-6 place-items-center rounded-full", isToday && "bg-brand font-bold text-white")}>{c.day}</span>
                {pay && (
                  <button
                    type="button"
                    onClick={() => onSelect(pay)}
                    aria-label={`Repasse de ${money(pay.amount)} em ${c.day} de ${monthName(cursor.m)}: ver detalhes`}
                    className={cn(
                      "mt-1 flex w-full min-w-0 items-center gap-1 rounded-lg p-0.5 text-left text-[11.5px] leading-tight font-bold focus-visible:outline-2 focus-visible:outline-brand",
                      isNext ? "text-violet" : received ? "text-ok" : "text-brand",
                    )}
                  >
                    <span aria-hidden="true" className={cn("grid size-5 shrink-0 place-items-center rounded-full text-white", isNext ? "bg-violet" : received ? "bg-ok" : "bg-brand/80")}>
                      {received ? <Check className="size-3" strokeWidth={3} /> : <CircleDollarSign className="size-3" />}
                    </span>
                    <span className="tabular min-w-0 truncate">{money(pay.amount, { whole: true })}</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
