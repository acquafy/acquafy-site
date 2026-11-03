// components/mobile/sections/MobileCalendarBoard.tsx
"use client";

import { useState } from "react";
import { CalendarCheck2, Check, ChevronLeft, ChevronRight, CircleCheck, CircleDollarSign, Coins, Download, Info, Undo2 } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileSectionHeader } from "@/components/mobile/ui/MobileSectionHeader";
import { MobileStatTile } from "@/components/mobile/ui/MobileStatTile";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { StatusBadge } from "@/components/ui/Badge";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { contract } from "@/config/investor";
import { cn } from "@/lib/cn";
import { downloadFile } from "@/lib/download";
import { formatCompetence, formatDate, formatDateLong, formatDayMonth, monthName, parseIso } from "@/lib/format";
import { buildIcs } from "@/lib/portal/ics";
import { monthGrid, shiftMonth, WEEKDAYS } from "@/lib/portal/month-grid";
import type { Installment, PortalSummary } from "@/lib/portal/schedule";
import { MobileFinanceSheet } from "./MobileFinanceSheet";

const LEGEND = [
  { color: "bg-ok", label: "Realizado" },
  { color: "bg-violet", label: "Próximo" },
  { color: "bg-brand/70", label: "Programado" },
];

const UPCOMING = 5;

