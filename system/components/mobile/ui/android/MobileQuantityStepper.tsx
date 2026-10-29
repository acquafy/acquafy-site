// components/mobile/ui/android/MobileQuantityStepper.tsx
"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Ripple } from "@/components/mobile/android/Ripple";
import { cn } from "@/lib/cn";
import { MobileChip } from "./MobileChip";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** One-tap shortcuts ("5", "10"…). */
  presets?: readonly number[];
  error?: string;
};

const STEP_BTN =
  "relative grid size-14 shrink-0 place-items-center rounded-full bg-(--md-secondary-container) text-(--md-on-secondary-container) transition-[border-radius,opacity] duration-300 ease-(--md-spring) active:rounded-[16px] disabled:opacity-40 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-secondary)";

/** − / + tonal icon buttons (they morph from circle to rounded square when pressed) around a typeable number (clamped on blur) and optional presets. */
export function MobileQuantityStepper({ label, value, onChange, min = 1, max = 100, presets, error }: Props) {
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
    <div className="min-w-0">
      <label htmlFor={id} className="md-title-s mb-3 block text-(--md-on-surface)">
        {label}
      </label>
      <div className="flex items-center justify-center gap-3">
        <button type="button" aria-label="Diminuir quantidade" disabled={value <= min} onClick={() => set(value - 1)} className={STEP_BTN}>
          <Ripple />
          <Minus className="relative size-6" aria-hidden="true" />
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
            "tabular h-14 w-28 rounded-t-[4px] bg-(--md-surface-container-highest) text-center text-[32px] leading-10 font-bold text-(--md-on-surface) caret-(--md-primary) outline-none",
            "border-b-2 focus-visible:border-(--md-primary)",
            message ? "border-(--md-error)" : "border-(--md-on-surface-variant)",
          )}
        />
        <button type="button" aria-label="Aumentar quantidade" disabled={value >= max} onClick={() => set(value + 1)} className={STEP_BTN}>
          <Ripple />
          <Plus className="relative size-6" aria-hidden="true" />
        </button>
      </div>
      {presets && presets.length > 0 && (
        <div role="group" aria-label="Atalhos de quantidade" className="mt-3 flex flex-wrap justify-center gap-2">
          {presets.map((p) => (
            <MobileChip key={p} selected={value === p && text === null} onClick={() => set(p)}>
              {p}
            </MobileChip>
          ))}
        </div>
      )}
      {message && (
        <p id={msgId} role="alert" className="md-body-s mt-2 text-center text-(--md-error)">
          {message}
        </p>
      )}
    </div>
  );
}
