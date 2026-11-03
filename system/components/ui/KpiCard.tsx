// components/ui/KpiCard.tsx
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type Tone = "blue" | "violet" | "green" | "orange" | "pink";

const TONES: Record<Tone, string> = {
  blue: "bg-brand-soft text-brand",
  violet: "bg-violet-soft text-violet",
  green: "bg-ok-soft text-ok",
  orange: "bg-warn-soft text-warn",
  pink: "bg-danger-soft text-danger",
};

export function IconTile({ icon: Icon, tone, className = "size-14" }: { icon: LucideIcon; tone: Tone; className?: string }) {
  return (
    <span aria-hidden="true" className={cn("grid shrink-0 place-items-center rounded-xl", TONES[tone], className)}>
      <Icon className="size-1/2" strokeWidth={1.75} />
    </span>
  );
}

type KpiCardProps = {
  icon: LucideIcon;
  tone: Tone;
  label: string;
  /** Pass a node (e.g. `<Money />`) so the figure follows the selected currency. */
  value: React.ReactNode;
  caption?: React.ReactNode;
  /** Makes the caption a link ("Ver detalhes →"). Not combinable with `onClick`. */
  captionHref?: string;
  /** Puts the label above the value instead of below it. */
  labelFirst?: boolean;
  /** Makes the whole card a toggle button (used as a filter). */
  onClick?: () => void;
  /** Pressed state of a clickable card. */
  selected?: boolean;
  children?: React.ReactNode;
};

/**
 * Headline figure. The card is its own size container: icon and number scale with the card's width
 * (`cqw`), so four of them fit in a row at any window size without wrapping the figure.
 * With `onClick` it becomes a `<button aria-pressed>`; text uses spans so the markup stays valid inside a button.
 */
export function KpiCard({ icon, tone, label, value, caption, captionHref, labelFirst = true, onClick, selected = false, children }: KpiCardProps) {
  const labelEl = <span className="block text-[14.5px] leading-snug font-medium text-ink">{label}</span>;
  const inner = (
    <span className="flex items-center gap-[clamp(0.625rem,5cqw,1rem)] p-[clamp(0.75rem,6cqw,1rem)]">
      <IconTile icon={icon} tone={tone} className="size-[clamp(2.5rem,19cqw,3.75rem)]" />
      <span className="block min-w-0 flex-1 leading-tight">
        {labelFirst && labelEl}
        <span className="tabular block text-[clamp(1.25rem,9.5cqw,1.75rem)] leading-tight font-extrabold tracking-tight whitespace-nowrap text-ink">{value}</span>
        {!labelFirst && labelEl}
        {captionHref && caption && !onClick ? (
          <Link href={captionHref} className="text-[13.5px] font-medium text-brand hover:underline focus-visible:outline-2 focus-visible:outline-brand">
            {caption} →
          </Link>
        ) : (
          caption && <span className="block text-[13.5px] text-ink-soft">{caption}</span>
        )}
        {children}
      </span>
    </span>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={cn(
          "card @container block w-full min-w-0 text-left transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
          selected && "bg-brand-soft/40 ring-2 ring-brand",
        )}
      >
        {inner}
      </button>
    );
  }

  return <article className="card @container min-w-0">{inner}</article>;
}
