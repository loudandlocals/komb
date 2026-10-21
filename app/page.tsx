import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuyNowButton } from "@/components/BuyButtons";
import { Faq } from "@/components/Faq";
import { HeroVideo } from "@/components/HeroVideo";
import { DifferentCarousel, type DifferentSlide } from "@/components/DifferentCarousel";
import { IngredientStrip } from "@/components/IngredientStrip";
import { ProductShowcase } from "@/components/ProductShowcase";
import { StickyBuyBar } from "@/components/StickyBuyBar";
import { ROUTINE_HANDLES } from "@/lib/catalog";
import { HOME_FAQ } from "@/lib/faq";
import { INGREDIENTS } from "@/lib/ingredients";
import { visitorCountry } from "@/lib/market";
import { getProducts } from "@/lib/shopify";
import { OG_IMAGE } from "@/lib/site";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/", images: [OG_IMAGE] },
};

// One slide per point: the photo in front of the carousel decides which of
// these shows on the left.
const DIFFERENT: DifferentSlide[] = [
  {
    title: "Scalp first",
    body: "A healthy haircare routine starts at the root. Ours begins with the scalp and continues through the lengths.",
    image: "/images/benefits/scalp.jpg",
    alt: "Close view of a hairline and scalp, with the hair combed smoothly back",
    position: "object-center",
  },
  {
    title: "Made for changing hair",
    body: "Created for women navigating changes in their hair, through postpartum, perimenopause, and the changes that come with age, when hair feels thinner, drier, or simply different than it used to.",
    image: "/images/benefits/changing-hair.png",
    alt: "A woman with long wavy brown hair holding a bottle of Komb Botanical Hair Serum",
    position: "object-center",
  },
  {
    title: "Ingredients you can read",
    body: "Every ingredient is listed in full, so you know what you are putting on your scalp and hair.",
    image: "/images/benefits/ingredient.jpg",
    alt: "Rosemary, olives, half an avocado, plant butter and juniper berries laid out from above",
    position: "object-center",
  },
  {
    title: "Created by Women. Inspired by you.",
    body: "We understand that your hair\u2019s needs change through different stages of life. That\u2019s why we created Komb, a simple, nourishing routine to help you care for your hair and feel confident in it.",
    image: "/images/banner-2.png",
    alt: "The serum and moisturizer displayed on top of their cartons",
    position: "object-[45%_50%]",
  },
];

// Set to true to grade the hero photo toward the video's muted tone
// (taupe wash at 15%, saturation 65%); false shows the photo's own colours.
const MATCH_VIDEO_TONE = true;
// The hero's Buy now sits over imagery, so it is white with ink text there.
const HERO_BUTTON =
  "border-white bg-white text-ink enabled:hover:border-greige enabled:hover:bg-greige";
const sectionHead = "mb-[clamp(2.5rem,5vw,4rem)] grid justify-items-center gap-4 text-center";

function RoutineStep({ number, product }: { number: number; product: Product }) {
  return (
    <div>
      <p aria-hidden className="font-caslon text-[1.6rem] leading-none text-accent italic">
        0{number}
      </p>
      <h3 className="mt-2 text-[clamp(1.45rem,2.1vw,1.85rem)] leading-[1.1] tracking-[-0.02em] italic">
        <Link href={`/products/${product.handle}`} className="hover:text-label">
          {product.title}
        </Link>
      </h3>
      <p className="mt-1.5 mb-2 font-caslon text-[0.9rem] text-label italic">{product.tagline}</p>
      <p className="text-[0.88rem] text-muted">{product.directions}</p>
    </div>
  );
}

