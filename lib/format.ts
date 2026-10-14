import type { Money } from "./types";

// "$43.99 USD": the symbol alone is ambiguous on a store that sells in both
// US and Canadian dollars, so the currency code always follows.
export function formatMoney({ amount, currencyCode }: Money): string {
  const value = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
  return `${value} ${currencyCode}`;
}
