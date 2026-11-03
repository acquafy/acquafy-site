// components/mobile/sections/MobileLoginForgotSheet.tsx
"use client";

import { useState } from "react";
import { CircleCheck, Mail, Send } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { isEmail } from "@/components/ui/validate";

const FORM_ID = "m-login-forgot-form";

/** "Esqueci minha senha": asks for the e-mail, then shows a confirmation state. */
export function MobileLoginForgotSheet({ open, initialEmail, onClose }: { open: boolean; initialEmail: string; onClose: () => void }) {
  const toast = useToast();
  const [typed, setTyped] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const email = typed ?? initialEmail;

  const close = () => {
    onClose();
    // Reset after the exit animation, so the content does not jump while the sheet slides down.
    window.setTimeout(() => {
      setTyped(null);
      setError(undefined);
      setSending(false);
      setSentTo(null);
    }, 260);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!email.trim()) return setError("Informe o e-mail da sua conta.");
    if (!isEmail(email)) return setError("Informe um e-mail válido, como nome@dominio.com.");
    setError(undefined);
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSentTo(email.trim());
      toast({ title: "Instruções enviadas", description: "Confira sua caixa de entrada e o spam." });
    }, 800);
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      title={sentTo ? "Verifique seu e-mail" : "Recuperar senha"}
      description={sentTo ? undefined : "Enviaremos as instruções para criar uma nova senha."}
      footer={
        sentTo ? (
          <MobileButton size="lg" full onClick={close}>
            Voltar ao login
          </MobileButton>
        ) : (
          <MobileButton type="submit" form={FORM_ID} size="lg" full loading={sending}>
            <Send className="size-5" aria-hidden="true" />
            Enviar instruções
          </MobileButton>
        )
      }
    >
      {sentTo ? (
        <div className="grid justify-items-center gap-3 py-4 text-center" role="status">
          <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-ok-soft text-ok">
            <CircleCheck className="size-8" strokeWidth={1.75} />
          </span>
          <p className="text-[17px] font-bold text-ink">Enviamos as instruções</p>
          <p className="text-[15px] text-ink-soft">
            Se existir uma conta para <strong className="break-all text-ink">{sentTo}</strong>, você receberá um e-mail com o link para redefinir a senha em instantes.
          </p>
        </div>
      ) : (
        <form id={FORM_ID} noValidate onSubmit={onSubmit}>
          <MobileTextField
            label="E-mail da conta"
            name="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            inputMode="email"
            placeholder="seu@email.com"
            value={email}
            error={error}
            onChange={(e) => {
              setTyped(e.target.value);
              setError(undefined);
            }}
          />
        </form>
      )}
    </MobileSheet>
  );
}
