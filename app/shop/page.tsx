import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop scalp and haircare",
  description:
    "Shop Komb Hair: Botanical Hair Serum for the scalp, Renewal Hair Moisturizer for the lengths, plus hair ties and brushes.",
  alternates: { canonical: "/shop" },
  openGraph: { url: "/shop" },
};

const grid = "grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-[clamp(1rem,2vw,2rem)]";
const heading = "mb-8 border-b border-gold-light pb-4 text-[1.75rem]!";

export default async function ShopPage() {
  const products = await getProducts();
  const care = products.filter((p) => p.category !== "accessories");
  const accessories = products.filter((p) => p.category === "accessories");

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
        <div className={grid}>
          {care.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      {accessories.length > 0 && (
        <section id="accessories" aria-labelledby="accessories-title" className="mt-section">
          <h2 id="accessories-title" className={heading}>
            Accessories
          </h2>
          <div className={grid}>
            {accessories.map((p) => (
              <ProductCard key={p.handle} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
