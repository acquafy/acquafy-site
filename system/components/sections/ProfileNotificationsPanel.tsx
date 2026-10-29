// components/sections/ProfileNotificationsPanel.tsx
"use client";

import { Bell } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Switch } from "@/components/ui/Field";
import { SettingRow } from "@/components/ui/SettingRow";
import type { NotificationPrefs } from "@/config/profile";
import { notificationGroups } from "@/config/profile-page";
import { ProfilePanel } from "./ProfilePanel";

export function ProfileNotificationsPanel() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();

  const toggle = (key: keyof NotificationPrefs, next: boolean, message: string) => {
    updateProfile({ notifications: { ...profile.notifications, [key]: next } });
    toast({ title: message, tone: next ? "success" : "info" });
  };

  return (
    <ProfilePanel id="notificacoes" title="Notificações" description="Escolha como e quando você quer ser avisado." icon={Bell} tone="green">
      <div className="grid gap-6">
        {notificationGroups.map((g) => (
          <section key={g.title} aria-label={g.title}>
            <h3 className="text-[12.5px] font-bold tracking-wider text-brand uppercase">{g.title}</h3>
            <div className="divide-y divide-line">
              {g.items.map((item) => (
                <SettingRow key={item.key} title={item.label} description={item.description}>
                  <Switch label={item.label} checked={profile.notifications[item.key]} onChange={(next) => toggle(item.key, next, next ? item.on : item.off)} />
                </SettingRow>
              ))}
            </div>
          </section>
        ))}
      </div>
    </ProfilePanel>
  );
}
