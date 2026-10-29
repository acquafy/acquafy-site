// components/sections/PurifiersKpis.tsx
"use client";

import { CircleCheck, Clock3, Wrench } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { KpiCard } from "@/components/ui/KpiCard";
import type { Purifier, PurifierStatus } from "@/config/investor";

export type StatusFilter = "all" | PurifierStatus;

const pct = (part: number, total: number) => `${total ? Math.round((part / total) * 100) : 0}% do total`;

type Props = {
  purifiers: Purifier[];
  /** Status currently filtering the list; its card shows as pressed. */
  active: StatusFilter;
  /** Clicking a card filters the list by that status (clicking the active one clears it). */
  onSelect: (status: StatusFilter) => void;
};

/** The four counters double as one-click status filters of the list below. */
export function PurifiersKpis({ purifiers, active, onSelect }: Props) {
  const total = purifiers.length;
  const count = (status: PurifierStatus) => purifiers.filter((p) => p.status === status).length;
  const models = [...new Set(purifiers.map((p) => p.model))].join(", ");
  const toggle = (status: StatusFilter) => onSelect(active === status ? "all" : status);

  return (
    <div className="grid grid-cols-1 gap-4 @md:grid-cols-2 @4xl:grid-cols-4">
      <KpiCard icon={PurifierIcon} tone="blue" labelFirst={false} label="Total de purificadores" value={total} caption={models} selected={active === "all"} onClick={() => onSelect("all")} />
      <KpiCard
        icon={CircleCheck}
        tone="green"
        labelFirst={false}
        label="Em operação"
        value={count("operation")}
        caption={pct(count("operation"), total)}
        selected={active === "operation"}
        onClick={() => toggle("operation")}
      />
      <KpiCard
        icon={Clock3}
        tone="orange"
        labelFirst={false}
        label="Disponíveis"
        value={count("available")}
        caption={pct(count("available"), total)}
        selected={active === "available"}
        onClick={() => toggle("available")}
      />
      <KpiCard
        icon={Wrench}
        tone="violet"
        labelFirst={false}
        label="Em manutenção"
        value={count("maintenance")}
        caption={pct(count("maintenance"), total)}
        selected={active === "maintenance"}
        onClick={() => toggle("maintenance")}
      />
    </div>
  );
}
