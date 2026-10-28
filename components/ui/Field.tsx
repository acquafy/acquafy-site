// components/ui/Field.tsx
"use client";

import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { ChevronDown, Eye, EyeOff, Search, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const CONTROL =
  "w-full rounded-lg border bg-card px-3.5 py-2.5 text-[15px] text-ink placeholder:text-ink-mute/80 transition focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/30 disabled:bg-canvas disabled:text-ink-mute";

type FieldFrameProps = {
  label: string;
  hint?: string;
  error?: string;
  /** Hides the visible label (it stays for screen readers). */
  hideLabel?: boolean;
  className?: string;
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
};

/** Label + control + hint/error, wired with ids so every control has an accessible name and description. */
export function FieldFrame({ label, hint, error, hideLabel, className, children }: FieldFrameProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  const message = error ?? hint;
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className={cn("mb-1.5 block text-[13.5px] font-semibold text-ink", hideLabel && "sr-only")}>
        {label}
      </label>
      {children({ id, describedBy: message ? msgId : undefined, invalid: !!error })}
      {message && (
        <p id={msgId} role={error ? "alert" : undefined} className={cn("mt-1.5 text-[13px]", error ? "font-medium text-danger" : "text-ink-soft")}>
          {message}
        </p>
      )}
    </div>
  );
}

type TextFieldProps = { label: string; hint?: string; error?: string; icon?: LucideIcon; hideLabel?: boolean; wrapperClassName?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function TextField({ label, hint, error, icon: Icon, hideLabel, wrapperClassName, className, type = "text", ...rest }: TextFieldProps) {
  const [shown, setShown] = useState(false);
  const isPassword = type === "password";
  return (
    <FieldFrame label={label} hint={hint} error={error} hideLabel={hideLabel} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          {Icon && <Icon className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-brand" strokeWidth={1.75} aria-hidden="true" />}
          <input
            id={id}
            type={isPassword && shown ? "text" : type}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(CONTROL, invalid ? "border-danger" : "border-line", Icon && "pl-11", isPassword && "pr-12", className)}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              aria-label={shown ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={shown}
              onClick={() => setShown((v) => !v)}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-1.5 text-ink-soft hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
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

export function TextArea({ label, hint, error, wrapperClassName, className, rows = 4, ...rest }: TextAreaProps) {
  return (
    <FieldFrame label={label} hint={hint} error={error} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id}
          rows={rows}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(CONTROL, "resize-y", invalid ? "border-danger" : "border-line", className)}
          {...rest}
        />
      )}
    </FieldFrame>
  );
}

export type SelectOption = { value: string; label: string };

type SelectProps = { label: string; options: SelectOption[]; hint?: string; error?: string; hideLabel?: boolean; wrapperClassName?: string } & Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "id" | "children"
>;

export function Select({ label, options, hint, error, hideLabel, wrapperClassName, className, ...rest }: SelectProps) {
  return (
    <FieldFrame label={label} hint={hint} error={error} hideLabel={hideLabel} className={wrapperClassName}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id}
            aria-invalid={invalid || undefined}
            aria-describedby={describedBy}
            className={cn(CONTROL, "cursor-pointer appearance-none pr-11", invalid ? "border-danger" : "border-line", className)}
            {...rest}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {/* The arrow sits in a square at the right end (width = field height), so its distance to the top, bottom
 and right edges is the same. */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 grid aspect-square place-items-center text-ink-soft">
            <ChevronDown className="size-[18px]" strokeWidth={2} />
          </span>
        </div>
      )}
    </FieldFrame>
  );
}

type SearchInputProps = { label: string; wrapperClassName?: string } & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "type">;

export function SearchInput({ label, wrapperClassName, className, ...rest }: SearchInputProps) {
  return (
    <FieldFrame label={label} hideLabel className={wrapperClassName}>
      {({ id }) => (
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-ink-mute" aria-hidden="true" />
          <input id={id} type="search" className={cn(CONTROL, "border-line pl-11", className)} {...rest} />
        </div>
      )}
    </FieldFrame>
  );
}

type CheckboxProps = { label: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={cn("inline-flex cursor-pointer items-center gap-2.5 text-[14.5px] text-ink", className)}>
      <input
        type="checkbox"
        className="size-[18px] cursor-pointer rounded-md border-line accent-[#1f66ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        {...rest}
      />
      {label}
    </label>
  );
}

type SwitchProps = { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean };

/** On/off toggle (`role="switch"`). */
export function Switch({ checked, onChange, label, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50",
        checked ? "bg-brand" : "bg-ink-mute/40",
      )}
    >
      <span aria-hidden="true" className={cn("absolute top-0.5 left-0.5 size-6 rounded-full bg-card shadow transition-transform", checked && "translate-x-5")} />
    </button>
  );
}
