// components/sections/DashboardPayments.tsx
"use client";

import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { BarChart, type Bar } from "@/components/ui/BarChart";
import { Card } from "@/components/ui/Card";
import { Money } from "@/components/ui/Money";
import { Select } from "@/components/ui/Field";
import { formatDate, monthShort } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

const RANGES = [
  { value: "6", label: "6 meses" },
  { value: "12", label: "12 meses" },
  { value: "24", label: "24 meses" },
  { value: "35", label: "Todo o contrato" },
];

/** Blue → violet ramp across the bars, as in the reference. */
function ramp(index: number, total: number): string {
  const t = total > 1 ? index / (total - 1) : 0;
  return `linear-gradient(180deg, hsl(${222 - t * 22} 88% ${60 - t * 4}%) 0%, hsl(${224 - t * 12} 90% ${50 - t * 4}%) 100%)`;
}

export function DashboardPayments({ installments, monthly }: { installments: Installment[]; monthly: number }) {
  const [range, setRange] = useState("12");

  const bars: Bar[] = useMemo(() => {
    const slice = installments.slice(0, Number(range));
    return slice.map((i, idx) => ({
      label: monthShort(i.month),
      sub: i.month === 1 || idx === 0 ? String(i.year) : undefined,
      value: i.amount,
      fill: ramp(idx, slice.length),
      caption: `Repasse de ${formatDate(i.paymentDate)}`,
    }));
  }, [installments, range]);

  return (
    <Card
      title="Pagamentos"
      container
      className="h-full"
      action={
        <div className="flex flex-wrap items-center gap-3">
          <p className="flex items-center gap-2 text-[13.5px] leading-tight text-ink-soft">
            <RefreshCw className="size-6 text-ok" strokeWidth={1.75} aria-hidden="true" />
            <span>
              <strong className="tabular block text-[17px] text-ink">
                <Money value={monthly} whole />
              </strong>
              Repasse mensal
            </span>
          </p>
          <Select label="Período do gráfico" hideLabel value={range} onChange={(e) => setRange(e.target.value)} options={RANGES} wrapperClassName="w-40" />
        </div>
      }
    >
      <BarChart bars={bars} max={600} ticks={[0, 200, 400, 600]} ariaLabel={`Repasses mensais dos próximos ${bars.length} meses`} height={210} />
    </Card>
  );
}
