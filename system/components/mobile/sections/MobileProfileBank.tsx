// components/mobile/sections/MobileProfileBank.tsx
"use client";

import { useRef, useState } from "react";
import { Banknote, CreditCard, Hash, Landmark, Lock, PencilLine, ShieldCheck, UserRound } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSelect, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { digitsOnly } from "@/components/ui/validate";
import { maskAccount, type BankAccount } from "@/config/profile";

const TYPE_LABEL: Record<BankAccount["accountType"], string> = { checking: "Conta corrente (checking)", savings: "Conta poupança (savings)" };
const FORM_ID = "m-perfil-bank-form";

type Key = "holder" | "bank" | "routing" | "account" | "accountType" | "password";

function validate(v: Record<Key, string>): Partial<Record<Key, string>> {
  const e: Partial<Record<Key, string>> = {};
  if (v.holder.trim().length < 3) e.holder = "Informe o nome do titular, como está no banco.";
  if (!v.bank.trim()) e.bank = "Informe o nome do banco.";
  if (!/^\d{9}$/.test(v.routing)) e.routing = "O routing number (ABA) tem 9 dígitos.";
  if (!/^\d{4,17}$/.test(v.account)) e.account = "Informe o número da conta (de 4 a 17 dígitos).";
  if (v.password.length < 6) e.password = "Digite sua senha (mínimo de 6 caracteres) para confirmar.";
  return e;
}

function BankSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const body = useRef<HTMLFormElement>(null);
  const b = profile.bank;
  const draft = useDraft<Record<Key, string>>({ holder: b.holder, bank: b.bank, routing: b.routing, account: "", accountType: b.accountType, password: "" });
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
      focusFirstInvalid(body.current);
      return;
    }
    setSaving(true);
    const v = draft.values;
    window.setTimeout(() => {
      updateProfile({ bank: { holder: v.holder.trim(), bank: v.bank.trim(), routing: v.routing, account: v.account, accountType: v.accountType as BankAccount["accountType"] } });
      toast({ title: "Conta bancária atualizada", description: `Os próximos repasses serão enviados para a conta ${maskAccount(v.account)}.` });
      close();
    }, 700);
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Alterar conta bancária"
      description="Os repasses em dólar serão enviados para esta conta."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full loading={saving}>
          Confirmar alteração
        </MobileButton>
      }
    >
      <form ref={body} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <MobileTextField label="Titular da conta" icon={UserRound} autoComplete="off" value={draft.values.holder} error={err("holder")} onChange={(e) => draft.set("holder", e.target.value)} />
        <MobileTextField label="Banco" icon={Landmark} autoComplete="off" value={draft.values.bank} error={err("bank")} onChange={(e) => draft.set("bank", e.target.value)} />
        <MobileTextField
          label="Routing number (ABA)"
          icon={Hash}
          inputMode="numeric"
          maxLength={9}
          placeholder="9 dígitos"
          autoComplete="off"
          value={draft.values.routing}
          error={err("routing")}
          onChange={(e) => draft.set("routing", digitsOnly(e.target.value))}
        />
        <MobileTextField
          label="Número da conta"
          icon={CreditCard}
          inputMode="numeric"
          maxLength={17}
          placeholder={`Atual: ${maskAccount(b.account)}`}
          autoComplete="off"
          value={draft.values.account}
          error={err("account")}
          onChange={(e) => draft.set("account", digitsOnly(e.target.value))}
        />
        <MobileSelect
          label="Tipo de conta"
          value={draft.values.accountType}
          onChange={(e) => draft.set("accountType", e.target.value)}
          options={[
            { value: "checking", label: TYPE_LABEL.checking },
            { value: "savings", label: TYPE_LABEL.savings },
          ]}
        />
        <div className="rounded-[12px] bg-brand-soft/60 p-3.5">
          <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink">
            <ShieldCheck className="size-[18px] text-brand" aria-hidden="true" />
            Confirmação de segurança
          </p>
          <MobileTextField
            label="Sua senha"
            icon={Lock}
            type="password"
            autoComplete="current-password"
            hint="Digite a senha da sua conta para autorizar a mudança."
            value={draft.values.password}
            error={err("password")}
            onChange={(e) => draft.set("password", e.target.value)}
          />
        </div>
      </form>
    </MobileSheet>
  );
}

/** Dados Bancários: the account that receives the payouts (masked) and the "Alterar" sheet. */
export function MobileProfileBank() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const b = profile.bank;

  return (
    <div className="grid gap-4">
      <div className="rounded-[14px] bg-card px-4 py-1">
        <DefinitionList
          rows={[
            { icon: <UserRound className="size-5 text-brand" aria-hidden="true" />, label: "Titular", value: b.holder },
            { icon: <Landmark className="size-5 text-brand" aria-hidden="true" />, label: "Banco", value: b.bank },
            { icon: <Hash className="size-5 text-brand" aria-hidden="true" />, label: "Routing (ABA)", value: b.routing },
            { icon: <CreditCard className="size-5 text-brand" aria-hidden="true" />, label: "Conta", value: maskAccount(b.account) },
            { icon: <Banknote className="size-5 text-brand" aria-hidden="true" />, label: "Tipo", value: b.accountType === "checking" ? "Corrente" : "Poupança" },
          ]}
        />
      </div>
      <p className="flex items-start gap-2.5 rounded-[12px] bg-canvas/70 p-3.5 text-[13.5px] text-ink-soft">
        <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-brand" aria-hidden="true" />
        Por segurança, o número completo da conta nunca é exibido. Qualquer alteração exige a confirmação da sua senha.
      </p>
      <MobileButton size="lg" full onClick={() => setOpen(true)}>
        <PencilLine className="size-5" aria-hidden="true" />
        Alterar conta
      </MobileButton>
      <BankSheet open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
