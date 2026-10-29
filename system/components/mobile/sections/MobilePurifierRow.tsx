// components/mobile/sections/MobilePurifierRow.tsx
"use client";

import Image from "next/image";
import { ChevronRight, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/ui/Badge";
import type { Purifier } from "@/config/investor";
import { locationLabel } from "@/lib/portal/purifiers";

/** One purifier of the list: thumbnail, model + serial, place, status. Opens its details. */
export function MobilePurifierRow({ purifier: p, onOpen }: { purifier: Purifier; onOpen: (p: Purifier) => void }) {
  return (
    <li className="min-w-0">
      <button
        type="button"
        onClick={() => onOpen(p)}
        aria-label={`${p.model}, número de série ${p.serial}, ${locationLabel(p)}. Abrir detalhes`}
        className="flex min-h-[72px] w-full items-center gap-3 rounded-[14px] border border-line bg-card p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60"
      >
        <span aria-hidden="true" className="grid size-[52px] shrink-0 place-items-center rounded-[12px] bg-[radial-gradient(ellipse_at_50%_60%,var(--photo-a),var(--photo-b)_75%)]">
          <Image src="/brand/neo-up-thumb.webp" alt="" width={112} height={143} className="h-10 w-auto" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[16px] leading-tight font-bold text-ink">{p.model}</span>
          <span className="tabular block truncate text-[13px] text-ink-soft">S/N {p.serial}</span>
          <span className="mt-0.5 flex items-center gap-1 text-[13px] text-ink-soft">
            <MapPin className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
            <span className="truncate">{locationLabel(p)}</span>
          </span>
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1.5">
          <StatusBadge kind={p.status} />
        </span>
        <ChevronRight className="size-5 shrink-0 text-ink-mute" aria-hidden="true" />
      </button>
    </li>
  );
}
