// components/mobile/sections/MobileHomeGreeting.tsx
"use client";

import { useProfile } from "@/components/providers/ProfileProvider";

/** "Olá, Carlos": the first name comes from the (editable) profile; used as the large title of Início. */
export function MobileHomeGreeting() {
  const { profile } = useProfile();
  const first = profile.name.trim().split(/\s+/)[0] || "investidor";
  return (
    <>
      Olá, <span className="bg-gradient-to-r from-brand to-violet bg-clip-text text-transparent">{first}</span>
    </>
  );
}
