import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const session = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
const rpc = vi.hoisted(() => vi.fn());
const create = vi.hoisted(() => vi.fn());
vi.mock("@/lib/enrollment/server", () => ({
  stripeClient: () => ({ checkout: { sessions: { retrieve: async () => session.value, create } } }),
  // order_payments row read to tell the bound session from a replaced one.
  serviceClient: () => ({ rpc, from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: { checkout_id: "cs_1" }, error: null }) }) }) }) }),
  publicOrigin: () => "https://acquafy.example",
}));
import { paymentCheckoutUrl } from "@/lib/orders/checkout";
import { formatMinor, linesFromQuery, orderCurrency, previewOrder } from "@/lib/orders/pricing";
import { processOrderEvent } from "@/lib/orders/payments";
import { customerDestination } from "@/lib/orders/destination";
import type Stripe from "stripe";

const settings = { brl_per_usd: 5, fee_usd_minor: 2500, fee_brl_minor: 12500, withdrawal_days: 7 };
const catalog = [
  { id: "neo-up", title: "Neo Up", unit_minor: 40000, lease_minor: 4000 },
  { id: "neo-ultra", title: "Neo Ultra", unit_minor: 100000, lease_minor: 10000 },
];

describe("fixed-price order preview", () => {
  it("prices from the catalog in BRL at the site's rate, with the fee and the balance", () => {
    const order = previewOrder([{ product: "neo-up", quantity: 2, color: "Branco" }], catalog, "purchase", "brl", settings);
    expect(order.lines[0]).toMatchObject({ unit: 200000, subtotal: 400000, color: "Branco" });
    expect(order).toMatchObject({ total: 400000, fee: 12500, balance: 387500 });
    expect(formatMinor(order.total, "brl")).toBe("R$ 4.000,00");
    expect(formatMinor(order.fee, "usd")).toBe("$125.00");
  });
  it("uses the monthly catalog price for leases and has no balance", () => {
    expect(previewOrder([{ product: "neo-ultra", quantity: 1 }], catalog, "lease", "usd", settings)).toMatchObject({ total: 10000, fee: 2500, balance: 0 });
  });
  it("drops unknown products and invalid quantities", () => {
    const order = previewOrder(
      [{ product: "nope", quantity: 1 }, { product: "neo-up", quantity: 0 }, { product: "neo-up", quantity: 1.5 }],
      catalog,
      "purchase",
      "usd",
      settings,
    );
    expect(order.lines).toEqual([]);
  });
  it("reads the website link and ignores prices or malformed items in it", () => {
    expect(linesFromQuery({ product: "neo-up", color: "Branco" })).toEqual([{ product: "neo-up", quantity: 1, color: "Branco" }]);
    expect(linesFromQuery({ items: JSON.stringify([{ product: "neo-up", quantity: 3, price: 1 }]) })).toEqual([{ product: "neo-up", quantity: 3 }]);
    expect(linesFromQuery({ items: "not json" })).toEqual([]);
    expect(linesFromQuery({ items: JSON.stringify([{ product: 1, quantity: 1 }]) })).toEqual([]);
    expect(orderCurrency("usd")).toBe("usd");
    expect(orderCurrency(undefined)).toBe("brl");
    expect(orderCurrency("eur")).toBe("brl");
  });
  it("brings the customer back to the order after the e-mail code", () => {
    const next = "/pedido?mode=purchase&currency=brl&items=%5B%5D";
    expect(customerDestination(next)).toBe(next);
  });
});

