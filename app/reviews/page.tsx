import type { Metadata } from "next";
import { ReviewsList, Stars } from "@/components/ReviewsList";
import { PLACEHOLDER_REVIEWS } from "@/lib/reviews";
import { SITE } from "@/lib/site";

// Kept out of search results while the reviews are placeholders.
export const metadata: Metadata = {
  title: "Reviews",
  description: "What women are saying about the Komb two-step scalp and haircare routine.",
  alternates: { canonical: "/reviews" },
  robots: { index: false, follow: true },
};

export default function ReviewsPage() {
  const reviews = PLACEHOLDER_REVIEWS;
  const average = reviews.reduce((n, r) => n + r.rating, 0) / reviews.length;
  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
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

      <p role="note" className="on-greige mx-auto mb-12 max-w-3xl border border-ink/20 bg-greige px-5 py-4 text-center text-[0.95rem]">
        <strong className="font-medium">Sample reviews.</strong> These show the layout
        only and are not from customers. Real reviews will replace them.
      </p>

      <section
        aria-label="Rating summary"
        className="mx-auto mb-14 grid max-w-3xl items-center gap-8 border-y border-line py-8 sm:grid-cols-[auto_1fr_auto]"
      >
        <div className="grid justify-items-center gap-2 sm:justify-items-start">
          <p className="font-caslon text-[3rem] leading-none">{average.toFixed(1)}</p>
          <Stars rating={average} />
          <p className="text-[0.8rem] text-muted">Based on {reviews.length} sample reviews</p>
        </div>
        <ul className="grid gap-1.5 text-[0.8rem]">
          {counts.map(({ star, count }) => (
            <li key={star} className="grid grid-cols-[3.5rem_1fr_1.5rem] items-center gap-3">
              <span>{star} stars</span>
              <span className="h-1.5 bg-line" aria-hidden>
                <span
                  className="block h-full bg-gold"
                  style={{ width: `${(count / reviews.length) * 100}%` }}
                />
              </span>
              <span className="text-right text-muted">{count}</span>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${SITE.email}?subject=${encodeURIComponent("My Komb review")}`}
          className="btn btn-primary justify-self-center"
        >
          Write a review
        </a>
      </section>

      <ReviewsList reviews={reviews} />
    </div>
  );
}
