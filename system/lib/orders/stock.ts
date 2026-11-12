// Stock available now (Tesla's inventory): availability of a model and colour, from public.stock_availability().
// A colour's own row wins over the any-colour row (''), the same order the database uses to reserve units.

export type StockRow = { product_id: string; color: string; available: boolean; ship_days: number };
export type Availability = { inStock: true; shipDays: number } | { inStock: false; weeks: number };

export function availabilityFor(rows: StockRow[], product: string, color: string | undefined, madeToOrderWeeks: number): Availability {
  const row =
    rows.find((r) => r.product_id === product && r.color === (color ?? "") && r.available) ??
    rows.find((r) => r.product_id === product && r.color === "" && r.available);
  return row ? { inStock: true, shipDays: row.ship_days } : { inStock: false, weeks: madeToOrderWeeks };
}

export function availabilityLabel(a: Availability) {
  return a.inStock ? `Disponível agora · entrega em até ${a.shipDays} dias` : `Sob encomenda · entrega em cerca de ${a.weeks} semanas`;
}
