// components/sections/PurifierMaintenanceModal.tsx
"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Select, TextArea } from "@/components/ui/Field";
import { Modal } from "@/components/ui/Modal";
import { maintenanceReasons } from "@/config/purifiers-page";
import type { Purifier } from "@/config/investor";

export type MaintenanceRequest = { id: string; serial: string; reason: string; description: string; createdAt: string };

type Props = {
  purifier: Purifier | null;
  onClose: () => void;
  onCreate: (request: MaintenanceRequest) => void;
  today: string;
};

export function PurifierMaintenanceModal({ purifier, onClose, onCreate, today }: Props) {
  const toast = useToast();
  const [reason, setReason] = useState(maintenanceReasons[0].value);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>();

  const close = () => {
    setReason(maintenanceReasons[0].value);
    setDescription("");
    setError(undefined);
    onClose();
  };

  const submit = () => {
    if (!purifier) return;
    if (description.trim().length < 10) {
      setError("Descreva o problema com pelo menos 10 caracteres.");
      return;
    }
    const label = maintenanceReasons.find((r) => r.value === reason)?.label ?? reason;
    onCreate({ id: `m-${Date.now()}`, serial: purifier.serial, reason: label, description: description.trim(), createdAt: today });
    toast({ title: "Manutenção solicitada", description: `Nossa equipe entrará em contato sobre o ${purifier.serial}.` });
    close();
  };

  return (
    <Modal
      open={!!purifier}
      onClose={close}
      title="Solicitar manutenção"
      description={purifier ? `${purifier.model} · S/N ${purifier.serial}` : undefined}
      footer={
        <>
          <Button variant="outline" onClick={close}>
            Cancelar
          </Button>
          <Button onClick={submit}>
            <Wrench className="size-4" aria-hidden="true" />
            Enviar solicitação
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Select label="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} options={maintenanceReasons} />
        <TextArea
          label="Descrição do problema"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError(undefined);
          }}
          error={error}
          hint="Quanto mais detalhes, mais rápido o atendimento."
          rows={4}
        />
      </div>
    </Modal>
  );
}
