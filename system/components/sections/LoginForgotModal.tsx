// components/sections/LoginForgotModal.tsx
"use client";

import { useRef, useState } from "react";
import { CircleCheck, Mail, Send } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { isEmail } from "@/components/ui/validate";

const FORM_ID = "login-forgot-form";

/**"Esqueci minha senha": asks for the e-mail, then shows a confirmation state. */
export function LoginForgotModal({ open, initialEmail, onClose }: { open: boolean; initialEmail: string; onClose: () => void }) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [typed, setTyped] = useState<string | null>(null);
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);
  useFocusOnOpen(open, form);

  const email = typed ?? initialEmail;

  const close = () => {
    setTyped(null);
    setError(undefined);
    setSending(false);
    setSentTo(null);
    onClose();
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
    <Modal
      open={open}
      onClose={close}
      size="sm"
      title={sentTo ? "Verifique seu e-mail" : "Recuperar senha"}
      description={sentTo ? undefined : "Informe o e-mail da sua conta e enviaremos as instruções para criar uma nova senha."}
      footer={
        sentTo ? (
          <Button onClick={close}>Voltar ao login</Button>
        ) : (
          <>
            <Button variant="outline" onClick={close} disabled={sending}>
              Cancelar
            </Button>
            <Button type="submit" form={FORM_ID} loading={sending}>
              <Send className="size-4" aria-hidden="true" />
              Enviar instruções
            </Button>
          </>
        )
      }
    >
      {sentTo ? (
        <div className="grid justify-items-center gap-3 py-2 text-center" role="status">
          <span aria-hidden="true" className="grid size-14 place-items-center rounded-full bg-ok-soft text-ok">
            <CircleCheck className="size-8" strokeWidth={1.75} />
          </span>
          <p className="text-[16px] font-bold text-ink">Enviamos as instruções</p>
          <p className="text-[14.5px] text-ink-soft">
            Se existir uma conta para <strong className="break-all text-ink">{sentTo}</strong>, você receberá um e-mail com o link para redefinir a senha em instantes.
          </p>
        </div>
      ) : (
        <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit}>
          <TextField
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
    </Modal>
  );
}
