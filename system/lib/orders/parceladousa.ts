import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// ParceladoUSA (parceladousa.com): the customer pays in installments with a Brazilian card on ParceladoUSA's hosted
// page, and the merchant is paid by ParceladoUSA. API (ParceladoUSA Business "API de Links de Pagamento",
// parceladopay.com/developers, JSON in and out): POST /paymentapi/auth (pubKey + merchantCode) returns a token valid
// for 30 minutes that must be reused (a token per request gets the account rate limited, HTTP 429); POST /order
// (amount, currency, customer, callback URL) returns the order id and the payment page; GET /order/{id} returns the
// status. The customer comes back to the callback with ?orderId=; status changes are POSTed, signed, to the webhook
// set on the API key (app/api/orders/parceladousa/route.ts). Neither is trusted: the status always comes from
// GET /order/{id}.
//
// Settings: PARCELADOUSA_PUBLIC_KEY, PARCELADOUSA_MERCHANT_CODE (store code), PARCELADOUSA_WEBHOOK_SECRET (the
// key's whsec_ token) and PARCELADOUSA_ENVIRONMENT (sandbox | production; previews are always sandbox).

const API = {
  sandbox: "https://apisandbox.parceladousa.com/v1/paymentapi",
  production: "https://api.parceladousa.com/v1/paymentapi",
} as const;

/** Prefix of a ParceladoUSA order id bound to a payment (order_payments.checkout_id), so it never collides with Stripe. */
export const PARCELADO_PREFIX = "pusa_";
export const isParceladoRef = (ref: string | null | undefined): ref is string => !!ref?.startsWith(PARCELADO_PREFIX);
export const parceladoRef = (orderId: string) => PARCELADO_PREFIX + orderId;
export const parceladoOrderId = (ref: string) => ref.slice(PARCELADO_PREFIX.length);

// delivered = approved and already paid out to the merchant.
export type ParceladoStatus = "open" | "pending" | "analysis" | "approved" | "delivered" | "canceled" | "aborted";
const STATUSES: ParceladoStatus[] = ["open", "pending", "analysis", "approved", "delivered", "canceled", "aborted"];

export function parceladoConfigured() {
  return !!process.env.PARCELADOUSA_PUBLIC_KEY && !!process.env.PARCELADOUSA_MERCHANT_CODE;
}

function baseUrl() {
  const mode = process.env.PARCELADOUSA_ENVIRONMENT ?? "sandbox";
  if (mode !== "sandbox" && mode !== "production") throw Error("Invalid ParceladoUSA environment");
  if (process.env.VERCEL_ENV === "preview" && mode !== "sandbox") throw Error("Preview deployments require ParceladoUSA sandbox");
  return API[mode];
}

async function call(path: string, init: RequestInit) {
  const headers = { Accept: "application/json", ...(init.body ? { "Content-Type": "application/json" } : {}), ...(init.headers as Record<string, string>) };
  const res = await fetch(baseUrl() + path, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(20000) });
  const body = await res.json().catch(() => null);
  // Errors come as {statusCode: 300…475, statusType: "error", msg}; a success may carry statusCode 1.
  if (!res.ok || !body || typeof body !== "object" || body.statusType === "error" || (typeof body.statusCode === "number" && body.statusCode >= 300))
    throw Object.assign(Error("ParceladoUSA request failed"), { status: res.status, code: body?.statusCode });
  return body as Record<string, unknown>;
}

const obj = (v: unknown) => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

// The token is reused until a minute before it expires (per server instance), as ParceladoUSA requires.
let cached: { key: string; token: string; expiresAt: number } | null = null;

/** Forgets the cached token (tests, or after ParceladoUSA rejects it). */
export function resetParceladoToken() {
  cached = null;
}

async function token() {
  if (!parceladoConfigured()) throw Error("ParceladoUSA is not configured");
  const key = `${baseUrl()}|${process.env.PARCELADOUSA_MERCHANT_CODE}|${process.env.PARCELADOUSA_PUBLIC_KEY}`;
  if (cached?.key === key && Date.now() < cached.expiresAt - 60_000) return cached.token;
  const body = await call("/auth", {
    method: "POST",
    body: JSON.stringify({ pubKey: process.env.PARCELADOUSA_PUBLIC_KEY, merchantCode: process.env.PARCELADOUSA_MERCHANT_CODE }),
  });
  const value = body.token ?? obj(body.data).token;
  if (typeof value !== "string" || !value) throw Error("ParceladoUSA authentication failed");
  // The token lasts 30 minutes. "expirate" is a local time without a time zone (Brasília), so it is not parsed:
  // the token is kept for 25 minutes, and a token ParceladoUSA rejects (410/420) is replaced anyway.
  const expiresAt = Date.now() + 25 * 60_000;
  cached = { key, token: value, expiresAt };
  return value;
}

/** Calls the API with the cached token; a token ParceladoUSA no longer accepts is replaced once. */
async function authed(path: string, init: RequestInit) {
  try {
    return await call(path, { ...init, headers: { Authorization: `Bearer ${await token()}` } });
  } catch (error) {
    // 401, or ParceladoUSA's 410 (invalid token) / 420 (expired token): get a new token once.
    const e = error as { status?: number; code?: number };
    if (!(e.status === 401 || e.code === 410 || e.code === 420 || e.status === 410 || e.status === 420)) throw error;
    resetParceladoToken();
    return call(path, { ...init, headers: { Authorization: `Bearer ${await token()}` } });
  }
}

export type ParceladoCustomer = { name: string; email: string; phone: string; postal_code: string; address: string; number: string; city: string; state: string };

/** Creates the ParceladoUSA order of one payment; returns its id and the page the customer pays on. */
export async function createParceladoOrder(input: { amountMinor: number; currency: "usd" | "brl"; customer: ParceladoCustomer; callback: string }) {
  const c = input.customer;
  const body = await authed("/order", {
    method: "POST",
    body: JSON.stringify({
      amount: Number((input.amountMinor / 100).toFixed(2)),
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
  const body = await authed(`/order/${encodeURIComponent(orderId)}`, { method: "GET" });
  const data = obj(body.data);
  const status = [data.status, body.status].find((s): s is ParceladoStatus => STATUSES.includes(s as ParceladoStatus));
  if (!status) throw Error("Unknown ParceladoUSA status");
  // The amount is only compared when the currency is reported with it (ParceladoUSA also reports USD/BRL totals).
  const currency = [data.currency, body.currency].find((v): v is string => typeof v === "string");
  const amount = Number(data.amount ?? body.amount);
  return {
    status,
    amountMinor: currency && Number.isFinite(amount) ? Math.round(amount * 100) : null,
    currency: currency ? currency.toLowerCase() : null,
  };
}

/**
 * Checks a webhook's signature: HMAC-SHA256 of "{timestamp}.{raw body}" with the key's whsec_ token, sent as
 * "v1=<hex>" in ParceladoUSA-Webhook-Signature, within 5 minutes of ParceladoUSA-Webhook-Timestamp.
 */
export function parceladoWebhookValid(rawBody: string, timestamp: string | null, signature: string | null, now = Date.now()) {
  const secret = process.env.PARCELADOUSA_WEBHOOK_SECRET;
  if (!secret || !timestamp || !signature || !/^\d{1,12}$/.test(timestamp)) return false;
  if (Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const received = signature.replace(/^v1=/, "");
  return received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}
