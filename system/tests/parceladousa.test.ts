import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));

// Fake service client: rows per table (filtered by eq), RPCs recorded.
const db = vi.hoisted(() => ({ tables: {} as Record<string, Record<string, unknown>[]>, rpc: vi.fn() }));
const cutoff = vi.hoisted(() => ({ value: "" }));
const stripe = vi.hoisted(() => ({ session: null as Record<string, unknown> | null, expire: vi.fn(), create: vi.fn() }));
vi.mock("@/lib/enrollment/server", () => ({
  serviceClient: () => ({
    rpc: db.rpc,
    from: (table: string) => {
      const filters: [string, unknown][] = [];
      const rows = () => (db.tables[table] ?? []).filter((r) => filters.every(([k, v]) => r[k] === v));
      let update: Record<string, unknown> | null = null;
      let recentOnly = false;
      const q = {
        select: () => (update ? applyUpdate() : q),
        eq: (k: string, v: unknown) => (filters.push([k, v]), q),
        update: (values: Record<string, unknown>) => ((update = values), q),
        // Only the throttle uses .or(): rows never checked or checked before the cutoff.
        or: (expr: string) => ((recentOnly = expr.startsWith("checked_at.is.null")), cutoff.value = expr.split("checked_at.lt.")[1], q),
        single: async () => (rows()[0] ? { data: rows()[0], error: null } : { data: null, error: { message: "none" } }),
        maybeSingle: async () => ({ data: rows()[0] ?? null, error: null }),
      };
      const applyUpdate = async () => {
        const hit = rows().filter((r) => !recentOnly || !r.checked_at || String(r.checked_at) < cutoff.value);
        for (const r of hit) Object.assign(r, update);
        return { data: hit, error: null };
      };
      return q;
    },
  }),
  stripeClient: () => ({ checkout: { sessions: { retrieve: async () => stripe.session, expire: stripe.expire, create: stripe.create } } }),
  publicOrigin: () => "https://acquafy.example",
}));
import { createHmac } from "node:crypto";
import { createParceladoOrder, getParceladoOrder, parceladoWebhookValid, resetParceladoToken } from "@/lib/orders/parceladousa";
import { reconcileParcelado } from "@/lib/orders/payments";
import { PARCELADO_OPEN, PAYMENT_IN_PROGRESS, parceladoAvailable, parceladoCheckoutUrl, paymentCheckoutUrl } from "@/lib/orders/checkout";
import { POST } from "@/app/api/orders/parceladousa/[paymentId]/route";
import { POST as webhook } from "@/app/api/orders/parceladousa/route";

const PAY = "11111111-1111-4111-8111-111111111111";
const fetchMock = vi.fn();
let order: Record<string, unknown> = {};

function api() {
  // /auth → token; POST /order → new order; GET /order/{id} → `order`.
  fetchMock.mockImplementation(async (url: string, init: RequestInit) => {
    const json = (body: unknown) => new Response(JSON.stringify(body), { status: 200 });
    if (url.endsWith("/auth")) return json({ token: "tok", expirate: new Date(Date.now() + 30 * 60_000).toISOString().slice(0, 19).replace("T", " ") });
    if (url.endsWith("/order") && init.method === "POST") return json({ data: { orderId: "77", url: "https://pay.parceladousa.com/77" } });
    return json(order);
  });
}
const balance = (extra: Record<string, unknown> = {}) => ({ id: PAY, order_id: "ord_1", kind: "balance" as const, currency: "brl", amount_minor: 187500, status: "open", checkout_id: "pusa_42", ...extra });
const customer = { name: "Ana Souza", email: "ana@example.com", phone: "11999999999", postal_code: "01000-000", address: "Rua A", number: "10", city: "São Paulo", state: "SP" };

beforeEach(() => {
  vi.stubEnv("PARCELADOUSA_PUBLIC_KEY", "pk");
  vi.stubEnv("PARCELADOUSA_MERCHANT_CODE", "AB12");
  vi.stubEnv("PARCELADOUSA_ENVIRONMENT", "sandbox");
  vi.stubEnv("STRIPE_ENVIRONMENT", "test");
  vi.stubEnv("PARCELADOUSA_WEBHOOK_SECRET", "whsec_test_0123456789abcdefghijklmnopqrstuv");
  vi.stubGlobal("fetch", fetchMock);
  resetParceladoToken();
  fetchMock.mockReset();
  api();
  db.rpc.mockReset().mockResolvedValue({ error: null });
  db.tables = { order_payments: [balance()], order_payment_attempts: [{ ref: "pusa_42", payment_id: PAY, url: "https://pay.parceladousa.com/42", created_at: new Date().toISOString() }] };
  stripe.session = null;
  stripe.expire.mockReset();
  stripe.create.mockReset();
  order = { status: "approved", data: { amount: "1875.00", currency: "BRL" } };
});

