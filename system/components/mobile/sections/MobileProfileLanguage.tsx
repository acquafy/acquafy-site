// components/mobile/sections/MobileProfileLanguage.tsx
"use client";

import { Check, Info } from "lucide-react";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { languageOptions } from "@/config/profile-page";

/** Idioma: pick a row, it is saved right away (check mark on the current one). */
export function MobileProfileLanguage() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();

  return (
    <>
      <MobileListGroup aria-label="Idioma do aplicativo">
        {languageOptions.map((l) => (
          <MobileListRow
            key={l.value}
            title={l.label}
            chevron={false}
            onClick={() => {
              if (l.value === profile.language) return;
              updateProfile({ language: l.value });
              toast({ title: "Idioma salvo", description: `Preferência definida para ${l.label}.` });
            }}
            trailing={l.value === profile.language ? <Check className="size-5 text-brand" strokeWidth={2.5} aria-label="Selecionado" /> : undefined}
          />
        ))}
      </MobileListGroup>
      <p className="flex items-start gap-2.5 rounded-[12px] bg-brand-soft/70 p-3.5 text-[13.5px] text-ink-soft">
        <Info className="mt-0.5 size-[18px] shrink-0 text-brand" aria-hidden="true" />
        Por enquanto, apenas o português está traduzido. Sua escolha fica registrada e será aplicada assim que as demais traduções estiverem disponíveis.
      </p>
    </>
  );
}
