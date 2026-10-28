// components/sections/ProfileHelpPanel.tsx
import Link from "next/link";
import { ChevronRight, CircleHelp } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { IconTile } from "@/components/ui/KpiCard";
import { faqItems, helpLinks } from "@/config/profile-page";
import { ProfilePanel } from "./ProfilePanel";

export function ProfileHelpPanel() {
  return (
    <ProfilePanel id="ajuda" title="Central de Ajuda" description="Dúvidas frequentes e canais de suporte." icon={CircleHelp} tone="blue">
      <ul className="grid gap-3 @xl:grid-cols-3">
        {helpLinks.map(({ href, title, description, icon, tone }) => (
          <li key={href} className="min-w-0">
            <Link
              href={href}
              className="group flex h-full flex-col gap-3 rounded-xl border border-line p-4 transition hover:border-brand/40 hover:bg-brand-soft/40 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <IconTile icon={icon} tone={tone} className="size-11" />
              <span className="flex-1">
                <span className="block text-[15.5px] font-bold text-ink">{title}</span>
                <span className="mt-0.5 block text-[13.5px] text-ink-soft">{description}</span>
              </span>
              <span className="flex items-center gap-1 text-[13.5px] font-semibold text-brand">
                Acessar
                <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-7 mb-1 text-[17px] font-extrabold tracking-tight text-ink">Perguntas frequentes</h3>
      <Accordion items={faqItems} />
    </ProfilePanel>
  );
}
