// components/mobile/ui/ios/MobileSwitch.tsx
"use client";

import { cn } from "@/lib/cn";

type Props = { checked: boolean; onChange: (checked: boolean) => void; label: string; disabled?: boolean };

/** iOS switch (`role="switch"`): 51×31 track (green when on); the thumb is a pill that stretches while pressed. */
export function MobileSwitch({ checked, onChange, label, disabled }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "group relative inline-flex h-[31px] w-[51px] shrink-0 items-center rounded-full [--thumb:27px] transition-colors duration-300 before:absolute before:-inset-x-1 before:-inset-y-[7px] before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:[--thumb:34px] disabled:opacity-50",
        checked ? "bg-ok" : "bg-(--ios-fill-strong)",
      )}
    >
      <span
        aria-hidden="true"
        style={{ left: checked ? "calc(100% - 2px - var(--thumb))" : "2px", width: "var(--thumb)" }}
        className="ios-thumb absolute top-[2px] h-[27px] rounded-full transition-[left,width] duration-300 ease-(--ios-spring)"
      />
    </button>
  );
}
