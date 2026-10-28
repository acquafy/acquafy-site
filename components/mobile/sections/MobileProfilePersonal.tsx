// components/mobile/sections/MobileProfilePersonal.tsx
"use client";

import { useRef, useState } from "react";
import { Building2, Globe2, IdCard, Mail, MapPin, Phone, Save, UserRound } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileTextField } from "@/components/mobile/ui/MobileFields";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { Badge } from "@/components/ui/Badge";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { isEmail, isPhone } from "@/components/ui/validate";

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

/** Informações Pessoais: editable form saved into the profile (shared with the desktop through ProfileProvider). */
export function MobileProfilePersonal() {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const form = useRef<HTMLFormElement>(null);
  const draft = useDraft<Record<Key, string>>({ name: profile.name, email: profile.email, phone: profile.phone, city: profile.city, state: profile.state, country: profile.country });
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

  return (
    <form ref={form} noValidate onSubmit={onSubmit} aria-label="Informações pessoais" className="grid gap-4">
      {draft.dirty && (
        <p>
          <Badge tone="warn" dot>
            Alterações não salvas
          </Badge>
        </p>
      )}
      <MobileTextField label="Nome completo" icon={UserRound} autoComplete="name" {...field("name")} />
      <MobileTextField label="E-mail" icon={Mail} type="email" autoComplete="email" inputMode="email" autoCapitalize="none" {...field("email")} />
      <MobileTextField label="Telefone" icon={Phone} type="tel" autoComplete="tel" inputMode="tel" {...field("phone")} />
      <MobileTextField label="Documento" icon={IdCard} value={profile.document} readOnly hint="Por segurança, o documento só pode ser alterado pelo suporte." className="bg-canvas/60 text-ink-soft" />
      <MobileTextField label="Cidade" icon={Building2} autoComplete="address-level2" {...field("city")} />
      <MobileTextField label="Estado" icon={MapPin} autoComplete="address-level1" maxLength={40} {...field("state")} />
      <MobileTextField label="País" icon={Globe2} autoComplete="country-name" {...field("country")} />

      <div className="grid gap-2.5 pt-1">
        <MobileButton type="submit" size="lg" full disabled={!draft.dirty}>
          <Save className="size-5" aria-hidden="true" />
          Salvar alterações
        </MobileButton>
        <MobileButton
          variant="ghost"
          full
          disabled={!draft.dirty}
          onClick={() => {
            clear();
            toast({ title: "Alterações descartadas", tone: "info" });
          }}
        >
          Descartar alterações
        </MobileButton>
      </div>
    </form>
  );
}
