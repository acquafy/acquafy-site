// components/mobile/sections/MobileRequestSteps.tsx
"use client";

import Image from "next/image";
import { Building2, Check, CreditCard, Landmark, MapPin, Pencil, Warehouse } from "lucide-react";
import { MobileButton } from "@/components/mobile/ui/MobileButton";
import { MobileCard } from "@/components/mobile/ui/MobileCard";
import { MobileCheckbox, MobileSelect, MobileTextField } from "@/components/mobile/ui/MobileFields";
import { MobileQuantityStepper } from "@/components/mobile/ui/MobileQuantityStepper";
import { MobileRadioGroup, type MobileRadioOption } from "@/components/mobile/ui/MobileRadioGroup";
import { DefinitionList, type DefinitionRow } from "@/components/ui/DefinitionList";
import { Money } from "@/components/ui/Money";
import {
  INSTALL_OPTIONS,
  PAYMENT_OPTIONS,
  PRODUCT,
  QUANTITY_MAX,
  QUANTITY_MIN,
  QUANTITY_PRESETS,
  US_STATES,
  type InstallMode,
  type PaymentMethod,
  type RequestDraft,
  type RequestStepId,
} from "@/config/request-page";
import { citiesOf, formatLocation, type DraftErrors, type Projection } from "@/lib/portal/projection";

type StepProps = { draft: RequestDraft; errors: DraftErrors; onChange: (patch: Partial<RequestDraft>) => void };

/** Step 1: the product and how many to add. */
export function MobileRequestStepQuantity({ quantity, unitPrice, errors, onQuantity }: { quantity: number; unitPrice: number; errors: DraftErrors; onQuantity: (n: number) => void }) {
  return (
    <div className="grid gap-4">
      <MobileCard className="grid gap-3">
        <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3">
          <div className="grid place-items-center rounded-[12px] bg-[radial-gradient(ellipse_at_50%_40%,var(--photo-soft-a)_0%,var(--photo-soft-b)_80%)] p-2">
            <Image src={PRODUCT.image.src} alt="Purificador Neo UP" width={PRODUCT.image.width} height={PRODUCT.image.height} sizes="100px" className="h-auto w-20" />
          </div>
          <div className="min-w-0">
            <p className="text-[18px] leading-tight font-extrabold text-ink">{PRODUCT.name}</p>
            <p className="text-[13.5px] leading-snug font-medium text-brand">{PRODUCT.tagline}</p>
            <p className="mt-1.5 text-[13.5px] text-ink-soft">
              <strong className="tabular text-[16px] text-ink">
                <Money value={unitPrice} />
              </strong>{" "}
              por unidade
            </p>
          </div>
        </div>
        <ul className="grid gap-1.5">
          {PRODUCT.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-[14px] text-ink">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" strokeWidth={3} aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      </MobileCard>
      <MobileQuantityStepper label="Quantidade de purificadores" value={quantity} onChange={onQuantity} min={QUANTITY_MIN} max={QUANTITY_MAX} presets={QUANTITY_PRESETS} error={errors.quantity} />
      <p className="tabular rounded-[12px] bg-canvas px-4 py-3 text-center text-[14.5px] text-ink-soft" aria-live="polite">
        {quantity} × <Money value={unitPrice} /> ={" "}
        <strong className="text-[16px] text-ink">
          <Money value={quantity * unitPrice} />
        </strong>
      </p>
    </div>
  );
}

const INSTALL_ICONS = { stock: Warehouse, address: MapPin } as const;
const INSTALL_RADIOS: MobileRadioOption<InstallMode>[] = INSTALL_OPTIONS.map((o) => ({ ...o, icon: INSTALL_ICONS[o.value] }));
const STATE_OPTIONS = [{ value: "", label: "Selecione o estado" }, ...US_STATES.map((s) => ({ value: s.value, label: s.label }))];

/** Step 2: where the purifiers go (stock, or a US address). */
export function MobileRequestStepInstall({ draft, errors, onChange }: StepProps) {
  const cityOptions = [{ value: "", label: draft.state ? "Selecione a cidade" : "Escolha o estado primeiro" }, ...citiesOf(draft.state).map((c) => ({ value: c, label: c }))];
  return (
    <div className="grid gap-4">
      <MobileRadioGroup legend="Onde ficarão os purificadores?" name="install" options={INSTALL_RADIOS} value={draft.install} onChange={(install) => onChange({ install })} />
      {draft.install === "address" && (
        <MobileCard className="grid gap-4">
          <p className="text-[15px] font-bold text-ink">Endereço de instalação (EUA)</p>
          <MobileSelect label="Estado" options={STATE_OPTIONS} value={draft.state} error={errors.state} onChange={(e) => onChange({ state: e.target.value, city: "" })} autoComplete="address-level1" />
          <MobileSelect label="Cidade" options={cityOptions} value={draft.city} error={errors.city} disabled={!draft.state} onChange={(e) => onChange({ city: e.target.value })} autoComplete="address-level2" />
          <MobileTextField label="Endereço" placeholder="Ex.: 1200 International Dr, Suite 300" value={draft.address} error={errors.address} onChange={(e) => onChange({ address: e.target.value })} autoComplete="street-address" />
          <MobileTextField
            label="CEP (ZIP code)"
            placeholder="32819"
            inputMode="numeric"
            maxLength={10}
            hint="5 dígitos ou ZIP+4."
            value={draft.zip}
            error={errors.zip}
            onChange={(e) => onChange({ zip: e.target.value.replace(/[^\d-]/g, "") })}
            autoComplete="postal-code"
          />
        </MobileCard>
      )}
    </div>
  );
}

const PAYMENT_ICONS = { wire: Landmark, card: CreditCard, ach: Building2 } as const;

/** Step 3: how to pay (with the instructions of the chosen method) and the terms. */
export function MobileRequestStepPayment({ draft, errors, onChange }: StepProps) {
  const options: MobileRadioOption<PaymentMethod>[] = PAYMENT_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
    description: o.description,
    icon: PAYMENT_ICONS[o.value],
    extra:
      draft.payment === o.value ? (
        <ol className="mt-3 grid list-decimal gap-1.5 rounded-[10px] bg-card/80 py-2.5 pr-3 pl-7 text-[13px] leading-snug text-ink-soft marker:font-bold marker:text-brand">
          {o.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      ) : undefined,
  }));
  return (
    <div className="grid gap-4">
      <MobileRadioGroup legend="Forma de pagamento" name="payment" options={options} value={draft.payment} onChange={(payment) => onChange({ payment })} />
      <div>
        <MobileCheckbox
          checked={draft.accepted}
          onChange={(e) => onChange({ accepted: e.target.checked })}
          aria-invalid={!!errors.accepted || undefined}
          aria-describedby={errors.accepted ? "m-terms-error" : undefined}
          className="items-start py-1"
          label={
            <span>
              Li e aceito os <strong className="text-brand">termos e condições</strong> do Contrato de Participação Acquafy WaaS para esta solicitação.
            </span>
          }
        />
        {errors.accepted && (
          <p id="m-terms-error" role="alert" className="text-[13px] font-medium text-danger">
            {errors.accepted}
          </p>
        )}
      </div>
    </div>
  );
}

