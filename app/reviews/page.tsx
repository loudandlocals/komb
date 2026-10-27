import type { Metadata } from "next";
import { ReviewForm } from "@/components/ReviewForm";
import { ReviewsList, Stars } from "@/components/ReviewsList";
import { getReviews, isJudgeMeConfigured, summarise } from "@/lib/judgeme";
import { getProducts } from "@/lib/shopify";

// Real reviews come from Judge.me. Until it is connected the page shows
// clearly marked samples and stays out of search results.
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reviews",
    description: "What women are saying about the Komb two-step scalp and haircare routine.",
    alternates: { canonical: "/reviews" },
    robots: { index: isJudgeMeConfigured, follow: true },
  };
}

// Re-read reviews every 10 minutes.
export const revalidate = 600;

export default async function ReviewsPage() {
  const [{ reviews, live }, products] = await Promise.all([getReviews(), getProducts()]);
  const { count, average } = summarise(reviews);
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid justify-items-center gap-4 text-center">
        <p className="eyebrow">Reviews</p>
        <h1>
          In <em>their</em> words
        </h1>
        <p className="max-w-xl text-muted">
          Women sharing how the two-step routine fits into their week.
        </p>
      </header>

      {!live && (
        <p role="note" className="on-greige mx-auto mb-12 max-w-3xl border border-ink/20 bg-greige px-5 py-4 text-center text-[0.95rem]">
          <strong className="font-medium">Sample reviews.</strong> These show the layout
          only and are not from customers. Real reviews will replace them.
        </p>
      )}

      <section
        aria-label="Rating summary"
        className="mx-auto mb-14 grid max-w-3xl items-center gap-8 border-y border-line py-8 sm:grid-cols-[auto_1fr_auto]"
      >
        <div className="grid justify-items-center gap-2 sm:justify-items-start">
          <p className="font-caslon text-[3rem] leading-none">{count ? average.toFixed(1) : "–"}</p>
          <Stars rating={average} />
          <p className="text-[0.8rem] text-muted">
            {count ? `Based on ${count} ${live ? "" : "sample "}review${count === 1 ? "" : "s"}` : "No reviews yet"}
          </p>
        </div>
        <ul className="grid gap-1.5 text-[0.8rem]">
          {counts.map(({ star, count: n }) => (
            <li key={star} className="grid grid-cols-[3.5rem_1fr_1.5rem] items-center gap-3">
              <span>{star} stars</span>
              <span className="h-1.5 bg-line" aria-hidden>
                <span className="block h-full bg-gold" style={{ width: `${count ? (n / count) * 100 : 0}%` }} />
              </span>
              <span className="text-right text-muted">{n}</span>
            </li>
          ))}
        </ul>
        <a href="#write-review" className="btn btn-primary justify-self-center">
          Write a review
        </a>
      </section>

      {count > 0 ? (
        <ReviewsList reviews={reviews} />
      ) : (
        <p className="mb-14 text-center text-muted">Be the first to share how the routine fits into your week.</p>
      )}

      <section id="write-review" aria-labelledby="write-review-title" className="mt-section grid scroll-mt-[calc(var(--header-h)+1rem)] justify-items-start gap-6">
        <h2 id="write-review-title" className="text-[clamp(1.8rem,3vw,2.4rem)]">
          Write a <em>review</em>
        </h2>
        <ReviewForm products={products.map((p) => ({ productId: p.productId, title: p.title }))} />
      </section>
    </div>
  );
}
