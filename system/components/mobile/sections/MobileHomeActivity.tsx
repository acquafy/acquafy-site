// components/mobile/sections/MobileHomeActivity.tsx
"use client";

import { Clock3 } from "lucide-react";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileSectionHeader } from "@/components/mobile/ui/MobileSectionHeader";
import { Money } from "@/components/ui/Money";
import { homeActivity } from "@/config/mobile-home";
import { formatDateShort } from "@/lib/mobile/format";
import type { PortalSummary } from "@/lib/portal/schedule";

/** "Últimas movimentações": the three latest events, each opening the screen it belongs to. */
export function MobileHomeActivity({ summary }: { summary: PortalSummary }) {
  const items = homeActivity(summary);
  return (
    <MobileCard as="section" aria-label="Últimas movimentações" padding="none" className="overflow-hidden">
      <div className="px-3.5 pt-3.5">
        <MobileSectionHeader level={3} icon={Clock3} title="Últimas movimentações" action={{ label: "Ver todas", href: { route: "finance" } }} />
      </div>
      <MobileListGroup className="mt-1 [&>ul]:rounded-none [&>ul]:border-0 [&>ul]:border-t [&>ul]:border-line/50">
        {items.map((a) => (
          <MobileListRow
            key={a.id}
            icon={a.icon}
            tone={a.tone}
            title={a.title}
            subtitle={formatDateShort(a.date)}
            href={{ route: a.route }}
            value={
              a.amount !== undefined ? (
                <span className="font-bold text-ok">
                  <Money value={a.amount} whole />
                </span>
              ) : (
                <span className="font-semibold text-brand">{a.label}</span>
              )
            }
          />
        ))}
      </MobileListGroup>
    </MobileCard>
  );
}
