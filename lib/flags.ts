// Feature flags of the website (Vercel Flags, project acquafy-site). Toggle them in the Vercel dashboard or with
// `vercel flags enable|disable <key> --environment production|preview|development`; no redeploy is needed.
//
// The same three flags are read by the portal (system/lib/flags.ts) so a page and its server action stay in step.
// When Vercel cannot be reached (or locally without `vercel env pull`) each flag falls back to `defaultValue`:
// the established Be a Partner entry stays on; the new purchase and investor flows stay off (fail closed).
import { vercelAdapter } from "@flags-sdk/vercel";
import { evaluate, flag } from "flags/next";

export const bePartner = flag<boolean>({
  key: "be-a-partner",
  description: "Be a Partner buttons, links, forms and the partnership page",
  defaultValue: true,
  adapter: vercelAdapter,
});

export const buyNow = flag<boolean>({
  key: "buy-now",
  description: "Purchase and lease flow: Buy Now buttons, product pages, cart and the portal order screens",
  defaultValue: false,
  adapter: vercelAdapter,
});

export const investorRegistration = flag<boolean>({
  key: "investor-registration",
  description: "Investor registration flow: website entry points and /app/cadastro-investidor",
  defaultValue: false,
  adapter: vercelAdapter,
});

export type FeatureValues = { bePartner: boolean; buyNow: boolean; investorRegistration: boolean };

/** All flags in one batch (one evaluation, shared by the whole request). */
export async function getFeatures(): Promise<FeatureValues> {
  return evaluate({ bePartner, buyNow, investorRegistration });
}
