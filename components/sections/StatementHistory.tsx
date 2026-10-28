// components/sections/StatementHistory.tsx
"use client";

import { useMemo, useState } from "react";
import { BarChart, type Bar } from "@/components/ui/BarChart";
import { Card } from "@/components/ui/Card";
import { Select } from "@/components/ui/Field";
import { formatDate, monthShort } from "@/lib/format";
import type { Installment } from "@/lib/portal/schedule";

const RANGES = [
  { value: "6", label: "Próximos 6 meses" },
  { value: "12", label: "Próximos 12 meses" },
  { value: "24", label: "Próximos 24 meses" },
];

const FILL: Record<Installment["status"], string> = {
  received: "linear-gradient(180deg,#3fcf7a,#22b866)",
  next: "linear-gradient(180deg,#3b86ff,#1f66ff)",
  scheduled: "linear-gradient(180deg,#c8d9ff,#dce7ff)",
};

const LEGEND = [
  { color: "#22b866", label: "Recebido" },
  { color: "#1f66ff", label: "Próximo" },
  { color: "#c8d9ff", label: "Previsto" },
];

export function StatementHistory({ installments }: { installments: Installment[] }) {
  const [range, setRange] = useState("12");

  const bars: Bar[] = useMemo(
    () =>
      installments.slice(0, Number(range)).map((i, idx) => ({
        label: monthShort(i.month),
        sub: i.month === 1 || idx === 0 ? String(i.year) : undefined,
        value: i.amount,
        fill: FILL[i.status],
        caption: `${i.status === "received" ? "Recebido" : "Previsto"} em ${formatDate(i.paymentDate)}`,
      })),
    [installments, range],
  );

  return (
    <Card
      id="historico"
      title="Histórico de Repasses"
      container
      className="scroll-mt-4"
      action={<Select label="Período do gráfico" hideLabel value={range} onChange={(e) => setRange(e.target.value)} options={RANGES} wrapperClassName="w-48" />}
    >
      <ul className="mb-3 flex flex-wrap justify-end gap-x-5 gap-y-1 text-[13px] text-ink-soft" aria-label="Legenda">
        {LEGEND.map((l) => (
          <li key={l.label} className="flex items-center gap-1.5">
            <span aria-hidden="true" className="size-3 rounded-full" style={{ background: l.color }} />
            {l.label}
          </li>
        ))}
      </ul>
      <BarChart bars={bars} max={600} ticks={[0, 200, 400, 600]} ariaLabel={`Histórico e previsão de repasses, ${bars.length} meses`} height={180} />
    </Card>
  );
}
