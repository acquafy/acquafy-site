// components/sections/ProfileBankPanel.tsx
"use client";

import { useRef, useState } from "react";
import { Banknote, CreditCard, Hash, Landmark, Lock, PencilLine, ShieldCheck, UserRound } from "lucide-react";
import { useProfile } from "@/components/providers/ProfileProvider";
import { useToast } from "@/components/providers/ToastProvider";
import { maskAccount, type BankAccount } from "@/config/profile";
import { Button } from "@/components/ui/Button";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Select, TextField } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { useDraft } from "@/components/ui/useDraft";
import { focusFirstInvalid, useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { digitsOnly } from "@/components/ui/validate";
import { ProfilePanel } from "./ProfilePanel";

const TYPE_LABEL: Record<BankAccount["accountType"], string> = { checking: "Conta corrente (checking)", savings: "Conta poupança (savings)" };
const FORM_ID = "perfil-bank-form";

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

function BankModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, updateProfile } = useProfile();
  const toast = useToast();
  const body = useRef<HTMLFormElement>(null);
  const b = profile.bank;
  const draft = useDraft<Record<Key, string>>({ holder: b.holder, bank: b.bank, routing: b.routing, account: "", accountType: b.accountType, password: "" });
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  useFocusOnOpen(open, body);

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
      focusFirstInvalid(body.current);
      return;
    }
    setSaving(true);
    const v = draft.values;
    window.setTimeout(() => {
      updateProfile({
        bank: { holder: v.holder.trim(), bank: v.bank.trim(), routing: v.routing, account: v.account, accountType: v.accountType as BankAccount["accountType"] },
      });
      toast({ title: "Conta bancária atualizada", description: `Os próximos repasses serão enviados para a conta ${maskAccount(v.account)}.` });
      close();
    }, 700);
  };

  return (
    <Modal
      open={open}
      onClose={close}
      title="Alterar conta bancária"
      description="Os repasses em dólar serão enviados para esta conta."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={saving}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID} loading={saving}>
            Confirmar alteração
          </Button>
        </>
      }
    >
      <form ref={body} id={FORM_ID} noValidate onSubmit={onSubmit} className="grid gap-4">
        <TextField label="Titular da conta" icon={UserRound} autoComplete="off" value={draft.values.holder} error={err("holder")} onChange={(e) => draft.set("holder", e.target.value)} />
        <TextField label="Banco" icon={Landmark} autoComplete="off" value={draft.values.bank} error={err("bank")} onChange={(e) => draft.set("bank", e.target.value)} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
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
          <TextField
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
        </div>
        <Select
          label="Tipo de conta"
          value={draft.values.accountType}
          onChange={(e) => draft.set("accountType", e.target.value)}
          options={[
            { value: "checking", label: TYPE_LABEL.checking },
            { value: "savings", label: TYPE_LABEL.savings },
          ]}
        />
        <div className="rounded-xl bg-brand-soft/60 p-4">
          <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink">
            <ShieldCheck className="size-[18px] text-brand" aria-hidden="true" />
            Confirmação de segurança
          </p>
          <TextField
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
    </Modal>
  );
}

export function ProfileBankPanel() {
  const { profile } = useProfile();
  const [open, setOpen] = useState(false);
  const b = profile.bank;

  return (
    <ProfilePanel
      id="bancarios"
      title="Dados Bancários"
      description="Conta para recebimento dos repasses."
      icon={CreditCard}
      tone="blue"
      action={
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
          <PencilLine className="size-4" aria-hidden="true" />
          Alterar
        </Button>
      }
    >
      <DefinitionList
        rows={[
          { icon: <UserRound className="size-5 text-brand" aria-hidden="true" />, label: "Titular", value: b.holder },
          { icon: <Landmark className="size-5 text-brand" aria-hidden="true" />, label: "Banco", value: b.bank },
          { icon: <Hash className="size-5 text-brand" aria-hidden="true" />, label: "Routing number (ABA)", value: b.routing },
          { icon: <CreditCard className="size-5 text-brand" aria-hidden="true" />, label: "Conta", value: maskAccount(b.account) },
          { icon: <Banknote className="size-5 text-brand" aria-hidden="true" />, label: "Tipo de conta", value: TYPE_LABEL[b.accountType] },
        ]}
      />
      <p className="mt-4 flex items-start gap-2.5 rounded-lg bg-canvas/70 p-3.5 text-[13.5px] text-ink-soft">
        <ShieldCheck className="mt-0.5 size-[18px] shrink-0 text-brand" aria-hidden="true" />
        Por segurança, o número completo da conta nunca é exibido. Qualquer alteração exige a confirmação da sua senha.
      </p>
      <BankModal open={open} onClose={() => setOpen(false)} />
    </ProfilePanel>
  );
}
