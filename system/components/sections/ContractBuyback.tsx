// components/sections/ContractBuyback.tsx
"use client";

import { useState } from "react";
import { Info, RefreshCw } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { Modal } from "@/components/ui/Modal";
import { Money } from "@/components/ui/Money";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatDate, formatUsd } from "@/lib/format";
import { useContract } from "./ContractProvider";

type Props = {
  /** Units under the contract (the most that can be bought back). */
  units: number;
  /** Price of one unit, in USD. */
  unitPrice: number;
  /** Share of the amount invested that the buy-back pays (0.3 = 30%). */
  buybackShare: number;
  endDate: string;
};

/** Buy-back simulator: units × unit price × buy-back share, with the formula spelled out. */
export function ContractBuyback({ units, unitPrice, buybackShare, endDate }: Props) {
  const toast = useToast();
  const { addEvent } = useContract();
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
    toast({ title: "Recompra solicitada", description: `Protocolo ${event.protocol}. Acompanhe em Aditivos e histórico.` });
  };

  return (
    <Card id="recompra" title="Simulador de recompra" className="scroll-mt-4">
      <p className="mb-4 text-[14px] leading-snug text-ink-soft">
        Veja quanto você receberia ao recomprar unidades. A recompra é opcional e pode ser pedida ao término do contrato ({formatDate(endDate)}).
      </p>

      <QuantityStepper label="Unidades a recomprar" value={qty} onChange={setQty} min={1} max={units} presets={presets} />
      <p className="mt-1.5 text-[13px] text-ink-soft">Você tem {units} unidades no contrato.</p>

      <div className="mt-4 rounded-xl bg-brand-gradient p-4 text-white">
        <p className="text-[13.5px] font-semibold text-white/85">Valor indicativo da recompra</p>
        <p className="tabular text-[clamp(1.75rem,1.4rem+1vw,2.25rem)] leading-tight font-extrabold" aria-live="polite">
          <Money value={value} />
        </p>
        <p className="text-[13px] text-white/85">
          para {qty} {qty === 1 ? "unidade" : "unidades"}
        </p>
      </div>

      <div className="mt-3">
        <p className="text-[13.5px] font-semibold text-ink">Como calculamos</p>
        <DefinitionList
          rows={[
            { label: `Valor investido em ${qty} ${qty === 1 ? "unidade" : "unidades"}`, value: <Money value={proportional} /> },
            { label: "Percentual de recompra", value: `${share}%` },
            { label: "Valor indicativo", value: <Money value={value} /> },
          ]}
        />
        <p className="tabular mt-1 text-[12.5px] text-ink-mute">
          Fórmula: {qty} × {formatUsd(unitPrice)} × {share}% = {formatUsd(value)}
        </p>
      </div>

      <p className="mt-3 flex gap-2 rounded-lg bg-violet-soft p-3 text-[12.5px] leading-snug text-violet">
        <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        Valor indicativo, sujeito a análise. O valor final é confirmado pela Acquafy no momento da recompra.
      </p>

      <Button className="mt-4 w-full" onClick={() => setConfirming(true)}>
        <RefreshCw className="size-5" aria-hidden="true" />
        Solicitar recompra
      </Button>

      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        size="sm"
        title="Confirmar solicitação de recompra"
        description="Você está pedindo a recompra das unidades abaixo. A Acquafy analisa e retorna em até 5 dias úteis."
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirming(false)}>
              Cancelar
            </Button>
            <Button onClick={confirm}>Confirmar solicitação</Button>
          </>
        }
      >
        <DefinitionList
          rows={[
            { label: "Unidades", value: `${qty} de ${units}` },
            { label: "Valor investido", value: <Money value={proportional} /> },
            { label: "Percentual", value: `${share}%` },
            { label: "Valor indicativo", value: <Money value={value} /> },
          ]}
        />
        <p className="mt-3 text-[13px] text-ink-soft">Valor sujeito a análise. Esta solicitação não cancela o contrato nem os repasses já programados.</p>
      </Modal>
    </Card>
  );
}