describe("fixed-price order payments (webhook)", () => {
  beforeEach(() => {
    rpc.mockReset().mockResolvedValue({ error: null });
    vi.stubEnv("STRIPE_ENVIRONMENT", "test");
  });
  const event = (type: string) => ({ type, livemode: false, data: { object: { id: "cs_1", metadata: { integration: "acquafy_order_payment" } } } }) as unknown as Stripe.Event;
  const paidSession = (extra: Record<string, unknown> = {}) => ({
    id: "cs_1",
    livemode: false,
    client_reference_id: "pay_1",
    metadata: { integration: "acquafy_order_payment", payment_id: "pay_1" },
    currency: "brl",
    payment_status: "paid",
    amount_subtotal: 12500,
    amount_total: 12500,
    total_details: { amount_discount: 0, amount_tax: 0, amount_shipping: 0 },
    discounts: [],
    payment_intent: { id: "pi_1", latest_charge: { amount_refunded: 0, disputed: false } },
    ...extra,
  });

  it("records a paid fee with the session, amount and currency for the database to check", async () => {
    session.value = paidSession();
    await processOrderEvent(event("checkout.session.completed"));
    expect(rpc).toHaveBeenCalledWith("order_payment_event", {
      payload: expect.objectContaining({ payment_id: "pay_1", state: "paid", session_id: "cs_1", currency: "brl", subtotal_minor: 12500, paid_minor: 12500, payment_intent_id: "pi_1" }),
    });
  });
  it("rejects a session bound to another payment", async () => {
    session.value = paidSession({ client_reference_id: "pay_2" });
    await expect(processOrderEvent(event("checkout.session.completed"))).rejects.toThrow("Order payment mismatch");
    expect(rpc).not.toHaveBeenCalled();
  });
  it("marks a failed asynchronous payment and ignores an unpaid completion", async () => {
    session.value = paidSession({ payment_status: "unpaid" });
    await processOrderEvent(event("checkout.session.async_payment_failed"));
    expect(rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "failed" }) });
    rpc.mockClear();
    await processOrderEvent(event("checkout.session.completed"));
    expect(rpc).not.toHaveBeenCalled();
  });
  it("asks for a retry when the database refuses the payment", async () => {
    session.value = paidSession();
    rpc.mockResolvedValue({ error: { message: "Payment mismatch" } });
    await expect(processOrderEvent(event("checkout.session.completed"))).rejects.toThrow("Order payment update failed");
  });
});

describe("fixed-price order review fixes", () => {
  beforeEach(() => {
    rpc.mockReset().mockResolvedValue({ error: null });
    create.mockReset().mockResolvedValue({ id: "cs_new", url: "https://checkout.stripe.example/cs_new" });
    vi.stubEnv("STRIPE_ENVIRONMENT", "test");
  });
  const base = {
    id: "cs_1",
    livemode: false,
    client_reference_id: "pay_1",
    metadata: { integration: "acquafy_order_payment", payment_id: "pay_1" },
    currency: "brl",
    amount_subtotal: 12500,
    amount_total: 12500,
    total_details: { amount_discount: 0, amount_tax: 0, amount_shipping: 0 },
    discounts: [],
  };
  const payment = { id: "pay_1", order_id: "ord_1", kind: "fee" as const, currency: "brl", amount_minor: 12500, status: "open", checkout_id: "cs_1" };

  it("records a completed session instead of opening a second charge when the webhook is late", async () => {
    session.value = { ...base, status: "complete", payment_status: "paid", payment_intent: { id: "pi_1", latest_charge: { amount_refunded: 0, disputed: false, refunded: false } } };
    await expect(paymentCheckoutUrl(payment)).resolves.toBeNull();
    expect(create).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "paid", payment_id: "pay_1" }) });
  });
  it("binds a replacement session over the expired one only", async () => {
    session.value = { ...base, status: "expired", payment_status: "unpaid" };
    await expect(paymentCheckoutUrl(payment)).resolves.toBe("https://checkout.stripe.example/cs_new");
    expect(rpc).toHaveBeenCalledWith("order_payment_bind", { payload: { payment_id: "pay_1", session_id: "cs_new", previous_session_id: "cs_1" } });
  });
  it("reports a late completion of a refunded charge as a refund, not a dispute", async () => {
    session.value = { ...base, status: "complete", payment_status: "paid", payment_intent: { id: "pi_1", latest_charge: { amount_refunded: 12500, disputed: false, refunded: true } } };
    await processOrderEvent({ type: "checkout.session.completed", livemode: false, data: { object: { id: "cs_1", metadata: { integration: "acquafy_order_payment" } } } } as unknown as Stripe.Event);
    expect(rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "refunded", full: "yes" }) });
  });
});
