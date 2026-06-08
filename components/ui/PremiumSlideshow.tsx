"use client";

import { useState } from "react";

// ── Slide images (3 ambientes) — node 3285:5944 ─────────────────────────────
// Frame250 = slide 0 (Padrão/dot-1 active), Frame251 = slide 2 (Variante3/dot-3 active)
const slides = [
  "/figma-assets/237697cf-ead9-49ad-9437-d9aa0d339349.png", // Frame250 — slide 1 (dot 1 active)
  "/figma-assets/0e2d4786-97ef-4d1a-84d5-465c1a439987.png", // mármore  — slide 2 (dot 2 active)
  "/figma-assets/118017fd-1a4f-49aa-92f6-207be544d755.png", // Frame251 — slide 3 (dot 3 active)
];

// ── Dots (node 3285:5944 — Ellipse3/Ellipse4) ─────────────────────────────
const imgDotActive   = "/figma-assets/ab3a9184-7dcb-4725-b609-c10027896da2.svg";
const imgDotInactive = "/figma-assets/d09c7696-cea6-410b-95a5-a916d53917fb.svg";

function Dot({ active, onClick }: { active: boolean; onClick?: () => void }) {
  return (
    <div
      className={`relative shrink-0 size-[12px] ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <img
        alt=""
        className="absolute block inset-0 max-w-none size-full"
        src={active ? imgDotActive : imgDotInactive}
      />
    </div>
  );
}

/** Slideshow de 3 slides — Figma node 3285:5964 */
export default function PremiumSlideshow() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-[20px] h-[412px] items-center justify-center shrink-0 w-full">
      {/* Slide image — clicável para avançar slide */}
      <div
        className="flex-[1_0_0] min-h-px relative rounded-[16px] w-full cursor-pointer"
        onClick={() => setActive((active + 1) % slides.length)}
        aria-label="Próximo slide"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setActive((active + 1) % slides.length)}
      >
        <img
          alt="Ambientes Acquafy Premium"
          className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full"
          src={slides[active]}
        />
      </div>

      {/* Dots */}
      <div className="flex gap-[10px] items-center justify-center">
        {slides.map((_, i) => (
          <Dot
            key={i}
            active={active === i}
            onClick={active !== i ? () => setActive(i) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
