// components/mobile/ui/android/MobileFields.tsx
"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Check, ChevronDown, Eye, EyeOff, Search, X, type LucideIcon } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import type { SelectOption } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

/** Supporting text under a field (hint, or the error that replaces it): Body Small, 16px inset like the label. */
function Support({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  const message = error ?? hint;
  if (!message) return null;
  return (
    <p id={id} role={error ? "alert" : undefined} data-error={!!error || undefined} className="md-field-support">
      {message}
    </p>
  );
}

type TextFieldProps = { label: string; hint?: string; error?: string; icon?: LucideIcon; hideLabel?: boolean; wrapperClassName?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

/**
 * Material 3 filled text field: 56px container with the label floating above the value (16px on the line, 12px when focused or filled),
 * 1px → 2px bottom indicator, optional leading icon, supporting text / error below and, for `type="password"`, a show/hide icon button.
 * 16px text: iOS Safari zooms into smaller inputs.
 */
export function MobileTextField({ label, hint, error, icon: Icon, hideLabel, wrapperClassName, className, type = "text", ...rest }: TextFieldProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={cn("min-w-0", wrapperClassName)}>
      <div className="md-field" data-invalid={!!error || undefined} data-icon={!!Icon || undefined} data-trailing={isPassword || undefined} data-nolabel={hideLabel || undefined}>
        <input
          id={id}
          type={isPassword && shown ? "text" : type}
          aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? msgId : undefined}
          {...rest}
          placeholder={rest.placeholder ?? " "}
          className={cn("md-field-control", className)}
        />
        <label htmlFor={id} className={cn("md-field-label", hideLabel && "sr-only")}>
          {label}
        </label>
        {Icon && <Icon className="md-field-lead size-6" strokeWidth={1.75} aria-hidden="true" />}
        {isPassword && (
          <button type="button" aria-label={shown ? "Ocultar senha" : "Mostrar senha"} aria-pressed={shown} onClick={() => setShown((v) => !v)} className="md-icon-btn md-field-trail">
            <Ripple />
            {shown ? <EyeOff className="relative size-6" aria-hidden="true" /> : <Eye className="relative size-6" aria-hidden="true" />}
          </button>
        )}
      </div>
      <Support id={msgId} hint={hint} error={error} />
    </div>
  );
}

type TextAreaProps = { label: string; hint?: string; error?: string; wrapperClassName?: string } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function MobileTextArea({ label, hint, error, wrapperClassName, className, rows = 4, ...rest }: TextAreaProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div className={cn("min-w-0", wrapperClassName)}>
      <div className="md-field" data-invalid={!!error || undefined}>
        <textarea
          id={id}
          rows={rows}
          aria-invalid={!!error || undefined}
          aria-describedby={error || hint ? msgId : undefined}
          {...rest}
          placeholder={rest.placeholder ?? " "}
          className={cn("md-field-control resize-none", className)}
        />
        <label htmlFor={id} className="md-field-label">
          {label}
        </label>
      </div>
      <Support id={msgId} hint={hint} error={error} />
    </div>
  );
}

type SelectProps = { label: string; options: SelectOption[]; hint?: string; error?: string; hideLabel?: boolean; wrapperClassName?: string } & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children"
>;

/** Native select (opens the OS picker on a phone) dressed as a Material filled field with the label always floated. */
export function MobileSelect({ label, options, hint, error, hideLabel, wrapperClassName, className, ...rest }: SelectProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div className={cn("min-w-0", wrapperClassName)}>
      <div className="md-field" data-float={!hideLabel || undefined} data-trailing="true" data-invalid={!!error || undefined} data-nolabel={hideLabel || undefined}>
        <select id={id} aria-invalid={!!error || undefined} aria-describedby={error || hint ? msgId : undefined} className={cn("md-field-control cursor-pointer appearance-none", className)} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <label htmlFor={id} className={cn("md-field-label", hideLabel && "sr-only")}>
          {label}
        </label>
        <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-4 right-3 size-6 text-(--md-on-surface-variant)" strokeWidth={2} />
      </div>
      <Support id={msgId} hint={hint} error={error} />
    </div>
  );
}

type SearchProps = { label: string; value: string; onValueChange: (value: string) => void; wrapperClassName?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "value" | "onChange"
>;

/** Material 3 search bar: 56px pill on `surface-container-high`, leading search icon, trailing clear (×) icon button. */
export function MobileSearchField({ label, value, onValueChange, wrapperClassName, className, ...rest }: SearchProps) {
  const id = useId();
  return (
    <div className={cn("min-w-0", wrapperClassName)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative flex h-14 items-center rounded-full bg-(--md-surface-container-high) text-(--md-on-surface) transition-colors focus-within:bg-(--md-surface-container-highest) focus-within:outline-2 focus-within:outline-(--md-primary)">
        <Search className="pointer-events-none absolute left-4 size-6 text-(--md-on-surface-variant)" aria-hidden="true" />
        <input
          id={id}
          type="search"
          enterKeyHint="search"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          className={cn(
            "md-body-l h-full w-full rounded-full bg-transparent pr-14 pl-14 text-(--md-on-surface) outline-none placeholder:text-(--md-on-surface-variant) [&::-webkit-search-cancel-button]:hidden",
            className,
          )}
          {...rest}
        />
        {value && (
          <button type="button" aria-label="Limpar busca" onClick={() => onValueChange("")} className="md-icon-btn absolute right-1">
            <Ripple />
            <X className="relative size-6" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

/** Material 3 checkbox: 18px box with a 2px radius, 40px state layer, 48px tall label row. */
export function MobileCheckbox({ label, className, ...rest }: { label: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <label className={cn("md-body-l relative inline-flex min-h-12 cursor-pointer items-center gap-1 text-(--md-on-surface)", className)}>
      <span className="relative grid size-10 shrink-0 place-items-center rounded-full text-(--md-on-surface)">
        <Ripple follow />
        <input type="checkbox" className="peer absolute inset-0 z-10 m-0 size-full cursor-pointer opacity-0" {...rest} />
        <span className="md-check-box">
          <Check className="size-3.5" strokeWidth={4} aria-hidden="true" />
        </span>
      </span>
      {label}
    </label>
  );
}
