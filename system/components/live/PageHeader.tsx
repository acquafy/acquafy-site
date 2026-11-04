// components/live/PageHeader.tsx
import type { ReactNode } from "react";

/** Title and subtitle on the page background (same type scale as the portal's PageHeading), with an optional action on the right. */
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-wrap items-end justify-between gap-x-6 gap-y-3 pt-1">
      <div className="min-w-0">
        <h1 className="text-[clamp(1.5rem,1.1rem+0.8cqw,2rem)] leading-tight font-extrabold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="text-[15px] text-ink-soft">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
