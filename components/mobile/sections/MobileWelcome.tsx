// components/mobile/sections/MobileWelcome.tsx
"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileButton, MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileLogo } from "@/components/mobile/ui/MobileLogo";
import { MobilePurifierShowcase } from "@/components/mobile/ui/MobilePurifierShowcase";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { aboutAcquafy, welcomeCopy } from "@/config/mobile-welcome";
import { mobilePath } from "@/lib/mobile/platform";
import { MobileWelcomeCarousel } from "./MobileWelcomeCarousel";

/** Onboarding screen: logo, headline, the purifier, the three swipeable cards, "Começar" and "Saiba mais". */
export function MobileWelcome() {
  const platform = usePlatform();
  const [about, setAbout] = useState(false);

  return (
    <main className="flex min-h-full flex-1 flex-col px-5 pt-[calc(var(--m-safe-top)+12px)] pb-[max(20px,calc(var(--m-safe-bottom)+8px))]">
      <div className="flex justify-center">
        <MobileLogo className="h-9" priority />
      </div>

      <h1 className="mt-4 text-center text-[clamp(1.5rem,7.6vw,2rem)] leading-[1.08] font-extrabold tracking-tight text-ink">
        {welcomeCopy.headlineLead} <span className="bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">{welcomeCopy.headlineAccent}</span>
      </h1>
      <p className="mx-auto mt-2 max-w-[22rem] text-center text-[15.5px] leading-snug text-ink-soft">{welcomeCopy.support}</p>

      <MobilePurifierShowcase priority className="relative mx-auto my-2 min-h-[150px] w-full max-w-[18rem] flex-1" />

      <MobileWelcomeCarousel />

      <div className="mt-3 grid gap-2.5">
        <MobileButtonLink href={mobilePath(platform, "login")} size="lg" full>
          {welcomeCopy.start}
          <ArrowRight className="size-5" aria-hidden="true" />
        </MobileButtonLink>
        <MobileButton variant="secondary" size="lg" full onClick={() => setAbout(true)}>
          {welcomeCopy.learnMore}
        </MobileButton>
      </div>

      <MobileSheet
        open={about}
        onClose={() => setAbout(false)}
        title={aboutAcquafy.title}
        footer={
          <MobileButtonLink href={mobilePath(platform, "login")} size="lg" full>
            {welcomeCopy.start}
            <ArrowRight className="size-5" aria-hidden="true" />
          </MobileButtonLink>
        }
      >
        <p className="mb-3 text-[15px] leading-relaxed text-ink-soft">{aboutAcquafy.intro}</p>
        <MobileListGroup aria-label="Como funciona">
          {aboutAcquafy.points.map((p) => (
            <MobileListRow key={p.title} icon={p.icon} tone={p.tone} title={p.title} subtitle={p.text} />
          ))}
        </MobileListGroup>
      </MobileSheet>
    </main>
  );
}
