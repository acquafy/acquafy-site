// components/sections/LoginAccessModal.tsx
"use client";

import { useRef, useState } from "react";
import { Mail, Phone, Send, Ticket, UserRound } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Checkbox, TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid, useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { isEmail, isPhone } from "@/components/ui/validate";

const FORM_ID = "login-access-form";
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

/**"Criar conta"→ request portal access. */
export function LoginAccessModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>(EMPTY);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  useFocusOnOpen(open, form);

  const errors = validate(draft.values, accepted);
  const err = (k: Key) => (submitted ? errors[k] : undefined);

  const close = () => {
    draft.reset();
    setAccepted(false);
    setSubmitted(false);
    setSending(false);
    onClose();
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      focusFirstInvalid(form.current);
      if (errors.terms && Object.keys(errors).length === 1) form.current?.querySelector<HTMLInputElement>('input[type="checkbox"]')?.focus();
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      toast({ title: "Solicitação enviada", description: "Nossa equipe entrará em contato em até 1 dia útil." });
      close();
    }, 800);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Solicitar acesso"
      description="Preencha seus dados e a equipe Acquafy libera o seu acesso ao portal."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={sending}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} loading={sending}>
            <Send className="size-4" aria-hidden="true" />
            Enviar solicitação
          </Button>
        </>
      }
    >
      <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <TextField label="Nome completo" icon={UserRound} autoComplete="name" value={draft.values.name} error={err("name")} onChange={(e) => draft.set("name", e.target.value)} />
        <TextField
          label="E-mail"
          type="email"
          icon={Mail}
          autoComplete="email"
          inputMode="email"
          value={draft.values.email}
          error={err("email")}
          onChange={(e) => draft.set("email", e.target.value)}
        />
        <TextField
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
        <TextField
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
          <Checkbox
            label={
              <span>
                Li e aceito os <strong className="text-brand">Termos e Condições</strong> e a Política de Privacidade.
              </span>
            }
            checked={accepted}
            aria-invalid={submitted && !!errors.terms ? true : undefined}
            aria-describedby={submitted && errors.terms ? "login-access-terms-error" : undefined}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          {submitted && errors.terms && (
            <p id="login-access-terms-error" role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
              {errors.terms}
            </p>
          )}
        </div>
      </form>
    </Modal>
  );
}
