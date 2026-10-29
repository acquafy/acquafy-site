// components/ui/Pagination.tsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  /**"Exibindo 1–10 de 20 purificadores". */
  summary?: string;
  className?: string;
};

/** Windowed page list: always first, last and the neighbours of the current page. */
function windowed(page: number, pages: number): (number | "gap")[] {
  const keep = new Set([1, pages, page - 1, page, page + 1]);
  const out: (number | "gap")[] = [];
  let prev = 0;
  for (const n of [...keep].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b)) {
    if (n - prev > 1) out.push("gap");
    out.push(n);
    prev = n;
  }
  return out;
}

const NAV = "grid size-9 place-items-center rounded-lg border border-line text-brand enabled:hover:bg-brand-soft disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand";

export function Pagination({ page, pages, onChange, summary, className }: PaginationProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-3", className)}>
      <nav aria-label="Paginação" className="flex items-center gap-1.5">
        <button type="button" aria-label="Página anterior" disabled={page <= 1} onClick={() => onChange(page - 1)} className={NAV}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        {windowed(page, pages).map((n, i) =>
          n === "gap" ? (
            <span key={`gap-${i}`} aria-hidden="true" className="px-1 text-ink-mute">
              …
            </span>
          ) : (
            <button
              key={n}
              type="button"
              aria-label={`Página ${n}`}
              aria-current={n === page ? "page" : undefined}
              onClick={() => onChange(n)}
              className={cn(
                "tabular size-9 rounded-lg border text-[14.5px] font-semibold focus-visible:outline-2 focus-visible:outline-brand",
                n === page ? "border-brand bg-brand text-white" : "border-line text-ink hover:bg-brand-soft",
              )}
            >
              {n}
            </button>
          ),
        )}
        <button type="button" aria-label="Próxima página" disabled={page >= pages} onClick={() => onChange(page + 1)} className={NAV}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </nav>
      {summary && (
        <p className="text-[14px] text-ink-soft" aria-live="polite">
          {summary}
        </p>
      )}
    </div>
  );
}
