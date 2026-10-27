import "server-only";
import { PLACEHOLDER_REVIEWS, type Review } from "./reviews";

// Judge.me reviews, read on the server with the store's private API token
// (Judge.me admin > Settings > Integrations > API tokens). Without the token
// the site shows the clearly marked sample reviews instead.
const token = process.env.JUDGEME_PRIVATE_API_TOKEN;
// Judge.me identifies the store by its myshopify.com domain.
const shop = process.env.JUDGEME_SHOP_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
const API = "https://api.judge.me/api/v1";

export const isJudgeMeConfigured = Boolean(token && shop);

type JudgeMeReview = {
  id: number;
  title?: string | null;
  body?: string | null;
  rating: number;
  published?: boolean;
  hidden?: boolean;
  curated?: string;
  verified?: string;
  created_at?: string;
  product_handle?: string;
  reviewer?: { name?: string | null };
};

// Turns "Jane Smith" into "Jane S." so full names are not published.
const shortName = (name?: string | null) => {
  const parts = (name ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Komb customer";
  return parts.length === 1 ? parts[0] : `${parts[0]} ${parts[parts.length - 1][0]}.`;
};

// All published, non-spam reviews, newest first. Refreshed every 10 minutes.
export async function getReviews(): Promise<{ reviews: Review[]; live: boolean }> {
  if (!isJudgeMeConfigured) return { reviews: PLACEHOLDER_REVIEWS, live: false };
  const all: JudgeMeReview[] = [];
  try {
    for (let page = 1; page <= 10; page++) {
      const url = `${API}/reviews?shop_domain=${encodeURIComponent(shop!)}&api_token=${encodeURIComponent(token!)}&per_page=100&page=${page}`;
      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) throw new Error(`Judge.me responded ${res.status}`);
      const json = (await res.json()) as { reviews?: JudgeMeReview[] };
      const batch = json.reviews ?? [];
      all.push(...batch);
      if (batch.length < 100) break;
    }
  } catch (error) {
    console.error(error);
    return { reviews: [], live: true };
  }
  const reviews = all
    .filter((r) => r.published !== false && !r.hidden && r.curated !== "spam" && r.rating > 0)
    .map<Review>((r) => ({
      id: String(r.id),
      name: shortName(r.reviewer?.name),
      handle: r.product_handle ?? "",
      rating: r.rating,
      title: r.title ?? "",
      body: r.body ?? "",
      date: r.created_at,
      verified: Boolean(r.verified && r.verified !== "nothing"),
    }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return { reviews, live: true };
}

export function summarise(reviews: Review[]) {
  const count = reviews.length;
  const average = count ? reviews.reduce((n, r) => n + r.rating, 0) / count : 0;
  return { count, average };
}

// Sends a review submitted on the site to Judge.me, where it waits for
// moderation like any other review.
export async function submitReview(input: {
  productId: string;
  name: string;
  email: string;
  rating: number;
  title: string;
  body: string;
}) {
  const res = await fetch(
    `${API}/reviews?shop_domain=${encodeURIComponent(shop!)}&api_token=${encodeURIComponent(token!)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shop_domain: shop,
        platform: "shopify",
        id: Number(input.productId),
        name: input.name,
        email: input.email,
        rating: input.rating,
        title: input.title,
        body: input.body,
      }),
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error(`Judge.me responded ${res.status}: ${await res.text()}`);
}
