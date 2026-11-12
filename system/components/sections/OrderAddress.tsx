"use client";
import { useState, useTransition } from "react";
import { Select, TextField } from "@/components/ui/Field";
import { lookupCep } from "@/lib/orders/account";
import { ADDRESS_COUNTRIES, BR_STATES, PHONE_COUNTRIES, US_STATES, asCountry, storedCountry, type CountryCode, type PhoneCountry } from "@/lib/orders/address-formats";

type Initial = Partial<Record<"country_code" | "postal_code" | "street" | "number" | "complement" | "district" | "city" | "state" | "country" | "phone", string>>;

/**
 * Delivery address of the order form, in the format of the customer's country: Brazil (CEP that fills street,
 * district, city and UF through ViaCEP), the United States (address lines, city, state, ZIP code) or any other
 * country. The server checks the same rules (lib/orders/delivery.ts).
 */
export function OrderAddress({ defaultCountry, initial }: { defaultCountry: CountryCode; initial?: Initial }) {
  // A saved address keeps its own country (orders placed before country_code existed: from the country name).
  const start = storedCountry(initial) ?? defaultCountry;
  const [country, setCountry] = useState<CountryCode>(start);
  // Older addresses kept the street number apart; outside Brazil it belongs in line 1 ("123 Main St").
  const legacyStreet = !initial?.country_code && start !== "BR" && initial?.number ? `${initial.number} ${initial.street ?? ""}`.trim() : initial?.street;
  const [address, setAddress] = useState({ street: legacyStreet ?? "", district: initial?.district ?? "", city: initial?.city ?? "", state: initial?.state ?? "" });
  const [notice, setNotice] = useState<string | null>(null);
  const [looking, startLookup] = useTransition();
  const set = (key: keyof typeof address) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setAddress((a) => ({ ...a, [key]: e.target.value }));

  function changeCountry(next: CountryCode) {
    setCountry(next);
    setNotice(null);
    // A Brazilian UF is not a US state (PA, MA, SC… exist in both): pick the state again.
    setAddress((a) => ({ ...a, state: "", district: next === "BR" ? a.district : "" }));
  }

  function fill(cep: string) {
    if (country !== "BR" || cep.replace(/\D/g, "").length !== 8) return;
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

  const brazil = country === "BR";
  const us = country === "US";
  return (
    <fieldset className="grid gap-3.5">
      <legend className="mb-1 text-[15.5px] font-extrabold tracking-tight text-ink">Endereço de entrega</legend>
      <input type="hidden" name="country_code" value={country} />
      <Select
        label="País"
        value={country}
        onChange={(e) => changeCountry(asCountry(e.target.value))}
        options={ADDRESS_COUNTRIES.map((c) => ({ value: c.code, label: c.label }))}
      />
      {country === "OTHER" && <TextField name="country" label="Nome do país" required maxLength={80} autoComplete="country-name" defaultValue={initial?.country} />}

      {brazil && (
        <TextField
          key="cep"
          name="postal_code"
          label="CEP"
          required
          maxLength={9}
          autoComplete="postal-code"
          inputMode="numeric"
          placeholder="00000-000"
          defaultValue={initial?.postal_code}
          hint={looking ? "Buscando endereço…" : (notice ?? undefined)}
          onBlur={(e) => fill(e.target.value)}
        />
      )}

      <TextField
        name="street"
        label={brazil ? "Rua / avenida" : us ? "Address line 1 (número e rua)" : "Endereço (número e rua)"}
        required
        maxLength={160}
        autoComplete="address-line1"
        placeholder={us ? "123 Main St" : undefined}
        value={address.street}
        onChange={set("street")}
      />
      {brazil ? (
        <div className="grid gap-3.5 @sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <TextField name="number" label="Número" required maxLength={20} defaultValue={initial?.number} />
          <TextField name="complement" label="Complemento" maxLength={80} autoComplete="address-line2" defaultValue={initial?.complement} />
        </div>
      ) : (
        <TextField
          name="complement"
          label={us ? "Address line 2 (apto, suite) · opcional" : "Complemento · opcional"}
          maxLength={80}
          autoComplete="address-line2"
          placeholder={us ? "Apt 4B" : undefined}
          defaultValue={initial?.complement}
        />
      )}
      {brazil && <TextField name="district" label="Bairro" required maxLength={80} value={address.district} onChange={set("district")} />}

      <div className="grid gap-3.5 @sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <TextField name="city" label={us ? "City (cidade)" : "Cidade"} required maxLength={80} autoComplete="address-level2" value={address.city} onChange={set("city")} />
        {brazil || us ? (
          <Select
            name="state"
            label={brazil ? "UF" : "State (estado)"}
            required
            autoComplete="address-level1"
            value={address.state}
            onChange={set("state")}
            options={[
              { value: "", label: "Escolha" },
              ...(brazil ? BR_STATES.map((uf) => ({ value: uf, label: uf })) : US_STATES.map(([code, name]) => ({ value: code, label: `${code} · ${name}` }))),
            ]}
          />
        ) : (
          <TextField name="state" label="Estado / província" maxLength={40} autoComplete="address-level1" value={address.state} onChange={set("state")} />
        )}
      </div>
      {!brazil && (
        <TextField
          key={`postal-${country}`}
          name="postal_code"
          label={us ? "ZIP code" : "Código postal (se houver)"}
          required={us}
          maxLength={us ? 10 : 12}
          autoComplete="postal-code"
          inputMode={us ? "numeric" : undefined}
          placeholder={us ? "78701" : undefined}
          defaultValue={start === country ? initial?.postal_code : undefined}
        />
      )}
    </fieldset>
  );
}

/** Phone with its country: Brazil (DDD + number), US (10 digits) or another country (international format). */
export function OrderPhone({ defaultCountry, initial }: { defaultCountry: CountryCode; initial?: string }) {
  // Stored numbers are international (+55…, +1…); older orders may hold a national number ("(11) 99999-9999"),
  // which belongs to the address's country.
  const saved = initial?.trim() ?? "";
  const start: PhoneCountry = saved.startsWith("+55") ? "BR" : saved.startsWith("+1") ? "US" : saved.startsWith("+") ? "OTHER" : defaultCountry;
  const [country, setCountry] = useState<PhoneCountry>(start);
  const [number, setNumber] = useState(saved.startsWith("+55") ? saved.slice(3).trim() : saved.startsWith("+1") ? saved.slice(2).trim() : saved);
  return (
    <div className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-2">
      <Select
        name="phone_country"
        label="País"
        value={country}
        onChange={(e) => setCountry(e.target.value as PhoneCountry)}
        options={PHONE_COUNTRIES.map((c) => ({ value: c.code, label: c.label }))}
      />
      <TextField
        name="phone"
        type="tel"
        label="Telefone"
        required
        maxLength={24}
        autoComplete={country === "OTHER" ? "tel" : "tel-national"}
        placeholder={country === "BR" ? "11 99999-9999" : country === "US" ? "512 555-1234" : "+44 20 7946 0958"}
        // Changing the country keeps what was typed.
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
    </div>
  );
}
