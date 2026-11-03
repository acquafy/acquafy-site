// components/sections/RequestStepQuantity.tsx
"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { Money } from "@/components/ui/Money";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { PRODUCT, QUANTITY_MAX, QUANTITY_MIN, QUANTITY_PRESETS } from "@/config/request-page";
import type { DraftErrors } from "@/lib/portal/projection";

type Props = { quantity: number; unitPrice: number; errors: DraftErrors; onQuantity: (n: number) => void };

export function RequestStepQuantity({ quantity, unitPrice, errors, onQuantity }: Props) {
  return (
    <div className="grid gap-5">
      <article className="@container rounded-xl border border-line p-4">
        <div className="grid gap-4 @md:grid-cols-[8.5rem_minmax(0,1fr)] @md:items-center">
          <div className="grid place-items-center rounded-xl bg-[radial-gradient(ellipse_at_50%_40%,var(--photo-soft-a)_0%,var(--photo-soft-b)_80%)] p-3">
            <Image src={PRODUCT.image.src} alt="Purificador Neo UP" width={PRODUCT.image.width} height={PRODUCT.image.height} sizes="152px" className="h-auto w-28 @md:w-full" />
          </div>
          <div className="min-w-0">
            <p className="text-[19px] leading-tight font-extrabold text-ink">{PRODUCT.name}</p>
            <p className="text-[14px] font-medium text-brand">{PRODUCT.tagline}</p>
            <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">{PRODUCT.description}</p>
            <ul className="mt-3 grid gap-1.5">
              {PRODUCT.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-[14px] text-ink">
                  <Check className="mt-0.5 size-4 shrink-0 text-ok" strokeWidth={3} aria-hidden="true" />
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[14px] text-ink-soft">
              Preço por unidade:{" "}
              <strong className="tabular text-[17px] text-ink">
                <Money value={unitPrice} />
              </strong>
            </p>
          </div>
        </div>
      </article>

      <QuantityStepper label="Quantidade de purificadores" value={quantity} onChange={onQuantity} min={QUANTITY_MIN} max={QUANTITY_MAX} presets={QUANTITY_PRESETS} error={errors.quantity} />

      <p className="tabular rounded-lg bg-canvas px-4 py-3 text-[14.5px] text-ink-soft" aria-live="polite">
        {quantity} × <Money value={unitPrice} /> ={" "}
        <strong className="text-[16px] text-ink">
          <Money value={quantity * unitPrice} />
        </strong>
      </p>
    </div>
  );
}
