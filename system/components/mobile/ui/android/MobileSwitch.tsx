// components/mobile/ui/android/MobileSwitch.tsx
"use client";

import { Check } from "lucide-react";

type Props = { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean };

/** Material 3 switch (`role="switch"`): 52×32 track, thumb 16px off → 24px on (with a check mark), 28px while pressed. Drawn by `.md-switch` in app/m/android.css. */
export function MobileSwitch({ checked, onChange, label, disabled }: Props) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className="md-switch">
      <span aria-hidden="true" className="md-switch-thumb">
        <Check className="size-4" strokeWidth={3} />
      </span>
    </button>
  );
}
