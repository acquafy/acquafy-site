// lib/portal/payout-bars.ts
//
// Bars of the payout chart (blue → violet ramp), shared by the mobile screens. Same colours as the desktop Pagamentos chart.

import type { Bar } from "@/components/ui/BarChart";
import { formatDate, monthShort } from "@/lib/format";
import type { Installment } from "./schedule";

/** Blue → violet ramp across the bars. */
export function payoutRamp(index: number, total: number): string {
  const t = total > 1 ? index / (total - 1) : 0;
  return `linear-gradient(180deg, hsl(${222 - t * 22} 88% ${60 - t * 4}%) 0%, hsl(${224 - t * 12} 90% ${50 - t * 4}%) 100%)`;
}

/** First `count` instalments as chart bars; the year goes under the first bar and under every January. */
export function buildPayoutBars(installments: Installment[], count: number): Bar[] {
  const slice = installments.slice(0, count);
  return slice.map((i, idx) => ({
    label: monthShort(i.month),
    sub: i.month === 1 || idx === 0 ? String(i.year) : undefined,
    value: i.amount,
    fill: payoutRamp(idx, slice.length),
    caption: `${i.status === "received" ? "Recebido em" : "Repasse de"} ${formatDate(i.paymentDate)}`,
  }));
}
