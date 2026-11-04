import { beforeEach, describe, expect, it, vi } from "vitest";
import Stripe from "stripe";
const processEvent = vi.hoisted(() => vi.fn());
vi.mock("@/lib/enrollment/payments", () => ({
  processStripeEvent: processEvent,
}));
vi.mock("@/lib/enrollment/server", () => ({
  stripeClient: () => new Stripe("sk_test_unit_tests_only"),
}));
import { POST } from "../app/api/stripe/webhook/route";
const secret = "whsec_unit_tests_only";
beforeEach(() => {
  vi.stubEnv("STRIPE_WEBHOOK_SECRET", secret);
  processEvent.mockReset().mockResolvedValue(undefined);
});
function request(body: string, signature?: string) {
  return new Request("https://portal.example/app/api/stripe/webhook", {
    method: "POST",
    body,
    headers: signature ? { "stripe-signature": signature } : {},
  });
}
describe("Stripe webhook signature boundary", () => {
  it("denies unsigned and modified requests before executing business logic", async () => {
    expect((await POST(request("{}"))).status).toBe(400);
    const body = JSON.stringify({
      id: "evt_unit",
      type: "checkout.session.completed",
      data: { object: {} },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret,
    });
    expect((await POST(request(body + " ", signature))).status).toBe(400);
    expect(processEvent).not.toHaveBeenCalled();
  });
  it("processes verified events and requests a retry after processing failure", async () => {
    const body = JSON.stringify({
      id: "evt_unit",
      type: "checkout.session.completed",
      data: { object: {} },
    });
    const signature = Stripe.webhooks.generateTestHeaderString({
      payload: body,
      secret,
    });
    expect((await POST(request(body, signature))).status).toBe(200);
    expect(processEvent).toHaveBeenCalledOnce();
    processEvent.mockRejectedValueOnce(new Error("Transient failure"));
    expect((await POST(request(body, signature))).status).toBe(503);
  });
});
