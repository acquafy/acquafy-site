"use client";
import { useState, useTransition } from "react";
import { TextField } from "@/components/ui/Field";
import { lookupCep } from "@/lib/orders/account";

/**
 * Delivery address of the order form. In Brazil the CEP fills street, district, city and state (ViaCEP, looked up on the server);
 * every field stays editable. Elsewhere the customer types the address and the country.
 */
export function OrderAddress({ brazil }: { brazil: boolean }) {
  const [address, setAddress] = useState({ street: "", district: "", city: "", state: "" });
  const [notice, setNotice] = useState<string | null>(null);
  const [looking, startLookup] = useTransition();
  const set = (key: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement>) => setAddress((a) => ({ ...a, [key]: e.target.value }));

  function fill(cep: string) {
    if (!brazil || cep.replace(/\D/g, "").length !== 8) return;
    startLookup(async () => {
      const found = await lookupCep(cep);
      if (!found) return setNotice("CEP não encontrado. Preencha o endereço abaixo.");
      setNotice(null);
      setAddress((a) => ({
        street: found.street || a.street,
        district: found.district || a.district,
        city: found.city || a.city,
        state: found.state || a.state,
      }));
    });
  }

  return (
    <fieldset className="grid gap-3.5">
      <legend className="mb-1 text-[15.5px] font-extrabold tracking-tight text-ink">Endereço de entrega</legend>
      <div className="grid gap-3.5 @sm:grid-cols-2">
        <TextField
          name="postal_code"
          label={brazil ? "CEP" : "Código postal"}
          required
          maxLength={20}
          autoComplete="postal-code"
          inputMode={brazil ? "numeric" : undefined}
          placeholder={brazil ? "00000-000" : undefined}
          hint={looking ? "Buscando endereço…" : (notice ?? undefined)}
          onBlur={(e) => fill(e.target.value)}
        />
        {!brazil && <TextField name="country" label="País" required maxLength={80} autoComplete="country-name" />}
      </div>
      <TextField name="street" label="Rua / avenida" required maxLength={160} autoComplete="address-line1" value={address.street} onChange={set("street")} />
      <div className="grid gap-3.5 @sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <TextField name="number" label="Número" required maxLength={20} />
        <TextField name="complement" label="Complemento" maxLength={80} autoComplete="address-line2" />
      </div>
      <div className="grid gap-3.5 @sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] @lg:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]">
        <TextField name="district" label="Bairro" required={brazil} maxLength={80} value={address.district} onChange={set("district")} />
        <TextField name="city" label="Cidade" required maxLength={80} autoComplete="address-level2" value={address.city} onChange={set("city")} />
        <TextField name="state" label={brazil ? "UF" : "Estado"} required maxLength={40} autoComplete="address-level1" value={address.state} onChange={set("state")} />
      </div>
      {brazil && <input type="hidden" name="country" value="Brasil" />}
    </fieldset>
  );
}
