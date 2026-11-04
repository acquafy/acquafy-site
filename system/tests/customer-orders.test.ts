import { expect, it } from "vitest";
import { customerDestination } from "@/lib/orders/destination";
import { portalRole } from "@/lib/portal-access";
it("accepts customer roles only after verified email", () => {
  expect(portalRole({ app_metadata: { portal_role: "customer" } })).toBeNull();
  expect(
    portalRole({
      email_confirmed_at: "today",
      app_metadata: { portal_role: "customer" },
    }),
  ).toBe("customer");
});
it("preserves product selections through login without accepting external destinations", () => {
  expect(customerDestination("/pedido?product=neo-up&mode=lease")).toBe(
    "/pedido?product=neo-up&mode=lease",
  );
  for (const value of [
    "https://evil.example",
    "//evil.example",
    "/admin",
    "/api/stripe/webhook",
  ])
    expect(customerDestination(value)).toBe("/pedidos");
});
