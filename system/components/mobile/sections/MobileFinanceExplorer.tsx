// components/mobile/sections/MobileFinanceExplorer.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CalendarDays, CircleDollarSign, Coins, Download, ReceiptText } from "lucide-react";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileSelect } from "@/components/mobile/ui/MobileFields";
import { MobileSegmented, type SegmentItem } from "@/components/mobile/ui/MobileSegmented";
import { MobileStatTile } from "@/components/mobile/ui/MobileStatTile";
import { useToast } from "@/components/providers/ToastProvider";
import { Money } from "@/components/ui/Money";
import { downloadFile, toCsv } from "@/lib/download";
import type { Installment, PortalSummary } from "@/lib/portal/schedule";
import { filterInstallments, paymentYears, statementCsvRows, type PayoutFilter } from "@/lib/portal/statement";
import { MobileFinanceRow } from "./MobileFinanceRow";
import { MobileFinanceSheet } from "./MobileFinanceSheet";

const PAGE = 10;

/** State owner of Financeiro: KPIs (tap = filter), segmented filter + calendar button, year, the history and the detail sheet. */
export function MobileFinanceExplorer({ summary }: { summary: PortalSummary }) {
  const toast = useToast();
  const href = useMobileHref();
  const installments = summary.installments;
  const [filter, setFilter] = useState<PayoutFilter>("all");
  const [year, setYear] = useState("all");
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<Installment | null>(null);

  const years = useMemo(() => paymentYears(installments), [installments]);
  const rows = useMemo(() => filterInstallments(installments, filter, year), [installments, filter, year]);
  const visible = rows.slice(0, shown);
  const more = visible.length < rows.length;

  // Infinite scroll: the sentinel under the list opens the next batch as it nears the screen, until the end (no paging buttons).
  const sentinel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !more) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setShown((n) => n + PAGE), { rootMargin: "240px" });
    io.observe(el);
    return () => io.disconnect();
  }, [more, shown]);

  const segments: SegmentItem<PayoutFilter>[] = [
    { id: "all", label: "Todos" },
    { id: "received", label: "Recebidos" },
    { id: "pending", label: "Pendentes" },
  ];

  const change = (f: PayoutFilter) => {
    setFilter(f);
    setShown(PAGE);
  };

  const exportCsv = () => {
    downloadFile("extrato-acquafy.csv", toCsv(statementCsvRows(rows)), "text/csv;charset=utf-8");
    toast({ title: "Extrato exportado", description: `${rows.length} pagamentos em CSV.` });
  };

  return (
    <>
      <section aria-label="Totais" className="grid grid-cols-2 gap-3">
        <MobileStatTile
          icon={Coins}
          tone="green"
          label="Total recebido"
          value={<Money value={summary.receivedTotal} />}
          selected={filter === "received"}
          onClick={() => change(filter === "received" ? "all" : "received")}
        />
        <MobileStatTile
          icon={ReceiptText}
          tone="violet"
          label="Saldo a receber"
          value={<Money value={summary.remainingTotal} />}
          selected={filter === "pending"}
          onClick={() => change(filter === "pending" ? "all" : "pending")}
        />
      </section>

      <div className="flex items-center gap-2">
        <MobileSegmented label="Filtro de repasses" items={segments} value={filter} onChange={change} className="flex-1" />
        <Link
          href={href({ route: "calendar" })}
          aria-label="Calendário de repasses"
          className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-card text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft"
        >
          <CalendarDays className="size-5" aria-hidden="true" />
        </Link>
      </div>

      <section aria-label="Histórico de repasses" className="grid gap-3">
        <div className="flex items-end gap-2">
          <h2 className="min-w-0 flex-1 text-[18px] leading-tight font-bold tracking-tight text-ink">Histórico de Repasses</h2>
        </div>
        <div className="flex items-end gap-2">
          <MobileSelect
            label="Filtrar por ano"
            hideLabel
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setShown(PAGE);
            }}
            options={[{ value: "all", label: "Todos os anos" }, ...years.map((y) => ({ value: y, label: y }))]}
            wrapperClassName="flex-1"
          />
          <MobileButton variant="soft" onClick={exportCsv} disabled={rows.length === 0}>
            <Download className="size-[18px]" aria-hidden="true" />
            Exportar
          </MobileButton>
        </div>

        {rows.length === 0 ? (
          <MobileEmptyState icon={CircleDollarSign} title="Nenhum pagamento nesse filtro" description="Escolha outro filtro ou outro ano." />
        ) : (
          <>
            <ul aria-label="Pagamentos do contrato" className="grid gap-2.5">
              {visible.map((i) => (
                <MobileFinanceRow key={i.number} installment={i} onOpen={setOpen} />
              ))}
            </ul>
            <p className="text-center text-[13px] text-ink-soft" aria-live="polite">
              Exibindo {visible.length} de {rows.length} pagamentos
            </p>
            {more && <div ref={sentinel} aria-hidden="true" className="h-px" />}
          </>
        )}
      </section>

      <MobileFinanceSheet payment={open} onClose={() => setOpen(null)} />
    </>
  );
}
