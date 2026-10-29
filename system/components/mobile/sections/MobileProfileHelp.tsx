// components/mobile/sections/MobileProfileHelp.tsx
"use client";

import { Mail, MessageCircle } from "lucide-react";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileDisclosureGroup } from "@/components/mobile/ui/MobileDisclosure";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { HELP_CHANNELS } from "@/config/home-page";
import { faqItems, helpLinks } from "@/config/profile-page";
import { mobileHref } from "@/lib/mobile/platform";

/** Central de Ajuda: shortcuts, contact channels and the frequent questions. */
export function MobileProfileHelp() {
  const platform = usePlatform();
  return (
    <>
      <MobileListGroup header="Fale com a gente" aria-label="Atalhos de ajuda">
        {helpLinks.map((l) => (
          <MobileListRow key={l.href} icon={l.icon} tone={l.tone} title={l.title} subtitle={l.description} href={mobileHref(platform, l.href)} />
        ))}
        <MobileListRow icon={MessageCircle} tone="green" title={HELP_CHANNELS.whatsapp.label} subtitle="Atendimento rápido" href={HELP_CHANNELS.whatsapp.href} external />
        <MobileListRow icon={Mail} tone="violet" title={HELP_CHANNELS.email.label} subtitle="suporte@acquafy.com" href={HELP_CHANNELS.email.href} external />
      </MobileListGroup>
      <section aria-label="Perguntas frequentes" className="grid gap-2">
        <h2 className="px-1 text-[18px] font-bold tracking-tight text-ink">Perguntas frequentes</h2>
        <MobileDisclosureGroup label="Perguntas frequentes" items={faqItems.map((f) => ({ id: f.id, title: f.question, content: f.answer }))} />
      </section>
    </>
  );
}
