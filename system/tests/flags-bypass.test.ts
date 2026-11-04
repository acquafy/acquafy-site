import { vi } from "vitest";
vi.mock("server-only", () => ({}));
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { verifyBypassCookie } from "@/lib/flags-bypass";
// The website issues the cookie; the portal must accept exactly what it issues.
import { createBypassCookie, isBypassToken } from "../../lib/flags-bypass";

const SECRET = "test-secret-with-enough-length";

describe("flags bypass cookie", () => {
  beforeEach(() => {
    process.env.FLAGS_BYPASS_SECRET = SECRET;
  });
  afterEach(() => {
    delete process.env.FLAGS_BYPASS_SECRET;
  });

  it("accepts a cookie issued by the website", async () => {
    const value = await createBypassCookie();
    expect(await verifyBypassCookie(value!)).toBe(true);
  });

  it("rejects missing, tampered, expired and wrong-secret cookies", async () => {
    const value = (await createBypassCookie())!;
    const [expires, signature] = value.split(".");
    expect(await verifyBypassCookie(undefined)).toBe(false);
    expect(await verifyBypassCookie("garbage")).toBe(false);
    expect(await verifyBypassCookie(`${Number(expires) + 100}.${signature}`)).toBe(false);
    expect(await verifyBypassCookie(value, (Number(expires) + 1) * 1000)).toBe(false);
    process.env.FLAGS_BYPASS_SECRET = "another-secret-also-long-enough";
    expect(await verifyBypassCookie(value)).toBe(false);
  });

  it("does nothing without a sufficiently long secret", async () => {
    const value = (await createBypassCookie())!;
    delete process.env.FLAGS_BYPASS_SECRET;
    expect(await verifyBypassCookie(value)).toBe(false);
    expect(await createBypassCookie()).toBeNull();
    process.env.FLAGS_BYPASS_SECRET = "short";
    expect(isBypassToken("short")).toBe(false);
  });

  it("only the exact secret is a valid token", () => {
    expect(isBypassToken(SECRET)).toBe(true);
    expect(isBypassToken(SECRET + "x")).toBe(false);
    expect(isBypassToken(null)).toBe(false);
  });
});

describe("flag definitions honour the bypass", () => {
  const cookieJar = (value?: string) =>
    ({ get: (name: string) => (name === "acquafy-flags-bypass" && value ? { name, value } : undefined) }) as never;
  const headers = new Headers() as never;

  it("forces a flag that Vercel reports as off, only with a valid cookie", async () => {
    process.env.FLAGS_BYPASS_SECRET = SECRET;
    vi.resetModules();
    vi.doMock("@flags-sdk/vercel", () => ({ vercelAdapter: () => ({ decide: async () => false }) }));
    const { buyNow, investorRegistration } = await import("@/lib/flags");
    const cookie = (await createBypassCookie())!;
    expect(await buyNow.decide!({ headers, cookies: cookieJar() })).toBe(false);
    expect(await buyNow.decide!({ headers, cookies: cookieJar("1.bad") })).toBe(false);
    expect(await buyNow.decide!({ headers, cookies: cookieJar(cookie) })).toBe(true);
    expect(await investorRegistration.decide!({ headers, cookies: cookieJar(cookie) })).toBe(true);
    vi.doUnmock("@flags-sdk/vercel");
  });
});
