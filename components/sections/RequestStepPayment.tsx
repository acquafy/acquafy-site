// components/sections/RequestStepPayment.tsx
"use client";

import Link from "next/link";
import { Building2, CreditCard, Landmark } from "lucide-react";
import { Checkbox } from "@/components/ui/Field";
import { RadioCardGroup, type RadioCardOption } from "@/components/ui/RadioCardGroup";
import { PAYMENT_OPTIONS, type PaymentMethod, type RequestDraft } from "@/config/request-page";
import type { DraftErrors } from "@/lib/portal/projection";

type Props = { draft: RequestDraft; errors: DraftErrors; onChange: (patch: Partial<RequestDraft>) => void };

const ICONS = { wire: Landmark, card: CreditCard, ach: Building2 } as const;

function Instructions({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-3 grid list-decimal gap-1.5 rounded-lg bg-card/80 py-3 pr-3 pl-8 text-[13.5px] leading-snug text-ink-soft marker:font-bold marker:text-brand">
      {steps.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  );
}

export function RequestStepPayment({ draft, errors, onChange }: Props) {
  const options: RadioCardOption<PaymentMethod>[] = PAYMENT_OPTIONS.map((o) => ({
    value: o.value,
    label: o.label,
    description: o.description,
    icon: ICONS[o.value],
    extra: draft.payment === o.value ? <Instructions steps={o.steps} /> : undefined,
  }));

  return (
    <div className="grid gap-5">
      <RadioCardGroup legend="Forma de pagamento" name="payment" options={options} value={draft.payment} onChange={(payment) => onChange({ payment })} />

      <div>
        <Checkbox
          checked={draft.accepted}
          onChange={(e) => onChange({ accepted: e.target.checked })}
          aria-invalid={!!errors.accepted || undefined}
          aria-describedby={errors.accepted ? "terms-error" : undefined}
          className="items-start"
          label={
            <span>
              Li e aceito os{" "}
              <Link href="/documentos" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-brand">
                termos e condições
              </Link>{" "}
              do Contrato de Participação Acquafy WaaS para esta solicitação.
            </span>
          }
        />
        {errors.accepted && (
          <p id="terms-error" role="alert" className="mt-1.5 text-[13px] font-medium text-danger">
            {errors.accepted}
          </p>
        )}
      </div>
    </div>
  );
}
