// components/mobile/android/AndroidHeaderActions.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/android/MobileButton";
import { MobileSheet } from "@/components/mobile/ui/android/MobileSheet";
import { useProfile } from "@/components/providers/ProfileProvider";
import { Avatar } from "@/components/ui/Avatar";
import { IconTile } from "@/components/ui/KpiCard";
import { notifications } from "@/config/notifications";
import { cn } from "@/lib/cn";
import { mobileHref, mobilePath } from "@/lib/mobile/platform";
import { usePersistentState } from "@/lib/usePersistentState";
import { Ripple } from "./Ripple";

/** Same storage key as the desktop bell and the iOS one, so the read state agrees everywhere. */
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

/** Right side of the top app bar, Material style: a 48px bell icon button with a badge (opens the notifications sheet) and the 32px account avatar (opens the profile). */
export function AndroidHeaderActions() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const state = useNotificationState();

  return (
    <div className="flex items-center">
      <button type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-label={state.unread ? `Notificações (${state.unread} não lidas)` : "Notificações"} className="md-icon-btn">
        <Ripple />
        <Bell className="relative size-6" strokeWidth={2} aria-hidden="true" />
        {state.unread > 0 && (
          <span
            aria-hidden="true"
            className="md-label-s tabular absolute top-[7px] left-[24px] grid h-4 min-w-4 place-items-center rounded-full bg-(--md-error) px-1 text-[11px] leading-4 font-medium text-(--md-on-error)"
          >
            {state.unread}
          </span>
        )}
      </button>
      <Link href={mobilePath("android", "profile")} aria-label="Meu perfil" className="md-icon-btn">
        <Ripple />
        <Avatar name={profile.name} src={profile.avatar} className="relative size-8 text-[12px]" />
      </Link>
      <NotificationsSheet open={open} onClose={() => setOpen(false)} state={state} />
    </div>
  );
}

function NotificationsSheet({ open, onClose, state }: { open: boolean; onClose: () => void; state: ReturnType<typeof useNotificationState> }) {
  return (
    <MobileSheet
      open={open}
      onClose={onClose}
      title="Notificações"
      description={state.unread ? `${state.unread} não lida${state.unread > 1 ? "s" : ""}` : "Tudo em dia"}
      footer={
        <MobileButton variant="soft" size="lg" full disabled={state.unread === 0} onClick={state.markAll}>
          <CheckCheck className="size-5" aria-hidden="true" />
          Marcar todas como lidas
        </MobileButton>
      }
    >
      {notifications.length === 0 ? (
        <p className="md-body-m flex items-center gap-2 py-6 text-(--md-on-surface-variant)">
          <BellOff className="size-5" aria-hidden="true" /> Nenhuma notificação.
        </p>
      ) : (
        <ul className="flex flex-col gap-0.5">
          {notifications.map((n, i) => {
            const isUnread = !state.readIds.includes(n.id);
            return (
              <li key={n.id}>
                <Link
                  href={mobileHref("android", n.href)}
                  onClick={() => {
                    state.markRead(n.id);
                    onClose();
                  }}
                  className={cn(
                    "relative flex items-start gap-4 rounded-[4px] px-4 py-3 text-(--md-on-surface) focus-visible:outline-3 focus-visible:-outline-offset-2 focus-visible:outline-(--md-secondary)",
                    isUnread ? "bg-(--md-secondary-container) text-(--md-on-secondary-container)" : "bg-(--md-surface-container)",
                    i === 0 && "rounded-t-[20px]",
                    i === notifications.length - 1 && "rounded-b-[20px]",
                  )}
                >
                  <Ripple />
                  <IconTile icon={n.icon} tone={n.tone} className="relative size-10 !rounded-full" />
                  <span className="relative min-w-0 flex-1">
                    <span className="md-body-l block font-medium">{n.title}</span>
                    <span className="md-body-m block opacity-80">{n.description}</span>
                    <span className="md-label-m mt-0.5 block opacity-70">{n.when}</span>
                  </span>
                  {isUnread && <span className="relative mt-2 size-2 shrink-0 rounded-full bg-(--md-primary)" role="img" aria-label="Não lida" />}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </MobileSheet>
  );
}
