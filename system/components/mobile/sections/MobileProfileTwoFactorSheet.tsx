// components/mobile/sections/MobileProfileTwoFactorSheet.tsx
"use client";

import { useState } from "react";
import { Copy, ShieldCheck } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { digitsOnly } from "@/components/ui/validate";
import { MOCK_TWO_FACTOR_CODE, TWO_FACTOR_SECRET } from "@/config/profile-page";
import { copyText } from "@/lib/fileActions";

const FORM_ID = "m-perfil-2fa-form";

/** Turns two-step verification on: the setup key to type into the authenticator app (a phone cannot scan its own screen) and the 6-digit code. */
export function MobileProfileTwoFactorSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { updateProfile } = useProfile();
  const toast = useToast();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [checking, setChecking] = useState(false);

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setCode("");
      setError(undefined);
      setChecking(false);
    }, 260);
  };

  const copyKey = async () => {
    const ok = await copyText(TWO_FACTOR_SECRET.replaceAll(" ", ""));
    toast(ok ? { title: "Chave copiada", description: "Cole no seu aplicativo autenticador." } : { tone: "error", title: "Não foi possível copiar", description: "Digite a chave manualmente." });
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (code.length !== 6) {
      setError("Digite os 6 dígitos do código do aplicativo.");
      return;
    }
    setChecking(true);
    window.setTimeout(() => {
      if (code !== MOCK_TWO_FACTOR_CODE) {
        setChecking(false);
        setError("Código inválido. Confira o aplicativo autenticador e tente novamente.");
        return;
      }
      updateProfile({ twoFactor: true });
      toast({ title: "Autenticação em duas etapas ativada", description: "Pediremos um código a cada novo acesso." });
      close();
    }, 600);
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Duas etapas"
      description="Adicione a chave ao seu aplicativo autenticador e digite o código de 6 dígitos."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full loading={checking}>
          <ShieldCheck className="size-5" aria-hidden="true" />
          Verificar e ativar
        </MobileButton>
      }
    >
      <div className="grid gap-5">
        <div className="rounded-[14px] border border-line bg-canvas/50 p-4 text-center">
          <p className="text-[13px] text-ink-soft">Chave de configuração</p>
          <p className="tabular mt-1 font-mono text-[18px] font-bold tracking-wider text-ink">{TWO_FACTOR_SECRET}</p>
          <MobileButton variant="soft" size="sm" className="mt-2.5" onClick={copyKey}>
            <Copy className="size-4" aria-hidden="true" />
            Copiar chave
          </MobileButton>
        </div>
        <form id={FORM_ID} noValidate onSubmit={onSubmit}>
          <MobileTextField
            label="Código de verificação"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="000000"
            className="text-center text-[20px] font-bold tracking-[0.4em]"
            hint={error ? undefined : `Demonstração: use o código ${MOCK_TWO_FACTOR_CODE}.`}
            value={code}
            error={error}
            onChange={(e) => {
              setCode(digitsOnly(e.target.value));
              setError(undefined);
            }}
          />
        </form>
      </div>
    </MobileSheet>
  );
}
