// components/sections/ProfileLanguagePanel.tsx
"use client";

import { useState } from "react";
import { Globe, Info, Save } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { Profile } from "@/config/profile";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { languageOptions } from "@/config/profile-page";
import { ProfilePanel } from "./ProfilePanel";

export function ProfileLanguagePanel() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const [picked, setPicked] = useState<Profile["language"] | null>(null);
  const value = picked ?? profile.language;
  const dirty = value !== profile.language;

  const save = (ev: React.FormEvent) => {
    ev.preventDefault();
    updateProfile({ language: value });
    setPicked(null);
    const label = languageOptions.find((l) => l.value === value)?.label ?? value;
    toast({ title: "Idioma salvo", description: `Preferência definida para ${label}.` });
  };

  return (
    <ProfilePanel id="idioma" title="Idioma" description="Idioma de exibição do portal." icon={Globe} tone="orange">
      <form onSubmit={save} className="grid max-w-xl gap-5" aria-label="Preferência de idioma">
        <Select label="Idioma do portal" value={value} onChange={(e) => setPicked(e.target.value as Profile["language"])} options={languageOptions} />
        <p className="flex items-start gap-2.5 rounded-lg bg-brand-soft/70 p-3.5 text-[13.5px] text-ink-soft">
          <Info className="mt-0.5 size-[18px] shrink-0 text-brand" aria-hidden="true" />
          Por enquanto, apenas o português está traduzido. Sua escolha fica registrada e será aplicada assim que as demais traduções estiverem disponíveis.
        </p>
        <div className="flex flex-wrap justify-end gap-3 border-t border-line pt-5">
          <Button variant="outline" onClick={() => setPicked(null)} disabled={!dirty}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!dirty}>
            <Save className="size-4" aria-hidden="true" />
            Salvar idioma
          </Button>
        </div>
      </form>
    </ProfilePanel>
  );
}
