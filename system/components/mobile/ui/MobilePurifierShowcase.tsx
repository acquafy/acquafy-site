// components/mobile/ui/MobilePurifierShowcase.tsx
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The Neo UP over a soft water scene (radial light, ripples, a few bubbles; token colours, so Dia and Noite both work).
 * It fills the box it is given and keeps the purifier's aspect ratio; used on welcome, login and as the Início accessory.
 * The caller positions it: `className` must include `relative` or `absolute` (the decorations are anchored to it).
 */
export function MobilePurifierShowcase({ className, priority = false, ripples = true }: { className?: string; priority?: boolean; ripples?: boolean }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <div className="absolute inset-x-[-12%] bottom-[2%] h-[46%] rounded-[50%] bg-[radial-gradient(closest-side,var(--photo-a),transparent)] opacity-90 blur-xl" />
      {ripples &&
        [0, 1].map((i) => (
          <span key={i} className={cn("absolute bottom-[7%] left-1/2 h-[15%] -translate-x-1/2 rounded-[50%] border border-white/60", i === 0 ? "w-[88%]" : "w-[112%] opacity-60")} />
        ))}
      <span className="absolute top-[14%] left-[8%] size-3 rounded-full border border-white/70 bg-white/30" />
      <span className="absolute top-[34%] right-[6%] size-2 rounded-full border border-white/70 bg-white/40" />
      <span className="absolute bottom-[26%] left-[2%] size-2.5 rounded-full border border-white/70 bg-white/30" />
      <Image src="/brand/neo-up.webp" alt="" width={420} height={536} priority={priority} sizes="(max-width: 600px) 60vw, 240px" className="relative mx-auto h-full w-auto object-contain" />
    </div>
  );
}
