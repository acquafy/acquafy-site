// components/sections/CalendarUpcoming.tsx
"use client";

import Link from "next/link";
import { CalendarPlus, CalendarSearch, FileText, ReceiptText } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { StatusBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Menu } from "@/components/ui/Menu";
import { Money } from "@/components/ui/Money";
import { downloadFile } from "@/lib/download";
import { formatCompetence, formatDate, formatDayMonth } from "@/lib/format";
import { buildIcs } from "@/lib/portal/ics";
import type { Installment } from "@/lib/portal/schedule";

type Props = {
  installments: Installment[];
  onShow: (installment: Installment) => void;
  onReceipt: (installment: Installment) => void;
};

const UPCOMING = 5;

export function CalendarUpcoming({ installments, onShow, onReceipt }: Props) {
  const toast = useToast();
  const upcoming = installments.filter((i) => i.status !== "received").slice(0, UPCOMING);

  const addToCalendar = (i: Installment) => {
    downloadFile(`repasse-${i.number}.ics`, buildIcs([i]), "text/calendar;charset=utf-8");
    toast({ title: "Evento baixado", description: `Repasse de ${formatDate(i.paymentDate)}. Abra o arquivo para adicioná-lo à sua agenda.` });
  };

  return (
    <Card title="Próximos Repasses" container className="!p-4">
      <div className="overflow-hidden rounded-lg border border-line">
        <table className="w-full text-left text-[14px] [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          <caption className="sr-only">Próximos repasses do contrato</caption>
          <thead>
            <tr className="bg-canvas/70 text-[12.5px] font-bold">
              <th scope="col" className="px-3 py-2.5">
                #
              </th>
              <th scope="col" className="px-3 py-2.5">
                Competência
              </th>
              <th scope="col" className="hidden px-3 py-2.5 @xl:table-cell">
                Período
              </th>
              <th scope="col" className="px-3 py-2.5 text-right">
                Valor
              </th>
              <th scope="col" className="px-3 py-2.5">
                Pagamento
              </th>
              <th scope="col" className="px-3 py-2.5">
                Status
              </th>
              <th scope="col" className="px-3 py-2.5 text-right">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {upcoming.map((i) => (
              <tr key={i.number} className="border-t border-line/70">
                <td className="tabular px-3 py-2.5">{i.number}</td>
                <td className="px-3 py-2.5">{formatCompetence(i.year, i.month)}</td>
                <td className="tabular hidden px-3 py-2.5 @xl:table-cell">
                  {formatDayMonth(i.periodStart)} a {formatDayMonth(i.periodEnd)}
                </td>
                <td className="tabular px-3 py-2.5 text-right font-medium">
                  <Money value={i.amount} />
                </td>
                <td className="tabular px-3 py-2.5">{formatDate(i.paymentDate)}</td>
                <td className="px-3 py-2.5">
                  <StatusBadge kind={i.status === "next" ? "next" : "scheduled"} />
                </td>
                <td className="px-3 py-1.5">
                  <div className="flex items-center justify-end gap-1">
                    <IconButton icon={CalendarSearch} label={`Ver o repasse ${i.number} no calendário`} onClick={() => onShow(i)} />
                    <Menu
                      label={`Mais ações do repasse ${i.number}`}
                      bordered={false}
                      items={[
                        { label: "Ver detalhes", icon: FileText, onSelect: () => onReceipt(i) },
                        { label: "Adicionar à minha agenda", icon: CalendarPlus, onSelect: () => addToCalendar(i) },
                        { label: "Ver extrato", icon: ReceiptText, href: "/extrato", separatorBefore: true },
                      ]}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13.5px] text-ink-soft">
        Mostrando os próximos {upcoming.length} repasses.{" "}
        <Link href="/extrato#detalhamento" className="font-semibold text-brand hover:underline">
          Ver todos no extrato
        </Link>
      </p>
    </Card>
  );
}
