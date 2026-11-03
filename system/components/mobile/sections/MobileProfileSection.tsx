// components/mobile/sections/MobileProfileSection.tsx
"use client";

import type { ProfileSectionId } from "@/config/profile-page";
import { MobileProfileBank } from "./MobileProfileBank";
import { MobileProfileHelp } from "./MobileProfileHelp";
import { MobileProfileLanguage } from "./MobileProfileLanguage";
import { MobileProfileNotifications } from "./MobileProfileNotifications";
import { MobileProfilePersonal } from "./MobileProfilePersonal";
import { MobileProfileSecurity } from "./MobileProfileSecurity";
import { MobileProfileTerms } from "./MobileProfileTerms";

/** Body of a pushed profile screen (`perfil/<secao>`): picks the organism of that section. */
export function MobileProfileSection({ id, termsPdf }: { id: ProfileSectionId; termsPdf: boolean }) {
  switch (id) {
    case "pessoais":
      return <MobileProfilePersonal />;
    case "bancarios":
      return <MobileProfileBank />;
    case "notificacoes":
      return <MobileProfileNotifications />;
    case "idioma":
      return <MobileProfileLanguage />;
    case "seguranca":
      return <MobileProfileSecurity />;
    case "ajuda":
      return <MobileProfileHelp />;
    case "termos":
      return <MobileProfileTerms termsPdf={termsPdf} />;
  }
}