describe("ParceladoUSA API", () => {
  it("creates an order in JSON with a bearer token", async () => {
    const created = await createParceladoOrder({ amountMinor: 187500, currency: "brl", customer, callback: "https://acquafy.example/cb" });
    expect(created).toEqual({ orderId: "77", url: "https://pay.parceladousa.com/77" });
    const [authUrl, authInit] = fetchMock.mock.calls[0];
    expect(authUrl).toBe("https://apisandbox.parceladousa.com/v1/paymentapi/auth");
    expect(JSON.parse(authInit.body)).toEqual({ pubKey: "pk", merchantCode: "AB12" });
    const [, init] = fetchMock.mock.calls[1];
    expect(init.headers).toMatchObject({ Authorization: "Bearer tok", "Content-Type": "application/json" });
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ amount: 1875, currency: "BRL", callback: "https://acquafy.example/cb" });
    expect(body.client).toMatchObject({ cep: "01000-000", addressNumber: "10", state: "SP" });
  });
  it("reuses the token until it expires, and replaces a token ParceladoUSA rejects", async () => {
    await getParceladoOrder("42");
    await getParceladoOrder("42");
    expect(fetchMock.mock.calls.filter(([u]) => String(u).endsWith("/auth"))).toHaveLength(1);
    let rejected = false;
    fetchMock.mockImplementation(async (url: string) => {
      if (url.endsWith("/auth")) return new Response(JSON.stringify({ token: "tok2", expirate: "2099-01-01 00:00:00" }));
      if (!rejected) {
        rejected = true;
        return new Response(JSON.stringify({ statusCode: 420, statusType: "error", msg: "Expired token." }));
      }
      return new Response(JSON.stringify({ status: "approved" }));
    });
    await expect(getParceladoOrder("42")).resolves.toMatchObject({ status: "approved" });
    expect(fetchMock.mock.calls.at(-1)?.[1].headers).toMatchObject({ Authorization: "Bearer tok2" });
  });
  it("does not request a new token on other errors", async () => {
    fetchMock.mockImplementation(async (url: string) =>
      url.endsWith("/auth") ? new Response(JSON.stringify({ token: "tok" })) : new Response(JSON.stringify({ statusCode: 400, msg: "Order not found." })),
    );
    await expect(getParceladoOrder("42")).rejects.toThrow("ParceladoUSA request failed");
    expect(fetchMock.mock.calls.filter(([u]) => String(u).endsWith("/auth"))).toHaveLength(1);
  });
  it("reads the status and the amount of an order", async () => {
    await expect(getParceladoOrder("42")).resolves.toEqual({ status: "approved", amountMinor: 187500, currency: "brl" });
    order = { status: "success", data: { status: "analysis" } };
    await expect(getParceladoOrder("42")).resolves.toMatchObject({ status: "analysis", amountMinor: null });
    // Without a currency the amount is not compared (it may be a converted total).
    order = { orderId: 42, status: "delivered", amount: 598.96 };
    await expect(getParceladoOrder("42")).resolves.toEqual({ status: "delivered", amountMinor: null, currency: null });
    order = { status: "weird" };
    await expect(getParceladoOrder("42")).rejects.toThrow("Unknown ParceladoUSA status");
    await expect(getParceladoOrder("../x")).rejects.toThrow("Invalid ParceladoUSA order");
  });
  it("never uses production on a preview", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("PARCELADOUSA_ENVIRONMENT", "production");
    await expect(getParceladoOrder("42")).rejects.toThrow("Preview deployments require ParceladoUSA sandbox");
    vi.stubEnv("VERCEL_ENV", "");
  });
  it("is offered for the balance of BRL orders only, once configured", () => {
    expect(parceladoAvailable({ kind: "balance", currency: "brl" })).toBe(true);
    expect(parceladoAvailable({ kind: "fee", currency: "brl" })).toBe(false);
    expect(parceladoAvailable({ kind: "balance", currency: "usd" })).toBe(false);
    vi.stubEnv("PARCELADOUSA_PUBLIC_KEY", "");
    expect(parceladoAvailable({ kind: "balance", currency: "brl" })).toBe(false);
  });
});

