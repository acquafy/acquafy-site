// components/mobile/sections/MobileProfileNotifications.tsx
"use client";

import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileSwitch } from "@/components/mobile/ui/MobileSwitch";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import type { NotificationPrefs } from "@/config/profile";
import { notificationGroups } from "@/config/profile-page";

/** Notificações: one grouped list per topic, each row with a switch that saves immediately. */
export function MobileProfileNotifications() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();

  const toggle = (key: keyof NotificationPrefs, next: boolean, message: string) => {
    updateProfile({ notifications: { ...profile.notifications, [key]: next } });
    toast({ title: message, tone: next ? "success" : "info" });
  };

  return (
    <>
      {notificationGroups.map((g) => (
        <MobileListGroup key={g.title} header={g.title} aria-label={g.title}>
          {g.items.map((item) => (
            <MobileListRow
              key={item.key}
              title={item.label}
              subtitle={item.description}
              chevron={false}
              trailing={<MobileSwitch label={item.label} checked={profile.notifications[item.key]} onChange={(next) => toggle(item.key, next, next ? item.on : item.off)} />}
            />
          ))}
        </MobileListGroup>
      ))}
    </>
  );
}
