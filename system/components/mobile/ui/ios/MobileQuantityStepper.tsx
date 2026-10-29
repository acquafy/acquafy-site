// components/mobile/ui/ios/MobileQuantityStepper.tsx
"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
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
  "ios-press grid size-12 shrink-0 place-items-center rounded-full bg-(--ios-fill) text-brand active:bg-(--ios-fill-strong) disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Round − / + buttons around a typeable number (clamped on blur) and optional presets. */
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
      <label htmlFor={id} className="mb-2 block px-1 text-[13px] leading-[18px] text-ink-soft">
        {label}
      </label>
      <div className="flex items-center justify-center gap-3">
        <button type="button" aria-label="Diminuir quantidade" disabled={value <= min} onClick={() => set(value - 1)} className={STEP_BTN}>
          <Minus className="size-5" strokeWidth={2.25} aria-hidden="true" />
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
            "tabular h-12 w-28 rounded-full border bg-(--ios-fill) text-center text-[24px] font-bold text-ink focus-visible:border-brand focus-visible:bg-card focus-visible:outline-2 focus-visible:outline-brand/30",
            message ? "border-danger" : "border-transparent",
          )}
        />
        <button type="button" aria-label="Aumentar quantidade" disabled={value >= max} onClick={() => set(value + 1)} className={STEP_BTN}>
          <Plus className="size-5" strokeWidth={2.25} aria-hidden="true" />
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
        <p id={msgId} role="alert" className="mt-1.5 text-center text-[13px] font-medium text-danger">
          {message}
        </p>
      )}
    </div>
  );
}
