// components/mobile/sections/MobileLoginAccessSheet.tsx
"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Send, Ticket, UserRound } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCheckbox, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { isEmail, isPhone } from "@/components/ui/validate";

const FORM_ID = "m-login-access-form";
type Key = "name" | "email" | "phone" | "invite";
const EMPTY: Record<Key, string> = { name: "", email: "", phone: "", invite: "" };

function validate(v: Record<Key, string>, accepted: boolean): Partial<Record<Key | "terms", string>> {
  const e: Partial<Record<Key | "terms", string>> = {};
  if (v.name.trim().length < 3) e.name = "Informe seu nome completo.";
  if (!v.email.trim()) e.email = "Informe seu e-mail.";
  else if (!isEmail(v.email)) e.email = "Informe um e-mail válido, como nome@dominio.com.";
  if (!v.phone.trim()) e.phone = "Informe seu telefone.";
  else if (!isPhone(v.phone)) e.phone = "Informe um telefone válido, com DDD e de 8 a 15 dígitos.";
  if (v.invite && !/^[A-Za-z0-9-]{4,20}$/.test(v.invite.trim())) e.invite = "O código de convite tem de 4 a 20 letras ou números.";
  if (!accepted) e.terms = "Aceite os Termos e Condições para continuar.";
  return e;
}

/** "Criar conta": the investor asks for portal access; the team releases it. */
export function MobileLoginAccessSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>(EMPTY);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const errors = validate(draft.values, accepted);
  const err = (k: Key) => (submitted ? errors[k] : undefined);

  const close = () => {
    onClose();
    window.setTimeout(() => {
      draft.reset();
      setAccepted(false);
      setSubmitted(false);
      setSending(false);
    }, 260);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      focusFirstInvalid(form.current);
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      toast({ title: "Solicitação enviada", description: "Nossa equipe entrará em contato em até 1 dia útil." });
      close();
    }, 800);
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Solicitar acesso"
      description="A equipe Acquafy libera o seu acesso ao portal."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full loading={sending}>
          <Send className="size-5" aria-hidden="true" />
          Enviar solicitação
        </MobileButton>
      }
    >
      <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <MobileTextField label="Nome completo" icon={UserRound} autoComplete="name" value={draft.values.name} error={err("name")} onChange={(e) => draft.set("name", e.target.value)} />
        <MobileTextField label="E-mail" type="email" icon={Mail} autoComplete="email" inputMode="email" value={draft.values.email} error={err("email")} onChange={(e) => draft.set("email", e.target.value)} />
        <MobileTextField
          label="Telefone"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          inputMode="tel"
          placeholder="+1 (407) 555-0123"
          value={draft.values.phone}
          error={err("phone")}
          onChange={(e) => draft.set("phone", e.target.value)}
        />
        <MobileTextField
          label="Código de convite (opcional)"
          icon={Ticket}
          autoComplete="off"
          maxLength={20}
          hint="Se você recebeu um convite de um consultor Acquafy, informe o código."
          value={draft.values.invite}
          error={err("invite")}
          onChange={(e) => draft.set("invite", e.target.value)}
        />
        <div>
          <MobileCheckbox
            label={
              <span>
                Li e aceito os <strong className="text-brand">Termos e Condições</strong> e a Política de Privacidade.
              </span>
            }
            checked={accepted}
            aria-invalid={submitted && !!errors.terms ? true : undefined}
            aria-describedby={submitted && errors.terms ? "m-login-access-terms-error" : undefined}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          {submitted && errors.terms && (
            <p id="m-login-access-terms-error" role="alert" className="text-[13px] font-medium text-danger">
              {errors.terms}
            </p>
          )}
        </div>
      </form>
    </MobileSheet>
  );
}
