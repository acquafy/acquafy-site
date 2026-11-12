// Delivery address and contact of a fixed-price order, read from the order form (place) or the edit form.
// `address` is the one-line version staff and the lease agreement use; the parts are kept for editing and the
// installation region (`state`, the UF in Brazil).

export type Delivery = {
  name: string;
  phone: string;
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

export function deliveryFromForm(f: FormData): Delivery | null {
  const field = (name: string, max = 160) => String(f.get(name) ?? "").trim().slice(0, max);
  const parts = {
    name: field("name"),
    phone: field("phone", 40),
    postal_code: field("postal_code", 20),
    street: field("street"),
    number: field("number", 20),
    complement: field("complement", 80),
    district: field("district", 80),
    city: field("city", 80),
    state: field("state", 40).toUpperCase(),
    country: field("country", 80) || "Brasil",
  };
  if (!parts.street || !parts.number || !parts.city || !parts.postal_code) return null;
  const address = [
    `${parts.street}, ${parts.number}${parts.complement ? " - " + parts.complement : ""}`,
    parts.district,
    `${parts.city} - ${parts.state}`,
    parts.postal_code,
    parts.country,
  ]
    .filter((part) => part.replace(/[\s,-]/g, ""))
    .join(", ");
  return { ...parts, address };
}
