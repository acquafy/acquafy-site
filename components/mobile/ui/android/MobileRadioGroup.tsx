// components/mobile/ui/android/MobileRadioGroup.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { cn } from "@/lib/cn";

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

/**
 * Material 3 radio list: each option is a tonal container with a 20px radio, headline and supporting text; the chosen one is raised to
 * `primary-container`. Native radios underneath, so arrow keys, focus and form semantics come from the browser.
 */
export function MobileRadioGroup<T extends string>({ legend, name, options, value, onChange, error }: Props<T>) {
  return (
    <fieldset className="min-w-0">
      <legend className="md-title-s mb-3 text-(--md-on-surface)">{legend}</legend>
      <div className="grid gap-2">
        {options.map((o) => {
          const Icon = o.icon;
          const on = value === o.value;
          return (
            <label
              key={o.value}
              className={cn(
                "relative flex min-h-16 cursor-pointer items-start gap-4 rounded-[16px] px-4 py-3 transition-colors duration-200 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--md-secondary)",
                on ? "bg-(--md-primary-container) text-(--md-on-primary-container)" : "bg-(--md-surface-container) text-(--md-on-surface)",
              )}
            >
              <Ripple />
              <input type="radio" name={name} value={o.value} checked={on} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span aria-hidden="true" className="md-radio-dot relative mt-0.5" />
              {Icon && (
                <span aria-hidden="true" className="relative grid size-10 shrink-0 place-items-center rounded-full bg-(--md-secondary-container) text-(--md-on-secondary-container)">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
              )}
              <span className="relative min-w-0 flex-1">
                <span className="md-title-m md-title-m-em block">{o.label}</span>
                {o.description && <span className={cn("md-body-m mt-0.5 block", on ? "opacity-85" : "text-(--md-on-surface-variant)")}>{o.description}</span>}
                {o.extra}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="md-body-s mt-2 px-4 text-(--md-error)">
          {error}
        </p>
      )}
    </fieldset>
  );
}