describe("ParceladoUSA reconciliation", () => {
  it("records an approved order of the bound payment as paid", async () => {
    await expect(reconcileParcelado(PAY, "pusa_42")).resolves.toEqual({ status: "approved", url: "https://pay.parceladousa.com/42" });
    expect(db.rpc).toHaveBeenCalledWith("order_payment_event", {
      payload: expect.objectContaining({ payment_id: PAY, state: "paid", session_id: "pusa_42", subtotal_minor: 187500, paid_minor: 187500, currency: "brl" }),
    });
  });
  it("rejects an order created for another payment, before calling ParceladoUSA", async () => {
    db.tables.order_payment_attempts = [{ ref: "pusa_42", payment_id: "someone-else", created_at: new Date().toISOString() }];
    await expect(reconcileParcelado(PAY, "pusa_42")).rejects.toThrow("Order payment mismatch");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("rejects an amount or currency that differs from the payment", async () => {
    order = { status: "approved", data: { amount: "1.00", currency: "BRL" } };
    await expect(reconcileParcelado(PAY, "pusa_42")).rejects.toThrow("Order payment mismatch");
    order = { status: "approved", data: { amount: "1875.00", currency: "USD" } };
    await expect(reconcileParcelado(PAY, "pusa_42")).rejects.toThrow("Order payment mismatch");
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("records a delivered order (paid out) as paid", async () => {
    order = { status: "delivered" };
    await reconcileParcelado(PAY, "pusa_42");
    expect(db.rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "paid", session_id: "pusa_42" }) });
  });
  it("waits on open, pending and analysis; fails aborted; refunds a cancelled paid order", async () => {
    for (const status of ["open", "pending", "analysis"]) {
      order = { status };
      await reconcileParcelado(PAY, "pusa_42");
    }
    expect(db.rpc).not.toHaveBeenCalled();
    order = { status: "aborted" };
    await reconcileParcelado(PAY, "pusa_42");
    expect(db.rpc).toHaveBeenLastCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "failed" }) });
    db.tables.order_payments = [balance({ status: "refunding", checkout_id: "pusa_42" })];
    order = { status: "canceled" };
    await reconcileParcelado(PAY, "pusa_42");
    expect(db.rpc).toHaveBeenLastCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "refunded", full: "yes" }) });
  });
  it("sends a payment on a replaced order to staff review", async () => {
    db.tables.order_payments = [balance({ checkout_id: "cs_new" })];
    await reconcileParcelado(PAY, "pusa_42");
    expect(db.rpc).toHaveBeenCalledWith("order_payment_stray", { payload: { payment_id: PAY, ref: "pusa_42" } });
    expect(db.rpc).not.toHaveBeenCalledWith("order_payment_event", expect.anything());
  });
});

describe("choosing how to pay", () => {
  it("does not open a second payment while ParceladoUSA is analysing the first", async () => {
    order = { status: "analysis" };
    await expect(paymentCheckoutUrl(balance())).rejects.toThrow(PAYMENT_IN_PROGRESS);
    await expect(parceladoCheckoutUrl(balance(), customer)).rejects.toThrow(PAYMENT_IN_PROGRESS);
    expect(stripe.create).not.toHaveBeenCalled();
  });
  it("records an approved ParceladoUSA order instead of opening Stripe", async () => {
    await expect(paymentCheckoutUrl(balance())).resolves.toBeNull();
    expect(stripe.create).not.toHaveBeenCalled();
  });
  it("keeps an open ParceladoUSA page: Stripe is refused, ParceladoUSA reuses the same page", async () => {
    order = { status: "open" };
    await expect(paymentCheckoutUrl(balance())).rejects.toThrow(PARCELADO_OPEN);
    await expect(parceladoCheckoutUrl(balance(), customer)).resolves.toBe("https://pay.parceladousa.com/42");
    expect(stripe.create).not.toHaveBeenCalled();
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("opens Stripe over a ParceladoUSA page left open for more than a day", async () => {
    db.tables.order_payment_attempts[0].created_at = new Date(Date.now() - 25 * 3600_000).toISOString();
    order = { status: "open" };
    stripe.create.mockResolvedValue({ id: "cs_new", url: "https://checkout.stripe.example/cs_new" });
    await expect(paymentCheckoutUrl(balance())).resolves.toBe("https://checkout.stripe.example/cs_new");
    expect(db.rpc).toHaveBeenCalledWith("order_payment_bind", { payload: { payment_id: PAY, session_id: "cs_new", previous_session_id: "pusa_42" } });
  });
  it("closes the open Stripe session, creates the ParceladoUSA order and binds it", async () => {
    stripe.session = { id: "cs_1", status: "open" };
    await expect(parceladoCheckoutUrl(balance({ checkout_id: "cs_1" }), customer)).resolves.toBe("https://pay.parceladousa.com/77");
    expect(stripe.expire).toHaveBeenCalledWith("cs_1");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).callback).toBe(`https://acquafy.example/app/api/orders/parceladousa/${PAY}`);
    expect(db.rpc).toHaveBeenCalledWith("order_payment_bind", { payload: { payment_id: PAY, session_id: "pusa_77", previous_session_id: "cs_1", url: "https://pay.parceladousa.com/77" } });
  });
  it("opens a new ParceladoUSA order when the previous one was aborted", async () => {
    order = { status: "aborted" };
    await expect(parceladoCheckoutUrl(balance(), customer)).resolves.toBe("https://pay.parceladousa.com/77");
    expect(db.rpc).toHaveBeenCalledWith("order_payment_bind", { payload: expect.objectContaining({ session_id: "pusa_77", previous_session_id: "pusa_42" }) });
  });
  it("refuses installments for the order fee", async () => {
    await expect(parceladoCheckoutUrl(balance({ kind: "fee", checkout_id: null }), customer)).rejects.toThrow("Payment unavailable");
  });
});

