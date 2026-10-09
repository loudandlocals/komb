import type { Metadata } from "next";
import Link from "next/link";
import { Avocado, Juniper, Olive, Rosemary, Shea } from "@/components/Botanicals";
import { ROUTINE_HANDLES } from "@/lib/catalog";
import { getProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Ingredients",
  description:
    "The full ingredient lists for Komb's Botanical Hair Serum and Renewal Hair Moisturizer, explained plainly.",
  alternates: { canonical: "/ingredients" },
  openGraph: { url: "/ingredients" },
};

const SPOTLIGHT = [
  {
    Art: Rosemary,
    name: "Rosemary oil",
    body: "Rosemary oil has been examined in published research for its potential role in hair and scalp care. That research looks at the ingredient on its own. It is not a study of our serum, and we make no growth claims for our finished formula.",
  },
  {
    Art: Avocado,
    name: "Avocado & jojoba oils",
    body: "Two well-loved cosmetic oils that give the serum its smooth, cushioning feel as you massage it into the scalp.",
  },
  {
    Art: Shea,
    name: "Mango & shea butters",
    body: "Rich plant butters that sit at the heart of the moisturizer, helping lengths feel soft, smooth and more manageable.",
  },
  {
    Art: Olive,
    name: "Olive & grape seed oils",
    body: "Conditioning oils that appear in both formulas, linking the scalp step to the lengths step.",
  },
  {
    Art: Juniper,
    name: "Juniper berry oil",
    body: "A crisp botanical oil that rounds out the serum's blend alongside rosemary.",
  },
];

export default async function IngredientsPage() {
  const products = await getProducts();
  const routine = products.filter((p) => ROUTINE_HANDLES.includes(p.handle));

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-208 gap-4">
        <p className="eyebrow">Ingredients</p>
        <h1>
          Nothing hidden. <em>Everything listed.</em>
        </h1>
        <p className="max-w-xl text-muted">
          You deserve to know what goes on your scalp and hair. Here is what is in
          each formula, and why we chose it.
        </p>
      </header>

      <ul className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 md:grid-cols-2" data-reveal="stagger">
        {SPOTLIGHT.map(({ Art, name, body }) => (
          <li key={name} className="grid grid-cols-[5.5rem_1fr] items-start gap-6">
            <Art className="h-auto w-full text-gold" />
            <div>
              <h2 className="mb-2 text-[1.75rem]">{name}</h2>
              <p className="text-muted">{body}</p>
            </div>
          </li>
        ))}
      </ul>

      <section
        aria-label="Full ingredient lists"
        data-reveal
        className="on-greige mt-section grid gap-[clamp(2rem,5vw,5rem)] bg-greige p-[clamp(2rem,5vw,4rem)] md:grid-cols-2"
      >
        {routine.map((p) => (
          <article key={p.handle}>
            <p className="eyebrow">{p.size}</p>
            <h2 className="mt-2 mb-4 text-[2rem]">
              <Link href={`/products/${p.handle}`} className="hover:text-label">
                {p.title}
              </Link>
            </h2>
            <p className="text-[0.92rem]">{p.ingredients}</p>
            {p.notes?.map((n) => (
              <p key={n} className="mt-3 text-[0.92rem] text-muted">
                {n}
              </p>
            ))}
          </article>
        ))}
      </section>

      <p className="mx-auto mt-12 max-w-176 text-center font-caslon text-[0.95rem] text-muted italic">
        A note on research: when we mention studies, they concern individual
        ingredients, not the results of Komb&rsquo;s finished products. We are
        planning our own small study and will share what we learn.
      </p>
    </div>
  );
}
