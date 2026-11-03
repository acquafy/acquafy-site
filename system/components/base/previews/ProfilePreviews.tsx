// components/base/previews/ProfilePreviews.tsx
import { existsSync } from "node:fs";
import path from "node:path";
import { UserRound } from "lucide-react";
import { MobileProfileBank } from "@/components/mobile/sections/MobileProfileBank";
import { MobileProfileCard, type MobileProfileStats } from "@/components/mobile/sections/MobileProfileCard";
import { MobileProfileHelp } from "@/components/mobile/sections/MobileProfileHelp";
import { MobileProfileLanguage } from "@/components/mobile/sections/MobileProfileLanguage";
import { MobileProfileMenu } from "@/components/mobile/sections/MobileProfileMenu";
import { MobileProfileNotifications } from "@/components/mobile/sections/MobileProfileNotifications";
import { MobileProfilePersonal } from "@/components/mobile/sections/MobileProfilePersonal";
import { MobileProfileSecurity } from "@/components/mobile/sections/MobileProfileSecurity";
import { MobileProfileTerms } from "@/components/mobile/sections/MobileProfileTerms";
import { ProfileAvatarPicker } from "@/components/sections/ProfileAvatarPicker";
import { ProfileBankPanel } from "@/components/sections/ProfileBankPanel";
import { ProfileHelpPanel } from "@/components/sections/ProfileHelpPanel";
import { ProfileLanguagePanel } from "@/components/sections/ProfileLanguagePanel";
import { ProfileNotificationsPanel } from "@/components/sections/ProfileNotificationsPanel";
import { ProfilePanel } from "@/components/sections/ProfilePanel";
import { ProfilePersonalPanel } from "@/components/sections/ProfilePersonalPanel";
import { ProfileSecurityPanel } from "@/components/sections/ProfileSecurityPanel";
import type { ProfileStats } from "@/components/sections/ProfileSummaryCard";
import { ProfileTermsPanel } from "@/components/sections/ProfileTermsPanel";
import { TERMS_PDF } from "@/config/profile-page";
import { getPortalSummary } from "@/lib/portal/schedule";
import {
  MobileProfilePasswordSheetDemo,
  MobileProfileSectionDemo,
  MobileProfileTwoFactorSheetDemo,
  ProfileNavDemo,
  ProfilePasswordModalDemo,
  ProfileSummaryCardDemo,
  ProfileTwoFactorModalDemo,
} from "./ProfileDemos";
import type { PreviewMap } from "./types";

const termsPdf = () => existsSync(path.join(process.cwd(), "public", TERMS_PDF));

/** Same figures the profile pages build from the summary: last payout received (or the next one) and the fleet. */
function payout(): { amount: number; date: string; received: boolean } | null {
  const s = getPortalSummary();
  const last = s.installments.filter((i) => i.status === "received").at(-1);
  if (last) return { amount: last.amount, date: last.paymentDate, received: true };
  return s.next ? { amount: s.next.amount, date: s.next.paymentDate, received: false } : null;
}

function stats(): ProfileStats {
  const s = getPortalSummary();
  return { units: s.units, unitsInOperation: s.unitsInOperation, payout: payout(), receivedTotal: s.receivedTotal };
}

function mobileStats(): MobileProfileStats {
  return { units: getPortalSummary().units, payout: payout() };
}

export const profilePreviews: PreviewMap = {
  ProfileAvatarPicker: () => ({ node: <ProfileAvatarPicker className="size-32" /> }),
  ProfileBankPanel: () => ({ node: <ProfileBankPanel /> }),
  ProfileHelpPanel: () => ({ node: <ProfileHelpPanel /> }),
  ProfileLanguagePanel: () => ({ node: <ProfileLanguagePanel /> }),
  ProfileNav: () => ({ node: <ProfileNavDemo /> }),
  ProfileNotificationsPanel: () => ({ node: <ProfileNotificationsPanel /> }),
  ProfilePanel: () => ({
    node: (
      <ProfilePanel id="exemplo" title="Título do painel" description="Moldura que todas as seções do perfil compartilham." icon={UserRound} tone="blue">
        <p className="text-[14.5px] text-ink-soft">O conteúdo de cada seção entra aqui.</p>
      </ProfilePanel>
    ),
    note: "Moldura compartilhada pelos painéis do perfil; mostrada com um conteúdo de exemplo.",
  }),
  ProfilePasswordModal: () => ({ node: <ProfilePasswordModalDemo /> }),
  ProfilePersonalPanel: () => ({ node: <ProfilePersonalPanel /> }),
  ProfileSecurityPanel: () => ({ node: <ProfileSecurityPanel /> }),
  ProfileSummaryCard: () => ({ node: <ProfileSummaryCardDemo stats={stats()} /> }),
  ProfileTermsPanel: () => ({ node: <ProfileTermsPanel pdfAvailable={termsPdf()} /> }),
  ProfileTwoFactorModal: () => ({ node: <ProfileTwoFactorModalDemo /> }),
  ProfileWorkspace: () => ({
    opensFrom: "/perfil",
    reason: "A navegação entre seções grava ?secao= na URL, então ele não roda dentro da galeria; cada parte (resumo, menu e painéis) está nos blocos desta página.",
  }),
  MobileProfileBank: () => ({ node: <MobileProfileBank />, tall: true }),
  MobileProfileCard: () => ({ node: <MobileProfileCard stats={mobileStats()} /> }),
  MobileProfileHelp: () => ({ node: <MobileProfileHelp /> }),
  MobileProfileLanguage: () => ({ node: <MobileProfileLanguage /> }),
  MobileProfileMenu: () => ({ node: <MobileProfileMenu />, tall: true }),
  MobileProfileNotifications: () => ({ node: <MobileProfileNotifications /> }),
  MobileProfilePasswordSheet: () => ({ node: <MobileProfilePasswordSheetDemo />, tall: true }),
  MobileProfilePersonal: () => ({ node: <MobileProfilePersonal /> }),
  MobileProfileSection: () => ({ node: <MobileProfileSectionDemo termsPdf={termsPdf()} />, tall: true, note: "Escolhe o organismo da seção pelo id; use os chips para trocar." }),
  MobileProfileSecurity: () => ({ node: <MobileProfileSecurity />, tall: true }),
  MobileProfileTerms: () => ({ node: <MobileProfileTerms termsPdf={termsPdf()} /> }),
  MobileProfileTwoFactorSheet: () => ({ node: <MobileProfileTwoFactorSheetDemo />, tall: true }),
};