function Block({ title, step, onEdit, rows }: { title: string; step: RequestStepId; onEdit: (step: RequestStepId) => void; rows: DefinitionRow[] }) {
  return (
    <MobileCard as="section" aria-label={title}>
      <div className="mb-1 flex items-center justify-between gap-3">
        <h3 className="text-[16px] font-bold text-ink">{title}</h3>
        <MobileButton variant="soft" size="sm" aria-label={`Editar ${title}`} onClick={() => onEdit(step)}>
          <Pencil className="size-4" aria-hidden="true" />
          Editar
        </MobileButton>
      </div>
      <DefinitionList rows={rows} />
    </MobileCard>
  );
}

/** Step 4: everything the investor filled in, each block editable, plus the total. */
export function MobileRequestStepReview({ draft, projection: p, unitPrice, onEdit }: { draft: RequestDraft; projection: Projection; unitPrice: number; onEdit: (step: RequestStepId) => void }) {
  const payment = PAYMENT_OPTIONS.find((o) => o.value === draft.payment);
  return (
    <div className="grid gap-3">
      <Block
        title="Quantidade e modelo"
        step="quantity"
        onEdit={onEdit}
        rows={[
          { label: "Modelo", value: PRODUCT.name },
          { label: "Quantidade", value: `${draft.quantity} ${draft.quantity === 1 ? "unidade" : "unidades"}` },
          { label: "Preço por unidade", value: <Money value={unitPrice} /> },
        ]}
      />
      <Block
        title="Instalação"
        step="install"
        onEdit={onEdit}
        rows={[
          { label: "Instalação", value: draft.install === "stock" ? "Estoque Acquafy" : "Endereço informado" },
          ...(draft.install === "address" ? [{ label: "Endereço", value: <span className="block text-right font-semibold break-words whitespace-normal">{formatLocation(draft)}</span> }] : []),
        ]}
      />
      <Block
        title="Pagamento"
        step="payment"
        onEdit={onEdit}
        rows={[
          { label: "Forma de pagamento", value: <span className="block text-right whitespace-normal">{payment?.label ?? ""}</span> },
          { label: "Termos do contrato", value: "Aceitos" },
        ]}
      />
      <div className="rounded-[14px] bg-brand-soft px-4 py-3.5">
        <p className="text-[14.5px] font-semibold text-ink">Total a investir</p>
        <p className="tabular text-[26px] font-extrabold text-ink">
          <Money value={p.investment} />
        </p>
        <p className="text-[13.5px] text-ink-soft">
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
