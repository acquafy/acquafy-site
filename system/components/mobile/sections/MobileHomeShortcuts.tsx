// components/mobile/sections/MobileHomeShortcuts.tsx
"use client";

import Link from "next/link";
import { useMobileHref } from "@/components/mobile/PlatformProvider";
import { IconTile } from "@/components/ui/KpiCard";
import { homeShortcuts } from "@/config/mobile-home";

/** Four shortcuts to the screens that are not tabs (Solicitar, Calendário, Contrato, Suporte). */
export function MobileHomeShortcuts() {
  const href = useMobileHref();
  return (
    <nav aria-label="Atalhos">
      <ul className="grid grid-cols-4 gap-2">
        {homeShortcuts.map((s) => (
          <li key={s.id}>
            <Link
              href={href({ route: s.route })}
              className="flex min-h-[84px] flex-col items-center justify-center gap-1.5 rounded-[14px] border border-line bg-card px-1 py-2 text-center text-[12.5px] leading-tight font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60"
            >
              <IconTile icon={s.icon} tone={s.tone} className="size-10" />
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
