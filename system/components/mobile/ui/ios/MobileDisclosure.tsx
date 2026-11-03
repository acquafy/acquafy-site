// components/mobile/ui/ios/MobileDisclosure.tsx
"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { id: string; title: string; content: ReactNode };

/** Expandable rows (FAQ, terms) in an inset-grouped block: one open at a time, the title is a 44pt+ button with `aria-expanded`. */
export function MobileDisclosureGroup({ items, label }: { items: Item[]; label: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();
  return (
    <ul aria-label={label} className="ios-sq divide-y divide-line overflow-hidden rounded-[24px] border border-line/70 bg-card">
      {items.map((it) => {
        const on = open === it.id;
        const panel = `${base}-${it.id}`;
        return (
          <li key={it.id}>
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={panel}
                onClick={() => setOpen(on ? null : it.id)}
                className="ios-row flex min-h-12 w-full items-center gap-3 px-4 py-2.5 text-left text-[17px] leading-[22px] text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
              >
                <span className="min-w-0 flex-1">{it.title}</span>
                <ChevronDown className={cn("size-[18px] shrink-0 text-ink-mute transition-transform duration-300 ease-(--ios-spring)", on && "rotate-180")} strokeWidth={2.25} aria-hidden="true" />
              </button>
            </h3>
            <div id={panel} hidden={!on} className="px-4 pb-4 text-[15px] leading-5 text-ink-soft">
              {it.content}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
