import "server-only";

// ParceladoUSA (parceladousa.com): the customer pays in installments with a Brazilian card on ParceladoUSA's hosted
// page, and the merchant is paid by ParceladoUSA. The API is the one its official WooCommerce plugin uses: a bearer
// token from /auth (public key + store code), POST /order (amount, currency, customer, callback URL) returns the
// order id and the payment page, and GET /order/{id} returns the order status. The callback carries no signature,
// so it is never trusted: the status always comes from GET /order/{id} with our token.
//
// Settings: PARCELADOUSA_PUBLIC_KEY, PARCELADOUSA_MERCHANT_CODE (store code) and PARCELADOUSA_ENVIRONMENT
// (sandbox | production; previews are always sandbox).

const API = {
  sandbox: "https://apisandbox.parceladousa.com/v1/paymentapi",
  production: "https://api.parceladousa.com/v1/paymentapi",
} as const;

/** Prefix of a ParceladoUSA order id bound to a payment (order_payments.checkout_id), so it never collides with Stripe. */
export const PARCELADO_PREFIX = "pusa_";
export const isParceladoRef = (ref: string | null | undefined): ref is string => !!ref?.startsWith(PARCELADO_PREFIX);
export const parceladoRef = (orderId: string) => PARCELADO_PREFIX + orderId;
export const parceladoOrderId = (ref: string) => ref.slice(PARCELADO_PREFIX.length);

export type ParceladoStatus = "open" | "pending" | "analysis" | "approved" | "canceled" | "aborted";
const STATUSES: ParceladoStatus[] = ["open", "pending", "analysis", "approved", "canceled", "aborted"];

export function parceladoConfigured() {
  return !!process.env.PARCELADOUSA_PUBLIC_KEY && !!process.env.PARCELADOUSA_MERCHANT_CODE;
}

function baseUrl() {
  const mode = process.env.PARCELADOUSA_ENVIRONMENT ?? "sandbox";
  if (mode !== "sandbox" && mode !== "production") throw Error("Invalid ParceladoUSA environment");
  if (process.env.VERCEL_ENV === "preview" && mode !== "sandbox") throw Error("Preview deployments require ParceladoUSA sandbox");
  return API[mode];
}

/** Form body in PHP's nested style (client[name]=…), the format the plugin sends. */
function form(data: Record<string, string | Record<string, string>>) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") body.append(key, value);
    else for (const [k, v] of Object.entries(value)) body.append(`${key}[${k}]`, v);
  }
  return body;
}

async function call(path: string, init: RequestInit) {
  const res = await fetch(baseUrl() + path, { ...init, cache: "no-store", signal: AbortSignal.timeout(20000) });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body || typeof body !== "object") throw Error("ParceladoUSA request failed");
  return body as Record<string, unknown>;
}

const obj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

async function token() {
  if (!parceladoConfigured()) throw Error("ParceladoUSA is not configured");
  const body = await call("/auth", {
    method: "POST",
    body: form({ pubKey: process.env.PARCELADOUSA_PUBLIC_KEY!, merchantCode: process.env.PARCELADOUSA_MERCHANT_CODE! }),
  });
  const value = body.token ?? obj(body.data).token;
  if (typeof value !== "string" || !value) throw Error("ParceladoUSA authentication failed");
  return value;
}

export type ParceladoCustomer = { name: string; email: string; phone: string; postal_code: string; address: string; number: string; city: string; state: string };

/** Creates the ParceladoUSA order of one payment; returns its id and the page the customer pays on. */
export async function createParceladoOrder(input: { amountMinor: number; currency: "usd" | "brl"; customer: ParceladoCustomer; callback: string }) {
  const auth = await token();
  const c = input.customer;
  const body = await call("/order", {
    method: "POST",
    headers: { Authorization: `Bearer ${auth}` },
    body: form({
      amount: (input.amountMinor / 100).toFixed(2),
      currency: input.currency.toUpperCase(),
      client: { name: c.name, email: c.email, phone: c.phone, doc: "", cep: c.postal_code, address: c.address, addressNumber: c.number, city: c.city, state: c.state },
      callback: input.callback,
    }),
  });
  const data = obj(body.data);
  const id = data.orderId;
  const url = data.url;
  if ((typeof id !== "string" && typeof id !== "number") || typeof url !== "string" || !/^https:\/\//.test(url)) throw Error("ParceladoUSA order failed");
  return { orderId: String(id), url };
}

/**
 * Status of a ParceladoUSA order, read with our token. `amountMinor` / `currency` are returned when the API reports
 * them, so the caller can check them against the payment.
 */
export async function getParceladoOrder(orderId: string) {
  if (!/^[\w-]{1,64}$/.test(orderId)) throw Error("Invalid ParceladoUSA order");
  const auth = await token();
  const body = await call(`/order/${encodeURIComponent(orderId)}`, { method: "GET", headers: { Authorization: `Bearer ${auth}` } });
  const data = obj(body.data);
  const status = [body.status, data.status].find((s): s is ParceladoStatus => STATUSES.includes(s as ParceladoStatus));
  if (!status) throw Error("Unknown ParceladoUSA status");
  const amount = Number(data.amount);
  return {
    status,
    amountMinor: data.amount != null && Number.isFinite(amount) ? Math.round(amount * 100) : null,
    currency: typeof data.currency === "string" ? data.currency.toLowerCase() : null,
  };
}
