// components/mobile/ui/android/MobileEmptyState.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** Centered "nothing here" block: tonal container (20px), icon in a 64px circle, Title Large + Body Medium and an optional action. */
export function MobileEmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center gap-2 rounded-[20px] bg-(--md-surface-container) px-6 py-10 text-center">
      <span aria-hidden="true" className="mb-2 grid size-16 place-items-center rounded-full bg-(--md-primary-container) text-(--md-on-primary-container)">
        <Icon className="size-8" strokeWidth={1.75} />
      </span>
      <p className="md-title-l md-title-l-em text-(--md-on-surface)">{title}</p>
      {description && <p className="md-body-m max-w-[18rem] text-(--md-on-surface-variant)">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
