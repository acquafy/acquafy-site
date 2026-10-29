// components/sections/DashboardPurifiers.tsx
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { purifiers } from "@/config/investor";
import { cn } from "@/lib/cn";
import { locationLabel } from "@/lib/portal/purifiers";

const STATUS = [
  { key: "operation", label: "Em operação", bar: "bg-ok", dot: "bg-ok" },
  { key: "available", label: "Disponíveis", bar: "bg-brand", dot: "bg-brand" },
  { key: "maintenance", label: "Em manutenção", bar: "bg-danger", dot: "bg-danger" },
] as const;

/** Fleet status split and where the units are installed. */
export function DashboardPurifiers() {
  const total = purifiers.length;
  const counts = STATUS.map((s) => ({ ...s, count: purifiers.filter((p) => p.status === s.key).length }));

  const byPlace = new Map<string, number>();
  for (const p of purifiers) byPlace.set(locationLabel(p), (byPlace.get(locationLabel(p)) ?? 0) + 1);
  const places = [...byPlace.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <Card
      title="Frota de purificadores"
      className="h-full"
      action={
        <Link href="/purificadores" className="text-[13.5px] font-semibold text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
          Ver todos
        </Link>
      }
    >
      <div role="img" aria-label={counts.map((c) => `${c.count} ${c.label.toLowerCase()}`).join(", ")} className="flex h-3 overflow-hidden rounded-full bg-line">
        {counts.map((c) => (c.count ? <span key={c.key} className={cn("block h-full", c.bar)} style={{ width: `${(c.count / total) * 100}%` }} /> : null))}
      </div>
      <ul className="mt-3 grid grid-cols-3 gap-2 text-center">
        {counts.map((c) => (
          <li key={c.key} className="rounded-lg bg-canvas/70 px-2 py-2.5">
            <span className="tabular block text-[22px] leading-none font-extrabold text-ink">{c.count}</span>
            <span className="mt-1 flex items-center justify-center gap-1.5 text-[12.5px] text-ink-soft">
              <span aria-hidden="true" className={cn("size-2 rounded-full", c.dot)} />
              {c.label}
            </span>
          </li>
        ))}
      </ul>

      <h3 className="mt-5 mb-2 text-[13px] font-bold tracking-wider text-ink-mute uppercase">Onde estão</h3>
      <ul className="space-y-2.5">
        {places.map(([name, count]) => (
          <li key={name} className="flex items-center gap-3 text-[14px]">
            <MapPin className="size-4 shrink-0 text-brand" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate text-ink">{name}</span>
            <span className="h-2 w-24 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <span className="block h-full rounded-full bg-brand" style={{ width: `${(count / total) * 100}%` }} />
            </span>
            <span className="tabular w-6 text-right font-bold text-ink">{count}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
