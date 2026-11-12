import { beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
const db = vi.hoisted(() => ({ rpc: vi.fn(), updates: [] as unknown[], order: {} as Record<string, unknown> }));
vi.mock("@/lib/enrollment/server", () => ({
  publicOrigin: () => "https://acquafy.example",
  serviceClient: () => ({
    rpc: db.rpc,
    from: (table: string) => {
      const chain = {
        select: () => chain,
        eq: () => chain,
        single: async () => ({ data: db.order, error: null }),
        maybeSingle: async () => ({ data: table === "installation_bookings" ? null : db.order, error: null }),
        update: (values: unknown) => {
          db.updates.push(values);
          return chain;
        },
      };
      return chain;
    },
  }),
}));
import { canCancel, orderTasks, windowLabel } from "@/lib/orders/tasks";
import { renderOrderEmail } from "@/lib/orders/emails";
import { sendPendingNotifications } from "@/lib/orders/notifications";
import { GET } from "../app/api/orders/notifications/route";
import { customerDestination } from "@/lib/orders/destination";

const order = (status: string, extra: Record<string, unknown> = {}) => ({ kind: "purchase" as const, status, delivery_estimate: null, placed_at: null, ...extra });
const states = (tasks: ReturnType<typeof orderTasks>) => Object.fromEntries(tasks.map((t) => [t.key, t.state]));

describe("order next steps", () => {
  it("walks a purchase from the fee to the app", () => {
    expect(states(orderTasks(order("awaiting_fee"), [{ kind: "fee", status: "open" }], null))).toMatchObject({ fee: "todo", address: "later", confirmation: "later", balance: "later", installation: "later" });
    expect(states(orderTasks(order("placed"), [{ kind: "fee", status: "paid" }], null))).toMatchObject({ fee: "done", address: "todo", confirmation: "waiting" });
    expect(states(orderTasks(order("confirmed", { delivery_estimate: "Até 20/12" }), [{ kind: "fee", status: "paid" }, { kind: "balance", status: "open" }], null))).toMatchObject({ address: "done", confirmation: "done", balance: "todo" });
    const paid = orderTasks(order("paid"), [{ kind: "fee", status: "paid" }, { kind: "balance", status: "paid" }], null);
    expect(states(paid)).toMatchObject({ balance: "done", installation: "todo", installed: "later" });
    const booked = { starts_at: "2026-12-15T11:00:00Z", ends_at: "2026-12-15T15:00:00Z" };
    expect(states(orderTasks(order("shipped"), [], booked))).toMatchObject({ installation: "done", installed: "waiting" });
    expect(states(orderTasks(order("installed"), [], booked))).toMatchObject({ installed: "done", app: "todo" });
  });
  it("asks lease customers to accept the agreement instead of paying a balance", () => {
    const tasks = orderTasks({ ...order("confirmed"), kind: "lease" }, [{ kind: "fee", status: "paid" }], null);
    expect(tasks.some((t) => t.key === "balance")).toBe(false);
    expect(states(tasks)).toMatchObject({ lease: "todo" });
  });
  it("shows installation windows in Brasília time", () => {
    expect(windowLabel("2026-12-15T11:00:00Z", "2026-12-15T15:00:00Z")).toMatch(/15\/12 · 08:00–12:00$/);
  });
  it("offers cancellation only where the database allows it", () => {
    const now = Date.parse("2026-11-20T12:00:00Z");
    const placed = (days: number, status = "paid", kind: "purchase" | "lease" = "purchase") => ({ ...order(status), kind, flow: "fixed", placed_at: new Date(now - days * 86400000).toISOString() });
    expect(canCancel(placed(2), { owner: true, admin: false }, 7, now)).toBe(true);
    expect(canCancel(placed(8), { owner: true, admin: false }, 7, now)).toBe(false);
    expect(canCancel(placed(8), { owner: false, admin: true }, 7, now)).toBe(true);
    expect(canCancel(placed(1, "processing"), { owner: true, admin: true }, 7, now)).toBe(false);
    expect(canCancel(placed(1, "paid", "lease"), { owner: true, admin: false }, 7, now)).toBe(false);
    expect(canCancel({ ...placed(1, "requested"), flow: "quote" }, { owner: true, admin: true }, 7, now)).toBe(false);
  });
  it("keeps order links through the login", () => {
    expect(customerDestination("/pedidos/0b1c2d3e-0000-4000-8000-000000000000")).toBe("/pedidos/0b1c2d3e-0000-4000-8000-000000000000");
    expect(customerDestination("/pedidos/../admin")).toBe("/pedidos");
  });
});

const emailOrder = {
  id: "8b8cd9d9-0000-4000-8000-000000000000",
  kind: "purchase" as const,
  currency: "brl" as const,
  total_minor: 500000,
  fee_minor: 12500,
  delivery_estimate: "até 20/12/2026",
  tracking_reference: null,
  items: [{ title: "Neo ULTRA", quantity: 1, color: "Azul <Petróleo>" }],
};

describe("order e-mails", () => {
  it("writes Portuguese for BRL orders, with the balance and a link to the order", () => {
    const email = renderOrderEmail("confirmed", emailOrder, "https://acquafy.example");
    expect(email.subject).toBe("Pedido confirmado · Pedido 8B8CD9D9");
    expect(email.text).toContain("pagar o saldo de R$ 4.875,00");
    expect(email.html).toContain("https://acquafy.example/app/pedidos/" + emailOrder.id);
    expect(email.html).toContain("Azul &lt;Petróleo&gt;");
    expect(email.html).not.toContain("<Petróleo>");
  });
  it("writes English for USD orders", () => {
    expect(renderOrderEmail("installed", { ...emailOrder, currency: "usd" }, "https://acquafy.example").subject).toBe("Purifier installed · Order 8B8CD9D9");
  });
});

describe("order e-mail sender", () => {
  beforeEach(() => {
    db.rpc.mockReset();
    db.updates = [];
    db.order = { ...emailOrder };
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("ORDER_EMAIL_FROM", "Acquafy <pedidos@acquafy.example>");
  });
  it("waits when Resend is not configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await sendPendingNotifications()).toEqual({ sent: 0, failed: 0, skipped: true });
    expect(db.rpc).not.toHaveBeenCalled();
  });
  it("sends each claimed e-mail once, with an idempotency key, and records the result", async () => {
    db.rpc.mockResolvedValue({ data: [{ id: 7, order_id: emailOrder.id, kind: "placed", to_email: "cliente@example.com", attempts: 1, payload: emailOrder }], error: null });
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: "email_1" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    expect(await sendPendingNotifications()).toEqual({ sent: 1, failed: 0, skipped: false });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers["Idempotency-Key"]).toBe("order-notification-7");
    expect(JSON.parse(init.body)).toMatchObject({ to: ["cliente@example.com"], subject: "Recebemos seu pedido · Pedido 8B8CD9D9" });
    expect(db.updates[0]).toMatchObject({ status: "sent", provider_id: "email_1" });
  });
  it("puts a failed e-mail back in the queue, and gives up after 5 attempts", async () => {
    db.rpc.mockResolvedValue({
      data: [
        { id: 8, order_id: emailOrder.id, kind: "paid", to_email: "a@example.com", attempts: 2, payload: emailOrder },
        { id: 9, order_id: emailOrder.id, kind: "paid", to_email: "b@example.com", attempts: 5, payload: emailOrder },
      ],
      error: null,
    });
    vi.stubGlobal("fetch", vi.fn().mockImplementation(async () => new Response(JSON.stringify({ message: "rate limited" }), { status: 429 })));
    expect(await sendPendingNotifications()).toEqual({ sent: 0, failed: 2, skipped: false });
    expect(db.updates).toEqual([
      { status: "pending", last_error: "Resend 429: rate limited" },
      { status: "failed", last_error: "Resend 429: rate limited" },
    ]);
  });
  it("renders the appointment the e-mail was queued for, not the current booking", async () => {
    const booking = { starts_at: "2026-12-15T11:00:00Z", ends_at: "2026-12-15T15:00:00Z" };
    db.rpc.mockResolvedValue({ data: [{ id: 10, order_id: emailOrder.id, kind: "installation_booked", to_email: "c@example.com", attempts: 1, payload: { ...emailOrder, booking } }], error: null });
    const fetchMock = vi.fn().mockImplementation(async () => new Response(JSON.stringify({ id: "email_2" }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    await sendPendingNotifications();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).text).toMatch(/15\/12 · 08:00–12:00/);
  });
  it("only runs the cron route with the cron secret", async () => {
    vi.stubEnv("CRON_SECRET", "cron-secret");
    expect((await GET(new Request("https://x/app/api/orders/notifications"))).status).toBe(401);
    expect((await GET(new Request("https://x/app/api/orders/notifications", { headers: { authorization: "Bearer wrong" } }))).status).toBe(401);
    db.rpc.mockResolvedValue({ data: [], error: null });
    expect((await GET(new Request("https://x/app/api/orders/notifications", { headers: { authorization: "Bearer cron-secret" } }))).status).toBe(200);
  });
});
