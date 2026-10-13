import Image from "next/image";
import { LOCAL_IMAGES, WARNINGS } from "@/lib/catalog";
import type { Product } from "@/lib/types";

// "In the box": the product photographed beside its carton, with the facts
// printed on the packaging. Everything here comes from the label; nothing is
// claimed about the packaging materials beyond what the photo shows.
export function PackedSection({ product }: { product: Product }) {
  const image = LOCAL_IMAGES[product.handle];
  if (!image?.packedUrl) return null;

  const facts = [
    { term: "Size", detail: product.size },
    {
      term: "In the box",
      detail:
        product.kind === "serum"
          ? "A clear glass dropper bottle with a bamboo collar, in its printed carton."
          : "A speckled cream jar, in its printed carton.",
    },
    { term: "Labelling", detail: "English and French." },
    { term: "For", detail: "All hair types." },
    { term: "Once opened", detail: "Use within 6 months." },
    {
      term: "Origin",
      detail: "Made in USA. Distributed by Komb Hair Inc., Woodbridge, Ontario, Canada.",
    },
    { term: "Care", detail: WARNINGS },
  ].filter((fact) => fact.detail);

  return (
    <section
      aria-labelledby="packed-title"
      className="container-site grid items-center gap-x-[clamp(2rem,6vw,6rem)] gap-y-10 pt-section md:grid-cols-2"
    >
      <div className="relative aspect-4/5 overflow-hidden max-md:mx-auto max-md:w-full max-md:max-w-md" data-reveal="image">
        <Image
          src={image.packedUrl}
          alt={image.packedAlt ?? ""}
          fill
          sizes="(min-width: 768px) 45vw, 100vw"
          className="object-cover object-bottom"
        />
      </div>
      <div className="grid gap-6">
        <header className="grid gap-4" data-reveal>
          <p className="eyebrow">In the box</p>
          <h2 id="packed-title">
            What arrives, <em>and what the label tells you</em>
          </h2>
        </header>
        <dl className="grid" data-reveal="stagger">
          {facts.map((fact) => (
            <div
              key={fact.term}
              className="grid gap-x-6 gap-y-1 border-t border-line py-4 sm:grid-cols-[8rem_1fr]"
            >
              <dt className="text-[0.72rem] font-medium tracking-[0.16em] uppercase">{fact.term}</dt>
              <dd className="text-[0.95rem] text-muted">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
