// components/live/Notice.tsx
import { CircleAlert, CircleCheck, Info, TriangleAlert, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type NoticeTone = "info" | "success" | "warn" | "danger";

const TONES: Record<NoticeTone, { box: string; icon: LucideIcon; iconClass: string }> = {
  info: { box: "bg-brand-soft", icon: Info, iconClass: "text-brand" },
  success: { box: "bg-ok-soft", icon: CircleCheck, iconClass: "text-ok" },
  warn: { box: "bg-warn-soft", icon: TriangleAlert, iconClass: "text-warn" },
  danger: { box: "bg-danger-soft", icon: CircleAlert, iconClass: "text-danger" },
};

/** Inline message on the page background: tinted block (no border), icon + text; errors are announced to screen readers. */
export function Notice({ tone = "info", title, children, className }: { tone?: NoticeTone; title?: string; children?: ReactNode; className?: string }) {
  const { box, icon: Icon, iconClass } = TONES[tone];
  return (
    <div role={tone === "danger" ? "alert" : "status"} className={cn("flex items-start gap-3 rounded-xl p-3.5 text-[14.5px] text-ink", box, className)}>
      <Icon className={cn("mt-0.5 size-5 shrink-0", iconClass)} strokeWidth={1.75} aria-hidden="true" />
      <div className="min-w-0 leading-snug [overflow-wrap:anywhere]">
        {title && <strong className="block font-bold">{title}</strong>}
        {children}
      </div>
    </div>
  );
}
