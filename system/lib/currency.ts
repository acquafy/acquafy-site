// lib/currency.ts
//
// Display currencies. Contract values live in USD (the payout currency); the selector only changes how
// they are shown, using the reference rates below (mock until a rates feed is connected).

export type CurrencyCode = "USD" | "BRL" | "EUR";

export const CURRENCY_COOKIE = "acq-currency";
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export const CURRENCIES: Record<CurrencyCode, { code: CurrencyCode; short: string; name: string; rate: number }> = {
  USD: { code: "USD", short: "US$", name: "Dólar americano", rate: 1 },
  BRL: { code: "BRL", short: "R$", name: "Real brasileiro", rate: 5.4 },
  EUR: { code: "EUR", short: "€", name: "Euro", rate: 0.92 },
};

export const currencyList = Object.values(CURRENCIES);

export function isCurrency(value: string | undefined | null): value is CurrencyCode {
  return !!value && value in CURRENCIES;
}

const formatters = new Map<string, Intl.NumberFormat>();

function formatter(code: CurrencyCode, digits: number): Intl.NumberFormat {
  const key = `${code}:${digits}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat("pt-BR", { style: "currency", currency: code, minimumFractionDigits: digits, maximumFractionDigits: digits });
    formatters.set(key, f);
  }
  return f;
}

export type MoneyOptions = {
  /** Round to whole units (headline figures). */
  whole?: boolean;
  /** Drop the currency symbol (table cells under a "(US$)" header, chart axes). */
  plain?: boolean;
};

/** Converts an amount in USD to `code` and formats it. "US$ 400,00" · "R$ 2.160,00" · "€ 368,00". */
export function formatMoney(usd: number, code: CurrencyCode = DEFAULT_CURRENCY, { whole = false, plain = false }: MoneyOptions = {}): string {
  const value = usd * CURRENCIES[code].rate;
  const digits = whole ? 0 : 2;
  if (plain) return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
  // Intl renders USD as "US$" in pt-BR already; normalise the narrow no-break space it puts after the symbol.
  return formatter(code, digits).format(value).replace(/ /g, " ");
}
