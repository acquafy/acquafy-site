import { afterEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { stripeClient } from "../lib/enrollment/server";
afterEach(() => vi.unstubAllEnvs());
describe("preview billing environment", () => {
  it("rejects live mode even when live billing is approved", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("STRIPE_ENVIRONMENT", "live");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_live_unit_tests_only");
    vi.stubEnv("STRIPE_LIVE_APPROVED", "true");
    expect(() => stripeClient()).toThrow("Preview deployments require Stripe test mode");
  });
  it("accepts a matching test key in preview", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("STRIPE_ENVIRONMENT", "test");
    vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_unit_tests_only");
    expect(stripeClient()).toBeDefined();
  });
});
