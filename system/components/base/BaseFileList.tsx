// components/base/BaseFileList.tsx
import { Card } from "@/components/ui/Card";

/** A titled list of source files (name + path); used for the component and organism inventories. */
export function BaseFileList({ title, items, count }: { title: string; items: { name: string; file: string; tag?: string }[]; count?: boolean }) {
  return (
    <Card title={count ? `${title} (${items.length})` : title}>
      <ul className="grid gap-x-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((i) => (
          <li key={i.file} className="flex items-baseline justify-between gap-2 border-b border-line py-2 last:border-0">
            <span className="min-w-0">
              <span className="block truncate text-[14.5px] font-semibold text-ink">{i.name}</span>
              <span className="block truncate text-[12.5px] text-ink-mute">{i.file}</span>
            </span>
            {i.tag && <span className="shrink-0 rounded bg-canvas px-1.5 py-0.5 text-[11px] font-bold text-ink-mute uppercase">{i.tag}</span>}
          </li>
        ))}
      </ul>
    </Card>
  );
}
