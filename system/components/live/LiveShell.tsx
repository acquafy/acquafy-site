// components/live/LiveShell.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { SidebarNav } from "@/components/layout/SidebarNav";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { Modal } from "@/components/ui/Modal";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { PortalProviders } from "@/components/providers/PortalProviders";
import { SidebarProvider, useSidebar } from "@/components/providers/SidebarProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { liveHome, liveNavigation, type LiveKind } from "@/config/live-navigation";
import { cn } from "@/lib/cn";
import type { SidebarMode } from "@/lib/sidebar";

type ShellAccount = { id: string; name: string; suspended: boolean };

/**
 * The Acquafy Account shell: the portal's side menu + flat top bar, fed with the real signed-in user instead of
 * the demo profile. The content column is a `@container` that scrolls on its own, so page grids answer to its width.
 */
export function LiveShell({
  kind,
  email,
  roleLabel,
  accounts,
  accountId,
  switchAccount,
  sidebar,
  children,
}: {
  kind: LiveKind;
  email: string;
  roleLabel: string;
  accounts: ShellAccount[];
  accountId?: string;
  switchAccount: (form: FormData) => Promise<void>;
  sidebar: SidebarMode;
  children: React.ReactNode;
}) {
  const home = liveHome(kind);
  return (
    <PortalProviders currency="USD">
      <SidebarProvider initial={sidebar}>
        <div className="flex min-h-dvh lg:h-dvh lg:overflow-hidden">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-semibold focus:text-brand"
          >
            Ir para o conteúdo
          </a>
          <Sidebar items={liveNavigation(kind)} homeHref={home} />
          <div className="flex min-w-0 flex-1 flex-col">
            <LiveTopBar kind={kind} home={home} email={email} roleLabel={roleLabel} accounts={accounts} accountId={accountId} switchAccount={switchAccount} />
            <main id="conteudo" className="@container relative min-h-0 min-w-0 flex-1 bg-card lg:overflow-y-auto [scrollbar-color:var(--scroll-thumb)_transparent] [scrollbar-width:thin]">
              <div className="flex flex-col gap-4 p-4 lg:p-6 [&>*]:shrink-0">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </PortalProviders>
  );
}

function LiveTopBar({
  kind,
  home,
  email,
  roleLabel,
  accounts,
  accountId,
  switchAccount,
}: {
  kind: LiveKind;
  home: string;
  email: string;
  roleLabel: string;
  accounts: ShellAccount[];
  accountId?: string;
  switchAccount: (form: FormData) => Promise<void>;
}) {
  const { collapsed } = useSidebar();
  const name = email.split("@")[0];
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  const global = kind === "admin";
  const options = accounts.map((a) => ({ value: a.id, label: a.name + (a.suspended ? " · Suspensa" : "") }));
  // A single account needs no switcher: its name is shown instead.
  const accountSwitcher = global || accounts.length > 1 ? (
    // Keyed so the control follows the open account after a server redirect, not its first value.
    <form key={accountId ?? "global"} action={switchAccount} className="flex min-w-0 flex-wrap items-center gap-2">
      <Select
        label="Conta"
        hideLabel
        name="account_id"
        defaultValue={accountId ?? ""}
        options={global ? [{ value: "", label: "Visão global" }, ...options] : options}
        wrapperClassName="min-w-0 flex-1 lg:w-60"
      />
      <Button type="submit" variant="outline" size="sm">{global ? "Abrir" : "Abrir conta"}</Button>
    </form>
  ) : (
    accounts[0] && <p className="min-w-0 truncate text-[14.5px] font-semibold text-ink-soft">{accounts[0].name}</p>
  );
  return (
    <header className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center justify-between gap-2 border-b border-line bg-card px-4 lg:h-[4.5rem] lg:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu principal"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="grid size-11 shrink-0 place-items-center rounded-lg text-ink-soft hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand lg:hidden"
        >
          <Menu className="size-6" aria-hidden="true" />
        </button>
        <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu principal" size="sm" footer={<LogoutButton forceExpanded />}>
          {accountSwitcher && <div className="mb-4 border-b border-line pb-4">{accountSwitcher}</div>}
          <SidebarNav items={liveNavigation(kind)} forceExpanded onNavigate={() => setMenuOpen(false)} />
        </Modal>
        <Link
          href={home}
          aria-label="Acquafy Account, ir para o início"
          className={cn("shrink-0 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand", collapsed ? "flex" : "flex lg:hidden")}
        >
          <Image src="/app/brand/acquafy-logo.webp" alt="Acquafy" width={560} height={93} priority className="h-[1.125rem] w-auto sm:h-5 lg:h-[1.625rem] dark:hidden" />
          <Image src="/app/brand/acquafy-logo-white.webp" alt="Acquafy" width={640} height={106} priority className="hidden h-[1.125rem] w-auto sm:h-5 lg:h-[1.625rem] dark:block" />
        </Link>
        <div className="hidden min-w-0 lg:block">{accountSwitcher}</div>
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        <ThemeToggle />
        <span className="h-8 w-px bg-line" aria-hidden="true" />
        <Link
          href="/perfil"
          aria-label={`Abrir minha conta, ${email}`}
          title="Minha conta"
          className="flex items-center gap-3 rounded-lg p-1 pr-3 text-left hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Avatar name={name} className="size-10 text-sm" />
          <span className="hidden leading-tight md:block">
            <span className="block max-w-44 truncate text-[15px] font-bold text-ink">{email}</span>
            <span className="block text-[13px] text-ink-soft">{roleLabel}</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
