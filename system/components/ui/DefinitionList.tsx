// components/ui/DefinitionList.tsx
import type { ReactNode } from "react";

export type DefinitionRow = { icon?: ReactNode; label: string; value: ReactNode };

/** Label / value rows (contract summaries, details). The value wraps instead of overflowing the card. */
export function DefinitionList({ rows }: { rows: DefinitionRow[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 py-2.5 text-[14.5px]">
          <dt className="flex min-w-0 items-center gap-2.5 text-ink-soft">
            {r.icon}
            <span className="min-w-0">{r.label}</span>
          </dt>
          <dd className="tabular max-w-[16rem] text-right font-bold text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
