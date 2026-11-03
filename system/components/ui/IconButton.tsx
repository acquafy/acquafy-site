// components/ui/IconButton.tsx
import type { ButtonHTMLAttributes, Ref } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

type IconButtonProps = {
  icon: LucideIcon;
  /** Required: an icon-only control has no other accessible name. */
  label: string;
  tone?: "brand" | "muted" | "danger";
  bordered?: boolean;
  ref?: Ref<HTMLButtonElement>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label" | "children">;

const TONES = {
  brand: "text-brand hover:bg-brand-soft",
  muted: "text-ink-soft hover:bg-brand-soft hover:text-brand",
  danger: "text-danger hover:bg-danger-soft",
} as const;

export function IconButton({ icon: Icon, label, tone = "brand", bordered = false, className, type = "button", ref, ...rest }: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-grid size-9 shrink-0 place-items-center rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand disabled:opacity-40",
        bordered && "border border-line bg-card",
        TONES[tone],
        className,
      )}
      {...rest}
    >
      <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
