// components/ui/EmptyState.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center gap-2 px-4 py-10 text-center">
      <span aria-hidden="true" className="grid size-14 place-items-center rounded-xl bg-brand-soft text-brand">
        <Icon className="size-7" strokeWidth={1.75} />
      </span>
      <p className="text-[16px] font-bold text-ink">{title}</p>
      {description && <p className="max-w-sm text-[14px] text-ink-soft">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
