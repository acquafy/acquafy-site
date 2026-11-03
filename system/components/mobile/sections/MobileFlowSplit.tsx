// components/mobile/sections/MobileFlowSplit.tsx
"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useDevice } from "@/components/mobile/PlatformProvider";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { MobilePurifierShowcase } from "@/components/mobile/ui/MobilePurifierShowcase";
import { loginCopy, trustPoints } from "@/config/login-page";
import { IconTile } from "@/components/ui/KpiCard";

const SplitContext = createContext(false);

/** True inside the wide login layout: the screen then drops its own logo, headline and product image, because the brand panel beside it shows them. */
export function useFlowSplit(): boolean {
  return useContext(SplitContext);
}

/**
 * Entry screen (login) on a tablet or foldable: like the desktop login, the brand on one side (logo, headline, product,
 * trust points) and the form or the highlights on the other, instead of a phone column lost in the middle. Everything on the right
 * keeps the touch sizes of the phone (50px fields, 56px buttons). On a phone it renders its children as they are.
 */
export function MobileFlowSplit({ children }: { children: ReactNode }) {
  if (useDevice() === "phone") return children;
  const copy = { lead: loginCopy.headlineLead, accent: loginCopy.headlineAccent, support: loginCopy.support };

  return (
    <SplitContext value>
      <div className="grid h-(--m-frame-h) max-h-(--m-frame-h) flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)] overflow-hidden">
        <aside className="relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-[radial-gradient(60%_50%_at_70%_55%,rgba(70,160,255,0.2),transparent_72%)] px-10 pt-[calc(var(--m-safe-top)+20px)] pb-[calc(var(--m-safe-bottom)+16px)]">
          <MobileLogo className="h-10 self-start" priority />
          <h1 className="mt-6 text-[clamp(2rem,4.4cqw,2.75rem)] leading-[1.08] font-extrabold tracking-tight text-ink">
            {copy.lead} <span className="bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">{copy.accent}</span>
          </h1>
          <p className="mt-3 max-w-[30rem] text-[17px] leading-relaxed text-ink-soft">{copy.support}</p>
          <MobilePurifierShowcase priority className="relative mx-auto my-2 min-h-0 w-full max-w-[22rem] flex-1 py-1 [&_img]:max-w-none" />
          <ul className="grid grid-cols-3 gap-4">
            {trustPoints.map(({ icon, title }) => (
              <li key={title} className="flex min-w-0 flex-col gap-2">
                <IconTile icon={icon} tone="blue" className="size-11" />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[15px] font-bold text-ink">{title}</span>
                </span>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex min-w-0 flex-col justify-center px-10 py-8">
          <div className="mx-auto flex w-full max-w-[440px] flex-col">{children}</div>
        </div>
      </div>
    </SplitContext>
  );
}
