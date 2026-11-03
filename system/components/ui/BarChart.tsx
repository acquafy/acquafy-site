// components/ui/BarChart.tsx
"use client";

import { useState } from "react";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { cn } from "@/lib/cn";

export type Bar = {
  /** Under the bar, e.g."Nov". */
  label: string;
  /** Second, smaller line under the label, e.g. the year. */
  sub?: string;
  /** Amount in USD. */
  value: number;
  /** CSS background of the bar (colour or gradient). */
  fill: string;
  /** Line under the amount in the tooltip, e.g."Recebido em 01/12/2026". */
  caption?: string;
};

type BarChartProps = {
  bars: Bar[];
  /** Top of the scale, in USD. */
  max: number;
  /** Gridlines, in USD (e.g. [0, 200, 400, 600]). */
  ticks: number[];
  ariaLabel: string;
  /** Height of the plot area. */
  height?: number;
  className?: string;
};

/** Money bar chart: amounts follow the selected currency; every bar is focusable and has its own accessible name. */
export function BarChart({ bars, max, ticks, ariaLabel, height = 200, className }: BarChartProps) {
  const { money } = useCurrency();
  const [active, setActive] = useState<number | null>(null);
  const dense = bars.length > 14;
  // Dense charts label every n-th bar so month names never collide.
  const labelStep = dense ? Math.ceil(bars.length / 12) : 1;

  return (
    <figure aria-label={ariaLabel} className={cn("m-0 flex gap-3", className)}>
      <div className="relative w-12 shrink-0 text-[12px] text-ink-mute" style={{ height }} aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} className="tabular absolute right-0 translate-y-1/2 leading-none" style={{ bottom: `${(t / max) * 100}%` }}>
            {money(t, { whole: true, plain: true })}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="relative" style={{ height }}>
          {ticks.map((t) => (
            <span key={t} aria-hidden="true" className="absolute inset-x-0 border-t border-line" style={{ bottom: `${(t / max) * 100}%` }} />
          ))}
          <div className={cn("absolute inset-0 flex items-end", dense ? "gap-1" : "gap-2 @md:gap-3")}>
            {bars.map((b, i) => {
              const edge = i < 2 ? "left-0" : i > bars.length - 3 ? "right-0" : "left-1/2 -translate-x-1/2";
              const text = `${b.label}${b.sub ? ` ${b.sub}` : ""}: ${money(b.value)}${b.caption ? `, ${b.caption}` : ""}`;
              return (
                <div key={`${b.label}-${b.sub ?? i}`} className="relative flex h-full min-w-0 flex-1 items-end justify-center" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
                  <span
                    role="img"
                    tabIndex={0}
                    aria-label={text}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="block w-full max-w-9 rounded-t-md outline-offset-2 transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-brand"
                    style={{ height: `${Math.min(100, (b.value / max) * 100)}%`, background: b.fill }}
                  />
                  {active === i && (
                    <span className={cn("pointer-events-none absolute bottom-full z-10 mb-2 rounded-lg bg-navy-950 px-3 py-2 text-center whitespace-nowrap text-white", edge)}>
                      <span className="tabular block text-[14.5px] font-bold">{money(b.value)}</span>
                      {b.caption && <span className="block text-[12px] text-white/80">{b.caption}</span>}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-2 flex text-[12px] leading-tight text-ink-mute", dense ? "gap-1" : "gap-2 @md:gap-3")} aria-hidden="true">
          {bars.map((b, i) => (
            <span key={`${b.label}-${b.sub ?? i}`} className="min-w-0 flex-1 text-center">
              {i % labelStep === 0 && (
                <>
                  <span className="block whitespace-nowrap">{b.label}</span>
                  {b.sub && <span className="block text-[11px] whitespace-nowrap opacity-80">{b.sub}</span>}
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
