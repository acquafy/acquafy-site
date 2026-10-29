// components/mobile/ui/ios/IosTile.tsx
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";

/** Solid tile colours, as in the iOS Settings app (white glyph on a saturated square). */
const TONES: Record<Tone, string> = {
  blue: "bg-brand",
  violet: "bg-violet",
  green: "bg-ok",
  orange: "bg-warn",
  pink: "bg-danger",
};

/** `sm` is the 29pt list icon (radius 7), `md` the 36pt one used in section headers and tiles, `lg` the 44pt one. */
const SIZES = { sm: "size-[29px] rounded-[7px]", md: "size-9 rounded-[9px]", lg: "size-11 rounded-[11px]" } as const;
const GLYPH = { sm: "size-[17px]", md: "size-5", lg: "size-6" } as const;

export type IosTileSize = keyof typeof SIZES;

/** Rounded square with a white SF-Symbols-like glyph. Decorative (`aria-hidden`). */
export function IosTile({ icon: Icon, tone = "blue", size = "sm", className }: { icon: LucideIcon; tone?: Tone; size?: IosTileSize; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("ios-tile ios-sq grid shrink-0 place-items-center text-white", TONES[tone], SIZES[size], className)}>
      <Icon className={GLYPH[size]} strokeWidth={2} />
    </span>
  );
}
