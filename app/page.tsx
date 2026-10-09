import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Avocado, Juniper, Olive, Rosemary, Shea } from "@/components/Botanicals";
import { BuyNowButton } from "@/components/BuyButtons";
import { HeroVideo } from "@/components/HeroVideo";
import { ProductArt } from "@/components/ProductArt";
import { ProductCard } from "@/components/ProductCard";
import { ROUTINE_HANDLES } from "@/lib/catalog";
import { formatMoney } from "@/lib/format";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

const DIFFERENT = [
  {
    title: "Scalp first",
    body: "A healthy haircare routine starts at the root. Ours begins with the scalp and continues through the lengths.",
  },
  {
    title: "Made for changing hair",
    body: "Created with women in their 30s and 40s in mind, through postpartum, perimenopause and everything between.",
  },
  {
    title: "Ingredients you can read",
    body: "Every ingredient is listed in full, in English and French, so you know what you are putting on your scalp and hair.",
  },
  {
    title: "Honest expectations",
    body: "No miracle promises. Just clear directions and a routine that helps your hair look and feel cared for.",
  },
];

const BOTANICALS = [
  { Art: Rosemary, name: "Rosemary oil", where: "In the serum", note: "An aromatic oil with a long history in scalp care rituals." },
  { Art: Avocado, name: "Avocado oil", where: "In the serum", note: "A rich, cushioning oil that leads the serum's blend." },
  { Art: Olive, name: "Olive oil", where: "In both", note: "A classic conditioning oil found in both formulas." },
  { Art: Shea, name: "Shea & mango butters", where: "In the moisturizer", note: "Creamy butters that help lengths feel soft and smooth." },
  { Art: Juniper, name: "Juniper berry oil", where: "In the serum", note: "A crisp botanical oil that rounds out the blend." },
];

// Set to true to grade the hero photo toward the video's muted tone
// (taupe wash at 15%, saturation 65%); false shows the photo's own colours.
const MATCH_VIDEO_TONE = true;
const sectionHead = "mb-[clamp(2.5rem,5vw,4rem)] grid justify-items-center gap-4 text-center";
const inset = "px-[max(var(--spacing-gutter),calc((100vw-82rem)/2+var(--spacing-gutter)))]";

