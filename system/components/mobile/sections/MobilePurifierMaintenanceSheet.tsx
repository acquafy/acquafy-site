// components/mobile/sections/MobilePurifierMaintenanceSheet.tsx
"use client";

import { useState } from "react";
import { Wrench } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileSelect, MobileTextArea } from "@/components/mobile/ui/MobileFields";
import { MobileSheet } from "@/components/mobile/ui/MobileSheet";
import { useToast } from "@/components/providers/ToastProvider";
import type { Purifier } from "@/config/investor";
import type { MaintenanceRequest } from "@/config/mobile-purifiers";
import { maintenanceReasons } from "@/config/purifiers-page";
import { useHeld } from "@/lib/mobile/useHeld";

type Props = { purifier: Purifier | null; today: string; onClose: () => void; onCreate: (request: MaintenanceRequest) => void };

/** "Solicitar manutenção": reason + description for one purifier. */
export function MobilePurifierMaintenanceSheet({ purifier: current, today, onClose, onCreate }: Props) {
  const toast = useToast();
  const purifier = useHeld(current);
  const [reason, setReason] = useState(maintenanceReasons[0].value);
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string>();

  const close = () => {
    onClose();
    window.setTimeout(() => {
      setReason(maintenanceReasons[0].value);
      setDescription("");
      setError(undefined);
    }, 260);
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
    <MobileSheet
      open={!!current}
      onClose={close}
      title="Solicitar manutenção"
      description={purifier ? `${purifier.model} · S/N ${purifier.serial}` : undefined}
      footer={
        <MobileButton size="lg" full onClick={submit}>
          <Wrench className="size-5" aria-hidden="true" />
          Enviar solicitação
        </MobileButton>
      }
    >
      <div className="grid gap-4">
        <MobileSelect label="Motivo" value={reason} onChange={(e) => setReason(e.target.value)} options={maintenanceReasons} />
        <MobileTextArea
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
    </MobileSheet>
  );
}
