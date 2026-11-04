import "server-only";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
export function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key || !process.env.SUPABASE_URL)
    throw new Error("Enrollment server configuration unavailable");
  return createClient(process.env.SUPABASE_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
export function stripeClient() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");
  const mode = process.env.STRIPE_ENVIRONMENT ?? "test";
  if (mode !== "test" && mode !== "live")
    throw new Error("Invalid Stripe environment");
  if (!key.startsWith(`rk_${mode}_`) && !key.startsWith(`sk_${mode}_`))
    throw new Error("Stripe key/environment mismatch");
  if (mode === "live" && process.env.STRIPE_LIVE_APPROVED !== "true")
    throw new Error("Live payments have not been enabled");
  return new Stripe(key, {
    apiVersion: "2026-09-30.endive",
    maxNetworkRetries: 2,
  });
}
export function publicOrigin() {
  const origin = new URL(process.env.PORTAL_PUBLIC_ORIGIN ?? "");
  if (
    origin.protocol !== "https:" &&
    !(
      process.env.NODE_ENV !== "production" &&
      ["localhost", "127.0.0.1"].includes(origin.hostname)
    )
  )
    throw new Error("Invalid public origin");
  if (
    origin.username ||
    origin.password ||
    origin.pathname !== "/" ||
    origin.search ||
    origin.hash
  )
    throw new Error("Public origin must not contain a path");
  return origin.origin;
}
export function checkoutConfigured() {
  return (
    !!process.env.STRIPE_SECRET_KEY &&
    !!process.env.STRIPE_WEBHOOK_SECRET &&
    !!process.env.PORTAL_PUBLIC_ORIGIN &&
    !!process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
