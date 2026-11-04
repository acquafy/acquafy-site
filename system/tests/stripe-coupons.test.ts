import { vi } from "vitest";
vi.mock("server-only", () => ({}));
import { describe, expect, it } from "vitest";
import {
  checkoutAmounts,
  checkoutSettled,
  invoiceAmounts,
} from "@/lib/payments/discounts";
import { sessionState } from "../lib/enrollment/payments";

const totals = (discount = 0, extra = {}) => ({
  amount_discount: discount,
  amount_shipping: 0,
  amount_tax: 0,
  ...extra,
});

describe("Stripe coupons on Checkout", () => {
  it("keeps the stored price as subtotal and records the discounted charge", () => {
    expect(
      checkoutAmounts({
        amount_subtotal: 80000,
        amount_total: 60000,
        total_details: totals(20000),
        discounts: [{ coupon: "co_1", promotion_code: "promo_1" }],
      }),
    ).toEqual({
      subtotal: 80000,
      paid: 60000,
      discount: 20000,
      promotion: "promo_1",
    });
    expect(
      checkoutAmounts({
        amount_subtotal: 1000,
        amount_total: 1000,
        total_details: totals(),
        discounts: [],
      }),
    ).toEqual({ subtotal: 1000, paid: 1000, discount: 0, promotion: null });
  });
  it("rejects inconsistent totals, tax and shipping", () => {
    const base = { amount_subtotal: 1000, discounts: null };
    expect(
      checkoutAmounts({ ...base, amount_total: 500, total_details: totals(100) }),
    ).toBeNull();
    expect(
      checkoutAmounts({
        ...base,
        amount_total: 1100,
        total_details: totals(0, { amount_tax: 100 }),
      }),
    ).toBeNull();
    expect(
      checkoutAmounts({ ...base, amount_total: null, total_details: null }),
    ).toBeNull();
  });
  it("treats a 100% coupon as settled", () => {
    expect(checkoutSettled({ payment_status: "no_payment_required" })).toBe(true);
    expect(checkoutSettled({ payment_status: "unpaid" })).toBe(false);
    expect(
      sessionState({ status: "complete", payment_status: "no_payment_required" }),
    ).toBe("paid");
  });
  it("reads discounted subscription invoices", () => {
    expect(
      invoiceAmounts({ subtotal: 1001, total: 501, amount_paid: 501 }),
    ).toEqual({ subtotal: 1001, paid: 501, discount: 500 });
    expect(invoiceAmounts({ subtotal: 1001, total: 0, amount_paid: 0 })).toEqual(
      { subtotal: 1001, paid: 0, discount: 1001 },
    );
    expect(
      invoiceAmounts({ subtotal: 1001, total: 501, amount_paid: 400 }),
    ).toBeNull();
  });
});
