// components/sections/ProfilePersonalPanel.tsx
"use client";

import { useRef, useState } from "react";
import { Building2, Globe2, IdCard, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { isEmail, isPhone } from "@/components/ui/validate";
import { ProfilePanel } from "./ProfilePanel";

type Key = "name" | "email" | "phone" | "city" | "state" | "country";

function validate(v: Record<Key, string>): Partial<Record<Key, string>> {
  const e: Partial<Record<Key, string>> = {};
  if (v.name.trim().length < 2) e.name = "Informe seu nome completo.";
  if (!v.email.trim()) e.email = "Informe seu e-mail.";
  else if (!isEmail(v.email)) e.email = "Informe um e-mail válido, como nome@dominio.com.";
  if (!v.phone.trim()) e.phone = "Informe seu telefone.";
  else if (!isPhone(v.phone)) e.phone = "Informe um telefone válido, com DDD e de 8 a 15 dígitos.";
  if (!v.city.trim()) e.city = "Informe sua cidade.";
  if (!v.state.trim()) e.state = "Informe o estado.";
  if (!v.country.trim()) e.country = "Informe o país.";
  return e;
}

export function ProfilePersonalPanel() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    city: profile.city,
    state: profile.state,
    country: profile.country,
  });
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(draft.values);
  const err = (k: Key) => (submitted || touched[k] ? errors[k] : undefined);
  const field = (k: Key) => ({
    name: k,
    value: draft.values[k],
    error: err(k),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => draft.set(k, e.target.value),
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
  });

  const clear = () => {
    draft.reset();
    setTouched({});
    setSubmitted(false);
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length) {
      toast({ title: "Revise os campos destacados", description: "Algumas informações precisam de correção.", tone: "error" });
      focusFirstInvalid(form.current);
      return;
    }
    const v = draft.values;
    updateProfile({ name: v.name.trim(), email: v.email.trim(), phone: v.phone.trim(), city: v.city.trim(), state: v.state.trim(), country: v.country.trim() });
    clear();
    toast({ title: "Informações atualizadas", description: "Seus dados pessoais foram salvos." });
  };

  const onCancel = () => {
    clear();
    toast({ title: "Alterações descartadas", tone: "info" });
  };

  return (
    <ProfilePanel
      id="pessoais"
      title="Informações Pessoais"
      description="Nome, e-mail, telefone e endereço."
      icon={UserRound}
      tone="violet"
      action={
        draft.dirty ? (
          <Badge tone="warn" dot>
            Alterações não salvas
          </Badge>
        ) : undefined
      }
    >
      <form ref={form} noValidate onSubmit={onSubmit} aria-label="Informações pessoais">
        <div className="grid gap-x-5 gap-y-4 @md:grid-cols-2">
          <TextField label="Nome completo" icon={UserRound} autoComplete="name" wrapperClassName="@md:col-span-2" {...field("name")} />
          <TextField label="E-mail" icon={Mail} type="email" autoComplete="email" inputMode="email" {...field("email")} />
          <TextField label="Telefone" icon={Phone} type="tel" autoComplete="tel" inputMode="tel" {...field("phone")} />
          <TextField
            label="Documento"
            icon={IdCard}
            value={profile.document}
            readOnly
            hint="Por segurança, o documento só pode ser alterado pelo suporte."
            className="bg-canvas/60 text-ink-soft"
            wrapperClassName="@md:col-span-2"
          />
          <TextField label="Cidade" icon={Building2} autoComplete="address-level2" {...field("city")} />
          <TextField label="Estado" icon={MapPin} autoComplete="address-level1" maxLength={40} {...field("state")} />
          <TextField label="País" icon={Globe2} autoComplete="country-name" wrapperClassName="@md:col-span-2" {...field("country")} />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-line pt-5">
          <p className="mr-auto text-[13.5px] text-ink-soft" aria-live="polite">
            {draft.dirty ? "Você tem alterações não salvas." : "Nenhuma alteração pendente."}
          </p>
          <Button variant="outline" onClick={onCancel} disabled={!draft.dirty}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!draft.dirty}>
            <Save className="size-4" aria-hidden="true" />
            Salvar alterações
          </Button>
        </div>
      </form>
    </ProfilePanel>
  );
}
