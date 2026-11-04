// Feature flags read by the portal (Vercel Flags, project acquafy-site). They are the same three flags the website reads
// (lib/flags.ts at the repository root), so a button on the site and the page or action behind it switch together.
// Toggle with `vercel flags enable|disable <key> --environment production|preview|development`; no redeploy needed.
//
// Pages call `await requireFeature(flag)` (404 when off) and server actions return an error: hiding a button is not
// enough, a direct request must be refused too. If Vercel cannot be reached, each flag falls back to `defaultValue`
// (new purchase and investor flows fail closed).
import "server-only";
import { vercelAdapter } from "@flags-sdk/vercel";
import type { Adapter } from "flags";
import { flag } from "flags/next";
import { notFound } from "next/navigation";
import { BYPASS_COOKIE, verifyBypassCookie } from "@/lib/flags-bypass";

/**
 * Production bypass: a browser that holds the signed cookie issued by /api/flags-bypass (see lib/flags-bypass.ts) sees
 * every flow as on; everyone else still gets the Vercel Flags value. Not batched (no adapterId), so each flag decides here.
 */
function withBypass(): Adapter<boolean, unknown> {
  const base = vercelAdapter<boolean, unknown>();
  return {
    origin: base.origin,
    config: base.config,
    decide: async (params) => ((await verifyBypassCookie(params.cookies.get(BYPASS_COOKIE)?.value)) ? true : base.decide(params)),
  };
}

export const buyNow = flag<boolean>({
  key: "buy-now",
  description: "Purchase and lease flow: product orders, customer sign-up and the order screens",
  defaultValue: false,
  adapter: withBypass,
});

export const investorRegistration = flag<boolean>({
  key: "investor-registration",
  description: "Investor registration flow at /cadastro-investidor",
  defaultValue: false,
  adapter: withBypass,
});

/** 404 unless the feature is on. For pages that start a flow (existing orders, leases and enrollments stay reachable). */
export async function requireFeature(feature: () => Promise<boolean>): Promise<void> {
  if (!(await feature())) notFound();
}
