// components/sections/ProfileWorkspace.tsx
"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogoutDialog } from "@/components/layout/LogoutDialog";
import { DEFAULT_SECTION, isSectionId, type ProfileSectionId } from "@/config/profile-page";
import { ProfileBankPanel } from "./ProfileBankPanel";
import { ProfileHelpPanel } from "./ProfileHelpPanel";
import { ProfileLanguagePanel } from "./ProfileLanguagePanel";
import { ProfileNav } from "./ProfileNav";
import { ProfileNotificationsPanel } from "./ProfileNotificationsPanel";
import { ProfilePersonalPanel } from "./ProfilePersonalPanel";
import { ProfileSecurityPanel } from "./ProfileSecurityPanel";
import { ProfileSummaryCard, type ProfileStats } from "./ProfileSummaryCard";
import { ProfileTermsPanel } from "./ProfileTermsPanel";

/** Wide layout: the column scrolls by itself (the small padding/negative margin keeps card shadows from being clipped). */
const COLUMN_SCROLL = "@[900px]:-m-1 @[900px]:min-h-0 @[900px]:overflow-y-auto @[900px]:p-1 [scrollbar-color:var(--scroll-thumb)_transparent] [scrollbar-width:thin]";

/** Pushes `?secao=` without reloading; Next keeps `useSearchParams` in sync with the History API. */
function pushSection(id: ProfileSectionId) {
  window.history.pushState(null, "", `/perfil?secao=${id}`);
}

export function ProfileWorkspace({ stats, termsPdf }: { stats: ProfileStats; termsPdf: boolean }) {
  const params = useSearchParams();
  const raw = params.get("secao");
  const active: ProfileSectionId = isSectionId(raw) ? raw : DEFAULT_SECTION;
  const [logoutOpen, setLogoutOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  /** When the layout is stacked the panel sits below the menu: bring it into view. */
  const revealPanel = () => {
    window.setTimeout(() => {
      const el = panel.current;
      if (el && el.getBoundingClientRect().top > window.innerHeight * 0.55) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  };

  const select = (id: ProfileSectionId) => {
    if (id !== active) pushSection(id);
    panel.current?.scrollTo({ top: 0 });
    revealPanel();
  };

  const edit = () => {
    if (active !== "pessoais") pushSection("pessoais");
    revealPanel();
    // The panel may still be mounting (the URL changes first): retry briefly until the field exists.
    let tries = 0;
    const focusName = () => {
      const input = document.querySelector<HTMLInputElement>('#perfil-pessoais input[name="name"]');
      if (input) input.focus({ preventScroll: true });
      else if (tries++ < 10) window.setTimeout(focusName, 50);
    };
    window.setTimeout(focusName, 50);
  };

  return (
    // Two columns: each one scrolls on its own inside a box that fills the window (so the page itself does not scroll).
    <div className="grid items-start gap-4 @[900px]:h-[max(28rem,calc(100dvh-13.5rem))] @[900px]:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] @[900px]:items-stretch">
      <div className={`flex min-w-0 flex-col gap-4 ${COLUMN_SCROLL}`}>
        <ProfileSummaryCard stats={stats} onEdit={edit} />
        <ProfileNav active={active} onSelect={select} onLogout={() => setLogoutOpen(true)} />
      </div>
      <div ref={panel} className={`min-w-0 scroll-mt-2 ${COLUMN_SCROLL}`}>
        {active === "pessoais" && <ProfilePersonalPanel />}
        {active === "bancarios" && <ProfileBankPanel />}
        {active === "notificacoes" && <ProfileNotificationsPanel />}
        {active === "idioma" && <ProfileLanguagePanel />}
        {active === "seguranca" && <ProfileSecurityPanel />}
        {active === "ajuda" && <ProfileHelpPanel />}
        {active === "termos" && <ProfileTermsPanel pdfAvailable={termsPdf} />}
      </div>
      <LogoutDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} />
    </div>
  );
}

/** Shown while the query string is read (static prerender of the page). */
export function ProfileWorkspaceSkeleton() {
  return (
    <div aria-hidden="true" className="grid items-start gap-4 @[900px]:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <div className="flex flex-col gap-4">
        <div className="card h-72 animate-pulse" />
        <div className="card h-96 animate-pulse" />
      </div>
      <div className="card h-[32rem] animate-pulse" />
    </div>
  );
}
