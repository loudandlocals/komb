import "server-only";
import { cookies, headers } from "next/headers";
import { isShopifyConfigured } from "./shopify";

// The countries the store sells to, each with its Shopify Markets currency.
export const MARKETS = [
  { country: "CA", label: "Canada", currency: "CAD" },
  { country: "US", label: "United States", currency: "USD" },
] as const;

export const COUNTRY_COOKIE = "komb-country";

// The visitor's country, used to ask Shopify Markets for local prices: CAD in
// Canada, USD in the US. A choice made in the footer switcher wins; otherwise
// it comes from the header the host adds (Vercel or Cloudflare).
//
// Only read once the store is connected. Reading the request makes a page
// render per visitor, so with mock data the pages stay fully static.
export async function visitorCountry(): Promise<string | undefined> {
  if (!isShopifyConfigured) return undefined;
  const chosen = (await cookies()).get(COUNTRY_COOKIE)?.value;
  if (chosen && MARKETS.some((m) => m.country === chosen)) return chosen;
  const h = await headers();
  const code = (h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "").toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : undefined;
}
