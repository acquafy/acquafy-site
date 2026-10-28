// components/mobile/sections/MobileProfileCard.tsx
"use client";

import { useRef } from "react";
import { Camera, ChartNoAxesColumn, CircleDollarSign, Mail, MapPin, PencilLine, Phone, Trash2 } from "lucide-react";
import { MobileButton, MobileButtonLink } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Money } from "@/components/ui/Money";
import { AVATAR_MAX_BYTES, toAvatarDataUrl } from "@/lib/avatar";
import { formatDate } from "@/lib/format";

export type MobileProfileStats = {
  units: number;
  /** Last payout already received, or the next one while nothing was received yet. */
  payout: { amount: number; date: string; received: boolean } | null;
};

/** Profile card: photo (with the camera button), identity, contact lines, "Editar" and two headline figures. */
export function MobileProfileCard({ stats }: { stats: MobileProfileStats }) {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const input = useRef<HTMLInputElement>(null);

  const place = [profile.city, profile.state].filter(Boolean).join(", ");
  const location = [place, profile.country].filter(Boolean).join(" - ");
  const contacts = [
    { icon: Mail, text: profile.email, label: "E-mail" },
    { icon: Phone, text: profile.phone, label: "Telefone" },
    { icon: MapPin, text: location, label: "Localização" },
  ].filter((c) => c.text);

  const onFile = async (file: File | undefined) => {
    if (input.current) input.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({ title: "Arquivo não suportado", description: "Escolha uma imagem (JPG, PNG ou WebP).", tone: "error" });
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      toast({ title: "Imagem muito grande", description: "O tamanho máximo da foto é 5 MB.", tone: "error" });
      return;
    }
    try {
      updateProfile({ avatar: await toAvatarDataUrl(file) });
      toast({ title: "Foto atualizada", description: "Sua nova foto já aparece no topo do app." });
    } catch {
      toast({ title: "Não foi possível usar a imagem", description: "Tente outro arquivo.", tone: "error" });
    }
  };

  return (
    <MobileCard as="section" aria-label="Resumo do perfil" padding="none" className="overflow-hidden">
      <div className="flex items-start gap-3.5 p-4">
        <div className="relative shrink-0">
          <Avatar name={profile.name} src={profile.avatar} className="size-[84px] text-[26px] font-extrabold" />
          <input ref={input} type="file" accept="image/*" hidden aria-label="Selecionar foto do perfil" onChange={(e) => void onFile(e.target.files?.[0])} />
          <button
            type="button"
            aria-label="Alterar foto do perfil"
            onClick={() => input.current?.click()}
            className="absolute -right-1 -bottom-1 grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <span className="grid size-8 place-items-center rounded-full bg-brand text-white ring-[3px] ring-card">
              <Camera className="size-4" aria-hidden="true" />
            </span>
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-[20px] leading-tight font-extrabold tracking-tight break-words text-ink">{profile.name}</h2>
          <p className="text-[14px] text-ink-soft">{profile.role} Acquafy</p>
          <ul className="mt-2 grid gap-1">
            {contacts.map(({ icon: Icon, text, label }) => (
              <li key={label} className="flex items-start gap-2 text-[13.5px] leading-snug text-ink-soft">
                <Icon className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
                <span className="min-w-0 break-words">
                  <span className="sr-only">{label}: </span>
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 pb-3">
        <MobileButtonLink href={{ route: "profile", sub: "pessoais" }} variant="secondary" className="flex-1">
          <PencilLine className="size-[18px]" aria-hidden="true" />
          Editar perfil
        </MobileButtonLink>
        {profile.avatar && (
          <MobileButton
            variant="ghost"
            onClick={() => {
              updateProfile({ avatar: null });
              toast({ title: "Foto removida", description: "Agora mostramos as suas iniciais.", tone: "info" });
            }}
          >
            <Trash2 className="size-[18px]" aria-hidden="true" />
            Remover foto
          </MobileButton>
        )}
      </div>

      <dl className="grid grid-cols-2 divide-x divide-line border-t border-line bg-canvas/50">
        <div className="flex items-center gap-2.5 px-4 py-3">
          <ChartNoAxesColumn className="size-6 shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
          <div className="min-w-0 leading-tight">
            <dd className="tabular text-[17px] font-extrabold text-ink">{stats.units}</dd>
            <dt className="text-[12.5px] text-ink-soft">Purificadores</dt>
          </div>
        </div>
        <div className="flex items-center gap-2.5 px-4 py-3">
          <CircleDollarSign className="size-6 shrink-0 text-violet" strokeWidth={1.75} aria-hidden="true" />
          <div className="min-w-0 leading-tight">
            <dd className="tabular text-[17px] font-extrabold whitespace-nowrap text-ink">{stats.payout ? <Money value={stats.payout.amount} /> : "—"}</dd>
            <dt className="text-[12.5px] text-ink-soft">{stats.payout ? (stats.payout.received ? "Último repasse" : `Próximo · ${formatDate(stats.payout.date)}`) : "Repasses"}</dt>
          </div>
        </div>
      </dl>
    </MobileCard>
  );
}
