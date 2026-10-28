// components/ui/Money.tsx
"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import type { MoneyOptions } from "@/lib/currency";

/** An amount in USD shown in the currency the investor picked in the header. */
export function Money({ value, whole, plain }: { value: number } & MoneyOptions) {
  const { money } = useCurrency();
  return <span className="whitespace-nowrap">{money(value, { whole, plain })}</span>;
}
