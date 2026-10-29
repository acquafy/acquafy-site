// components/sections/CalendarDetails.tsx
import { CircleDollarSign, Info, Undo2 } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { contract } from "@/config/investor";
import { formatDateLong, formatDayMonth } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

type Props = {
  installment: Installment;
  units: number;
  isNext: boolean;
  onBackToNext: () => void;
};

/** Details of the payout selected in the calendar (the next one by default). */
export function CalendarDetails({ installment: i, units, isNext, onBackToNext }: Props) {
  return (
    <Card title={isNext ? "Detalhes do próximo repasse" : `Detalhes do repasse ${i.number}`}>
      <div className="flex items-center gap-3 rounded-lg bg-violet-soft p-3">
        <span aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full bg-card text-violet">
          <CircleDollarSign className="size-7" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="text-[13px] font-semibold text-ink">{formatDateLong(i.paymentDate)}</p>
          <p className="tabular text-[24px] font-extrabold text-ink">
            <Money value={i.amount} />
          </p>
        </div>
        <StatusBadge kind={i.status} />
      </div>

      <DefinitionList
        rows={[
          { label: "Período de referência", value: `${formatDayMonth(i.periodStart)} a ${formatDayMonth(i.periodEnd)}` },
          { label: "Qtd. de purificadores", value: `${units} unidades` },
          { label: "Percentual do Lease", value: `${Math.round(contract.leaseShare * 100)}%` },
          { label: "Forma de pagamento", value: contract.paymentMethod },
        ]}
      />
      <p className="mt-1 flex gap-2 rounded-lg bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />O repasse é realizado mensalmente, sempre no dia 1º, referente ao período anterior.
      </p>
      {!isNext && (
        <Button variant="ghost" size="sm" className="mt-3" onClick={onBackToNext}>
          <Undo2 className="size-4" aria-hidden="true" />
          Voltar ao próximo repasse
        </Button>
      )}
    </Card>
  );
}
