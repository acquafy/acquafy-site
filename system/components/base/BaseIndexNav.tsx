// components/base/BaseIndexNav.tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Sticky index of a long /base page (same as the Interfy components library): it is itself a scrollspy, the link of the
 * section whose top has passed the reading line is highlighted.
 */
export function BaseIndexNav({ title, items }: { title: string; items: { id: string; name: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      let current = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= 140) current = it.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  return (
    <nav aria-label={title} className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] self-start overflow-y-auto [scrollbar-width:thin] lg:block">
      <p className="mb-2 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase">{title}</p>
      <ul className="flex flex-col">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id}
              className={cn(
                "block border-l-2 px-3 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                active === it.id ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-mute hover:border-ink-mute hover:text-ink",
              )}
            >
              {it.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
