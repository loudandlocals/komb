import Image from "next/image";
import type { Product } from "@/lib/types";

const label = "text-[0.68rem] font-medium tracking-[0.22em] text-label uppercase";

// "The goal" as an editorial spread in two halves. Left: the goal as a large
// quote, and two photos set at different heights. Right: three numbered blocks. On
// phones it stacks: quote, photos, then the blocks.
export function GoalSection({ product }: { product: Product }) {
  const goal = product.goal;
  if (!goal) return null;
  const [tall, small] = goal.images;
  const blocks = [
    { title: "The problem", items: goal.problem },
    { title: "What it does", items: goal.does },
    { title: "How it fits", items: goal.fits },
  ];

  return (
    <section
      aria-labelledby="goal-title"
      className="container-site grid gap-y-14 py-section lg:grid-cols-[1.15fr_1fr]"
    >
      <div
        className="grid gap-x-[clamp(1.25rem,2.5vw,2.5rem)] gap-y-8 sm:grid-cols-2 lg:pr-[clamp(1.5rem,3.5vw,3.5rem)]"
        data-reveal
      >
        <div className="grid content-between gap-8">
          <div className="grid gap-5">
            <p className={label}>The goal</p>
            <h2 id="goal-title" className="text-[clamp(1.6rem,2.5vw,2.5rem)] leading-[1.12]">
              &ldquo;{goal.statement[0]} <em>{goal.statement[1]}</em>&rdquo;
            </h2>
          </div>
          <div className="relative aspect-square w-full max-sm:max-w-xs">
            <Image src={small.src} alt={small.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 20rem" className="object-cover" />
          </div>
        </div>

        <div className="grid content-start gap-8 lg:pt-10">
          <div className="relative aspect-3/4 w-full max-sm:max-w-xs">
            <Image src={tall.src} alt={tall.alt} fill sizes="(min-width: 1024px) 26vw, (min-width: 640px) 45vw, 20rem" className="object-cover" />
          </div>
        </div>
      </div>

      <div
        className="grid content-start lg:border-l lg:border-line lg:pl-[clamp(1.5rem,3.5vw,3.5rem)]"
      >
        <p className={`${label} mb-6 lg:text-right`} data-reveal>
          {product.step ?? "Komb Hair"}
          <span className="sr-only">: {product.title}</span>
        </p>
        <ol className="grid" data-reveal="stagger">
          {blocks.map((block, i) => (
            <li key={block.title} className="grid gap-3 border-t border-ink/30 pt-5 pb-8 last:pb-0">
              <p aria-hidden className="font-caslon text-[1.35rem] leading-none italic">
                0{i + 1}.
              </p>
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <h3 className="font-sans text-[0.8rem] font-bold tracking-[0.14em] uppercase">
                  {block.title}
                </h3>
                <ul className="grid gap-2 text-[0.95rem]">
                  {block.items.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr]">
                      <span aria-hidden>–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