export default async function HomePage() {
  const products = await getProducts();
  const routine = ROUTINE_HANDLES.map((h) => products.find((p) => p.handle === h)).filter(
    (p) => p !== undefined
  );
  const [serum, moisturizer] = routine;
  const routineTotal = routine.length
    ? {
      amount: routine.reduce((n, p) => n + p.price.amount, 0),
      currencyCode: routine[0].price.currencyCode,
    }
    : null;

  const tiles = [
    { href: "/products/botanical-hair-serum", kind: "serum" as const, image: serum?.imageUrl, title: "Scalp care", sub: "Nourish the foundation" },
    { href: "/products/renewal-hair-moisturizer", kind: "moisturizer" as const, image: moisturizer?.imageUrl, title: "Lengths", sub: "Hydrate and smooth" },
    { href: "/shop#accessories", kind: "brush" as const, image: undefined, title: "Accessories", sub: "Ties and brushes" },
  ];

  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="-mt-(--nav-h) flex flex-col md:h-[calc(100dvh-var(--bar-h))] md:min-h-160"
      >
        <div
          id="hero-media"
          className="relative grid h-[calc(100dvh-11.5rem)] min-h-120 grid-rows-[2fr_3fr] md:h-auto md:min-h-0 md:flex-1 md:grid-cols-[2fr_3fr] md:grid-rows-1"
        >
          {/* Subtle top fade behind the transparent header */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-1 hero-top-fade h-[calc(var(--nav-h)+7rem)]"
          />
          <div className="relative overflow-hidden">
            <Image
              src="/images/hero-image-1.png"
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
            <div className="absolute inset-x-gutter bottom-[clamp(1.25rem,4vw,3rem)] grid justify-items-start gap-4 max-md:hidden">
              <p className="font-caslon text-[clamp(1.1rem,1.7vw,1.6rem)] leading-snug text-offwhite italic [text-shadow:0_1px_14px_rgb(39_37_34/0.6)]">
                Nourish your scalp.
                <br />
                Soften your lengths.
              </p>
              {routine.length === 2 && (
                <BuyNowButton products={routine} ariaLabel="Buy now: the two-step routine" />
              )}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <HeroVideo />
            <h1
              id="hero-title"
              className="absolute right-gutter bottom-[clamp(1.5rem,4vw,3rem)] left-gutter font-caslon text-[clamp(2rem,4.1vw,3.9rem)] leading-[1.2] font-normal tracking-[0.01em] whitespace-nowrap text-offwhite italic [text-shadow:0_1px_18px_rgb(39_37_34/0.6)]"
            >
              <span className="block">Care that</span>
              <span className="block pl-[3.2em]">starts at</span>
              <span className="block pl-[1.6em]">the scalp</span>
            </h1>
          </div>
        </div>

        <div className="container-site flex flex-col-reverse gap-5 border-b border-line py-5 md:min-h-20 md:flex-row md:items-center md:justify-between md:gap-10 md:py-3">
          <p className="max-w-160 text-[0.95rem] leading-normal text-muted">
            A simple two-step routine: a botanical serum to nourish your scalp and a
            renewal moisturizer for softer, smoother lengths. So you can feel like
            yourself again.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:shrink-0 md:flex-nowrap">
            {routineTotal && (
              <p className="text-[0.85rem] whitespace-nowrap text-muted max-sm:w-full">
                Serum + Moisturizer, {formatMoney(routineTotal)}
              </p>
            )}
            {routine.length === 2 && (
              <BuyNowButton
                products={routine}
                className="max-sm:flex-1"
                ariaLabel="Buy now: the two-step routine"
              />
            )}
            <Link href="/shop" className="btn btn-ghost">
              Explore
            </Link>
          </div>
        </div>
      </section>

      <section className="container-site py-section" aria-labelledby="collection-title">
        <header className={sectionHead} data-reveal>
          <p className="eyebrow">The collection</p>
          <h2 id="collection-title">
            The essentials, <em>start to ends</em>
          </h2>
        </header>
        <div className="grid gap-[clamp(1rem,2vw,2rem)] sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {products.map((p) => (
            <ProductCard key={p.handle} product={p} />
          ))}
        </div>
      </section>

      <section className="on-greige bg-greige py-section" aria-labelledby="needs-title">
        <div className="container-site">
          <header className={sectionHead} data-reveal>
            <p className="eyebrow">Shop by need</p>
            <h2 id="needs-title">Where would you like to begin?</h2>
          </header>
          <ul className="mx-auto grid max-w-80 gap-[clamp(1.25rem,3vw,3rem)] md:max-w-none md:grid-cols-3" data-reveal="stagger">
            {tiles.map((t) => (
              <li key={t.title}>
                <Link href={t.href} className="group grid justify-items-center gap-1.5 text-center">
                  <span className="arch mb-4 border border-gold-light transition-colors duration-300 group-hover:border-gold">
                    <ProductArt kind={t.kind} imageUrl={t.image} alt="" className="w-[62%]" sizes="(min-width: 768px) 33vw, 80vw" />
                  </span>
                  <span className="font-display text-[1.9rem] leading-[1.1] font-medium">{t.title}</span>
                  <span className="text-[0.74rem] tracking-[0.18em] text-muted uppercase">{t.sub}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-section" aria-labelledby="different-title">
        <header className={sectionHead} data-reveal>
          <p className="eyebrow">Why we&rsquo;re different</p>
          <h2 id="different-title">
            A brand that <em>understands</em> the change
          </h2>
        </header>
        <ol className="grid gap-[clamp(1.5rem,3vw,3rem)] sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {DIFFERENT.map((d, i) => (
            <li key={d.title} className="grid content-start gap-2.5 border-t border-gold-light pt-6">
              <span aria-hidden className="font-display text-[1.6rem] leading-none text-accent italic">
                0{i + 1}
              </span>
              <h3>{d.title}</h3>
              <p className="text-[0.95rem] text-muted">{d.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="routine"
        aria-labelledby="routine-title"
        className={`on-greige grid items-center gap-[clamp(2rem,6vw,6rem)] bg-greige py-section md:grid-cols-2 ${inset}`}
      >
        <div className="arch relative mx-auto max-w-96 md:max-w-120" data-reveal>
          <Image
            src="/media/hero-poster.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 30rem, 24rem"
            className="scale-110 object-cover object-[40%_20%]"
            data-parallax
          />
        </div>
        <div className="grid justify-items-start gap-6" data-reveal>
          <p className="eyebrow">The routine</p>
          <h2 id="routine-title">
            Two steps. <em>A few quiet minutes.</em>
          </h2>
          <ol className="mt-2 mb-4 grid gap-7">
            {routine.map((p, i) => (
              <li key={p.handle} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ink/20 pt-6">
                <span aria-hidden className="font-display text-[2.4rem] leading-none text-accent italic">
                  {i + 1}
                </span>
                <div>
                  <h3>
                    <Link href={`/products/${p.handle}`} className="hover:text-label">
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mb-2 font-caslon text-[0.9rem] text-label italic">{p.tagline}</p>
                  <p className="text-[0.95rem] text-muted">{p.directions}</p>
                </div>
              </li>
            ))}
          </ol>
          {routine.length === 2 && (
            <BuyNowButton products={routine} label="Buy now · the routine" ariaLabel="Buy now: the two-step routine" />
          )}
        </div>
      </section>

      <section className="container-site py-section" aria-labelledby="formulas-title">
        <header className={sectionHead} data-reveal>
          <p className="eyebrow">Inside the formulas</p>
          <h2 id="formulas-title">
            Thoughtfully chosen, <em>plainly listed</em>
          </h2>
          <p className="max-w-xl text-muted">
            Nine botanical oils in the serum. Mango and shea butters in the
            moisturizer. Here are a few you will find on the label.
          </p>
        </header>
        <ul className="mb-12 grid grid-cols-2 gap-[clamp(1.25rem,2.5vw,2.5rem)] md:grid-cols-3 lg:grid-cols-5" data-reveal="stagger">
          {BOTANICALS.map(({ Art, name, where, note }) => (
            <li key={name} className="grid content-start justify-items-center gap-2 text-center">
              <Art className="mb-2 h-auto w-22 text-gold" />
              <h3>{name}</h3>
              <p className="eyebrow">{where}</p>
              <p className="text-[0.9rem] text-muted">{note}</p>
            </li>
          ))}
        </ul>
        <p className="text-center">
          <Link href="/ingredients" className="text-link">
            Read the full ingredient lists
          </Link>
        </p>
      </section>

      <section className="on-greige bg-greige py-section" aria-labelledby="promise-title">
        <div className="container-site grid max-w-3xl! justify-items-center gap-8 text-center" data-reveal>
          <h2 id="promise-title" className="eyebrow font-sans!">
            Our promise
          </h2>
          <p className="font-display text-[clamp(1.6rem,3.2vw,2.5rem)] leading-tight text-balance italic">
            Hair changes can feel personal. We won&rsquo;t promise miracles. We will
            give you a nourishing routine, clear directions and honest expectations.
          </p>
          <Link href="/our-story" className="text-link">
            Read our story
          </Link>
        </div>
      </section>
    </>
  );
}
