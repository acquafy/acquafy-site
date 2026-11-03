// components/mobile/ui/ios/MobileEmptyState.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** "Content unavailable" block: large secondary symbol, title and description, optional action. */
export function MobileEmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="ios-sq grid place-items-center gap-1.5 rounded-[24px] bg-card px-5 py-10 text-center">
      <Icon aria-hidden="true" className="mb-1 size-12 text-ink-mute" strokeWidth={1.5} />
      <p className="text-[20px] leading-[25px] font-semibold text-ink">{title}</p>
      {description && <p className="max-w-[18rem] text-[15px] leading-5 text-ink-soft">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
