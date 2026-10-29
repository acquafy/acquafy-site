// components/sections/ContractAmendmentModal.tsx
"use client";

import { useRef, useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select, TextArea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { focusFirstInvalid, useFocusOnOpen } from "@/components/ui/useFocusOnOpen";
import { AMENDMENT_TYPES } from "@/config/contract-page";

const FORM_ID = "contract-amendment-form";
const MIN_REASON = 20;
const MAX_REASON = 500;

type Props = {
  open: boolean;
  onClose: () => void;
  /** Receives the label of the chosen type and the justification. */
  onSubmit: (typeLabel: string, reason: string) => void;
};

/**"Solicitar aditivo": type of amendment + justification, validated before it is registered. */
export function ContractAmendmentModal({ open, onClose, onSubmit }: Props) {
  const form = useRef<HTMLFormElement>(null);
  useFocusOnOpen(open, form);

  const [type, setType] = useState(AMENDMENT_TYPES[0].value);
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | undefined>();

  const close = () => {
    setType(AMENDMENT_TYPES[0].value);
    setReason("");
    setError(undefined);
    onClose();
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
    <Modal
      open={open}
      onClose={close}
      title="Solicitar aditivo"
      description="Peça uma alteração ao contrato. A Acquafy analisa e envia a minuta para a sua assinatura."
      footer={
        <>
          <Button variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" form={FORM_ID}>
            <Send className="size-4" aria-hidden="true" />
            Enviar solicitação
          </Button>
        </>
      }
    >
      <form id={FORM_ID} ref={form} onSubmit={submit} noValidate className="grid gap-4">
        <Select label="Tipo de aditivo" value={type} onChange={(e) => setType(e.target.value)} options={AMENDMENT_TYPES} />
        <TextArea
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
    </Modal>
  );
}
