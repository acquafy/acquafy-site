// components/sections/LoginBrandPanel.tsx
import Image from "next/image";
import { loginCopy, trustPoints } from "@/config/login-page";
import { cn } from "@/lib/cn";
import styles from "./LoginArt.module.css";

const WAVE_BACK = "M0,60 C180,10 540,110 720,60 C900,10 1260,110 1440,60 C1620,10 1980,110 2160,60 C2340,10 2700,110 2880,60 L2880,120 L0,120 Z";
const WAVE_FRONT = "M0,70 C240,110 480,20 720,70 C960,120 1200,30 1440,70 C1680,110 1920,20 2160,70 C2400,120 2640,30 2880,70 L2880,120 L0,120 Z";

const BUBBLES = [
  { left: "34%", bottom: "26%", size: 10, delay: "0s" },
  { left: "62%", bottom: "30%", size: 7, delay: "1.8s" },
  { left: "72%", bottom: "22%", size: 12, delay: "3.2s" },
  { left: "26%", bottom: "20%", size: 6, delay: "4.6s" },
  { left: "54%", bottom: "24%", size: 9, delay: "2.4s" },
];

function WaterScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 select-none">
      {/* Light pool under the purifier */}
      <div className="absolute inset-x-[-10%] bottom-[2%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(110,200,255,0.75),rgba(60,140,255,0.25)_60%,transparent)] blur-xl" />
      {/* Ripples spreading from the base */}
      {[0, 1.6, 3.2].map((delay) => (
        <span
          key={delay}
          className={cn("absolute bottom-[8%] left-1/2 h-[16%] w-[78%] -translate-x-1/2 rounded-[50%] border-2 border-white/55", styles.ripple)}
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
      {/* Back wave */}
      <svg viewBox="0 0 2880 120" preserveAspectRatio="none" className={cn("absolute bottom-0 left-0 hidden h-[22%] w-[200%] lg:block", styles.waveBack)}>
        <path d={WAVE_BACK} fill="rgba(120,200,255,0.42)" />
      </svg>
      {BUBBLES.map((b) => (
        <span
          key={b.left}
          className={cn("absolute rounded-full border border-white/70 bg-white/25", styles.bubble)}
          style={{ left: b.left, bottom: b.bottom, width: b.size, height: b.size, animationDelay: b.delay }}
        />
      ))}
    </div>
  );
}

function FrontWave() {
  return (
    <svg aria-hidden="true" viewBox="0 0 2880 120" preserveAspectRatio="none" className={cn("pointer-events-none absolute bottom-0 left-0 z-20 hidden h-[16%] w-[200%] lg:block", styles.waveFront)}>
      <defs>
        <linearGradient id="login-wave-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(200,234,255,0.7)" />
          <stop offset="1" stopColor="rgba(70,150,255,0.38)" />
        </linearGradient>
      </defs>
      <path d={WAVE_FRONT} fill="url(#login-wave-front)" />
    </svg>
  );
}

/** Brand side of the login: logo, headline, the Neo UP over a CSS/SVG water scene and the trust points. */
export function LoginBrandPanel() {
  return (
    <section className="bg-sidebar-gradient relative isolate overflow-hidden text-ink lg:sticky lg:top-0 lg:flex lg:h-dvh lg:min-h-[640px] lg:flex-col">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_45%_at_68%_58%,rgba(70,160,255,0.22),transparent_72%),radial-gradient(45%_40%_at_8%_0%,rgba(124,58,237,0.12),transparent_70%)]"
      />

      {/* Open water behind the trust points, so the waves above blend into the bottom edge. */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 hidden h-40 bg-[linear-gradient(to_top,rgba(70,150,255,0.2),transparent)] lg:block" />

      {/* Phone: the waves span the whole panel instead of the narrow art box. */}
      <svg aria-hidden="true" viewBox="0 0 2880 120" preserveAspectRatio="none" className={cn("pointer-events-none absolute bottom-0 left-0 z-20 h-12 w-[400%] lg:hidden", styles.waveBack)}>
        <path d={WAVE_FRONT} fill="rgba(160,215,255,0.45)" />
      </svg>

      <div className="px-6 pt-7 lg:px-14 lg:pt-10">
        <Image src="/brand/acquafy-logo.webp" alt="Acquafy Investor Portal" width={560} height={93} priority className="h-auto w-[170px] lg:w-[210px]" />
      </div>

      <div className="flex items-end gap-2 px-6 pt-6 pb-14 lg:min-h-0 lg:flex-1 lg:flex-col lg:items-stretch lg:gap-0 lg:px-14 lg:pt-8 lg:pb-0">
        <div className="min-w-0 flex-1 lg:flex-none">
          <h1 className="text-[clamp(1.9rem,1.35rem+1.7vw,3.1rem)] leading-[1.08] font-extrabold tracking-tight">
            {loginCopy.headlineLead}
            <span className="block bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">{loginCopy.headlineAccent}</span>
          </h1>
          <p className="mt-3 max-w-[27rem] text-[15px] leading-relaxed text-ink-soft lg:mt-4 lg:text-[16.5px]">{loginCopy.support}</p>
        </div>

        {/* Purifier + water */}
        <div className="relative h-52 w-40 shrink-0 lg:-mx-14 lg:h-auto lg:min-h-[220px] lg:w-auto lg:flex-1">
          <WaterScene />
          <Image
            src="/brand/neo-up.webp"
            alt="Purificador Acquafy Neo UP"
            width={420}
            height={536}
            priority
            sizes="(min-width: 1024px) 360px, 160px"
            className={cn("absolute bottom-[12%] left-1/2 z-10 h-[66%] w-auto max-w-none -translate-x-1/2 drop-shadow-[0_24px_36px_rgba(20,60,160,0.3)]", styles.float)}
          />
          <FrontWave />
        </div>

        {/* The water continues under the trust points: the two bands repeat the bottom colours of the back and front waves,
 so the waves above run into a solid base instead of ending on the pale panel. */}
        <div className="relative z-30 -mx-14 -mt-px hidden px-14 pt-[calc(2rem+1px)] pb-8 lg:block">
          <div aria-hidden="true" className="absolute inset-0 bg-[rgba(120,200,255,0.42)]" />
          <div aria-hidden="true" className="absolute inset-0 bg-[rgba(70,150,255,0.38)]" />
          <ul className="relative grid grid-cols-3 gap-4">
            {trustPoints.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex min-w-0 items-center gap-3 xl:items-start">
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft ring-1 ring-line">
                  <Icon className="size-5 text-brand" strokeWidth={1.75} />
                </span>
                <span className="min-w-0 leading-tight">
                  <span className="block text-[14.5px] font-bold">{title}</span>
                  <span className="mt-0.5 hidden text-[12.5px] text-ink-soft xl:block">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
