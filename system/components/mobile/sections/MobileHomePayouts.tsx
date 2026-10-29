// components/mobile/sections/MobileHomePayouts.tsx
"use client";

import { useMemo } from "react";
import { ChartNoAxesColumn } from "lucide-react";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileSectionHeader } from "@/components/mobile/ui/MobileSectionHeader";
import { BarChart } from "@/components/ui/BarChart";
import { buildPayoutBars } from "@/lib/portal/payout-bars";
import type { Installment } from "@/lib/portal/schedule";

const BARS = 6;

/** "Evolução dos repasses": the next six payouts as bars (tap a bar for its amount and date). */
export function MobileHomePayouts({ installments }: { installments: Installment[] }) {
  const bars = useMemo(() => buildPayoutBars(installments, BARS), [installments]);
  return (
    <MobileCard as="section" aria-label="Evolução dos repasses" className="p-3.5">
      <MobileSectionHeader level={3} icon={ChartNoAxesColumn} title="Evolução dos repasses" action={{ label: "Ver todos", href: { route: "finance" } }} />
      <BarChart bars={bars} max={600} ticks={[0, 200, 400, 600]} ariaLabel={`Repasses mensais dos próximos ${bars.length} meses`} height={150} className="mt-2" />
    </MobileCard>
  );
}
