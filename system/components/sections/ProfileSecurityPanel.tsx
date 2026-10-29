// components/sections/ProfileSecurityPanel.tsx
"use client";

import { useState } from "react";
import { KeyRound, LogOut, Lock, Monitor, ShieldCheck, Smartphone, MonitorOff } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Switch } from "@/components/ui/Field";
import { IconTile } from "@/components/ui/KpiCard";
import { Modal } from "@/components/ui/Modal";
import { SettingRow } from "@/components/ui/SettingRow";
import { formatDate } from "@/lib/format";
import { usePersistentState } from "@/lib/usePersistentState";
import { initialSecurity } from "@/config/profile-page";
import { ProfilePanel } from "./ProfilePanel";
import { ProfilePasswordModal } from "./ProfilePasswordModal";
import { ProfileTwoFactorModal } from "./ProfileTwoFactorModal";

type Confirm = "none" | "password" | "enable2fa" | "disable2fa" | "endAll";

function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function ProfileSecurityPanel() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const [security, setSecurity] = usePersistentState("security", initialSecurity);
  const [dialog, setDialog] = useState<Confirm>("none");
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
    <ProfilePanel id="seguranca" title="Segurança" description="Senha, autenticação em duas etapas e dispositivos conectados." icon={Lock} tone="pink">
      <div className="divide-y divide-line">
        <SettingRow icon={KeyRound} tone="blue" title="Senha" description={`Última alteração em ${formatDate(security.passwordChangedAt)}. Troque-a periodicamente.`}>
          <Button variant="outline" size="sm" onClick={() => setDialog("password")}>
            Alterar senha
          </Button>
        </SettingRow>
        <SettingRow
          icon={ShieldCheck}
          tone="green"
          title={
            <span className="flex flex-wrap items-center gap-2">
              Autenticação em duas etapas
              <Badge tone={profile.twoFactor ? "ok" : "neutral"}>{profile.twoFactor ? "Ativada" : "Desativada"}</Badge>
            </span>
          }
          description="Peça um código do aplicativo autenticador a cada novo acesso."
        >
          <Switch label="Autenticação em duas etapas" checked={profile.twoFactor} onChange={(next) => setDialog(next ? "enable2fa" : "disable2fa")} />
        </SettingRow>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-[17px] font-extrabold tracking-tight text-ink">Sessões ativas</h3>
          <p className="text-[13.5px] text-ink-soft">Dispositivos conectados à sua conta neste momento.</p>
        </div>
        <Button variant="danger" size="sm" disabled={!others.length} onClick={() => setDialog("endAll")}>
          <LogOut className="size-4" aria-hidden="true" />
          Sair de todos os dispositivos
        </Button>
      </div>

      <ul className="mt-2 divide-y divide-line" aria-label="Sessões ativas">
        {security.sessions.map((s) => (
          <li key={s.id}>
            <SettingRow icon={s.kind === "mobile" ? Smartphone : Monitor} tone={s.current ? "green" : "blue"} title={s.device} description={`${s.location} · ${s.lastActive}`}>
              {s.current ? (
                <Badge tone="ok" dot>
                  Este dispositivo
                </Badge>
              ) : (
                <Button variant="outline" size="sm" onClick={() => endSession(s.id, s.device)}>
                  Encerrar
                </Button>
              )}
            </SettingRow>
          </li>
        ))}
      </ul>
      {!others.length && (
        <div className="rounded-xl bg-canvas/60">
          <EmptyState icon={MonitorOff} title="Nenhuma outra sessão ativa" description="Sua conta está conectada somente neste dispositivo." />
        </div>
      )}

      <ProfilePasswordModal open={dialog === "password"} onClose={close} onChanged={() => setSecurity((s) => ({ ...s, passwordChangedAt: todayIso() }))} />
      <ProfileTwoFactorModal open={dialog === "enable2fa"} onClose={close} />

      <Modal
        open={dialog === "disable2fa"}
        onClose={close}
        size="sm"
        title="Desativar autenticação em duas etapas?"
        description="Sua conta ficará protegida apenas pela senha."
        footer={
          <>
            <Button variant="outline" onClick={close}>
              Manter ativada
            </Button>
            <Button variant="danger" onClick={disable2fa}>
              Desativar
            </Button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <IconTile icon={ShieldCheck} tone="orange" className="size-11" />
          <p className="text-[14.5px] text-ink-soft">Você poderá ativá-la novamente quando quiser, escaneando um novo QR Code.</p>
        </div>
      </Modal>

      <Modal
        open={dialog === "endAll"}
        onClose={close}
        size="sm"
        title="Sair de todos os dispositivos?"
        description={`${others.length} ${others.length === 1 ? "sessão será encerrada" : "sessões serão encerradas"}.`}
        footer={
          <>
            <Button variant="outline" onClick={close}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={endAll}>
              <LogOut className="size-4" aria-hidden="true" />
              Encerrar sessões
            </Button>
          </>
        }
      >
        <p className="text-[14.5px] text-ink-soft">Todos os dispositivos, exceto este, precisarão entrar novamente com e-mail e senha.</p>
      </Modal>
    </ProfilePanel>
  );
}
