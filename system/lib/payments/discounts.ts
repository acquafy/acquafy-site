import type Stripe from "stripe";

/** Amounts of a Checkout Session after any Stripe coupon / promotion code. */
export type CheckoutAmounts = {
  /** Price before discounts; must match the amount stored in the database. */
  subtotal: number;
  /** Amount actually charged (0 when a 100% coupon was applied). */
  paid: number;
  discount: number;
  /** Promotion code id (`promo_…`) or coupon id applied, when any. */
  promotion: string | null;
};

const id = (value: string | { id: string } | null | undefined) =>
  !value ? null : typeof value === "string" ? value : value.id;

/**
 * Reads the verified Checkout amounts. Returns null when the session carries
 * anything other than a plain discount (tax, shipping) or inconsistent totals,
 * so callers reject it instead of recording a wrong amount.
 */
export function checkoutAmounts(
  session: Pick<
    Stripe.Checkout.Session,
    "amount_subtotal" | "amount_total" | "total_details" | "discounts"
  >,
): CheckoutAmounts | null {
  const subtotal = session.amount_subtotal,
    paid = session.amount_total;
  const discount = session.total_details?.amount_discount ?? 0;
  if (
    !Number.isInteger(subtotal) ||
    !Number.isInteger(paid) ||
    subtotal === null ||
    paid === null ||
    paid < 0 ||
    discount < 0 ||
    (session.total_details?.amount_tax ?? 0) !== 0 ||
    (session.total_details?.amount_shipping ?? 0) !== 0 ||
    paid !== subtotal - discount
  )
    return null;
  const applied = session.discounts?.[0];
  return {
    subtotal,
    paid,
    discount,
    promotion: id(applied?.promotion_code) ?? id(applied?.coupon),
  };
}

/** A session is settled when paid, or when a 100% coupon left nothing to pay. */
export function checkoutSettled(
  session: Pick<Stripe.Checkout.Session, "payment_status">,
) {
  return (
    session.payment_status === "paid" ||
    session.payment_status === "no_payment_required"
  );
}

/** Amounts of a subscription invoice after any coupon on the subscription. */
export function invoiceAmounts(
  invoice: Pick<Stripe.Invoice, "subtotal" | "total" | "amount_paid">,
) {
  const discount = invoice.subtotal - invoice.total;
  if (discount < 0 || invoice.total < 0 || invoice.amount_paid !== invoice.total)
    return null;
  return { subtotal: invoice.subtotal, paid: invoice.amount_paid, discount };
}
