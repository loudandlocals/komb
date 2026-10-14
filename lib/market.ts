import "server-only";
import { headers } from "next/headers";
import { isShopifyConfigured } from "./shopify";

// The visitor's country, from the header the host adds (Vercel or
// Cloudflare), used to ask Shopify Markets for local prices: CAD in Canada,
// USD in the US.
//
// Only read once the store is connected. Reading request headers makes a page
// render per visitor, so with mock data the pages stay fully static.
export async function visitorCountry(): Promise<string | undefined> {
  if (!isShopifyConfigured) return undefined;
  const h = await headers();
  const code = (h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? "").toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : undefined;
}
