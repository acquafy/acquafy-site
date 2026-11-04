import { beforeEach, expect, it, vi } from "vitest";
const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/lib/enrollment/server", () => ({ serviceClient: () => ({ rpc }) }));
import { registerInvestor } from "@/lib/enrollment/registration";
function application(extra: Partial<Record<string, string>> = {}) {
  const form = new FormData();
  for (const [key, value] of Object.entries({
    full_name: "Test Investor",
    email: "INVESTOR@example.com",
    phone: "+1 555 123 4567",
    country: "United States",
    consent: "yes",
    ...extra,
  }))
    form.set(key, value ?? "");
  return form;
}
beforeEach(() => rpc.mockReset().mockResolvedValue({ error: null }));
it("records a normalized application without accepting client prices or access grants", async () => {
  expect(
    (
      await registerInvestor(
        {},
        application({ price: "1", portal_role: "internal" }),
      )
    ).success,
  ).toBeTruthy();
  expect(rpc).toHaveBeenCalledWith("submit_investor_application", {
    payload: {
      full_name: "Test Investor",
      email: "investor@example.com",
      phone: "+1 555 123 4567",
      country: "United States",
      company: "",
      message: "",
    },
  });
});
it("requires contact consent and valid bounded fields", async () => {
  for (const invalid of [
    { consent: "" },
    { email: "bad" },
    { full_name: "A" },
    { message: "x".repeat(2001) },
  ] satisfies Record<string, string>[])
    expect(
      (
        await registerInvestor(
          {},
          application(invalid),
        )
      ).error,
    ).toBeTruthy();
  expect(rpc).not.toHaveBeenCalled();
});
it("discards honeypot submissions and reports service failures without leaking data", async () => {
  expect(
    (await registerInvestor({}, application({ website: "spam" }))).success,
  ).toBeTruthy();
  expect(rpc).not.toHaveBeenCalled();
  rpc.mockResolvedValue({ error: { message: "private database detail" } });
  const result = await registerInvestor({}, application());
  expect(result.error).toBeTruthy();
  expect(result.error).not.toContain("private database detail");
});
