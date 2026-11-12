// Delivery address and contact of a fixed-price order, read from the order form (place) or the edit form.
// Brazil, the United States and other countries each have their own address and phone rules (address-formats.ts).
// `address` is the one-line version staff and the lease agreement use; the parts are kept for editing, and
// `country_code` + `state` give the installation region.
import { asCountry, normalizePhone, normalizePostal, validState, type CountryCode, type PhoneCountry } from "./address-formats";

export type Delivery = {
  name: string;
  phone: string;
  country_code: CountryCode;
  postal_code: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  country: string;
  address: string;
};

const COUNTRY_NAME: Record<Exclude<CountryCode, "OTHER">, string> = { BR: "Brasil", US: "United States" };

/** The delivery of the form, or the reason it is not valid (shown to the customer). */
export function deliveryFromForm(f: FormData): { delivery: Delivery } | { error: string } {
  const field = (name: string, max = 160) => String(f.get(name) ?? "").trim().slice(0, max);
  const country_code = asCountry(f.get("country_code"));
  const phoneCountry = (["BR", "US", "OTHER"].includes(String(f.get("phone_country"))) ? f.get("phone_country") : country_code) as PhoneCountry;
  const phone = normalizePhone(phoneCountry, field("phone", 40));
  if (field("name").length < 3) return { error: "Informe o nome completo." };
  if (!phone)
    return {
      error:
        phoneCountry === "BR"
          ? "Telefone inválido: informe DDD e número (ex.: 11 99999-9999)."
          : phoneCountry === "US"
            ? "Telefone inválido: informe os 10 dígitos (ex.: 512 555-1234)."
            : "Telefone inválido: use o formato internacional com + e código do país.",
    };
  const postal = normalizePostal(country_code, field("postal_code", 20));
  if (postal === null || (country_code !== "OTHER" && !postal)) return { error: country_code === "BR" ? "CEP inválido (00000-000)." : country_code === "US" ? "ZIP code inválido (00000 ou 00000-0000)." : "Código postal inválido." };
  const state = country_code === "OTHER" ? field("state", 40) : field("state", 40).toUpperCase();
  if (!validState(country_code, state)) return { error: country_code === "BR" ? "Escolha a UF." : country_code === "US" ? "Escolha o estado (state)." : "Estado ou província inválido." };
  const parts = {
    name: field("name"),
    phone,
    country_code,
    postal_code: postal,
    street: field("street"),
    // In the US and elsewhere the number is part of the address line.
    number: country_code === "BR" ? field("number", 20) : "",
    complement: field("complement", 80),
    district: country_code === "BR" ? field("district", 80) : "",
    city: field("city", 80),
    state,
    country: country_code === "OTHER" ? field("country", 80) : COUNTRY_NAME[country_code],
  };
  if (!parts.street || !parts.city || (country_code === "BR" && !parts.number) || (country_code === "OTHER" && parts.country.length < 2))
    return { error: country_code === "BR" ? "Preencha rua, número e cidade." : "Preencha endereço, cidade e país." };
  const address =
    country_code === "BR"
      ? [`${parts.street}, ${parts.number}${parts.complement ? " - " + parts.complement : ""}`, parts.district, `${parts.city} - ${parts.state}`, parts.postal_code, parts.country]
      : // US style: "123 Main St, Apt 4, Austin, TX 78701, United States"
        [parts.street, parts.complement, parts.city, `${parts.state} ${parts.postal_code}`.trim(), parts.country];
  return { delivery: { ...parts, address: address.filter((part) => part.replace(/[\s,-]/g, "")).join(", ") } };
}