export default async function HomePage() {
  const products = await getProducts(await visitorCountry());
  const routine = ROUTINE_HANDLES.map((h) => products.find((p) => p.handle === h)).filter(
    (p) => p !== undefined
  );

  const needs = [
    {
      href: "/products/botanical-hair-serum",
      image: "/images/categories2.png",
      alt: "Serum being applied from a dropper to the scalp along the hairline",
      label: "Scalp care",
      caption: "Scalp care: nourish the foundation",
      position: "object-top",
      product: "Botanical Hair Serum",
    },
    {
      href: "/products/renewal-hair-moisturizer",
      image: "/images/categories1.png",
      alt: "Smooth, glossy lengths of hair swept over one shoulder",
      label: "Lengths",
      caption: "Lengths: hydrate and smooth",
      position: "object-[50%_40%]",
      product: "Renewal Hair Moisturizer",
    },
  ];

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="-mt-(--nav-h) flex h-[calc(100dvh-var(--bar-h))] min-h-140 flex-col md:min-h-160"
      >
        <div
          id="hero-media"
          className="relative grid min-h-0 flex-1 grid-rows-[3fr_2fr] md:grid-cols-[2fr_3fr] md:grid-rows-1"
        >
          {/* Subtle top fade behind the transparent header */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-1 hero-top-fade h-[calc(var(--nav-h)+7rem)]"
          />
          {/* Progressive blur along the bottom edge; the copy sits above it */}
          <div
            aria-hidden
            className="hero-bottom-blur pointer-events-none absolute inset-x-0 bottom-0 z-1 h-1/4"
          />
          {/* Phones show the video first, then the photo; side by side from tablets up. */}
          <div className="relative overflow-hidden max-md:order-2">
            <Image
              src="/images/hero-products-2.jpg"
              alt="Komb Botanical Hair Serum in a glass dropper bottle beside a jar of Renewal Hair Moisturizer"
              fill
              priority
              sizes="(min-width: 768px) 40vw, 120vw"
              className={`object-cover object-[42%_50%] ${
                MATCH_VIDEO_TONE ? "brightness-[.97] contrast-[.96] saturate-[.65]" : ""
              }`}
            />
            {MATCH_VIDEO_TONE && (
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#907863]/15" />
            )}
            {/* Soft local shade so the copy reads over the photo */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/55 via-ink/25 to-transparent max-md:hidden"
            />
            <div className="absolute inset-x-gutter bottom-[clamp(1.25rem,4vw,3rem)] z-2 grid justify-items-start gap-4 max-md:hidden">
              <p className="max-w-96 font-sans text-[clamp(0.95rem,1.25vw,1.2rem)] leading-normal font-normal tracking-[0.03em] text-offwhite [text-shadow:0_1px_14px_rgb(39_37_34/0.6)]">
                Hair changes can feel personal. Begin with a simple routine that
                nourishes your scalp and softens your lengths.
              </p>
              {routine.length === 2 && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <BuyNowButton
                    products={routine}
                    className={HERO_BUTTON}
                    label="Buy the routine"
                    showPrice
                  />
                  <p className="text-[0.8rem] font-normal text-offwhite [text-shadow:0_1px_10px_rgb(39_37_34/0.7)]">
                    The two-step routine:
                    <br />
                    scalp serum + hair moisturizer
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden max-md:order-1">
            <HeroVideo />
            <div className="absolute right-gutter bottom-[clamp(1.5rem,4vw,3rem)] left-gutter z-2 grid justify-items-start gap-5">
            <h1
              id="hero-title"
              className="font-caslon text-[clamp(1.95rem,4.4vw,4.4rem)] leading-none font-normal tracking-[-0.02em] whitespace-nowrap text-offwhite italic [text-shadow:0_1px_18px_rgb(39_37_34/0.6)]"
            >
              <span className="block">
                When <span className="text-[#E3D7CB]">hair changes</span>,
              </span>
              <span className="block pl-[2.4em]">care starts</span>
              <span className="block pl-[1.2em]">at the scalp</span>
            </h1>
            <p className="-mt-2 max-w-72 text-[0.9rem] font-normal text-offwhite [text-shadow:0_1px_10px_rgb(39_37_34/0.7)] md:hidden">
              A simple two-step routine to nourish your scalp and soften your lengths.
            </p>
            {/* Phones: the photo is too short for its copy block, so Buy now lives here */}
            {routine.length === 2 && (
              <BuyNowButton
                products={routine}
                className={`md:hidden ${HERO_BUTTON}`}
                label="Buy the routine"
                showPrice
              />
            )}
            </div>
          </div>
        </div>

      </section>

      <section className="container-site pt-section pb-12" aria-labelledby="collection-title">
        <header className={`${sectionHead} lg:mb-10!`} data-reveal>
          <p className="eyebrow">The collection</p>
          <h2 id="collection-title">
            The essentials, <em>start to ends</em>
          </h2>
        </header>
        <ProductShowcase products={products} />
        {/* Facts straight from the label, close to the first products. */}
        <ul
          className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap justify-center gap-x-8 gap-y-2 text-center text-[0.72rem] font-medium tracking-[0.16em] text-muted uppercase"
          data-reveal
        >
          <li>For all hair types</li>
          <li>Full ingredient lists</li>
          <li>Made in USA</li>
        </ul>
      </section>

      <section className="py-[clamp(3rem,6vw,5rem)]" aria-labelledby="needs-title">
        {/* Full-width editorial grid: only a small side margin, no max width */}
        <div className="px-4 md:px-6">
          <header className={sectionHead} data-reveal>
            <p className="eyebrow">Shop by need</p>
            <h2 id="needs-title">Where would you like to begin?</h2>
          </header>
          <ul className="grid gap-x-[clamp(1rem,3vw,3rem)] gap-y-12 md:grid-cols-2" data-reveal="stagger">
            {needs.map((n, i) => (
              <li key={n.label}>
                <Link href={n.href} className="group block">
                  <span className="mb-4 flex items-baseline gap-3 text-[0.74rem] font-medium tracking-[0.2em] uppercase">
                    <span>0{i + 1} /</span>
                    <span>{n.caption}</span>
                  </span>
                  <span className="relative block aspect-square overflow-hidden md:aspect-4/3">
                    <Image
                      src={n.image}
                      alt={n.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${n.position}`}
                    />
                  </span>
                  <span className="mt-4 inline-block border-b border-ink pb-0.5 text-[0.74rem] font-medium tracking-[0.16em] uppercase group-hover:border-gold">
                    Shop {n.product}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="different-title"
        // --bleed is the distance from the content edge to the page edge, so
        // the photo row can run off the right side of the screen.
        className="py-section pl-(--bleed) [--bleed:max(var(--spacing-gutter),calc((100vw-82rem)/2+var(--spacing-gutter)))]"
        data-reveal
      >
        <h2 id="different-title" className="sr-only">
          Why we&rsquo;re different: a brand that understands the change
        </h2>
        <DifferentCarousel slides={DIFFERENT}>
          {routine.length === 2 && (
            <BuyNowButton products={routine} label="Buy the routine" showPrice />
          )}
        </DifferentCarousel>
      </section>

      <section id="routine" aria-labelledby="routine-title" className="container-site py-section">
        <header className="mx-auto mb-[clamp(3rem,7vw,6rem)] grid max-w-[70%] justify-items-center gap-5 text-center max-md:max-w-none" data-reveal>
          <p className="eyebrow">The routine</p>
          <h2 id="routine-title" className="text-[clamp(1.9rem,4.2vw,3.5rem)]">
            Two steps. <em>A few quiet minutes.</em> Serum for the scalp, then
            moisturizer for the lengths.
          </h2>
        </header>

        {/* Asymmetric collage: a small photo top left, a large one in the middle
            and a small one bottom right, with each step's directions in the
            empty space beside its photo. Stacks on phones. */}
        <div className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-10 md:grid-cols-[22fr_45fr_22fr] md:justify-between" data-reveal="stagger">
          <div className="order-2 flex flex-col justify-between gap-8 md:order-none">
            <div className="relative aspect-4/5">
              <Image
                src="/images/steps/1.png"
                alt="Serum being applied with a dropper along the hair parting"
                fill
                sizes="(min-width: 768px) 22vw, 100vw"
                className="object-cover"
              />
            </div>
            {routine[0] && <RoutineStep number={1} product={routine[0]} />}
          </div>

          <div className="relative order-1 aspect-4/5 md:order-none">
            <Image
              src="/images/steps/center-image-4.jpg"
              alt="The serum and moisturizer on a wooden tray beside a bathroom basin, with a stack of cotton pads"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="order-3 flex flex-col justify-between gap-8 max-md:flex-col-reverse md:order-none">
            {routine[1] && <RoutineStep number={2} product={routine[1]} />}
            <div className="relative aspect-4/5">
              <Image
                src="/images/steps/2.png"
                alt="Moisturizer being worked through the lengths of damp hair, with the open jar in front"
                fill
                sizes="(min-width: 768px) 22vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {routine.length === 2 && (
          <p className="mt-[clamp(2.5rem,5vw,4rem)] text-center">
            <BuyNowButton products={routine} label="Buy the routine" showPrice />
          </p>
        )}
      </section>

      <section
        aria-labelledby="formulas-title"
        // The photos are scaled past their cells; clip so they never widen the page.
        className="overflow-x-clip py-section"
      >
        <header className={`${sectionHead} px-gutter`} data-reveal>
          <p className="eyebrow">Inside the formulas</p>
          <h2 id="formulas-title">
            Thoughtfully chosen, <em>plainly listed</em>
          </h2>
          <p className="max-w-xl text-muted">
            Ten botanical oils in the serum, now with pumpkin seed oil. Mango and shea butters in the
            moisturizer. Here are a few you will find on the label.
          </p>
        </header>
        {/* Not wrapped in a reveal animation: its transform would isolate the
            photos and stop them blending into the page background. */}
        <IngredientStrip
          items={INGREDIENTS}
          links={[
            { href: "/products/botanical-hair-serum#full-ingredients", label: "Serum ingredients" },
            { href: "/products/renewal-hair-moisturizer#full-ingredients", label: "Moisturizer ingredients" },
          ]}
        />
      </section>

      <Faq
        id="faq-title"
        title={
          <>
            Good to know, <em>before you begin</em>
          </>
        }
        items={HOME_FAQ}
      />

      <section aria-labelledby="promise-title" className="container-site pb-section">
        {/* No panel: the basket photo's pale backdrop is levelled to white in
            basket-clean.jpg, so multiply drops it out and the basket and its
            woven shadow sit straight on the page background. It is not
            animated in, since a fade or transform would stop the blend while
            it ran. */}
        <div className="grid items-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-8 text-ink md:grid-cols-[11fr_9fr]">
          <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-none">
            <Image
              src="/images/basket-clean.jpg"
              alt="The serum and moisturizer in a woven basket beside a folded towel"
              fill
              sizes="(min-width: 768px) 46vw, 100vw"
              className="object-contain mix-blend-multiply"
            />
          </div>

          <div>
            <div className="grid justify-items-start gap-7" data-reveal>
              <h2 id="promise-title" className="eyebrow font-sans! text-ink! not-italic">
                Our promise
              </h2>
              <p className="font-caslon text-[clamp(1.4rem,2.3vw,2.1rem)] leading-[1.2] tracking-[-0.02em] italic">
                We created the haircare we wanted for ourselves, with thoughtful
                ingredients and uncompromising care. Because the standards we hold
                for your hair are the same ones we hold for our own.
              </p>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                {routine.length === 2 && (
                  <BuyNowButton
                    products={routine}
                    label="Buy the routine"
                    showPrice
                  />
                )}
                <Link href="/our-story" className="text-link border-ink! hover:text-ink!">
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {routine.length === 2 && <StickyBuyBar products={routine} />}
    </>
  );
}
