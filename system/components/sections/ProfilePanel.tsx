// components/sections/ProfilePanel.tsx
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { IconTile, type Tone } from "@/components/ui/KpiCard";

type ProfilePanelProps = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: Tone;
  /** Button(s) at the right of the header. */
  action?: ReactNode;
  children: ReactNode;
};

/** Frame shared by every section panel of "Meu Perfil": icon + title + description, then the content. */
export function ProfilePanel({ id, title, description, icon, tone, action, children }: ProfilePanelProps) {
  const headingId = `perfil-${id}-title`;
  return (
    <section id={`perfil-${id}`} aria-labelledby={headingId} className="card @container min-w-0 p-5 @2xl:p-7">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5">
        <div className="flex min-w-0 flex-1 basis-64 items-center gap-4">
          <IconTile icon={icon} tone={tone} className="size-12" />
          <div className="min-w-0">
            <h2 id={headingId} className="text-[20px] leading-tight font-extrabold tracking-tight text-ink">
              {title}
            </h2>
            <p className="mt-0.5 text-[14.5px] text-ink-soft">{description}</p>
          </div>
        </div>
        {action && <div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div>}
      </header>
      {children}
    </section>
  );
}
