// components/sections/RequestStepInstall.tsx
"use client";

import { MapPin, Warehouse } from "lucide-react";
import { Select, TextField } from "@/components/ui/Field";
import { RadioCardGroup, type RadioCardOption } from "@/components/ui/RadioCardGroup";
import { INSTALL_OPTIONS, US_STATES, type InstallMode, type RequestDraft } from "@/config/request-page";
import { citiesOf, type DraftErrors } from "@/lib/portal/projection";

type Props = { draft: RequestDraft; errors: DraftErrors; onChange: (patch: Partial<RequestDraft>) => void };

const ICONS = { stock: Warehouse, address: MapPin } as const;
const OPTIONS: RadioCardOption<InstallMode>[] = INSTALL_OPTIONS.map((o) => ({ ...o, icon: ICONS[o.value] }));

const STATE_OPTIONS = [{ value: "", label: "Selecione o estado" }, ...US_STATES.map((s) => ({ value: s.value, label: s.label }))];

export function RequestStepInstall({ draft, errors, onChange }: Props) {
  const cityOptions = [{ value: "", label: draft.state ? "Selecione a cidade" : "Escolha o estado primeiro" }, ...citiesOf(draft.state).map((c) => ({ value: c, label: c }))];

  return (
    <div className="grid gap-5">
      <RadioCardGroup legend="Onde ficarão os purificadores?" name="install" options={OPTIONS} value={draft.install} onChange={(install) => onChange({ install })} />

      {draft.install === "address" && (
        <div className="@container rounded-xl border border-line p-4">
          <p className="mb-3 text-[15px] font-bold text-ink">Endereço de instalação (EUA)</p>
          <div className="grid gap-4 @md:grid-cols-2">
            <Select label="Estado" options={STATE_OPTIONS} value={draft.state} error={errors.state} onChange={(e) => onChange({ state: e.target.value, city: "" })} autoComplete="address-level1" />
            <Select
              label="Cidade"
              options={cityOptions}
              value={draft.city}
              error={errors.city}
              disabled={!draft.state}
              onChange={(e) => onChange({ city: e.target.value })}
              autoComplete="address-level2"
            />
            <TextField
              wrapperClassName="@md:col-span-2"
              label="Endereço"
              placeholder="Ex.: 1200 International Dr, Suite 300"
              value={draft.address}
              error={errors.address}
              onChange={(e) => onChange({ address: e.target.value })}
              autoComplete="street-address"
            />
            <TextField
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
          </div>
        </div>
      )}
    </div>
  );
}
