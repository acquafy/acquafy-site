// components/layout/UserMenu.tsx
"use client";

import Link from "next/link";
import { useProfile } from "@/components/providers/ProfileProvider";
import { Avatar } from "@/components/ui/Avatar";

/** Header user chip: one click opens "Meu Perfil" (the profile is not in the side menu). */
export function UserMenu() {
  const { profile } = useProfile();

  return (
    <Link
      href="/perfil"
      aria-label={`Abrir meu perfil, ${profile.name}`}
      title="Meu perfil"
      className="flex items-center gap-3 rounded-lg p-1 pr-3 text-left hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <Avatar name={profile.name} src={profile.avatar} className="size-10 text-sm" />
      <span className="hidden leading-tight md:block">
        <span className="block max-w-36 truncate text-[15px] font-bold text-ink">{profile.name}</span>
        <span className="block text-[13px] text-ink-soft">{profile.role}</span>
      </span>
    </Link>
  );
}
