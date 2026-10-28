// components/ui/SettingRow.tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconTile, type Tone } from "./KpiCard";
import type { LucideIcon } from "lucide-react";

type SettingRowProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: LucideIcon;
  tone?: Tone;
  /** Control on the right (switch, button, badge…). Wraps below the text in narrow containers. */
  children?: ReactNode;
  className?: string;
};

/** Settings line: title + description on the left, a control on the right. */
export function SettingRow({ title, description, icon, tone = "blue", children, className }: SettingRowProps) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4", className)}>
      <div className="flex min-w-0 flex-1 basis-56 items-center gap-3.5">
        {icon && <IconTile icon={icon} tone={tone} className="size-11" />}
        <div className="min-w-0">
          <p className="text-[15.5px] leading-snug font-bold text-ink">{title}</p>
          {description && <p className="mt-0.5 text-[14px] leading-snug text-ink-soft">{description}</p>}
        </div>
      </div>
      {children && <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>}
    </div>
  );
}