/** Calendário de Repasses: KPIs, month grid (tap a payout day), details of the selected payout, next payouts and .ics export. */
export function MobileCalendarBoard({ summary: s }: { summary: PortalSummary }) {
  const toast = useToast();
  const { money } = useCurrency();
  const installments = s.installments;
  const next = installments.find((i) => i.status === "next") ?? installments[0];
  const start = parseIso(next.paymentDate);
  const [cursor, setCursor] = useState({ y: start.y, m: start.m });
  const [selected, setSelected] = useState<Installment>(next);
  const [detail, setDetail] = useState<Installment | null>(null);

  const byDate = new Map(installments.map((i) => [i.paymentDate, i]));
  const cells = monthGrid(cursor.y, cursor.m);
  const [ty, tm] = s.today.split("-").map(Number);
  const upcoming = installments.filter((i) => i.status !== "received").slice(0, UPCOMING);

  const show = (i: Installment) => {
    const d = parseIso(i.paymentDate);
    setCursor({ y: d.y, m: d.m });
    setSelected(i);
  };

  const exportAll = () => {
    downloadFile("repasses-acquafy.ics", buildIcs(installments), "text/calendar;charset=utf-8");
    toast({ title: "Calendário exportado", description: `${installments.length} repasses em formato .ics (Google, Apple, Outlook).` });
  };

  return (
    <>
      <section aria-label="Resumo dos repasses" className="grid grid-cols-2 gap-3">
        <MobileStatTile icon={CalendarCheck2} tone="violet" label="Próximo repasse" value={s.next ? formatDate(s.next.paymentDate) : "—"} caption={s.daysToNext !== null ? `Em ${s.daysToNext} dias` : undefined} />
        <MobileStatTile icon={CircleDollarSign} tone="blue" label="Valor do repasse" value={s.next ? <Money value={s.next.amount} whole /> : "—"} caption={`${Math.round(contract.leaseShare * 100)}% do Lease`} />
        <MobileStatTile icon={Coins} tone="violet" label="Total previsto" value={<Money value={s.totalForecast} whole />} caption={`em ${installments.length} parcelas`} />
        <MobileStatTile icon={CircleCheck} tone="green" label="Realizados" value={`${s.receivedCount} de ${installments.length}`} caption={<ProgressBar value={s.progressPct} label="Repasses realizados" className="mt-1" />} />
      </section>

      <MobileCard as="section" aria-label="Calendário" padding="sm" className="p-3">
        <div className="flex items-center gap-1">
          <button type="button" aria-label="Mês anterior" onClick={() => setCursor((c) => shiftMonth(c, -1))} className="grid size-11 place-items-center rounded-full text-brand focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft">
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>
          <h2 className="min-w-0 flex-1 text-center text-[18px] font-extrabold tracking-tight text-ink" aria-live="polite">
            {monthName(cursor.m)} de {cursor.y}
          </h2>
          <button type="button" aria-label="Próximo mês" onClick={() => setCursor((c) => shiftMonth(c, 1))} className="grid size-11 place-items-center rounded-full text-brand focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft">
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mb-2 flex items-center justify-between gap-2">
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-ink-soft" aria-label="Legenda">
            {LEGEND.map((l) => (
              <li key={l.label} className="flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("size-2.5 rounded-full", l.color)} />
                {l.label}
              </li>
            ))}
          </ul>
          <MobileButton variant="soft" size="sm" onClick={() => setCursor({ y: ty, m: tm })}>
            Hoje
          </MobileButton>
        </div>

        <div role="grid" aria-label={`Calendário de ${monthName(cursor.m)} de ${cursor.y}`} className="overflow-hidden rounded-[12px] border border-line">
          <div role="row" className="grid grid-cols-7 bg-canvas/80 text-center text-[12px] font-bold text-ink-soft">
            {WEEKDAYS.map((w) => (
              <div key={w} role="columnheader" className="py-2">
                {w}
              </div>
            ))}
          </div>
          <div role="rowgroup" className="grid grid-cols-7">
            {cells.map((c) => {
              const pay = byDate.get(c.iso);
              const isToday = c.iso === s.today;
              const received = pay?.status === "received";
              const isNext = pay?.status === "next";
              const isSel = pay && pay.number === selected.number;
              return (
                <div key={c.iso} role="gridcell" aria-selected={isSel || undefined} className={cn("border-t border-l border-line nth-[7n+1]:border-l-0", c.inMonth ? "bg-card" : "bg-canvas/40 text-ink-mute/60", isNext && "bg-violet-soft", isSel && "outline-2 -outline-offset-2 outline-brand")}>
                  {pay ? (
                    <button
                      type="button"
                      onClick={() => setSelected(pay)}
                      aria-label={`Repasse de ${money(pay.amount)} em ${c.day} de ${monthName(cursor.m)}: ver detalhes`}
                      className="flex h-[52px] w-full flex-col items-center justify-center gap-0.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                    >
                      <span className="tabular text-[13px] leading-none">{c.day}</span>
                      <span aria-hidden="true" className={cn("grid size-5 place-items-center rounded-full text-white", isNext ? "bg-violet" : received ? "bg-ok" : "bg-brand/80")}>
                        {received ? <Check className="size-3" strokeWidth={3} /> : <CircleDollarSign className="size-3" />}
                      </span>
                    </button>
                  ) : (
                    <div className="grid h-[52px] place-items-center">
                      <span className={cn("tabular inline-grid size-7 place-items-center rounded-full text-[13px]", isToday && "bg-brand font-bold text-white")}>{c.day}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </MobileCard>

      <MobileCard as="section" aria-label="Detalhes do repasse" className="grid gap-3">
        <MobileSectionHeader level={3} title={selected.number === next.number ? "Detalhes do próximo repasse" : `Detalhes do repasse ${selected.number}`} />
        <div className="flex items-center gap-3 rounded-[12px] bg-violet-soft p-3">
          <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-violet">
            <CircleDollarSign className="size-7" strokeWidth={1.75} />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[13px] font-semibold text-ink">{formatDateLong(selected.paymentDate)}</p>
            <p className="tabular text-[24px] font-extrabold text-ink">
              <Money value={selected.amount} />
            </p>
          </div>
          <StatusBadge kind={selected.status} />
        </div>
        <DefinitionList
          rows={[
            { label: "Período de referência", value: `${formatDayMonth(selected.periodStart)} a ${formatDayMonth(selected.periodEnd)}` },
            { label: "Purificadores", value: `${s.units} unidades` },
            { label: "Percentual do Lease", value: `${Math.round(contract.leaseShare * 100)}%` },
            { label: "Forma de pagamento", value: contract.paymentMethod },
          ]}
        />
        <p className="flex gap-2 rounded-[12px] bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />O repasse é realizado mensalmente, sempre no dia 1º, referente ao período anterior.
        </p>
        <div className="grid grid-cols-2 gap-2.5">
          <MobileButton variant="secondary" onClick={() => setDetail(selected)}>
            Ver detalhes
          </MobileButton>
          {selected.number !== next.number ? (
            <MobileButton variant="soft" onClick={() => show(next)}>
              <Undo2 className="size-[18px]" aria-hidden="true" />
              Próximo
            </MobileButton>
          ) : (
            <MobileButton
              variant="soft"
              onClick={() => {
                downloadFile(`repasse-${selected.number}.ics`, buildIcs([selected]), "text/calendar;charset=utf-8");
                toast({ title: "Evento baixado", description: `Repasse de ${formatDate(selected.paymentDate)}. Abra o arquivo para adicioná-lo à sua agenda.` });
              }}
            >
              Adicionar à agenda
            </MobileButton>
          )}
        </div>
      </MobileCard>

      <section aria-label="Próximos repasses" className="grid gap-2">
        <MobileSectionHeader title="Próximos repasses" />
        <MobileListGroup aria-label="Próximos repasses do contrato">
          {upcoming.map((i) => (
            <MobileListRow
              key={i.number}
              title={formatCompetence(i.year, i.month)}
              subtitle={formatDate(i.paymentDate)}
              onClick={() => show(i)}
              value={
                <span className="flex flex-col items-end gap-1">
                  <span className="tabular font-bold text-ink">
                    <Money value={i.amount} />
                  </span>
                  <StatusBadge kind={i.status === "next" ? "next" : "scheduled"} />
                </span>
              }
            />
          ))}
        </MobileListGroup>
        <MobileButton variant="secondary" size="lg" full onClick={exportAll}>
          <Download className="size-5" aria-hidden="true" />
          Exportar calendário (.ics)
        </MobileButton>
      </section>

      <MobileFinanceSheet payment={detail} onClose={() => setDetail(null)} />
    </>
  );
}
