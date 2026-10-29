// components/mobile/ui/android/MobileDisclosure.tsx
"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { cn } from "@/lib/cn";

type Item = { id: string; title: string; content: ReactNode };

/**
 * Expandable rows (FAQ, terms) as a Material segmented list: one open at a time, each item its own tonal container (the open one is raised
 * to `surface-container-high`), the title is a 56px+ button with `aria-expanded` and the body unfolds with an emphasized ease.
 */
export function MobileDisclosureGroup({ items, label }: { items: Item[]; label: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const base = useId();
  return (
    <ul aria-label={label} className="flex flex-col gap-0.5">
      {items.map((it, i) => {
        const on = open === it.id;
        const panel = `${base}-${it.id}`;
        return (
          <li
            key={it.id}
            className={cn(
              "overflow-hidden rounded-[4px] transition-colors duration-200",
              on ? "bg-(--md-surface-container-high)" : "bg-(--md-surface-container)",
              i === 0 && "rounded-t-[20px]",
              i === items.length - 1 && "rounded-b-[20px]",
            )}
          >
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={panel}
                onClick={() => setOpen(on ? null : it.id)}
                className="md-title-m relative flex min-h-14 w-full items-center gap-4 px-4 py-3 text-left text-(--md-on-surface) focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-(--md-secondary)"
              >
                <Ripple />
                <span className="relative min-w-0 flex-1">{it.title}</span>
                <ChevronDown
                  className={cn("relative size-6 shrink-0 text-(--md-on-surface-variant) transition-transform duration-300 ease-(--md-ease-emphasized)", on && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={panel} aria-hidden={!on} inert={!on} className={cn("grid transition-[grid-template-rows] duration-300 ease-(--md-ease-emphasized)", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
              <div className="md-body-m min-h-0 overflow-hidden px-4 text-(--md-on-surface-variant)">
                <div className="pb-4">{it.content}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
