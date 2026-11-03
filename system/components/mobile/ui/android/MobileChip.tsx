// components/mobile/ui/android/MobileChip.tsx
import { Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { cn } from "@/lib/cn";

type ChipProps = {
  selected?: boolean;
  onClick: () => void;
  icon?: LucideIcon;
  count?: number;
  children: ReactNode;
};

/**
 * Material 3 filter chip (toggle): 32px, 8px radius that morphs to a pill when selected (with a spring); selected = `secondary-container`
 * with a check mark, unselected = outlined. 48px touch target through an invisible extension.
 */
export function MobileChip({ selected = false, onClick, icon: Icon, count, children }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "md-label-l relative inline-flex h-8 shrink-0 items-center justify-center gap-2 border px-3 whitespace-nowrap transition-[border-radius,background-color,border-color,color] duration-300 ease-(--md-spring) before:absolute before:inset-x-0 before:-inset-y-2 before:content-[''] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-secondary) active:rounded-[6px]",
        selected ? "rounded-2xl border-transparent bg-(--md-secondary-container) text-(--md-on-secondary-container)" : "rounded-lg border-(--md-outline) text-(--md-on-surface-variant)",
      )}
    >
      <Ripple />
      {selected ? (
        <Check className="relative -ml-1 size-[18px] shrink-0" strokeWidth={2.5} aria-hidden="true" />
      ) : (
        Icon && <Icon className="relative -ml-1 size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
      )}
      <span className="relative">{children}</span>
      {count !== undefined && <span className="md-label-m tabular relative opacity-75">{count}</span>}
    </button>
  );
}

/** Horizontally scrollable row of chips that bleeds to the screen edges (negative margin = the page gutter). */
export function MobileChipRow({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div role="group" aria-label={label} className={cn("m-noscrollbar -mx-4 flex gap-2 overflow-x-auto px-4 py-2 [scroll-padding-inline:1rem]", className)}>
      {children}
    </div>
  );
}
