import type { Money } from "./types";

export function formatMoney({ amount, currencyCode }: Money): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
