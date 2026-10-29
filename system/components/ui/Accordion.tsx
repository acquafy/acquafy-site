// components/ui/Accordion.tsx
"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id: string; question: string; answer: ReactNode };

/** FAQ-style disclosure list; one item open at a time. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className={cn("divide-y divide-line", className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <li key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`acc-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left text-[15.5px] font-semibold text-ink hover:text-brand focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
              >
                {item.question}
                <ChevronDown className={cn("size-5 shrink-0 text-brand transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
              </button>
            </h3>
            <div id={`acc-${item.id}`} role="region" hidden={!isOpen} className="pb-4 text-[14.5px] leading-relaxed text-ink-soft">
              {item.answer}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
