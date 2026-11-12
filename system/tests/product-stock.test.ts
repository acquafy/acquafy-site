import { describe, expect, it } from "vitest";
import { availabilityFor, availabilityLabel } from "@/lib/orders/stock";

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
