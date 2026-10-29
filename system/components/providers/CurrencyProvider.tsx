// components/providers/CurrencyProvider.tsx
"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { CURRENCY_COOKIE, DEFAULT_CURRENCY, formatMoney, type CurrencyCode, type MoneyOptions } from "@/lib/currency";

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  /** Formats an amount given in USD in the selected currency. */
  money: (usd: number, options?: MoneyOptions) => string;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: DEFAULT_CURRENCY,
  setCurrency: () => {},
  money: (usd, options) => formatMoney(usd, DEFAULT_CURRENCY, options),
});

/** `initial` comes from the cookie read on the server, so the first paint already uses the right currency. */
export function CurrencyProvider({ initial, children }: { initial: CurrencyCode; children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(initial);

  const setCurrency = useCallback((code: CurrencyCode) => {
    setCurrencyState(code);
    document.cookie = `${CURRENCY_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const value = useMemo<CurrencyContextValue>(() => ({ currency, setCurrency, money: (usd, options) => formatMoney(usd, currency, options) }), [currency, setCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  return useContext(CurrencyContext);
}
