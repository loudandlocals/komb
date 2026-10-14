import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { visitorCountry } from "@/lib/market";
import { getProducts } from "@/lib/shopify";
import { OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop scalp and haircare",
  description:
    "Shop Komb Hair: Botanical Hair Serum for the scalp, Renewal Hair Moisturizer for the lengths.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop", images: [OG_IMAGE] },
};

const grid = "grid max-w-4xl gap-[clamp(1.5rem,4vw,4rem)] sm:grid-cols-2";
const heading = "mb-8 border-b border-gold-light pb-4 text-[1.75rem]!";

export default async function ShopPage() {
  const products = await getProducts(await visitorCountry());

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-208 gap-4">
        <p className="eyebrow">Shop</p>
        <h1>
          Scalp care first. <em>Then the lengths.</em>
        </h1>
      </header>

      <section aria-labelledby="care-title">
        <h2 id="care-title" className={heading}>
          Scalp &amp; haircare
        </h2>
        <div className={grid} data-reveal="stagger">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
