// components/mobile/sections/MobileFinanceRow.tsx
"use client";

import { ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Money } from "@/components/ui/Money";
import { cn } from "@/lib/cn";
import { formatCompetence } from "@/lib/format";
import { dateBlock, formatPeriod } from "@/lib/mobile/format";
import type { Installment } from "@/lib/portal/schedule";

/** One payout of the history: date block, "Repasse mensal / Referente a N dias / período", amount and status. Opens its details. */
export function MobileFinanceRow({ installment: i, onOpen }: { installment: Installment; onOpen: (i: Installment) => void }) {
  const received = i.status === "received";
  const date = dateBlock(i.paymentDate);
  return (
    <li className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(i)}
        aria-label={`Parcela ${i.number}, ${formatCompetence(i.year, i.month)}, ${received ? "recebida" : "pendente"}. Abrir detalhes`}
        className="flex min-h-[84px] w-full items-center gap-2.5 rounded-[14px] bg-card p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60"
      >
        <span aria-hidden="true" className="tabular grid w-[52px] shrink-0 place-items-center rounded-[10px] bg-canvas/70 py-1.5 text-center leading-tight text-ink">
          <span className="text-[18px] font-extrabold">{date.day}</span>
          <span className="text-[12.5px] font-bold">{date.month}</span>
          <span className="text-[11.5px] text-ink-soft">{date.year}</span>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] leading-tight font-bold whitespace-nowrap text-ink">Repasse mensal</span>
          <span className="block text-[13px] leading-snug text-ink-soft">Referente a {i.days} dias</span>
          <span className="tabular block text-[12.5px] leading-snug text-ink-mute">{formatPeriod(i.periodStart, i.periodEnd)}</span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <span className={cn("tabular text-[16px] leading-none font-extrabold", received ? "text-ok" : "text-warn")}>
            <Money value={i.amount} />
          </span>
          <StatusBadge kind={received ? "received" : "pending"} />
        </span>
        <ChevronRight className="-mr-1 size-4 shrink-0 text-ink-mute" aria-hidden="true" />
      </button>
    </li>
  );
}
