// components/mobile/ui/ios/MobileRadioGroup.tsx
import { Check, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IosTile } from "./IosTile";

export type MobileRadioOption<T extends string> = { value: T; label: string; description?: string; icon?: LucideIcon; extra?: ReactNode };

type Props<T extends string> = {
  /** Visible group title (the fieldset legend). */
  legend: string;
  name: string;
  options: readonly MobileRadioOption<T>[];
  value: T;
  onChange: (value: T) => void;
  error?: string;
};

/** iOS "pick one" list: rows of an inset-grouped block, the chosen one ends with a brand check mark. Native radios underneath (arrow keys, focus and form semantics come from the browser). */
export function MobileRadioGroup<T extends string>({ legend, name, options, value, onChange, error }: Props<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 px-4 text-[13px] leading-[18px] tracking-[0.01em] text-ink-mute uppercase">{legend}</legend>
      <div className="ios-sq overflow-hidden rounded-[26px] bg-card">
        {options.map((o, i) => {
          const on = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "ios-row relative flex min-h-14 cursor-pointer items-center gap-3 px-4 py-2.5 has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-brand",
                i > 0 && "before:absolute before:top-0 before:right-0 before:left-4 before:h-px before:bg-line before:content-['']",
              )}
            >
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="peer sr-only" />
              {o.icon && <IosTile icon={o.icon} tone="blue" size="md" />}
              <span className="min-w-0 flex-1">
                <span className={cn("block text-[17px] leading-[22px] text-ink", on && "font-semibold")}>{o.label}</span>
                {o.description && <span className="block text-[13px] leading-[18px] text-ink-soft">{o.description}</span>}
                {o.extra}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] transition-colors duration-200",
                  on ? "border-brand bg-brand text-white" : "border-ink-mute/50 text-transparent",
                )}
              >
                <Check className="size-4" strokeWidth={3} />
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 px-4 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
