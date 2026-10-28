// components/mobile/ui/ios/MobileFields.tsx
"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { Check, ChevronDown, Eye, EyeOff, Search, X, type LucideIcon } from "lucide-react";
import type { SelectOption } from "@/components/ui/Field";
import { cn } from "@/lib/cn";

/** Filled field (tertiary fill, no heavy border), 16pt+ text so iOS Safari does not zoom in. A red ring marks an error. */
const CONTROL =
  "ios-sq w-full rounded-[16px] border bg-(--ios-fill) px-4 text-[17px] text-ink placeholder:text-ink-mute/80 transition-colors focus-visible:border-brand focus-visible:bg-card focus-visible:outline-2 focus-visible:outline-brand/30 disabled:text-ink-mute disabled:opacity-60";

type FrameProps = { label: string; hint?: string; error?: string; hideLabel?: boolean; className?: string; children: (a: { id: string; describedBy?: string; invalid: boolean }) => ReactNode };

/** Label (13pt, secondary) above the control, hint/error below, wired with ids so every control has a name and a description. */
function FieldFrame({ label, hint, error, hideLabel, className, children }: FrameProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  const message = error ?? hint;
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className={cn("mb-1.5 block px-1 text-[13px] leading-[18px] text-ink-soft", hideLabel && "sr-only")}>
        {label}
      </label>
      {children({ id, describedBy: message ? msgId : undefined, invalid: !!error })}
      {message && (
        <p id={msgId} role={error ? "alert" : undefined} className={cn("mt-1.5 px-1 text-[13px] leading-[18px]", error ? "font-medium text-danger" : "text-ink-soft")}>
          {message}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = { label: string; hint?: string; error?: string; icon?: LucideIcon; hideLabel?: boolean; wrapperClassName?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

/** Text input with label, optional leading icon, hint/error and (for `type="password"`) a show/hide button. */
export function MobileTextField({ label, hint, error, icon: Icon, hideLabel, wrapperClassName, className, type = "text", ...rest }: TextFieldProps) {
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  return (
    <FieldFrame label={label} hint={hint} error={error} hideLabel={hideLabel} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          {Icon && <Icon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft" strokeWidth={1.75} aria-hidden="true" />}
          <input
            id={id}
            type={isPassword && shown ? "text" : type}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(CONTROL, "h-[50px]", invalid ? "border-danger" : "border-transparent", Icon && "pl-12", isPassword && "pr-12", className)}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={shown ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={shown}
              onClick={() => setShown((v) => !v)}
              className="ios-press absolute top-1/2 right-0.5 grid size-11 -translate-y-1/2 place-items-center rounded-full text-ink-soft focus-visible:outline-2 focus-visible:outline-brand"
            >
              {shown ? <EyeOff className="size-5" aria-hidden="true" /> : <Eye className="size-5" aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </FieldFrame>
  );
}

type TextAreaProps = { label: string; hint?: string; error?: string; wrapperClassName?: string } & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function MobileTextArea({ label, hint, error, wrapperClassName, className, rows = 4, ...rest }: TextAreaProps) {
  return (
    <FieldFrame label={label} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(CONTROL, "resize-none py-3", invalid ? "border-danger" : "border-transparent", className)}
          {...rest}
        />
      )}
    </FieldFrame>
  );
}

type SelectProps = { label: string; options: SelectOption[]; hint?: string; error?: string; hideLabel?: boolean; wrapperClassName?: string } & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children"
>;

/** Native select (opens the OS picker on a phone), drawn as a pop-up button: value + up/down chevron. */
export function MobileSelect({ label, options, hint, error, hideLabel, wrapperClassName, className, ...rest }: SelectProps) {
  return (
    <FieldFrame label={label} hint={hint} error={error} hideLabel={hideLabel} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(CONTROL, "h-[50px] cursor-pointer appearance-none pr-11", invalid ? "border-danger" : "border-transparent", className)}
            {...rest}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2 text-ink-soft" strokeWidth={2.25} />
        </div>
      )}
    </FieldFrame>
  );
}

type SearchProps = { label: string; value: string; onValueChange: (value: string) => void; wrapperClassName?: string } & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "type" | "value" | "onChange"
>;

/** Search field: capsule with a magnifier and a clear (×) button. */
export function MobileSearchField({ label, value, onValueChange, wrapperClassName, className, ...rest }: SearchProps) {
  return (
    <FieldFrame label={label} hideLabel className={wrapperClassName}>
      {({ id }) => (
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-ink-mute" strokeWidth={2.25} aria-hidden="true" />
          <input
            id={id}
            type="search"
            enterKeyHint="search"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            className={cn(CONTROL, "h-11 rounded-full border-transparent pr-11 pl-10 [&::-webkit-search-cancel-button]:hidden", className)}
            {...rest}
          />
          {value && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => onValueChange("")}
              className="absolute top-1/2 right-0 grid size-11 -translate-y-1/2 place-items-center text-ink-mute focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span className="grid size-[18px] place-items-center rounded-full bg-ink-mute/45 text-card">
                <X className="size-3" strokeWidth={3} aria-hidden="true" />
              </span>
            </button>
          )}
        </div>
      )}
    </FieldFrame>
  );
}

/** Checkbox drawn as the circular check mark of iOS lists, in a 44pt tall label row. */
export function MobileCheckbox({ label, className, ...rest }: { label: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">) {
  return (
    <label className={cn("inline-flex min-h-11 cursor-pointer items-center gap-3 text-[17px] leading-[22px] text-ink", className)}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-ink-mute/60 text-transparent transition-colors duration-200 peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand"
      >
        <Check className="size-4" strokeWidth={3} />
      </span>
      {label}
    </label>
  );
}
