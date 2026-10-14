import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyNowButton } from "@/components/BuyButtons";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { OpenHashDetails } from "@/components/OpenHashDetails";
import { IngredientStrip } from "@/components/IngredientStrip";
import { GoalSection } from "@/components/GoalSection";
import { PackedSection } from "@/components/PackedSection";
import { ProductArt } from "@/components/ProductArt";
import { PurchasePanel } from "@/components/PurchasePanel";
import { ROUTINE_HANDLES, WARNINGS } from "@/lib/catalog";
import { PRODUCT_FAQ } from "@/lib/faq";
import { ingredientsFor } from "@/lib/ingredients";
import { formatMoney } from "@/lib/format";
import { visitorCountry } from "@/lib/market";
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

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const country = await visitorCountry();
  const product = await getProduct(handle, country);
  if (!product) notFound();

  const pairHandle = ROUTINE_HANDLES.includes(handle)
    ? ROUTINE_HANDLES.find((h) => h !== handle)
    : undefined;
  const pair = pairHandle ? await getProduct(pairHandle, country) : null;
  // Both steps in routine order, for the bundle button.
  const routine = pair
    ? ROUTINE_HANDLES.map((h) => (h === product.handle ? product : pair))
    : [];
  const url = `${SITE.url}/products/${product.handle}`;

  const faq = PRODUCT_FAQ[product.handle];
  const featured = ingredientsFor(product.handle);

  // Previous and next product, wrapping around the catalogue.
  const all = await getProducts(country);
  const at = all.findIndex((p) => p.handle === product.handle);
  const prev = all.length > 1 ? all[(at - 1 + all.length) % all.length] : null;
  const next = all.length > 1 ? all[(at + 1) % all.length] : null;
  const arrow =
    "grid size-11 place-items-center rounded-full border border-ink/40 text-[1.15rem] text-ink transition-colors hover:border-ink hover:bg-greige";

  return (
    <div>
      <OpenHashDetails />
      {/* One calm, near full-screen panel: details left, the product standing
          alone in the centre, purchase controls and accordion right. The key
          makes the panel fade in again when the arrows switch product. */}
      <section
        key={product.handle}
        aria-labelledby="product-title"
        className="relative grid min-h-[calc(100dvh-var(--header-h))] content-center gap-y-8 overflow-x-clip px-gutter pt-8 pb-8 [animation:panel-in_0.6s_ease-out_both] lg:px-[clamp(5.5rem,8.5vw,11rem)]"
      >
        <div className="mx-auto grid w-full max-w-[82rem] items-center gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Details */}
          <div className="relative z-1 order-2 grid w-full max-w-md gap-4 max-lg:mx-auto lg:order-none lg:max-w-none xl:max-w-88">
            {product.step && <p className="eyebrow">{product.step} of the routine</p>}
            <h1 id="product-title" className="text-[clamp(2rem,3.3vw,3rem)]">
              {product.title}
            </h1>
            {product.titleFr && (
              <p className="font-caslon text-[0.95rem] text-muted italic" lang="fr">
                {product.titleFr}
              </p>
            )}
            <p className="text-[1.05rem] font-normal">
              {formatMoney(product.price)}
              {product.size && <span className="font-light text-muted"> / {product.size}</span>}
            </p>
            <p className="text-muted">{product.summary}</p>
            <ul className="grid gap-1.5 text-[0.9rem]">
              {product.benefits.map((b) => (
                <li key={b} className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-gold">
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* The product, standing alone. The photo backdrop is a hair off the
              page colour, so its edges are feathered to read as a cut-out. It
              is scaled past its box to make the product large; only the
              photo's empty backdrop spills under the side columns, which sit
              above it. The box sits on the centre line of the page, with
              the two side columns the same width either side of it. */}
          <div className="relative order-1 mx-auto aspect-square w-[min(100%,24rem)] lg:order-none lg:w-[clamp(12rem,20vw,22rem)]">
            <div className="size-full [mask-image:radial-gradient(closest-side,#000_86%,transparent_100%)] lg:scale-[2]">
              <ProductArt
                kind={product.kind}
                imageUrl={product.pdpImageUrl ?? product.imageUrl}
                alt={product.imageAlt ?? product.title}
                className="w-[62%]"
                sizes="(min-width: 1024px) 40vw, 90vw"
                priority
              />
            </div>
          </div>

          {/* Purchase and details */}
          <div className="relative z-1 order-3 grid w-full max-w-md gap-5 max-lg:mx-auto lg:order-none lg:max-w-none lg:justify-self-end xl:max-w-88">
            <PurchasePanel product={product} routine={routine} />
            {product.notes && (
              <ul className="text-[0.82rem] text-muted">
                {product.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            )}
            <div className="accordion [&_details]:border-b [&_details]:border-line [&_details>p]:pb-5 [&_details>p]:text-[0.88rem] [&_details>p]:text-muted [&_summary]:py-4 [&_summary]:text-[0.72rem]">
              {product.directions && (
                <details>
                  <summary>How to use</summary>
                  <p>{product.directions}</p>
                  {product.usageNote && <p className="-mt-2">{product.usageNote}</p>}
                </details>
              )}
              {product.ingredients && (
                <details id="full-ingredients" className="scroll-mt-[calc(var(--header-h)+1rem)]">
                  <summary>Full ingredients</summary>
                  <p>{product.ingredients}</p>
                </details>
              )}
              {product.benefitsDetailed && (
                <details>
                  <summary>Benefits</summary>
                  <ul className="grid gap-2.5 pb-5 text-[0.88rem] text-muted">
                    {product.benefitsDetailed.map((b) => (
                      <li key={b.title}>
                        <strong className="font-medium text-ink">{b.title}</strong>: {b.body}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {product.category !== "other" && (
                <details>
                  <summary>Good to know</summary>
                  <p>{WARNINGS} Use within 6 months of opening. Made in USA.</p>
                </details>
              )}
            </div>
          </div>
        </div>

        {/* Previous and next product: at the side edges on large screens, and
            beside the dots under the panel on smaller ones. */}
        {prev && next && (
          <>
            <Link
              href={`/products/${prev.handle}`}
              aria-label={`Previous product: ${prev.title}`}
              className={`${arrow} max-lg:hidden lg:absolute lg:top-1/2 lg:left-4 lg:-translate-y-1/2`}
            >
              <span aria-hidden>←</span>
            </Link>
            <Link
              href={`/products/${next.handle}`}
              aria-label={`Next product: ${next.title}`}
              className={`${arrow} max-lg:hidden lg:absolute lg:top-1/2 lg:right-4 lg:-translate-y-1/2`}
            >
              <span aria-hidden>→</span>
            </Link>
            {/* Above the enlarged product photo, which otherwise covers the dots. */}
            <nav aria-label="Products" className="relative z-1 flex items-center justify-center gap-4">
              <Link href={`/products/${prev.handle}`} aria-label={`Previous product: ${prev.title}`} className={`${arrow} lg:hidden`}>
                <span aria-hidden>←</span>
              </Link>
              <ol className="flex items-center gap-2.5">
                {all.map((p) => (
                  <li key={p.handle}>
                    <Link
                      href={`/products/${p.handle}`}
                      aria-label={p.title}
                      aria-current={p.handle === product.handle ? "page" : undefined}
                      className="grid size-6 place-items-center"
                    >
                      <span
                        className={`block size-2 rounded-full ${
                          p.handle === product.handle ? "bg-ink" : "border border-ink/50"
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ol>
              <Link href={`/products/${next.handle}`} aria-label={`Next product: ${next.title}`} className={`${arrow} lg:hidden`}>
                <span aria-hidden>→</span>
              </Link>
            </nav>
          </>
        )}
      </section>

      <div className="container-site pt-6">
      {pair && (
        <aside
          aria-labelledby="pair-title"
          data-reveal
          className="on-greige grid grid-cols-[5rem_1fr] items-center gap-8 bg-greige p-8 md:grid-cols-[7rem_1fr_auto]"
        >
          <Link href={`/products/${pair.handle}`} aria-label={`View details: ${pair.title}`}>
            <ProductArt kind={pair.kind} imageUrl={pair.imageUrl} alt="" className="w-full" sizes="112px" />
          </Link>
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

      </div>

      <PackedSection product={product} />

      <GoalSection product={product} />

      {featured.length > 0 && (
        <section aria-labelledby="formula-title" className="overflow-x-clip pb-section">
          <header className="mb-[clamp(2.5rem,5vw,4rem)] grid justify-items-center gap-4 px-gutter text-center" data-reveal>
            <p className="eyebrow">Inside the formula</p>
            <h2 id="formula-title">
              Thoughtfully chosen, <em>plainly listed</em>
            </h2>
            <p className="max-w-xl text-muted">
              {product.kind === "serum"
                ? "Ten botanical oils go into the serum, now with pumpkin seed oil. Here are five you will find on the label."
                : "Mango and shea butters with plant oils, in a formula that also contains conditioning silicones and fragrance. Here are a few you will find on the label."}
            </p>
          </header>
          {/* Not wrapped in a reveal animation: its transform would isolate the
              photos and stop them blending into the page background. */}
          <IngredientStrip
            items={featured}
            linkTitle="The full list"
            columns={2}
            note={
              product.kind === "moisturizer"
                ? {
                    title: "Also in the jar",
                    tagline: ["conditioning ingredients,", "silicones and fragrance"],
                    body: "The formula also contains sweet almond and almond oils, which are tree nut ingredients.",
                  }
                : undefined
            }
            links={[{ href: "#full-ingredients", label: "See full ingredient list" }]}
          />
        </section>
      )}

      {faq && (
        <Faq
          id="faq-title"
          title={
            <>
              Questions about <em>{product.title}</em>
            </>
          }
          items={faq}
        />
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.summary,
          url,
          brand: { "@type": "Brand", name: SITE.name },
          category: "Hair care",
          ...(product.sku && { sku: product.sku }),
          ...(product.gtin12 && { gtin12: product.gtin12 }),
          ...(product.size && { size: product.size }),
          ...(product.imageUrl && { image: new URL(product.imageUrl, SITE.url).href }),
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
