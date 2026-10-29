// components/mobile/sections/MobileHeaderActions.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { usePlatform } from "@/components/mobile/PlatformProvider";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useProfile } from "@/components/providers/ProfileProvider";
import { Avatar } from "@/components/ui/Avatar";
import { IconTile } from "@/components/ui/KpiCard";
import { notifications } from "@/config/notifications";
import { cn } from "@/lib/cn";
import { mobileHref, mobilePath } from "@/lib/mobile/platform";
import { usePersistentState } from "@/lib/usePersistentState";

/** Same storage key as the desktop bell, so read state agrees between both. */
function useNotificationState() {
  const [readIds, setReadIds] = usePersistentState<string[]>("notifications:read", []);
  const unread = notifications.filter((n) => !readIds.includes(n.id));
  return {
    readIds,
    unread: unread.length,
    markRead: (id: string) => setReadIds((ids) => (ids.includes(id) ? ids : [...ids, id])),
    markAll: () => setReadIds(notifications.map((n) => n.id)),
  };
}

/** Bell (with unread badge, opens the notifications sheet) and the avatar (opens the profile tab). Right side of the nav bar. */
export function MobileHeaderActions() {
  const platform = usePlatform();
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const state = useNotificationState();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={state.unread ? `Notificações (${state.unread} não lidas)` : "Notificações"}
        className="relative grid size-11 place-items-center rounded-full text-brand focus-visible:outline-2 focus-visible:outline-brand active:bg-brand-soft"
      >
        <span className="grid size-10 place-items-center rounded-full bg-card">
          <Bell className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
        </span>
        {state.unread > 0 && (
          <span aria-hidden="true" className="tabular absolute top-0.5 right-0.5 grid size-[18px] place-items-center rounded-full bg-danger text-[11px] font-bold text-white">
            {state.unread}
          </span>
        )}
      </button>
      <Link href={mobilePath(platform, "profile")} aria-label="Meu perfil" className="grid size-11 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-brand">
        <Avatar name={profile.name} src={profile.avatar} className="size-10 border border-line text-[14px]" />
      </Link>
      <MobileNotificationsSheet open={open} onClose={() => setOpen(false)} state={state} />
    </div>
  );
}

function MobileNotificationsSheet({ open, onClose, state }: { open: boolean; onClose: () => void; state: ReturnType<typeof useNotificationState> }) {
  const platform = usePlatform();
  return (
    <MobileSheet
      open={open}
      onClose={onClose}
      title="Notificações"
      description={state.unread ? `${state.unread} não lida${state.unread > 1 ? "s" : ""}` : "Tudo em dia"}
      footer={
        <MobileButton variant="secondary" full disabled={state.unread === 0} onClick={state.markAll}>
          <CheckCheck className="size-5" aria-hidden="true" />
          Marcar todas como lidas
        </MobileButton>
      }
    >
      {notifications.length === 0 ? (
        <p className="flex items-center gap-2 py-6 text-[15px] text-ink-soft">
          <BellOff className="size-5" aria-hidden="true" /> Nenhuma notificação.
        </p>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-[14px] bg-card">
          {notifications.map((n) => {
            const isUnread = !state.readIds.includes(n.id);
            return (
              <li key={n.id}>
                <Link
                  href={mobileHref(platform, n.href)}
                  onClick={() => {
                    state.markRead(n.id);
                    onClose();
                  }}
                  className={cn(
                    "flex items-start gap-3 px-3.5 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand active:bg-brand-soft/60",
                    isUnread && "bg-brand-soft/35",
                  )}
                >
                  <IconTile icon={n.icon} tone={n.tone} className="size-10" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[15.5px] leading-snug font-bold text-ink">{n.title}</span>
                      {isUnread && <span className="size-2 shrink-0 rounded-full bg-brand" role="img" aria-label="Não lida" />}
                    </span>
                    <span className="block text-[14px] leading-snug text-ink-soft">{n.description}</span>
                    <span className="mt-0.5 block text-[12.5px] text-ink-mute">{n.when}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </MobileSheet>
  );
}
