// components/mobile/sections/MobileProfileSecurity.tsx
"use client";

import { useState } from "react";
import { KeyRound, LogOut, Monitor, MonitorOff, ShieldCheck, Smartphone } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileConfirmSheet } from "@/components/mobile/ui/MobileConfirmSheet";
import { MobileEmptyState } from "@/components/mobile/ui/MobileEmptyState";
import { MobileListGroup, MobileListRow } from "@/components/mobile/ui/MobileList";
import { MobileSwitch } from "@/components/mobile/ui/MobileSwitch";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { IconTile } from "@/components/ui/KpiCard";
import { initialSecurity } from "@/config/profile-page";
import { formatDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";
import { MobileProfilePasswordSheet } from "./MobileProfilePasswordSheet";
import { MobileProfileTwoFactorSheet } from "./MobileProfileTwoFactorSheet";

type Dialog = "none" | "password" | "enable2fa" | "disable2fa" | "endAll";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Segurança: password, two-step verification and the active sessions (end one or all the others). */
export function MobileProfileSecurity() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const [security, setSecurity] = usePersistentState("security", initialSecurity);
  const [dialog, setDialog] = useState<Dialog>("none");
  const close = () => setDialog("none");
  const others = security.sessions.filter((s) => !s.current);

  const endSession = (id: string, device: string) => {
    setSecurity((s) => ({ ...s, sessions: s.sessions.filter((x) => x.id !== id) }));
    toast({ title: "Sessão encerrada", description: `${device} foi desconectado.`, tone: "info" });
  };

  const endAll = () => {
    setSecurity((s) => ({ ...s, sessions: s.sessions.filter((x) => x.current) }));
    close();
    toast({ title: "Outros dispositivos desconectados", description: "Apenas esta sessão continua ativa.", tone: "info" });
  };

  const disable2fa = () => {
    updateProfile({ twoFactor: false });
    close();
    toast({ title: "Autenticação em duas etapas desativada", description: "Recomendamos manter a proteção ativada.", tone: "info" });
  };

  return (
    <>
      <MobileListGroup aria-label="Acesso">
        <MobileListRow icon={KeyRound} tone="blue" title="Alterar senha" subtitle={`Última alteração em ${formatDate(security.passwordChangedAt)}`} onClick={() => setDialog("password")} />
        <MobileListRow
          icon={ShieldCheck}
          tone="green"
          title={
            <span className="flex flex-wrap items-center gap-2">
              Duas etapas
              <Badge tone={profile.twoFactor ? "ok" : "neutral"}>{profile.twoFactor ? "Ativada" : "Desativada"}</Badge>
            </span>
          }
          subtitle="Peça um código a cada novo acesso."
          chevron={false}
          trailing={<MobileSwitch label="Autenticação em duas etapas" checked={profile.twoFactor} onChange={(next) => setDialog(next ? "enable2fa" : "disable2fa")} />}
        />
      </MobileListGroup>

      <section aria-label="Sessões ativas" className="grid gap-2.5">
        <h2 className="px-1 text-[18px] font-bold tracking-tight text-ink">Sessões ativas</h2>
        <ul className="divide-y divide-line overflow-hidden rounded-[14px] border border-line bg-card">
          {security.sessions.map((s) => (
            <li key={s.id} className="flex items-center gap-3 px-3.5 py-3">
              <IconTile icon={s.kind === "mobile" ? Smartphone : Monitor} tone={s.current ? "green" : "blue"} className="size-10" />
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-2 text-[15.5px] leading-snug font-semibold text-ink">
                  {s.device}
                  {s.current && <Badge tone="ok">Este aparelho</Badge>}
                </p>
                <p className="text-[13px] text-ink-soft">
                  {s.location} · {s.lastActive}
                </p>
              </div>
              {!s.current && (
                <MobileButton variant="danger" size="sm" aria-label={`Encerrar sessão de ${s.device}`} onClick={() => endSession(s.id, s.device)}>
                  Encerrar
                </MobileButton>
              )}
            </li>
          ))}
        </ul>
        {others.length === 0 ? (
          <MobileEmptyState icon={MonitorOff} title="Nenhum outro dispositivo" description="Somente este aparelho está conectado à sua conta." />
        ) : (
          <MobileButton variant="danger" size="lg" full onClick={() => setDialog("endAll")}>
            <LogOut className="size-5" aria-hidden="true" />
            Encerrar todas as outras sessões
          </MobileButton>
        )}
      </section>

      <MobileProfilePasswordSheet
        open={dialog === "password"}
        onClose={close}
        onChanged={() => setSecurity((s) => ({ ...s, passwordChangedAt: todayIso() }))}
      />
      <MobileProfileTwoFactorSheet open={dialog === "enable2fa"} onClose={close} />
      <MobileConfirmSheet open={dialog === "disable2fa"} title="Desativar duas etapas?" description="Sua conta ficará protegida apenas pela senha." confirmLabel="Desativar" danger onConfirm={disable2fa} onCancel={close} />
      <MobileConfirmSheet
        open={dialog === "endAll"}
        title="Encerrar outras sessões?"
        description={`${others.length} dispositivo${others.length === 1 ? "" : "s"} será${others.length === 1 ? "" : "ão"} desconectado${others.length === 1 ? "" : "s"}.`}
        confirmLabel="Encerrar sessões"
        danger
        onConfirm={endAll}
        onCancel={close}
      />
    </>
  );
}
