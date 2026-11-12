import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { availabilityFor, availabilityLabel } from "@/lib/orders/stock";
import { ORDER_COLORS, validStockColor } from "@/config/order-colors";

const rows = [
  { product_id: "neo-ultra", color: "Azul Petróleo", available: true, ship_days: 3 },
  { product_id: "neo-ultra", color: "", available: true, ship_days: 7 },
  { product_id: "neo-fit", color: "Branco", available: false, ship_days: 2 },
];

describe("stock available now", () => {
  it("prefers the colour's own stock, then any colour, as the database reserves", () => {
    expect(availabilityFor(rows, "neo-ultra", "Azul Petróleo", 10)).toEqual({ inStock: true, shipDays: 3 });
    expect(availabilityFor(rows, "neo-ultra", "Cinza", 10)).toEqual({ inStock: true, shipDays: 7 });
  });
  it("falls back to the made-to-order estimate when nothing is on hand", () => {
    expect(availabilityFor(rows, "neo-fit", "Branco", 10)).toEqual({ inStock: false, weeks: 10 });
    expect(availabilityFor(rows, "neo-max", undefined, 8)).toEqual({ inStock: false, weeks: 8 });
  });
  it("words both cases for the order page", () => {
    expect(availabilityLabel({ inStock: true, shipDays: 3 })).toBe("Disponível agora · entrega em até 3 dias");
    expect(availabilityLabel({ inStock: false, weeks: 10 })).toBe("Sob encomenda · entrega em cerca de 10 semanas");
  });
});

describe("stock colours", () => {
  it("accepts only the colours the website sends for the model, or any colour", () => {
    expect(validStockColor("neo-ultra", "Azul Petróleo")).toBe(true);
    expect(validStockColor("neo-max", "Azul Ardósia")).toBe(true);
    expect(validStockColor("neo-ultra", "Azul Petroleo")).toBe(false);
    expect(validStockColor("neo-prime", "Branco")).toBe(false);
    expect(validStockColor("neo-prime", "")).toBe(true);
  });
  it("matches the Portuguese colour names on the product page", () => {
    // The website sends getColorName(..., "pt", ...) from this table; a renamed colour must be renamed here too.
    const source = readFileSync(new URL("../../components/CheckinProduct.tsx", import.meta.url), "utf8");
    const table = source.slice(source.indexOf("const COLOR_NAMES_I18N"), source.indexOf("};", source.indexOf("const COLOR_NAMES_I18N")));
    const names = new Set([...table.matchAll(/\{ pt: "([^"]+)"/g)].map((m) => m[1]));
    for (const color of new Set(Object.values(ORDER_COLORS).flat())) expect(names, color).toContain(color);
  });
});
