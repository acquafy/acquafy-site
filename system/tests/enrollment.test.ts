import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
import { usdToMinor } from "../lib/enrollment/validation";
import { sessionState } from "../lib/enrollment/payments";
import {
  activationProof,
  validActivationProof,
} from "../lib/enrollment/activation";
describe("enrollment pricing", () => {
  it("uses exact USD minor units and rejects malformed or excessive amounts", () => {
    expect(usdToMinor("400.01")).toBe(40001);
    expect(usdToMinor("400,50")).toBe(40050);
    expect(usdToMinor("0.50")).toBe(50);
    for (const input of [
      "-10",
      "1e5",
      "1.001",
      "1000000",
      "0.49",
      "",
      "400 dollars",
    ])
      expect(usdToMinor(input)).toBeNull();
  });
});
describe("provider payment state", () => {
  it("never treats a completed unpaid Checkout as settled", () => {
    expect(sessionState({ status: "complete", payment_status: "unpaid" })).toBe(
      "processing",
    );
  });
  it("recognizes expiry and prioritizes refund/dispute risk over paid status", () => {
    expect(sessionState({ status: "expired", payment_status: "unpaid" })).toBe(
      "expired",
    );
    expect(sessionState({ status: "complete", payment_status: "paid" })).toBe(
      "paid",
    );
    expect(
      sessionState(
        { status: "complete", payment_status: "paid" },
        { refunded: true, disputed: false },
      ),
    ).toBe("refunded");
    expect(
      sessionState(
        { status: "complete", payment_status: "paid" },
        { refunded: false, disputed: true },
      ),
    ).toBe("disputed");
  });
});
describe("activation proof", () => {
  beforeEach(() =>
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "unit-test-only-signing-material"),
  );
  afterEach(() => vi.unstubAllEnvs());
  it("binds a previously verified invitation to its identity and enrollment", () => {
    const proof = activationProof("user-a", "enrollment-a");
    expect(validActivationProof(proof, "user-a", "enrollment-a")).toBe(true);
    expect(validActivationProof(proof, "user-b", "enrollment-a")).toBe(false);
    expect(validActivationProof(proof, "user-a", "enrollment-b")).toBe(false);
    expect(validActivationProof(proof + "x", "user-a", "enrollment-a")).toBe(
      false,
    );
  });
  it("expires independently of a still-valid auth session", () => {
    const proof = activationProof("a", "b");
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 900001);
    expect(validActivationProof(proof, "a", "b")).toBe(false);
    vi.restoreAllMocks();
  });
});
