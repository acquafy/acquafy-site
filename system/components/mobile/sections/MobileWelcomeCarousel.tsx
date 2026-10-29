// components/mobile/sections/MobileWelcomeCarousel.tsx
"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { IconTile } from "@/components/ui/KpiCard";
import { welcomeCards, welcomeCopy } from "@/config/mobile-welcome";
import { cn } from "@/lib/cn";

/** Three swipeable cards (scroll-snap) with a page indicator. The dots are buttons that scroll to their card. */
export function MobileWelcomeCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      [...el.children].forEach((child, i) => {
        const c = child as HTMLElement;
        const dist = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
        if (dist < bestDist) {
          best = i;
          bestDist = dist;
        }
      });
      setIndex(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
    setIndex(i);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") goTo(Math.min(welcomeCards.length - 1, index + 1));
    if (e.key === "ArrowLeft") goTo(Math.max(0, index - 1));
  };

  return (
    <section aria-roledescription="carrossel" aria-label={welcomeCopy.carouselLabel}>
      <ul
        ref={track}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="m-noscrollbar relative -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [scroll-padding-inline:1.25rem]"
      >
        {welcomeCards.map((card, i) => (
          <li
            key={card.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${welcomeCards.length}`}
            className="w-[74%] max-w-[17rem] shrink-0 snap-center rounded-[14px] border border-line bg-card/90 p-4 text-center backdrop-blur-sm"
          >
            <IconTile icon={card.icon} tone={card.tone} className="mx-auto size-12 !rounded-full" />
            <h3 className="mt-2.5 text-[16px] leading-snug font-bold text-ink">{card.title}</h3>
            <p className="mt-1 text-[14px] leading-snug text-ink-soft">{card.text}</p>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex justify-center" role="group" aria-label="Escolher cartão">
        {welcomeCards.map((card, i) => (
          <button key={card.id} type="button" aria-label={`Ir para o cartão ${i + 1}: ${card.title}`} aria-current={i === index} onClick={() => goTo(i)} className="grid h-11 w-6 place-items-center focus-visible:outline-2 focus-visible:outline-brand">
            <span className={cn("block rounded-full transition-all", i === index ? "h-2 w-5 bg-brand" : "size-2 bg-brand/25")} />
          </button>
        ))}
      </div>
    </section>
  );
}
