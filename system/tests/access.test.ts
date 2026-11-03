import { describe, expect, it } from "vitest";
import { internalPath, loginPath, portalRole } from "../lib/portal-access";
import { portalPath } from "../lib/paths";

describe("portal authorization", () => {
  it("requires confirmed, non-anonymous users with an admin-assigned role", () => {
    expect(portalRole(null)).toBeNull();
    expect(portalRole({ app_metadata: { portal_role: "internal" } })).toBeNull();
    expect(portalRole({ email_confirmed_at: "today", is_anonymous: true, app_metadata: { portal_role: "internal" } })).toBeNull();
    expect(portalRole({ email_confirmed_at: "today", app_metadata: { portal_role: "admin" } })).toBeNull();
    for (const role of ["internal", "partner"] as const) {
      expect(portalRole({ email_confirmed_at: "today", app_metadata: { portal_role: role } })).toBe(role);
    }
  });
  it("restricts the design hub and mobile preview stage to staff", () => {
    for (const path of ["/base", "/base/telas", "/m/duo", "/m/duo/home"]) expect(internalPath(path)).toBe(true);
    for (const path of ["/home", "/documentos", "/m/ios/home"]) expect(internalPath(path)).toBe(false);
  });
  it("keeps mobile login destinations on the selected platform", () => {
    expect(loginPath("/m/ios/documentos")).toBe("/m/ios/login");
    expect(loginPath("/m/android/home")).toBe("/m/android/login");
    expect(loginPath("/home")).toBe("/login");
  });
  it("prefixes native URLs exactly once while preserving external and blob URLs", () => {
    expect(portalPath("/docs/contract.pdf")).toBe("/app/docs/contract.pdf");
    expect(portalPath("/app/docs/contract.pdf")).toBe("/app/docs/contract.pdf");
    for (const url of ["https://example.com", "mailto:a@example.com", "blob:document", "//example.com"]) expect(portalPath(url)).toBe(url);
  });
});
