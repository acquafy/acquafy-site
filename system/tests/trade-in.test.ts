import { describe, expect, it } from "vitest";
import { orderTasks } from "@/lib/orders/tasks";
import { renderOrderEmail } from "@/lib/orders/emails";

const order = (status: string, trade_in_status: string | null = null) => ({ kind: "purchase" as const, status, delivery_estimate: null, placed_at: null, trade_in_status });
const offer = { eligible: true, credit: "R$ 100,00" };
const tradeIn = (tasks: ReturnType<typeof orderTasks>) => tasks.find((t) => t.key === "trade_in");

describe("trade-in task", () => {
  it("is offered on eligible purchases until Acquafy confirms", () => {
    expect(tradeIn(orderTasks(order("placed"), [{ kind: "fee", status: "paid" }], null, offer))).toMatchObject({ state: "todo", title: "Tem um purificador antigo? Ganhe R$ 100,00 (opcional)" });
    expect(tradeIn(orderTasks(order("confirmed"), [], null, offer))).toBeUndefined();
    expect(tradeIn(orderTasks(order("placed"), [], null, { ...offer, eligible: false }))).toBeUndefined();
    expect(tradeIn(orderTasks({ ...order("placed"), kind: "lease" }, [], null, offer))).toBeUndefined();
  });
  it("follows a declared trade-in to the technician's check", () => {
    expect(tradeIn(orderTasks(order("paid", "declared"), [], null, offer))).toMatchObject({ state: "later", title: "Entregar o purificador antigo na instalação" });
    expect(tradeIn(orderTasks(order("installed", "declared"), [], null, offer))).toMatchObject({ state: "waiting" });
    expect(tradeIn(orderTasks(order("installed", "received"), [], null, offer))).toMatchObject({ state: "done", title: "Purificador antigo entregue" });
    expect(tradeIn(orderTasks(order("installed", "missing"), [], null, offer))?.detail).toContain("Fale com o suporte");
  });
});

describe("e-mail balance with a trade-in", () => {
  it("takes the credit off the balance", () => {
    const email = renderOrderEmail(
      "confirmed",
      { id: "8b8cd9d9-0000-4000-8000-000000000000", kind: "purchase", currency: "brl", total_minor: 200000, fee_minor: 12500, trade_in_minor: 10000, delivery_estimate: null, tracking_reference: null, items: [{ title: "Neo UP", quantity: 1 }] },
      "https://acquafy.example",
    );
    expect(email.text).toContain("pagar o saldo de R$ 1.775,00");
  });
});
