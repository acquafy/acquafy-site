// components/mobile/ios/IosHeaderActions.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/ios/MobileButton";
import { IosTile } from "@/components/mobile/ui/ios/IosTile";
import { MobileSheet } from "@/components/mobile/ui/ios/MobileSheet";
import { useProfile } from "@/components/providers/ProfileProvider";
import { Avatar } from "@/components/ui/Avatar";
import { notifications } from "@/config/notifications";
import { cn } from "@/lib/cn";
import { mobileHref, mobilePath } from "@/lib/mobile/platform";
import { usePersistentState } from "@/lib/usePersistentState";

/** Same storage key as the desktop bell and the Android one, so read state agrees everywhere. */
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

/**
 * Right side of the iOS nav bar on tab roots: ONE glass capsule holding the bell (opens the notifications sheet) and the avatar
 * (opens the profile tab), separated by a hairline, as iOS 26 groups bar buttons.
 */
export function IosHeaderActions() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const state = useNotificationState();

  return (
    <div className="ios-glass flex h-11 items-center rounded-full">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={state.unread ? `Notificações (${state.unread} não lidas)` : "Notificações"}
        className="ios-press relative grid h-11 w-12 place-items-center rounded-full text-ink focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Bell className="size-[22px]" strokeWidth={1.75} aria-hidden="true" />
        {state.unread > 0 && (
          <span aria-hidden="true" className="tabular absolute top-[5px] right-[7px] grid size-[17px] place-items-center rounded-full bg-danger text-[11px] leading-none font-bold text-white">
            {state.unread}
          </span>
        )}
      </button>
      <span aria-hidden="true" className="h-5 w-px bg-ink-mute/30" />
      <Link href={mobilePath("ios", "profile")} aria-label="Meu perfil" className="ios-press grid h-11 w-12 place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-brand">
        <Avatar name={profile.name} src={profile.avatar} className="size-[30px] text-[12px]" />
      </Link>
      <IosNotificationsSheet open={open} onClose={() => setOpen(false)} state={state} />
    </div>
  );
}

function IosNotificationsSheet({ open, onClose, state }: { open: boolean; onClose: () => void; state: ReturnType<typeof useNotificationState> }) {
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
        <ul className="ios-sq overflow-hidden rounded-[26px] bg-card">
          {notifications.map((n) => {
            const isUnread = !state.readIds.includes(n.id);
            return (
              <li key={n.id} className="relative after:absolute after:right-0 after:bottom-0 after:left-[64px] after:h-px after:bg-line last:after:hidden">
                <Link
                  href={mobileHref("ios", n.href)}
                  onClick={() => {
                    state.markRead(n.id);
                    onClose();
                  }}
                  className={cn("ios-row flex items-start gap-3 px-4 py-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand", isUnread && "bg-brand-soft/60")}
                >
                  <IosTile icon={n.icon} tone={n.tone} size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="text-[17px] leading-[22px] font-semibold text-ink">{n.title}</span>
                      {isUnread && <span className="size-2 shrink-0 rounded-full bg-brand" role="img" aria-label="Não lida" />}
                    </span>
                    <span className="block text-[15px] leading-5 text-ink-soft">{n.description}</span>
                    <span className="mt-0.5 block text-[13px] text-ink-mute">{n.when}</span>
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
