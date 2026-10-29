// components/sections/ProfileNav.tsx
"use client";

import Link from "next/link";
import { ChevronRight, LogOut } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { IconTile } from "@/components/ui/KpiCard";
import { cn } from "@/lib/cn";
import { languageOptions, LOGOUT_ITEM, profileSections, type ProfileSectionId } from "@/config/profile-page";

const ITEM = "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

type ProfileNavProps = {
  active: ProfileSectionId;
  onSelect: (id: ProfileSectionId) => void;
  onLogout: () => void;
};

/** Section menu of "Meu Perfil". Items are real links (`?secao=`) so each section can be opened or shared directly. */
export function ProfileNav({ active, onSelect, onLogout }: ProfileNavProps) {
  const { profile } = useProfile();
  const language = languageOptions.find((l) => l.value === profile.language)?.label;

  return (
    <nav aria-label="Seções do perfil" className="card @container min-w-0 p-3">
      <ul className="grid gap-1.5 @2xl:grid-cols-2 @4xl:grid-cols-4">
        {profileSections.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id} className="min-w-0">
              <Link
                href={`/perfil?secao=${s.id}`}
                scroll={false}
                aria-current={on ? "page" : undefined}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  onSelect(s.id);
                }}
                className={cn(ITEM, on ? "border-brand/30 bg-brand-soft" : "border-transparent hover:bg-brand-soft/60")}
              >
                <IconTile icon={s.icon} tone={s.tone} className="size-10" />
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[14.5px] font-bold text-ink">{s.label}</span>
                  <span className="block text-[13px] text-ink-soft">{s.id === "idioma" && language ? language : s.description}</span>
                </span>
                <ChevronRight className={cn("size-[18px] shrink-0 text-brand transition-transform", on && "translate-x-0.5")} aria-hidden="true" />
              </Link>
            </li>
          );
        })}
        <li className="min-w-0">
          <button type="button" onClick={onLogout} className={cn(ITEM, "border-transparent hover:bg-danger-soft/60")}>
            <IconTile icon={LogOut} tone="pink" className="size-10" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block text-[14.5px] font-bold text-danger">{LOGOUT_ITEM.label}</span>
              <span className="block text-[13px] text-ink-soft">{LOGOUT_ITEM.description}</span>
            </span>
            <ChevronRight className="size-[18px] shrink-0 text-danger" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
