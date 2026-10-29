// components/sections/ProfilePasswordModal.tsx
"use client";

import { useRef, useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { checkPassword, PasswordStrength } from "@/components/ui/PasswordStrength";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid, useFocusOnOpen } from "@/components/ui/useFocusOnOpen";

const FORM_ID = "perfil-password-form";
type Key = "current" | "next" | "confirm";

function validate(v: Record<Key, string>): Partial<Record<Key, string>> {
  const e: Partial<Record<Key, string>> = {};
  if (v.current.length < 6) e.current = "Digite sua senha atual (mínimo de 6 caracteres).";
  if (!checkPassword(v.next).valid) e.next = "A nova senha precisa atender às regras abaixo.";
  else if (v.next === v.current) e.next = "A nova senha deve ser diferente da atual.";
  if (!v.confirm) e.confirm = "Repita a nova senha.";
  else if (v.confirm !== v.next) e.confirm = "As senhas não coincidem.";
  return e;
}

export function ProfilePasswordModal({ open, onClose, onChanged }: { open: boolean; onClose: () => void; onChanged: () => void }) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>({ current: "", next: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  useFocusOnOpen(open, form);

  const errors = validate(draft.values);
  const err = (k: Key) => (submitted ? errors[k] : undefined);

  const close = () => {
    draft.reset();
    setSubmitted(false);
    setSaving(false);
    onClose();
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      focusFirstInvalid(form.current);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      onChanged();
      toast({ title: "Senha alterada", description: "Use a nova senha no seu próximo acesso." });
      close();
    }, 700);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Alterar senha"
      description="Escolha uma senha forte que você não usa em outros serviços."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} loading={saving}>
            <KeyRound className="size-4" aria-hidden="true" />
            Alterar senha
          </Button>
        </>
      }
    >
      <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <TextField
          label="Senha atual"
          icon={Lock}
          type="password"
          autoComplete="current-password"
          value={draft.values.current}
          error={err("current")}
          onChange={(e) => draft.set("current", e.target.value)}
        />
        <TextField label="Nova senha" icon={Lock} type="password" autoComplete="new-password" value={draft.values.next} error={err("next")} onChange={(e) => draft.set("next", e.target.value)} />
        <PasswordStrength value={draft.values.next} />
        <TextField
          label="Confirmar nova senha"
          icon={Lock}
          type="password"
          autoComplete="new-password"
          value={draft.values.confirm}
          error={err("confirm")}
          onChange={(e) => draft.set("confirm", e.target.value)}
        />
      </form>
    </Modal>
  );
}
