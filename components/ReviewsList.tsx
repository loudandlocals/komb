"use client";

import { useState } from "react";
import type { Review } from "@/lib/reviews";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "botanical-hair-serum", label: "Botanical Hair Serum" },
  { value: "renewal-hair-moisturizer", label: "Renewal Hair Moisturizer" },
] as const;

const TITLES: Record<string, string> = {
  "botanical-hair-serum": "Botanical Hair Serum",
  "renewal-hair-moisturizer": "Renewal Hair Moisturizer",
};

export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span role="img" aria-label={`${rating} out of 5 stars`} className={`flex gap-0.5 text-gold ${className}`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 20 20" className="size-4" aria-hidden>
          <path
            d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
            fill={n <= Math.round(rating) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      ))}
    </span>
  );
}

// Review cards with a product filter, in a loose masonry of columns.
export function ReviewsList({ reviews, filters = true }: { reviews: Review[]; filters?: boolean }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all");
  const shown = filter === "all" ? reviews : reviews.filter((r) => r.handle === filter);

  return (
    <div className="grid gap-8">
      {filters && (
      <div role="group" aria-label="Filter reviews by product" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={`min-h-11 border px-4 text-[0.72rem] font-medium tracking-[0.14em] uppercase transition-colors ${
              filter === f.value ? "on-greige border-greige bg-greige" : "border-line hover:border-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      )}
      <p className="sr-only" aria-live="polite">
        {shown.length} reviews shown
      </p>
      <ul className="gap-6 sm:columns-2 lg:columns-3">
        {shown.map((review) => (
          <li
            key={review.id ?? review.name + review.title}
            className="mb-6 grid break-inside-avoid gap-3 border border-line bg-offwhite p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <Stars rating={review.rating} />
              {review.sample ? (
                <span className="border border-gold-light px-2 py-0.5 text-[0.62rem] font-medium tracking-[0.16em] text-label uppercase">
                  Sample
                </span>
              ) : review.verified ? (
                <span className="text-[0.62rem] font-medium tracking-[0.16em] text-label uppercase">
                  Verified buyer
                </span>
              ) : null}
            </div>
            <h3 className="text-[1.15rem] italic">{review.title}</h3>
            <p className="text-[0.92rem] text-muted">{review.body}</p>
            <p className="text-[0.78rem]">
              <span className="font-medium">{review.name}</span>
              {TITLES[review.handle] && <span className="text-muted"> · {TITLES[review.handle]}</span>}
              {review.date && (
                <span className="text-muted">
                  {" · "}
                  {new Date(review.date).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
