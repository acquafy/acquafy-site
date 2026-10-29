// components/ui/RadioCardGroup.tsx
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export type RadioCardOption<T extends string> = { value: T; label: string; description?: string; icon?: LucideIcon; extra?: ReactNode };

type RadioCardGroupProps<T extends string> = {
  /** Visible group title (the fieldset legend). */
  legend: string;
  name: string;
  options: readonly RadioCardOption<T>[];
  value: T;
  onChange: (value: T) => void;
  error?: string;
  className?: string;
};

/** Native radios dressed as selectable cards: arrow keys, focus and form semantics come from the browser. */
export function RadioCardGroup<T extends string>({ legend, name, options, value, onChange, error, className }: RadioCardGroupProps<T>) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="mb-2 text-[13.5px] font-semibold text-ink">{legend}</legend>
      <div className="grid gap-3">
        {options.map((o) => {
          const Icon = o.icon;
          return (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3.5 rounded-xl border border-line bg-card p-4 transition hover:border-brand/50 has-checked:border-brand has-checked:bg-brand-soft/60 has-checked:ring-2 has-checked:ring-brand/20 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
            >
              <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} className="peer sr-only" />
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2 border-ink-mute/60 bg-card transition peer-checked:border-brand peer-checked:after:size-2.5 peer-checked:after:rounded-full peer-checked:after:bg-brand"
              />
              {Icon && (
                <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block text-[15.5px] font-bold text-ink">{o.label}</span>
                {o.description && <span className="mt-0.5 block text-[14px] leading-snug text-ink-soft">{o.description}</span>}
                {o.extra}
              </span>
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
