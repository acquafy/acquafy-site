// components/mobile/sections/MobileContractAmendmentSheet.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSelect, MobileTextArea } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { focusFirstInvalid } from "@/components/ui/useFocusOnOpen";
import { AMENDMENT_TYPES } from "@/config/contract-page";

const FORM_ID = "m-contract-amendment-form";
const MIN_REASON = 20;
const MAX_REASON = 500;

type Props = { open: boolean; onClose: () => void; /** Receives the label of the chosen type and the justification. */ onSubmit: (typeLabel: string, reason: string) => void };

/** "Solicitar aditivo": type of amendment + justification, validated before it is registered. */
export function MobileContractAmendmentSheet({ open, onClose, onSubmit }: Props) {
  const form = useRef<HTMLFormElement>(null);
  const [type, setType] = useState(AMENDMENT_TYPES[0].value);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | undefined>();

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setType(AMENDMENT_TYPES[0].value);
      setReason("");
      setError(undefined);
    }, 260);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = reason.trim();
    if (text.length < MIN_REASON) {
      setError(`Explique o motivo com pelo menos ${MIN_REASON} caracteres (${text.length}/${MIN_REASON}).`);
      focusFirstInvalid(form.current);
      return;
    }
    onSubmit(AMENDMENT_TYPES.find((t) => t.value === type)?.label ?? "Outro assunto", text);
    close();
  };

  return (
    <MobileSheet
      open={open}
      onClose={close}
      size="full"
      title="Solicitar aditivo"
      description="A Acquafy analisa e envia a minuta para a sua assinatura."
      footer={
        <MobileButton type="submit" form={FORM_ID} size="lg" full>
          <Send className="size-5" aria-hidden="true" />
          Enviar solicitação
        </MobileButton>
      }
    >
      <form id={FORM_ID} ref={form} onSubmit={submit} noValidate className="grid gap-4">
        <MobileSelect label="Tipo de aditivo" value={type} onChange={(e) => setType(e.target.value)} options={AMENDMENT_TYPES} />
        <MobileTextArea
          label="Justificativa"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (error) setError(undefined);
          }}
          error={error}
          hint={`${reason.length}/${MAX_REASON} · descreva o que muda e por quê`}
          maxLength={MAX_REASON}
          rows={5}
          placeholder="Ex.: Quero incluir 10 novas unidades ao contrato atual."
        />
      </form>
    </MobileSheet>
  );
}
