// components/sections/RequestStepReview.tsx
"use client";

import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DefinitionList, type DefinitionRow } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import { PAYMENT_OPTIONS, PRODUCT, type RequestDraft, type RequestStepId } from "@/config/request-page";
import { formatLocation, type Projection } from "@/lib/portal/projection";

type Props = { draft: RequestDraft; projection: Projection; unitPrice: number; onEdit: (step: RequestStepId) => void };

function Block({ title, step, onEdit, children }: { title: string; step: RequestStepId; onEdit: (step: RequestStepId) => void; children: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-xl border border-line p-4">
      <div className="mb-1 flex items-center justify-between gap-3">
        <h3 className="text-[15.5px] font-bold text-ink">{title}</h3>
        <Button variant="soft" size="sm" aria-label={`Editar ${title}`} onClick={() => onEdit(step)}>
          <Pencil className="size-4" aria-hidden="true" />
          Editar
        </Button>
      </div>
      {children}
    </section>
  );
}

export function RequestStepReview({ draft, projection: p, unitPrice, onEdit }: Props) {
  const payment = PAYMENT_OPTIONS.find((o) => o.value === draft.payment);

  const quantityRows: DefinitionRow[] = [
    { label: "Modelo", value: PRODUCT.name },
    { label: "Quantidade", value: `${draft.quantity} ${draft.quantity === 1 ? "unidade" : "unidades"}` },
    { label: "Preço por unidade", value: <Money value={unitPrice} /> },
  ];
  const installRows: DefinitionRow[] = [
    { label: "Instalação", value: draft.install === "stock" ? "Estoque Acquafy" : "Endereço informado" },
    ...(draft.install === "address" ? [{ label: "Endereço", value: <span className="block text-right font-semibold break-words whitespace-normal">{formatLocation(draft)}</span> }] : []),
  ];
  const paymentRows: DefinitionRow[] = [
    { label: "Forma de pagamento", value: payment?.label ?? "" },
    { label: "Termos do contrato", value: "Aceitos" },
  ];

  return (
    <div className="grid gap-4">
      <Block title="Quantidade e modelo" step="quantity" onEdit={onEdit}>
        <DefinitionList rows={quantityRows} />
      </Block>
      <Block title="Instalação" step="install" onEdit={onEdit}>
        <DefinitionList rows={installRows} />
      </Block>
      <Block title="Pagamento" step="payment" onEdit={onEdit}>
        <DefinitionList rows={paymentRows} />
      </Block>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 rounded-xl bg-brand-soft px-5 py-4">
        <p className="text-[15px] font-semibold text-ink">Total a investir</p>
        <p className="tabular text-[24px] font-extrabold text-ink">
          <Money value={p.investment} />
        </p>
        <p className="basis-full text-[13.5px] text-ink-soft">
          Repasse adicional projetado de{" "}
          <strong className="text-ink">
            <Money value={p.monthlyPayout} />
          </strong>{" "}
          por mês.
        </p>
      </div>
    </div>
  );
}
