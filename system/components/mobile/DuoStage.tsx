// components/mobile/DuoStage.tsx
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SCREENS } from "@/config/base-registry";
import { cn } from "@/lib/cn";
import type { Platform } from "@/lib/mobile/platform";

const PHONES: { platform: Platform; caption: string; width: number; height: number; bezel: string; screen: string }[] = [
  {
    platform: "ios",
    caption: "iOS 26 · Liquid Glass",
    width: 390,
    height: 844,
    bezel: "rounded-[65px] border-2 border-[#3b4150] bg-[#0d1017] p-2 dark:bg-[#04060b]",
    screen: "rounded-[55px]",
  },
  {
    platform: "android",
    caption: "Android · Material 3 Expressive",
    width: 412,
    height: 915,
    bezel: "rounded-[54px] border border-white/10 bg-[#14171d] p-[9px] dark:bg-[#05070b]",
    screen: "rounded-[44px]",
  },
];

/** Screens that exist in the app, in production order (the registry's mobile routes). */
const SCREEN_LINKS = SCREENS.filter((s) => s.mobile && s.mobileGroup === "tabs").map((s) => ({ id: s.id, title: s.title, route: s.mobile! }));

/**
 * Desktop preview of the mobile app: the SAME screen on both platforms, side by side, each in its own phone (Interfy style:
 * "iOS 26 · Liquid Glass" next to "Android · Material 3 Expressive"). Each phone is an iframe of the real route
 * (/m/ios/<tela>, /m/android/<tela>), so everything is live; the screen links on top load a screen in both at once.
 */
/** Same zoom for both phones, so the real proportions are kept and the taller one (plus its caption) fits the window height. */
function useFitScale(): number {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const tallest = Math.max(...PHONES.map((p) => p.height)) + 20 + 56;
    const update = () => setScale(Math.min(1, (window.innerHeight - 32) / tallest));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return scale;
}

export function DuoStage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const [rest, setRest] = useState(parts.slice(2).join("/") || "home");
  const current = rest.split("/")[0];
  const scale = useFitScale();

  return (
    <div className="flex min-h-dvh items-start text-ink">
      <nav aria-label="Telas do app" className="sticky top-0 flex h-dvh w-60 shrink-0 flex-col gap-1 overflow-y-auto p-4 [scrollbar-width:thin]">
        <p className="mb-2 px-3 text-[11px] font-bold tracking-[0.08em] text-ink-mute uppercase">Telas do app</p>
        {SCREEN_LINKS.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={current === s.route}
            onClick={() => setRest(s.route)}
            className={cn(
              "rounded-lg border-l-2 px-3 py-2 text-left text-[14px] font-semibold transition focus-visible:outline-2 focus-visible:outline-brand",
              current === s.route ? "border-brand bg-brand-soft text-brand" : "border-transparent text-ink-soft hover:bg-brand-soft/60 hover:text-brand",
            )}
          >
            {s.title}
          </button>
        ))}
      </nav>

      <div className="flex min-h-dvh min-w-0 flex-1 flex-wrap content-center items-start justify-center gap-x-14 gap-y-10 p-4">
        {PHONES.map((p) => (
          <figure key={p.platform} className="flex flex-col items-center gap-4" style={{ zoom: scale }}>
            <div className={cn("relative", p.bezel)}>
              <iframe
                key={`${p.platform}-${rest}`}
                title={`${p.caption}: ${rest}`}
                src={`/m/${p.platform}/${rest}`}
                className={cn("block overflow-hidden border-0 bg-transparent", p.screen)}
                style={{ width: p.width, height: p.height }}
              />
            </div>
            <figcaption className="text-[14px] font-semibold text-ink-soft">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
