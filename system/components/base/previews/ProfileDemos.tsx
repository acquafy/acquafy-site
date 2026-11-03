// components/base/previews/ProfileDemos.tsx
"use client";

import { useState } from "react";
import { MobileProfilePasswordSheet } from "@/components/mobile/sections/MobileProfilePasswordSheet";
import { MobileProfileSection } from "@/components/mobile/sections/MobileProfileSection";
import { MobileProfileTwoFactorSheet } from "@/components/mobile/sections/MobileProfileTwoFactorSheet";
import { MobileChip, MobileChipRow } from "@/components/mobile/ui/MobileChip";
import { useToast } from "@/components/providers/ToastProvider";
import { ProfileNav } from "@/components/sections/ProfileNav";
import { ProfilePasswordModal } from "@/components/sections/ProfilePasswordModal";
import { ProfileSummaryCard, type ProfileStats } from "@/components/sections/ProfileSummaryCard";
import { ProfileTwoFactorModal } from "@/components/sections/ProfileTwoFactorModal";
import { DEFAULT_SECTION, profileSections, type ProfileSectionId } from "@/config/profile-page";
import { OpenDemo } from "./OpenDemo";

export function ProfileNavDemo() {
  const toast = useToast();
  const [active, setActive] = useState<ProfileSectionId>(DEFAULT_SECTION);
  return <ProfileNav active={active} onSelect={setActive} onLogout={() => toast({ tone: "info", title: "Sair da conta", description: "Abre a confirmação de saída (veja LogoutDialog)." })} />;
}

export function ProfileSummaryCardDemo({ stats }: { stats: ProfileStats }) {
  const toast = useToast();
  return (
    <div className="max-w-sm">
      <ProfileSummaryCard stats={stats} onEdit={() => toast({ tone: "info", title: "Editar perfil", description: "Leva ao painel de dados pessoais." })} />
    </div>
  );
}

export function ProfilePasswordModalDemo() {
  const toast = useToast();
  return <OpenDemo>{(open, setOpen) => <ProfilePasswordModal open={open} onClose={() => setOpen(false)} onChanged={() => toast({ title: "Senha alterada" })} />}</OpenDemo>;
}

export function ProfileTwoFactorModalDemo() {
  return <OpenDemo>{(open, setOpen) => <ProfileTwoFactorModal open={open} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileProfilePasswordSheetDemo() {
  const toast = useToast();
  return <OpenDemo app>{(open, setOpen) => <MobileProfilePasswordSheet open={open} onClose={() => setOpen(false)} onChanged={() => toast({ title: "Senha alterada" })} />}</OpenDemo>;
}

export function MobileProfileTwoFactorSheetDemo() {
  return <OpenDemo app>{(open, setOpen) => <MobileProfileTwoFactorSheet open={open} onClose={() => setOpen(false)} />}</OpenDemo>;
}

export function MobileProfileSectionDemo({ termsPdf }: { termsPdf: boolean }) {
  const [id, setId] = useState<ProfileSectionId>("pessoais");
  return (
    <div className="grid gap-3">
      <MobileChipRow label="Seção do perfil">
        {profileSections.map((s) => (
          <MobileChip key={s.id} selected={id === s.id} onClick={() => setId(s.id)}>
            {s.label}
          </MobileChip>
        ))}
      </MobileChipRow>
      <MobileProfileSection key={id} id={id} termsPdf={termsPdf} />
    </div>
  );
}
