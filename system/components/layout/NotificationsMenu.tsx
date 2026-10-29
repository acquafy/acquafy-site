// components/layout/NotificationsMenu.tsx
"use client";

import Link from "next/link";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { IconTile } from "@/components/ui/KpiCard";
import { notifications } from "@/config/notifications";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/usePersistentState";

/** Header bell: unread badge, list with deep links,"mark all as read". */
export function NotificationsMenu() {
  const [readIds, setReadIds] = usePersistentState<string[]>("notifications:read", []);
  const unread = notifications.filter((n) => !readIds.includes(n.id));

  const markRead = (id: string) => setReadIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  const markAll = () => setReadIds(notifications.map((n) => n.id));

  return (
    <Popover
      label="Notificações"
      panelClassName="w-[min(24rem,calc(100vw-2rem))] p-0"
      trigger={(props) => (
        <button
          type="button"
          {...props}
          aria-label={unread.length ? `Notificações (${unread.length} não lidas)` : "Notificações"}
          className="relative grid size-10 place-items-center rounded-full text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Bell className="size-6" strokeWidth={1.75} aria-hidden="true" />
          {unread.length > 0 && (
            <span aria-hidden="true" className="tabular absolute top-0.5 right-0.5 grid size-[18px] place-items-center rounded-full bg-danger text-[11px] font-bold text-white">
              {unread.length}
            </span>
          )}
        </button>
      )}
    >
      {({ close }) => (
        <>
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
            <h2 className="text-[16px] font-extrabold text-ink">Notificações</h2>
            <button
              type="button"
              onClick={markAll}
              disabled={unread.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-semibold text-brand enabled:hover:bg-brand-soft disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand"
            >
              <CheckCheck className="size-4" aria-hidden="true" />
              Marcar todas como lidas
            </button>
          </div>
          {notifications.length === 0 ? (
            <p className="flex items-center gap-2 px-4 py-6 text-[14px] text-ink-soft">
              <BellOff className="size-5" aria-hidden="true" /> Nenhuma notificação.
            </p>
          ) : (
            <ul className="max-h-[22rem] divide-y divide-line overflow-y-auto">
              {notifications.map((n) => {
                const isUnread = !readIds.includes(n.id);
                return (
                  <li key={n.id}>
                    <Link
                      href={n.href}
                      onClick={() => {
                        markRead(n.id);
                        close();
                      }}
                      className={cn(
                        "flex items-start gap-3 px-4 py-3 hover:bg-brand-soft/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand",
                        isUnread && "bg-brand-soft/35",
                      )}
                    >
                      <IconTile icon={n.icon} tone={n.tone} className="size-10" />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="text-[14.5px] font-bold text-ink">{n.title}</span>
                          {isUnread && <span className="size-2 rounded-full bg-brand" aria-label="Não lida" />}
                        </span>
                        <span className="block text-[13.5px] text-ink-soft">{n.description}</span>
                        <span className="mt-0.5 block text-[12px] text-ink-mute">{n.when}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </Popover>
  );
}
