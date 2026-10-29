// components/mobile/sections/MobileContractBuyback.tsx
"use client";

import { useState } from "react";
import { Info, RefreshCw } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileConfirmSheet } from "@/components/mobile/ui/MobileConfirmSheet";
import { MobileQuantityStepper } from "@/components/mobile/ui/MobileQuantityStepper";
import { MobileSectionHeader } from "@/components/mobile/ui/MobileSectionHeader";
import { useToast } from "@/components/providers/ToastProvider";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { formatDate, formatUsd } from "@/lib/format";
import type { NewContractEvent } from "@/lib/portal/useContractEvents";
import type { ContractEvent } from "@/config/contract-page";

type Props = {
  /** Units under the contract (the most that can be bought back). */
  units: number;
  /** Price of one unit, in USD. */
  unitPrice: number;
  /** Share of the amount invested that the buy-back pays (0.3 = 30%). */
  buybackShare: number;
  endDate: string;
  addEvent: (input: NewContractEvent) => ContractEvent;
};

/** Buy-back simulator: units × unit price × buy-back share, with the formula spelled out. */
export function MobileContractBuyback({ units, unitPrice, buybackShare, endDate, addEvent }: Props) {
  const toast = useToast();
  const [qty, setQty] = useState(1);
  const [confirming, setConfirming] = useState(false);

  const share = Math.round(buybackShare * 100);
  const proportional = qty * unitPrice;
  const value = proportional * buybackShare;
  const presets = [...new Set([1, Math.min(5, units), Math.min(10, units), units])];

  const confirm = () => {
    const event = addEvent({
      kind: "recompra",
      title: `Solicitação de recompra: ${qty} ${qty === 1 ? "unidade" : "unidades"}`,
      description: `Valor indicativo de ${formatUsd(value)} (${share}% de ${formatUsd(proportional)}). Sujeito a análise.`,
    });
    setConfirming(false);
    toast({ title: "Recompra solicitada", description: `Protocolo ${event.protocol}. Acompanhe em Histórico.` });
  };

  return (
    <MobileCard as="section" aria-label="Simulador de recompra" className="grid gap-3">
      <MobileSectionHeader level={3} title="Simulador de recompra" subtitle={`Opcional, ao término do contrato (${formatDate(endDate)}).`} />
      <MobileQuantityStepper label="Unidades a recomprar" value={qty} onChange={setQty} min={1} max={units} presets={presets} />
      <p className="text-center text-[13px] text-ink-soft">Você tem {units} unidades no contrato.</p>

      <div className="rounded-[14px] bg-brand-gradient p-4 text-white">
        <p className="text-[13.5px] font-semibold text-white/85">Valor indicativo da recompra</p>
        <p className="tabular text-[30px] leading-tight font-extrabold" aria-live="polite">
          <Money value={value} />
        </p>
        <p className="text-[13px] text-white/85">
          para {qty} {qty === 1 ? "unidade" : "unidades"}
        </p>
      </div>

      <DefinitionList
        rows={[
          { label: `Investido em ${qty} ${qty === 1 ? "unidade" : "unidades"}`, value: <Money value={proportional} /> },
          { label: "Percentual de recompra", value: `${share}%` },
          { label: "Valor indicativo", value: <Money value={value} /> },
        ]}
      />
      <p className="tabular -mt-1 text-[12.5px] text-ink-mute">
        Fórmula: {qty} × {formatUsd(unitPrice)} × {share}% = {formatUsd(value)}
      </p>
      <p className="flex gap-2 rounded-[12px] bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Valor indicativo, sujeito a análise. O valor final é confirmado pela Acquafy no momento da recompra.
      </p>
      <MobileButton size="lg" full onClick={() => setConfirming(true)}>
        <RefreshCw className="size-5" aria-hidden="true" />
        Solicitar recompra
      </MobileButton>

      <MobileConfirmSheet
        open={confirming}
        title="Confirmar recompra"
        description="A Acquafy analisa e retorna em até 5 dias úteis."
        confirmLabel="Confirmar solicitação"
        onConfirm={confirm}
        onCancel={() => setConfirming(false)}
      >
        <DefinitionList
          rows={[
            { label: "Unidades", value: `${qty} de ${units}` },
            { label: "Valor investido", value: <Money value={proportional} /> },
            { label: "Percentual", value: `${share}%` },
            { label: "Valor indicativo", value: <Money value={value} /> },
          ]}
        />
        <p className="mt-3 text-[13px] text-ink-soft">Esta solicitação não cancela o contrato nem os repasses já programados.</p>
      </MobileConfirmSheet>
    </MobileCard>
  );
}
