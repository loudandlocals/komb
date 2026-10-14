import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const pages = ["", "/shop", "/our-story", "/contact"];
  return [
    ...pages.map((path) => ({ url: `${SITE.url}${path}`, priority: path ? 0.7 : 1 })),
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.handle}`, priority: 0.9 })),
  ];
}
