// components/ui/QuantityStepper.tsx
"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

type QuantityStepperProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** One-tap shortcuts ("5","10"…). */
  presets?: readonly number[];
  error?: string;
  className?: string;
};

const STEP_BTN =
  "grid size-12 shrink-0 place-items-center rounded-lg border border-line bg-card text-brand transition enabled:hover:bg-brand-soft disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** − / + buttons plus a typeable number, with optional presets. Typing is free; the value clamps on blur. */
export function QuantityStepper({ label, value, onChange, min = 1, max = 100, presets, error, className }: QuantityStepperProps) {
  const id = useId();
  const msgId = `${id}-msg`;
  /** Raw text while the field is being edited; null otherwise (the field then mirrors `value`). */
  const [text, setText] = useState<string | null>(null);

  const typed = text === null ? null : Number(text);
  const typedInvalid = text !== null && (text.trim() === "" || !Number.isInteger(typed) || (typed as number) < min || (typed as number) > max);
  const message = error ?? (typedInvalid ? `Informe um número inteiro entre ${min} e ${max}.` : undefined);

  const set = (n: number) => {
    setText(null);
    onChange(Math.min(max, Math.max(min, n)));
  };

  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-2 block text-[13.5px] font-semibold text-ink">
        {label}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Diminuir quantidade" disabled={value <= min} onClick={() => set(value - 1)} className={STEP_BTN}>
            <Minus className="size-5" aria-hidden="true" />
          </button>
          <input
            id={id}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            value={text ?? String(value)}
            aria-invalid={!!message || undefined}
            aria-describedby={message ? msgId : undefined}
            onFocus={(e) => e.currentTarget.select()}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
              setText(raw);
              const n = Number(raw);
              if (raw !== "" && Number.isInteger(n) && n >= min && n <= max) onChange(n);
            }}
            onBlur={() => {
              if (text === null) return;
              const n = Number(text);
              set(text.trim() === "" || Number.isNaN(n) ? min : n);
            }}
            className={cn(
              "tabular h-12 w-24 rounded-lg border bg-card text-center text-[22px] font-extrabold text-ink focus-visible:border-brand focus-visible:outline-2 focus-visible:outline-brand/30",
              message ? "border-danger" : "border-line",
            )}
          />
          <button type="button" aria-label="Aumentar quantidade" disabled={value >= max} onClick={() => set(value + 1)} className={STEP_BTN}>
            <Plus className="size-5" aria-hidden="true" />
          </button>
        </div>
        {presets && presets.length > 0 && (
          <div role="group" aria-label="Atalhos de quantidade" className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={value === p && text === null}
                onClick={() => set(p)}
                className={cn(
                  "tabular rounded-full px-4 py-2 text-[14.5px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                  value === p && text === null ? "bg-brand text-white" : "bg-canvas text-ink-soft hover:bg-brand-soft",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
      {message && (
        <p id={msgId} role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
          {message}
        </p>
      )}
    </div>
  );
}
