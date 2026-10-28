// components/mobile/ui/ios/MobileChip.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ChipProps = {
  selected?: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  count?: number;
  children: ReactNode;
};

/** Filter capsule (toggle button). Unselected = grey fill; selected = prominent glass. 36pt tall with an invisible 44pt hit area. */
export function MobileChip({ selected = false, onClick, icon: Icon, count, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "ios-press relative inline-flex h-9 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-full px-4 text-[15px] whitespace-nowrap before:absolute before:inset-x-0 before:-inset-y-[4px] before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        selected ? "ios-glass-prominent font-semibold" : "bg-(--ios-fill) font-medium text-ink active:bg-(--ios-fill-strong)",
      )}
    >
      {Icon && <Icon className="size-[17px] shrink-0" strokeWidth={2} aria-hidden="true" />}
      {children}
      {count !== undefined && <span className={cn("tabular text-[13px]", selected ? "text-white/85" : "text-ink-mute")}>{count}</span>}
    </button>
  );
}

/** Horizontally scrollable row of chips that bleeds to the screen edges (negative margin = the page gutter). */
export function MobileChipRow({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div role="group" aria-label={label} className={cn("m-noscrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-1 [scroll-padding-inline:1rem]", className)}>
      {children}
    </div>
  );
}
