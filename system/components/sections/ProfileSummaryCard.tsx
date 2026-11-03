// components/sections/ProfileSummaryCard.tsx
"use client";

import { CircleDollarSign, Mail, MapPin, PencilLine, Phone, Trash2, Wallet, type LucideIcon } from "lucide-react";
import { PurifierIcon } from "@/components/ui/PurifierIcon";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { IconTile, type Tone } from "@/components/ui/KpiCard";
import { Money } from "@/components/ui/Money";
import { formatDate } from "@/lib/format";
import { ProfileAvatarPicker } from "./ProfileAvatarPicker";

export type ProfileStats = {
  units: number;
  unitsInOperation: number;
  /** Last payout already received, or the next one while nothing was received yet. */
  payout: { amount: number; date: string; received: boolean } | null;
  receivedTotal: number;
};

function Stat({ icon, tone, label, value, caption }: { icon: LucideIcon; tone: Tone; label: string; value: React.ReactNode; caption?: string }) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center @2xl:flex-row @2xl:gap-3 @2xl:px-4 @2xl:py-2.5 @2xl:text-left">
      <IconTile icon={icon} tone={tone} className="hidden size-11 @2xl:grid" />
      <div className="min-w-0 leading-tight">
        <p className="tabular text-[16px] font-extrabold whitespace-nowrap text-ink">{value}</p>
        <p className="text-[12.5px] text-ink-soft">{label}</p>
        {caption && <p className="text-[12px] text-ink-mute">{caption}</p>}
      </div>
    </div>
  );
}

/** Left-hand profile card: photo, identity, contact lines, edit shortcut and headline indicators. */
export function ProfileSummaryCard({ stats, onEdit }: { stats: ProfileStats; onEdit: () => void }) {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const place = [profile.city, profile.state].filter(Boolean).join(", ");
  const location = [place, profile.country].filter(Boolean).join(" - ");

  const removePhoto = () => {
    updateProfile({ avatar: null });
    toast({ title: "Foto removida", description: "Agora mostramos as suas iniciais.", tone: "info" });
  };

  const contacts = [
    { icon: Mail, text: profile.email, label: "E-mail" },
    { icon: Phone, text: profile.phone, label: "Telefone" },
    { icon: MapPin, text: location, label: "Localização" },
  ].filter((c) => c.text);

  return (
    <section aria-label="Resumo do perfil" className="card @container min-w-0 p-5 @2xl:p-7">
      <div className="grid gap-5 @2xl:grid-cols-[minmax(0,1fr)_auto] @2xl:items-center @2xl:gap-8">
        <div className="flex min-w-0 items-start gap-4 @2xl:gap-6">
          <ProfileAvatarPicker className="size-24 @2xl:size-32" />
          <div className="min-w-0 flex-1">
            <h2 className="text-[20px] leading-tight font-extrabold tracking-tight break-words text-ink @2xl:text-[24px]">{profile.name}</h2>
            <p className="text-[14.5px] text-ink-soft">{profile.role} Acquafy</p>
            <ul className="mt-3 grid gap-1.5">
              {contacts.map(({ icon: Icon, text, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                  <Icon className="mt-0.5 size-[17px] shrink-0 text-brand" strokeWidth={1.75} aria-hidden="true" />
                  <span className="min-w-0 break-words">
                    <span className="sr-only">{label}: </span>
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 @2xl:flex-col @2xl:items-stretch">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <PencilLine className="size-4" aria-hidden="true" />
            Editar
          </Button>
          {profile.avatar && (
            <Button variant="ghost" size="sm" onClick={removePhoto}>
              <Trash2 className="size-4" aria-hidden="true" />
              Remover foto
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl bg-canvas/70 py-3.5 @2xl:grid-cols-3 @2xl:py-2">
        <Stat icon={PurifierIcon} tone="blue" label="Purificadores" value={stats.units} caption={`${stats.unitsInOperation} em operação`} />
        {stats.payout ? (
          <Stat
            icon={CircleDollarSign}
            tone="green"
            label={stats.payout.received ? "Último repasse" : "Próximo repasse"}
            value={<Money value={stats.payout.amount} />}
            caption={formatDate(stats.payout.date)}
          />
        ) : (
          <Stat icon={CircleDollarSign} tone="green" label="Último repasse" value="—" />
        )}
        <Stat icon={Wallet} tone="violet" label="Total recebido" value={<Money value={stats.receivedTotal} />} />
      </div>
    </section>
  );
}
