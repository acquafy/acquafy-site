// components/mobile/sections/MobileHomeKpis.tsx
"use client";

import { CircleDollarSign, Coins, ReceiptText } from "lucide-react";
import { MobileStatTile } from "@/components/mobile/ui/MobileStatTile";
import { Money } from "@/components/ui/Money";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import type { PortalSummary } from "@/lib/portal/schedule";

/** Four headline figures (2×2); each one opens the screen that explains it. */
export function MobileHomeKpis({ summary: s }: { summary: PortalSummary }) {
  return (
    <section aria-label="Indicadores" className="grid grid-cols-2 gap-3">
      <MobileStatTile icon={CircleDollarSign} tone="green" label="Total recebido" value={<Money value={s.receivedTotal} whole />} href={{ route: "finance" }} />
      <MobileStatTile icon={Coins} tone="violet" label="Saldo a receber" value={<Money value={s.remainingTotal} whole />} href={{ route: "finance" }} />
      <MobileStatTile icon={PurifierIcon} tone="blue" label="Purificadores" value={s.units} href={{ route: "purifiers" }} />
      <MobileStatTile icon={ReceiptText} tone="violet" label="Repasse mensal" value={<Money value={s.monthlyPayout} whole />} href={{ route: "calendar" }} />
    </section>
  );
}
