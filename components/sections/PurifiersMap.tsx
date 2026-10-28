// components/sections/PurifiersMap.tsx
"use client";

import { MapPin } from "lucide-react";
import { cityPoints, FLORIDA_PATH } from "@/config/purifiers-page";
import { cn } from "@/lib/cn";
import type { Purifier } from "@/config/investor";

type Props = {
  purifiers: Purifier[];
  /** Called with the city name when a pin or a list entry is chosen. */
  onPickCity: (city: string) => void;
  activeCity?: string;
};

/** Stylised map of the installation sites (no map library): pins sized by unit count + a matching city list. */
export function PurifiersMap({ purifiers, onPickCity, activeCity }: Props) {
  const counts = new Map<string, number>();
  // Units still in stock have no site to show on the map.
  for (const p of purifiers) if (p.status !== "available") counts.set(p.city, (counts.get(p.city) ?? 0) + 1);
  const cities = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <div className="grid items-center gap-4 @2xl:grid-cols-[minmax(0,1fr)_16rem]">
      <figure className="m-0 overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_30%_20%,var(--map-a),var(--map-b))]">
        <svg viewBox="0 0 300 340" role="img" aria-label="Mapa estilizado da Flórida com os locais de instalação" className="mx-auto h-auto max-h-[26rem] w-full max-w-sm">
          <path d={FLORIDA_PATH} fill="#eaf4e4" stroke="#b9d3ab" strokeWidth="2" strokeLinejoin="round" />
          {cities.map(([city, count]) => {
            const pt = cityPoints[city];
            if (!pt) return null;
            const r = 10 + Math.min(count, 12);
            const active = activeCity === city;
            return (
              <g
                key={city}
                role="button"
                tabIndex={0}
                aria-label={`${city}: ${count} purificadores. Filtrar a lista por esta cidade`}
                onClick={() => onPickCity(city)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPickCity(city)}
                className="cursor-pointer outline-none [&:focus-visible>circle:first-child]:stroke-[#7c3aed]"
              >
                <circle cx={pt.x} cy={pt.y} r={r} fill={active ? "#7c3aed" : "#1f66ff"} fillOpacity={0.9} stroke="#fff" strokeWidth="3" />
                <text x={pt.x} y={pt.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
                  {count}
                </text>
                <text x={pt.x} y={pt.y + r + 14} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0a1f7a">
                  {city}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>

      <ul className="space-y-2" aria-label="Purificadores por cidade">
        {cities.map(([city, count]) => (
          <li key={city}>
            <button
              type="button"
              onClick={() => onPickCity(city)}
              aria-pressed={activeCity === city}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg border p-3.5 text-left transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand",
                activeCity === city ? "border-brand bg-brand-soft" : "border-line",
              )}
            >
              <span className="flex items-center gap-2 font-semibold text-ink">
                <MapPin className="size-5 text-brand" aria-hidden="true" />
                {city}
              </span>
              <span className="tabular rounded-full bg-card px-3 py-0.5 text-[14px] font-bold text-brand">{count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Small locator used inside the detail panel. */
export function MiniMap({ city, state }: { city: string; state: string }) {
  const pt = cityPoints[city] ?? cityPoints.Orlando;
  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-lg bg-[radial-gradient(ellipse_at_30%_20%,var(--map-a),var(--map-b))]">
        <svg viewBox="0 0 300 340" role="img" aria-label={`Localização aproximada: ${city}, ${state}`} className="mx-auto h-28 w-auto">
          <path d={FLORIDA_PATH} fill="#eaf4e4" stroke="#b9d3ab" strokeWidth="3" strokeLinejoin="round" />
          <circle cx={pt.x} cy={pt.y} r="22" fill="#1f66ff" fillOpacity="0.25" />
          <circle cx={pt.x} cy={pt.y} r="10" fill="#1f66ff" stroke="#fff" strokeWidth="4" />
        </svg>
      </div>
      <figcaption className="mt-1.5 text-[13px] leading-tight">
        <strong className="block text-ink">
          {city}, {state}
        </strong>
        <span className="text-ink-soft">Estados Unidos</span>
      </figcaption>
    </figure>
  );
}
