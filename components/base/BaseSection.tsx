// components/base/BaseSection.tsx
import type { ReactNode } from "react";

/** One section of a long /base page (Interfy "Section"): bordered block, title on the left, its origin on the right, then the content. */
export function BaseSection({ id, name, origin, children }: { id: string; name: string; origin: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="card mt-7 min-w-0 scroll-mt-20 p-6 first:mt-0">
      <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-line pb-3.5">
        <h2 id={`${id}-h`} className="text-[22px] font-bold text-ink">
          {name}
        </h2>
        <p className="text-[12px] text-ink-mute">{origin}</p>
      </header>
      {children}
    </section>
  );
}

/** Small uppercase label above a specimen (Interfy "Sub"). */
export function BaseSub({ children }: { children: ReactNode }) {
  return <h3 className="mt-6 mb-2.5 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase first:mt-0">{children}</h3>;
}
