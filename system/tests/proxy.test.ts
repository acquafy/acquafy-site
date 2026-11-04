import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const auth = vi.hoisted(() => ({ configured: true, getUser: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({
  authConfigured: () => auth.configured,
  createAuthClient: () => ({ auth: { getUser: auth.getUser } }),
}));
import { proxy } from "../proxy";

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://website.example/app${path}`, {
    headers,
    nextConfig: { basePath: "/app" },
  });
}
function user(role: string) {
  return { email_confirmed_at: "today", app_metadata: { portal_role: role } };
}

beforeEach(() => {
  auth.configured = true;
  auth.getUser.mockReset().mockResolvedValue({ data: { user: null } });
});

describe("portal request gate", () => {
  it("blocks forged demo cookies, referers and preview parameters", async () => {
    for (const path of [
      "/home?preview",
      "/base",
      "/m/duo/home",
      "/home.json",
    ]) {
      const response = await proxy(
        request(path, {
          cookie: "acq-session=1",
          referer: "https://website.example/app/base",
        }),
      );
      expect(response.status).toBe(307);
      expect(response.headers.get("location")).toContain("/app/login");
      expect(response.headers.get("cache-control")).toContain("no-store");
    }
  });
  it("leaves login available and keeps missing configuration locked", async () => {
    auth.configured = false;
    expect((await proxy(request("/login"))).status).toBe(200);
    expect((await proxy(request("/home"))).status).toBe(307);
    expect(auth.getUser).not.toHaveBeenCalled();
  });
  it("lets approved partners into the portal but denies internal tools", async () => {
    auth.getUser.mockResolvedValue({ data: { user: user("partner") } });
    expect((await proxy(request("/home"))).status).toBe(200);
    expect((await proxy(request("/docs/contract.pdf"))).status).toBe(404);
    expect((await proxy(request("/base"))).status).toBe(403);
    expect((await proxy(request("/m/duo/home"))).status).toBe(403);
  });
  it("lets approved staff into internal tools and authenticated login thumbnails", async () => {
    auth.getUser.mockResolvedValue({ data: { user: user("internal") } });
    expect((await proxy(request("/base"))).status).toBe(200);
    expect((await proxy(request("/login?preview"))).status).toBe(200);
    expect((await proxy(request("/login"))).headers.get("location")).toContain(
      "/app/home",
    );
  });
  it("fails closed on auth service errors", async () => {
    auth.getUser.mockRejectedValue(new Error("offline"));
    expect((await proxy(request("/home"))).status).toBe(307);
    expect((await proxy(request("/login"))).status).toBe(200);
  });
});

it("retires static sample documents even for signed-in staff", async () => {
  auth.getUser.mockResolvedValue({ data: { user: user("internal") } });
  expect((await proxy(request("/docs/contract.pdf"))).status).toBe(404);
});
it("routes mobile product screens to the shared live portal", async () => {
  expect(
    (await proxy(request("/m/ios/financeiro"))).headers.get("location"),
  ).toContain("/app/extrato");
  expect(
    (await proxy(request("/m/android/perfil/seguranca"))).headers.get(
      "location",
    ),
  ).toContain("/app/perfil");
  expect(
    (await proxy(request("/m/ios/login"))).headers.get("location"),
  ).toContain("/app/login");
});
it("leaves invitation activation and signed Stripe delivery to their own security boundaries", async () => {
  auth.configured = false;
  expect((await proxy(request("/ativar?token_hash=example"))).status).toBe(200);
  expect((await proxy(request("/api/stripe/webhook"))).status).toBe(200);
  expect(auth.getUser).not.toHaveBeenCalled();
  expect((await proxy(request("/api/agreements/unknown"))).status).toBe(307);
});

it("keeps investor registration public and resumes enrollment through login", async () => {
  expect((await proxy(request("/cadastro-investidor"))).status).toBe(200);
  expect(auth.getUser).not.toHaveBeenCalled();
  expect((await proxy(request("/adesao"))).headers.get("location")).toContain(
    "/app/login?next=adesao",
  );
  auth.getUser.mockResolvedValue({ data: { user: user("partner") } });
  expect(
    (await proxy(request("/login?next=adesao"))).headers.get("location"),
  ).toContain("/app/adesao");
  expect(
    (await proxy(request("/login?next=https://evil.example"))).headers.get(
      "location",
    ),
  ).toContain("/app/home");
});
