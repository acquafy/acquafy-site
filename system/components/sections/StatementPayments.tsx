// components/sections/StatementPayments.tsx
"use client";

import { useMemo, useState } from "react";
import { Download, Eye, FileText, Headset } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Field";
import { StatusBadge } from "@/components/ui/Badge";
import { IconButton } from "@/components/ui/IconButton";
import { Menu } from "@/components/ui/Menu";
import { Money } from "@/components/ui/Money";
import { Pagination } from "@/components/ui/Pagination";
import { Tabs, TabPanel, type TabItem } from "@/components/ui/Tabs";
import { downloadFile, toCsv } from "@/lib/download";
import { formatCompetence, formatDate, formatDayMonth } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";
import { StatementReceiptModal } from "./StatementReceiptModal";

type Filter = "all" | "received" | "pending";

const PAGE_SIZE = 6;

const periodLabel = (i: Installment) => `${formatDayMonth(i.periodStart)} a ${formatDayMonth(i.periodEnd)}`;

export function StatementPayments({ installments }: { installments: Installment[] }) {
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>("all");
  const [year, setYear] = useState("all");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState<Installment | null>(null);

  const years = useMemo(() => [...new Set(installments.map((i) => i.paymentDate.slice(0, 4)))], [installments]);
  const receivedCount = installments.filter((i) => i.status === "received").length;

  const tabs: TabItem<Filter>[] = [
    { id: "all", label: "Todos", count: installments.length },
    { id: "received", label: "Recebidos", count: receivedCount },
    { id: "pending", label: "Pendentes", count: installments.length - receivedCount },
  ];

  const rows = installments.filter((i) => (filter === "all" || (filter === "received") === (i.status === "received")) && (year === "all" || i.paymentDate.startsWith(year)));
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = rows.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const exportCsv = () => {
    const head = ["#", "Competência", "Período", "Dias", "Valor (US$)", "Data do Pagamento", "Status"];
    const body = rows.map((i) => [
      i.number,
      formatCompetence(i.year, i.month),
      periodLabel(i),
      i.days,
      i.amount.toFixed(2),
      formatDate(i.paymentDate),
      i.status === "received" ? "Recebido" : "Pendente",
    ]);
    downloadFile("extrato-acquafy.csv", toCsv([head, ...body]), "text/csv;charset=utf-8");
    toast({ title: "Extrato exportado", description: `${rows.length} pagamentos em CSV.` });
  };

  const downloadReceipt = (i: Installment) => {
    setOpen(i);
    toast({ title: "Comprovante aberto", description: "Use “Imprimir / salvar PDF” para guardar uma cópia.", tone: "info" });
  };

  const th = "px-3 py-2.5";
  return (
    <Card
      id="detalhamento"
      title="Detalhamento dos Pagamentos"
      container
      className="scroll-mt-4"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <Select
            label="Filtrar por ano"
            hideLabel
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
            options={[{ value: "all", label: "Todos os anos" }, ...years.map((y) => ({ value: y, label: y }))]}
            wrapperClassName="w-40"
          />
          <Button size="sm" onClick={exportCsv} className="!py-2.5">
            <Download className="size-4" aria-hidden="true" />
            Exportar CSV
          </Button>
        </div>
      }
    >
      <Tabs
        idPrefix="statement"
        label="Filtro de pagamentos"
        items={tabs}
        value={filter}
        onChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        className="mb-3"
      />

      <TabPanel idPrefix="statement" value={filter}>
        <div className="overflow-hidden rounded-lg border border-line">
          <table className="w-full text-left text-[14px] [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
            <caption className="sr-only">Pagamentos do contrato</caption>
            <thead>
              <tr className="bg-canvas/70 text-[12.5px] font-bold">
                <th scope="col" className={th}>
                  #
                </th>
                <th scope="col" className={th}>
                  Competência
                </th>
                <th scope="col" className={`${th} hidden @xl:table-cell`}>
                  Período
                </th>
                <th scope="col" className={`${th} hidden @3xl:table-cell text-right`}>
                  Dias
                </th>
                <th scope="col" className={`${th} text-right`}>
                  Valor
                </th>
                <th scope="col" className={th}>
                  Pagamento
                </th>
                <th scope="col" className={th}>
                  Status
                </th>
                <th scope="col" className={`${th} text-center`}>
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((i) => {
                const received = i.status === "received";
                return (
                  <tr key={i.number} className="border-t border-line/70">
                    <td className="tabular px-3 py-2.5">{i.number}</td>
                    <td className="px-3 py-2.5">{formatCompetence(i.year, i.month)}</td>
                    <td className="tabular hidden px-3 py-2.5 @xl:table-cell">{periodLabel(i)}</td>
                    <td className="tabular hidden px-3 py-2.5 text-right @3xl:table-cell">{i.days}</td>
                    <td className="tabular px-3 py-2.5 text-right font-medium">
                      <Money value={i.amount} />
                    </td>
                    <td className="tabular px-3 py-2.5">{formatDate(i.paymentDate)}</td>
                    <td className="px-3 py-2.5">
                      <StatusBadge kind={received ? "received" : "pending"} />
                    </td>
                    <td className="px-3 py-1.5">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          icon={FileText}
                          label={received ? `Comprovante do pagamento ${i.number}` : `Comprovante do pagamento ${i.number} (disponível após o repasse)`}
                          disabled={!received}
                          onClick={() => downloadReceipt(i)}
                        />
                        <Menu
                          label={`Mais ações do pagamento ${i.number}`}
                          bordered={false}
                          items={[
                            { label: "Ver detalhes", icon: Eye, onSelect: () => setOpen(i) },
                            { label: "Ver comprovante", icon: FileText, onSelect: () => downloadReceipt(i), disabled: !received },
                            { label: "Reportar um problema", icon: Headset, href: "/suporte", separatorBefore: true },
                          ]}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {visible.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-8 text-center text-ink-soft">
                    Nenhum pagamento nesse filtro.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TabPanel>

      <Pagination
        page={current}
        pages={pages}
        onChange={setPage}
        className="mt-3"
        summary={rows.length ? `${(current - 1) * PAGE_SIZE + 1}–${Math.min(current * PAGE_SIZE, rows.length)} de ${rows.length} pagamentos` : "Nenhum pagamento"}
      />
      <StatementReceiptModal payment={open} onClose={() => setOpen(null)} />
    </Card>
  );
}
