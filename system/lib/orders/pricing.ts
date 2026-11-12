// Fixed-price orders: currency choice, display formatting and the price preview shown before the order is placed.
// The database (order_command 'place') prices every order again from the catalog; this module only previews it.

export type OrderCurrency = "brl" | "usd";
export type OrderKind = "purchase" | "lease";
export type OrderSettings = { brl_per_usd: number; fee_usd_minor: number; fee_brl_minor: number; withdrawal_days: number };
export type CatalogProduct = { id: string; title: string; unit_minor: number; lease_minor: number | null };
export type OrderLine = { product: string; quantity: number; color?: string };

/** BRL unless the link asks for USD: the website sends `currency=usd` for languages other than Portuguese. */
export const orderCurrency = (value: string | null | undefined): OrderCurrency => (value === "usd" ? "usd" : "brl");

const formatters = new Map<OrderCurrency, Intl.NumberFormat>();
/** Amount in minor units (centavos / cents) in the order's own currency. */
export function formatMinor(minor: number, currency: OrderCurrency) {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat(currency === "brl" ? "pt-BR" : "en-US", { style: "currency", currency: currency.toUpperCase() });
    formatters.set(currency, f);
  }
  return f.format(minor / 100);
}

/** Same arithmetic as order_command 'place': catalog USD price, converted and rounded per unit for BRL. */
export function unitPrice(product: CatalogProduct, kind: OrderKind, currency: OrderCurrency, settings: OrderSettings) {
  const usd = kind === "lease" ? product.lease_minor : product.unit_minor;
  if (usd === null) return null;
  return currency === "brl" ? Math.round(usd * Number(settings.brl_per_usd)) : usd;
}

export function feeFor(currency: OrderCurrency, settings: OrderSettings) {
  return currency === "brl" ? settings.fee_brl_minor : settings.fee_usd_minor;
}

/** Valid lines priced for display, the total and the order fee; lines for unknown or unpriced products are dropped. */
export function previewOrder(lines: OrderLine[], catalog: CatalogProduct[], kind: OrderKind, currency: OrderCurrency, settings: OrderSettings) {
  const priced = lines.flatMap((line) => {
    const product = catalog.find((p) => p.id === line.product);
    const unit = product ? unitPrice(product, kind, currency, settings) : null;
    if (!product || unit === null || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 100) return [];
    return [{ ...line, title: product.title, unit, subtotal: unit * line.quantity }];
  });
  const total = priced.reduce((sum, line) => sum + line.subtotal, 0);
  const fee = feeFor(currency, settings);
  return { lines: priced, total, fee, balance: kind === "purchase" ? Math.max(total - fee, 0) : 0 };
}

/** Parses the `items` / `product` query of /pedido into order lines (at most 30). */
export function linesFromQuery(q: { items?: string; product?: string; color?: string; quantity?: string }): OrderLine[] {
  try {
    const raw: unknown = q.items ? JSON.parse(q.items) : q.product ? [{ product: q.product, quantity: Number(q.quantity ?? 1), color: q.color }] : [];
    if (!Array.isArray(raw) || raw.length > 30) return [];
    return raw.flatMap((item) => {
      if (!item || typeof item !== "object") return [];
      const { product, quantity, color } = item as Record<string, unknown>;
      if (typeof product !== "string" || typeof quantity !== "number") return [];
      return [{ product, quantity, ...(typeof color === "string" && color.length <= 80 && color ? { color } : {}) }];
    });
  } catch {
    return [];
  }
}
