// components/mobile/sections/MobileProfilePasswordSheet.tsx
"use client";

import { useRef, useState } from "react";
import { KeyRound, Lock } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import { checkPassword, PasswordStrength } from "@/components/ui/PasswordStrength";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";

const FORM_ID = "m-perfil-password-form";
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

/** "Alterar senha": current + new (with the strength meter) + confirmation. */
export function MobileProfilePasswordSheet({ open, onClose, onChanged }: { open: boolean; onClose: () => void; onChanged: () => void }) {
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>({ current: "", next: "", confirm: "" });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const errors = validate(draft.values);
  const err = (k: Key) => (submitted ? errors[k] : undefined);

  const close = () => {
    onClose();
    window.setTimeout(() => {
      draft.reset();
      setSubmitted(false);
      setSaving(false);
    }, 260);
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
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Alterar senha"
      description="Escolha uma senha forte que você não usa em outros serviços."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full loading={saving}>
          <KeyRound className="size-5" aria-hidden="true" />
          Alterar senha
        </MobileButton>
      }
    >
      <form ref={form} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <MobileTextField label="Senha atual" icon={Lock} type="password" autoComplete="current-password" value={draft.values.current} error={err("current")} onChange={(e) => draft.set("current", e.target.value)} />
        <MobileTextField label="Nova senha" icon={Lock} type="password" autoComplete="new-password" value={draft.values.next} error={err("next")} onChange={(e) => draft.set("next", e.target.value)} />
        <PasswordStrength value={draft.values.next} />
        <MobileTextField label="Confirmar nova senha" icon={Lock} type="password" autoComplete="new-password" value={draft.values.confirm} error={err("confirm")} onChange={(e) => draft.set("confirm", e.target.value)} />
      </form>
    </MobileSheet>
  );
}
