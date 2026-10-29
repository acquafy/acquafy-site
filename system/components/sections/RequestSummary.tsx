// components/sections/RequestSummary.tsx
"use client";

import Image from "next/image";
import { Money } from "@/components/ui/Money";
import { DefinitionList } from "@/components/ui/DefinitionList";
import { PRODUCT, REQUEST_TEXT } from "@/config/request-page";
import type { Projection } from "@/lib/portal/projection";

const NUMBER = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const PCT = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

/** Always-visible simulation card (sticky on wide columns): what the request costs and what it returns. */
export function RequestSummary({ projection: p }: { projection: Projection }) {
  return (
    <aside aria-label="Resumo da simulação" className="card min-w-0 p-5 @[880px]:sticky @[880px]:top-0">
      <h2 className="text-[18px] leading-tight font-extrabold tracking-tight text-ink">Resumo da simulação</h2>

      <div className="mt-4 flex items-center gap-3.5 rounded-xl bg-brand-soft/70 p-3">
        <Image src={PRODUCT.thumb.src} alt="" width={PRODUCT.thumb.width} height={PRODUCT.thumb.height} sizes="48px" className="h-[61px] w-12 shrink-0 object-contain" />
        <div className="min-w-0">
          <p className="text-[15.5px] font-bold text-ink">{PRODUCT.name}</p>
          <p className="tabular text-[14px] text-ink-soft" aria-live="polite">
            {p.quantity} {p.quantity === 1 ? "unidade" : "unidades"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-[13.5px] font-medium text-ink-soft">Investimento</p>
        <p className="tabular text-[30px] leading-tight font-extrabold tracking-tight text-ink" aria-live="polite">
          <Money value={p.investment} whole />
        </p>
      </div>

      <div className="mt-2">
        <DefinitionList
          rows={[
            { label: "Repasse mensal projetado", value: <Money value={p.monthlyPayout} /> },
            { label: `Total em ${p.installments} parcelas`, value: <Money value={p.totalPayout} whole /> },
            { label: "Retorno sobre o investimento", value: <span className="text-ok">+{PCT.format(p.roiPct)}%</span> },
            { label: "Retorno do capital em", value: `${p.paybackMonths} meses` },
            { label: "Impacto estimado", value: `${NUMBER.format(p.litersPerYear)} L/ano` },
          ]}
        />
      </div>

      <p className="mt-3 rounded-lg bg-canvas px-3.5 py-3 text-[13.5px] leading-snug text-ink-soft">
        Com a nova solicitação você terá <strong className="tabular text-ink">{p.newTotalUnits} purificadores</strong> e repasse mensal de{" "}
        <strong className="text-ink">
          <Money value={p.newMonthlyPayout} />
        </strong>
        .
      </p>
      <p className="mt-3 text-[12.5px] leading-snug text-ink-mute">{REQUEST_TEXT.disclaimer}</p>
    </aside>
  );
}
