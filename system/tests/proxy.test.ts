import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const auth = vi.hoisted(() => ({ configured: true, getUser: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({
  authConfigured: () => auth.configured,
  createAuthClient: () => ({ auth: { getUser: auth.getUser } }),
}));
import { proxy } from "../proxy";

function request(path: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://website.example/app${path}`, { headers, nextConfig: { basePath: "/app" } });
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
    for (const path of ["/home?preview", "/base", "/m/duo/home", "/docs/contrato.pdf", "/home.json"]) {
      const response = await proxy(request(path, { cookie: "acq-session=1", referer: "https://website.example/app/base" }));
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
    expect((await proxy(request("/docs/contract.pdf"))).status).toBe(200);
    expect((await proxy(request("/base"))).status).toBe(403);
    expect((await proxy(request("/m/duo/home"))).status).toBe(403);
  });
  it("lets approved staff into internal tools and authenticated login thumbnails", async () => {
    auth.getUser.mockResolvedValue({ data: { user: user("internal") } });
    expect((await proxy(request("/base"))).status).toBe(200);
    expect((await proxy(request("/login?preview"))).status).toBe(200);
    expect((await proxy(request("/login"))).headers.get("location")).toContain("/app/home");
  });
  it("fails closed on auth service errors", async () => {
    auth.getUser.mockRejectedValue(new Error("offline"));
    expect((await proxy(request("/home"))).status).toBe(307);
    expect((await proxy(request("/login"))).status).toBe(200);
  });
});
