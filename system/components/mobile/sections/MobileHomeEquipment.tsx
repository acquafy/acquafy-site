// components/mobile/sections/MobileHomeEquipment.tsx
"use client";

import { ChevronRight } from "lucide-react";
import { MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { IconTile } from "@/components/ui/KpiCard";
import { PurifierIcon } from "@/components/ui/PurifierIcon";

/** "Meus equipamentos": how many Neo UP are linked to the investor, with a shortcut to the list. */
export function MobileHomeEquipment({ units }: { units: number }) {
  return (
    <MobileCard as="section" aria-label="Meus equipamentos" className="flex items-center gap-3 p-3.5">
      <IconTile icon={PurifierIcon} tone="blue" className="size-10" />
      <div className="min-w-0 flex-1">
        <h2 className="text-[16px] leading-tight font-bold text-ink">Meus equipamentos</h2>
        <p className="text-[13px] leading-snug text-ink-soft">{units} Neo UP vinculados</p>
      </div>
      <MobileButtonLink href={{ route: "purifiers" }} variant="secondary" size="sm" aria-label="Ver detalhes dos equipamentos">
        Ver detalhes
        <ChevronRight className="size-4" aria-hidden="true" />
      </MobileButtonLink>
    </MobileCard>
  );
}
