// Delivery address and phone formats of the order flow: Brazil, the United States and other countries.
// The form (components/sections/OrderAddress.tsx) and the server (lib/orders/delivery.ts) use the same rules.

export type CountryCode = "BR" | "US" | "OTHER";

export const ADDRESS_COUNTRIES: { code: CountryCode; label: string }[] = [
  { code: "BR", label: "Brasil" },
  { code: "US", label: "Estados Unidos (United States)" },
  { code: "OTHER", label: "Outro país" },
];

export const BR_STATES = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"];

export const US_STATES: [string, string][] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"], ["CA", "California"], ["CO", "Colorado"],
  ["CT", "Connecticut"], ["DE", "Delaware"], ["DC", "District of Columbia"], ["FL", "Florida"], ["GA", "Georgia"],
  ["HI", "Hawaii"], ["ID", "Idaho"], ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
  ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"], ["MA", "Massachusetts"],
  ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"], ["MO", "Missouri"], ["MT", "Montana"],
  ["NE", "Nebraska"], ["NV", "Nevada"], ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"],
  ["NY", "New York"], ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["PR", "Puerto Rico"], ["RI", "Rhode Island"], ["SC", "South Carolina"],
  ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"], ["VT", "Vermont"], ["VA", "Virginia"],
  ["WA", "Washington"], ["WV", "West Virginia"], ["WI", "Wisconsin"], ["WY", "Wyoming"],
];

export const asCountry = (value: unknown): CountryCode => (value === "US" || value === "OTHER" ? value : "BR");

/** CEP 00000-000 in Brazil, ZIP 00000 or 00000-0000 in the US, anything reasonable elsewhere. Returns the tidy form or null. */
export function normalizePostal(country: CountryCode, raw: string): string | null {
  const value = raw.trim().toUpperCase();
  if (country === "BR") {
    const d = value.replace(/\D/g, "");
    return d.length === 8 ? `${d.slice(0, 5)}-${d.slice(5)}` : null;
  }
  if (country === "US") {
    const d = value.replace(/\D/g, "");
    return d.length === 5 ? d : d.length === 9 ? `${d.slice(0, 5)}-${d.slice(5)}` : null;
  }
  return /^[A-Z0-9][A-Z0-9 -]{1,10}[A-Z0-9]$/.test(value) ? value : null;
}

export function validState(country: CountryCode, state: string) {
  if (country === "BR") return BR_STATES.includes(state);
  if (country === "US") return US_STATES.some(([code]) => code === state);
  return state.length <= 40;
}

export type PhoneCountry = "BR" | "US" | "OTHER";
export const PHONE_COUNTRIES: { code: PhoneCountry; label: string }[] = [
  { code: "BR", label: "🇧🇷 +55" },
  { code: "US", label: "🇺🇸 +1" },
  { code: "OTHER", label: "Outro (+…)" },
];

/**
 * Phone in international format (E.164), e.g. "+5511999999999" or "+15125551234", or null when it is not valid:
 * Brazil = area code + 8 or 9 digits; US/Canada = 10 digits (an optional leading 1); other = "+" and 8–15 digits.
 */
export function normalizePhone(country: PhoneCountry, raw: string): string | null {
  const d = raw.replace(/\D/g, "");
  if (country === "BR") {
    const local = d.startsWith("55") && (d.length === 12 || d.length === 13) ? d.slice(2) : d;
    return /^[1-9]{2}9?\d{8}$/.test(local) ? `+55${local}` : null;
  }
  if (country === "US") {
    const local = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
    return /^[2-9]\d{2}[2-9]\d{6}$/.test(local) ? `+1${local}` : null;
  }
  return raw.trim().startsWith("+") && d.length >= 8 && d.length <= 15 ? `+${d}` : null;
}

/** Shown on the order: "+55 11 99999-9999", "+1 (512) 555-1234", or the international form. */
export function formatPhone(e164: string) {
  const d = e164.replace(/\D/g, "");
  if (e164.startsWith("+55") && (d.length === 12 || d.length === 13)) {
    const local = d.slice(2);
    return `+55 ${local.slice(0, 2)} ${local.slice(2, -4)}-${local.slice(-4)}`;
  }
  if (e164.startsWith("+1") && d.length === 11) return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  return e164;
}
