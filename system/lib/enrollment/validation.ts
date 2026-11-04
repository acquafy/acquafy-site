export function usdToMinor(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ""] = normalized.split(".");
  const minor = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));
  return Number.isSafeInteger(minor) && minor >= 50 && minor <= 99999999
    ? minor
    : null;
}