describe("ParceladoUSA callback", () => {
  const post = (body: string, id = PAY) => POST(new Request("https://acquafy.example/app/api/orders/parceladousa/" + id, { method: "POST", body }), { params: Promise.resolve({ paymentId: id }) });
  it("records the notified order from ParceladoUSA's API", async () => {
    const res = await post(JSON.stringify({ orderId: 42, status: "approved" }));
    expect(res.status).toBe(200);
    expect(db.rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "paid", session_id: "pusa_42" }) });
  });
  it("ignores the status in the callback body", async () => {
    order = { status: "pending" };
    await post(JSON.stringify({ orderId: "42", status: "approved" }));
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("checks the same order at most once every few seconds, asking ParceladoUSA to retry", async () => {
    expect((await post(JSON.stringify({ orderId: "42" }))).status).toBe(200);
    const calls = fetchMock.mock.calls.length;
    const again = await post(JSON.stringify({ orderId: "42" }));
    expect(again.status).toBe(503);
    expect(again.headers.get("Retry-After")).toBe("10");
    expect(fetchMock.mock.calls.length).toBe(calls);
  });
  it("rejects malformed callbacks and asks for a retry when the order is not this payment's", async () => {
    expect((await post("{}")).status).toBe(400);
    expect((await post(JSON.stringify({ orderId: "42" }), "not-a-uuid")).status).toBe(400);
    expect((await post(JSON.stringify({ orderId: "99" }))).status).toBe(503);
  });
});

describe("ParceladoUSA webhook", () => {
  const secret = "whsec_test_0123456789abcdefghijklmnopqrstuv";
  const signed = (body: string, ts = Math.floor(Date.now() / 1000), key = secret) =>
    new Request("https://acquafy.example/app/api/orders/parceladousa", {
      method: "POST",
      body,
      headers: { "ParceladoUSA-Webhook-Timestamp": String(ts), "ParceladoUSA-Webhook-Signature": "v1=" + createHmac("sha256", key).update(`${ts}.${body}`).digest("hex") },
    });
  it("checks the signature, the timestamp window and the secret", () => {
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = "v1=" + createHmac("sha256", secret).update(`${ts}.{"a":1}`).digest("hex");
    expect(parceladoWebhookValid('{"a":1}', ts, sig)).toBe(true);
    expect(parceladoWebhookValid('{"a":2}', ts, sig)).toBe(false);
    expect(parceladoWebhookValid('{"a":1}', String(Number(ts) - 301), sig)).toBe(false);
    expect(parceladoWebhookValid('{"a":1}', ts, null)).toBe(false);
  });
  it("records a signed notification from ParceladoUSA's API", async () => {
    const res = await webhook(signed(JSON.stringify({ orderId: 42, status: "approved" })));
    expect(res.status).toBe(200);
    expect(db.rpc).toHaveBeenCalledWith("order_payment_event", { payload: expect.objectContaining({ state: "paid", session_id: "pusa_42" }) });
  });
  it("rejects unsigned or forged notifications", async () => {
    expect((await webhook(new Request("https://acquafy.example/x", { method: "POST", body: JSON.stringify({ orderId: 42 }) }))).status).toBe(401);
    expect((await webhook(signed(JSON.stringify({ orderId: 42 }), undefined, "whsec_wrong_0123456789abcdefghijklmnopq"))).status).toBe(401);
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("acknowledges orders that are not the portal's", async () => {
    const res = await webhook(signed(JSON.stringify({ orderId: 999, status: "approved" })));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
