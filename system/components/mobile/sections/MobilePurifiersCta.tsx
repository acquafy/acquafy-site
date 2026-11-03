// components/mobile/sections/MobilePurifiersCta.tsx
"use client";

import { PlusCircle } from "lucide-react";
import { MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";

/** Closing call to action of Purificadores: grow the investment. */
export function MobilePurifiersCta() {
  return (
    <MobileCard as="section" aria-label="Ampliar investimento" className="grid gap-3 text-center">
      <div>
        <h2 className="text-[17px] font-bold text-ink">Quer receber mais?</h2>
        <p className="text-[14px] text-ink-soft">Adicione purificadores ao seu contrato e aumente o repasse mensal.</p>
      </div>
      <MobileButtonLink href={{ route: "request" }} size="lg" full>
        <PlusCircle className="size-5" aria-hidden="true" />
        Solicitar mais purificadores
      </MobileButtonLink>
    </MobileCard>
  );
}
