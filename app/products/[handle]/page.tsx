import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton, BuyNowButton } from "@/components/BuyButtons";
import { JsonLd } from "@/components/JsonLd";
import { ProductArt } from "@/components/ProductArt";
import { ROUTINE_HANDLES, WARNINGS } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { getProduct, getProducts } from "@/lib/shopify";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).handle);
  if (!product) return {};
  const url = `/products/${product.handle}`;
  return {
    title: product.size ? `${product.title}, ${product.size.split(" / ")[0]}` : product.title,
    description: product.summary,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: product.title,
      description: product.summary,
      ...(product.imageUrl && { images: [{ url: product.imageUrl, alt: product.title }] }),
    },
  };
}

function expectations(kind: string) {
  if (kind === "serum") {
    return "A nourished-feeling scalp and a calming ritual you can keep up. Komb is scalp care, not a hair loss treatment, and we do not promise regrowth.";
  }
  if (kind === "moisturizer") {
    return "Lengths that feel hydrated, softer and easier to manage. Results vary with hair type and how much you apply.";
  }
  return "A well-made everyday essential that fits alongside your routine.";
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const pairHandle = ROUTINE_HANDLES.includes(handle)
    ? ROUTINE_HANDLES.find((h) => h !== handle)
    : undefined;
  const pair = pairHandle ? await getProduct(pairHandle) : null;
  const url = `${SITE.url}/products/${product.handle}`;

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <nav aria-label="Breadcrumb" className="mb-8 text-[0.8rem] text-muted">
        <ol className="flex gap-2">
          <li>
            <Link href="/shop" className="underline underline-offset-4 hover:text-ink">
              Shop
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page">{product.title}</li>
        </ol>
      </nav>

      <div className="grid items-start gap-[clamp(2rem,6vw,6rem)] md:grid-cols-2">
        <div className="md:sticky md:top-32">
          <div className="on-greige arch mx-auto max-h-176 max-w-96 bg-greige! md:max-w-none">
            <ProductArt
              kind={product.kind}
              imageUrl={product.imageUrl}
              alt={product.title}
              className="w-[62%]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {product.step && <p className="eyebrow">{product.step} of the routine</p>}
          <h1 className="text-[clamp(2.4rem,4.5vw,3.75rem)]">{product.title}</h1>
          {product.titleFr && (
            <p className="font-caslon text-muted italic" lang="fr">
              {product.titleFr}
            </p>
          )}
          {product.tagline && (
            <p className="font-caslon text-[0.95rem] tracking-[0.04em] text-label">
              {product.tagline}
            </p>
          )}
          <p className="text-xl font-normal">
            {formatMoney(product.price)}
            {product.size && (
              <span className="text-[0.95rem] font-light text-muted"> · {product.size}</span>
            )}
          </p>
          <p className="max-w-136 text-[1.1rem] text-muted">{product.summary}</p>

          <ul className="grid gap-1.5">
            {product.benefits.map((b) => (
              <li key={b} className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-gold">
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-3 grid gap-3">
            <BuyNowButton products={[product]} className="w-full" />
            <AddToCartButton product={product} className="w-full" />
          </div>

          {product.notes && (
            <ul className="text-[0.85rem] text-muted">
              {product.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}

          <div className="accordion mt-4 border-t border-line [&_details]:border-b [&_details]:border-line [&_details>p]:pb-5 [&_details>p]:text-[0.95rem] [&_details>p]:text-muted">
            {product.directions && (
              <details open>
                <summary>How to use</summary>
                <p>{product.directions}</p>
              </details>
            )}
            {product.ingredients && (
              <details>
                <summary>Full ingredients</summary>
                <p>{product.ingredients}</p>
              </details>
            )}
            <details>
              <summary>What to expect</summary>
              <p>{expectations(product.kind)}</p>
            </details>
            {product.category !== "accessories" && (
              <details>
                <summary>Good to know</summary>
                <p>{WARNINGS} Use within 6 months of opening. Made in USA.</p>
              </details>
            )}
          </div>
        </div>
      </div>

      {pair && (
        <aside
          aria-labelledby="pair-title"
          data-reveal
          className="on-greige mt-section grid grid-cols-[5rem_1fr] items-center gap-8 bg-greige p-8 md:grid-cols-[7rem_1fr_auto]"
        >
          <ProductArt kind={pair.kind} imageUrl={pair.imageUrl} alt="" className="w-full" sizes="112px" />
          <div>
            <p className="eyebrow">Complete the routine</p>
            <h2 id="pair-title" className="my-1.5 text-[1.9rem]">
              <Link href={`/products/${pair.handle}`} className="hover:text-label">
                {pair.title}
              </Link>
            </h2>
            <p className="text-[0.95rem] text-muted">{pair.summary}</p>
          </div>
          <BuyNowButton
            products={[product, pair]}
            label="Buy both now"
            className="max-md:col-span-2"
          />
        </aside>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.summary,
          url,
          brand: { "@type": "Brand", name: SITE.name },
          ...(product.imageUrl && { image: product.imageUrl }),
          offers: {
            "@type": "Offer",
            url,
            price: product.price.amount.toFixed(2),
            priceCurrency: product.price.currencyCode,
            availability: product.availableForSale
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }}
      />
    </div>
  );
}
