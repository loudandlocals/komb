"use client";

import { useId, useState } from "react";

type Status = { kind: "idle" | "busy" | "done" | "preview" | "error"; message?: string };
const field = "min-h-11 w-full border border-ink/50 bg-offwhite px-3.5 py-2.5";

// "Write a review" form. Reviews go to Judge.me and appear on the site once
// approved there. With one product the choice is fixed; with several the
// visitor picks which product they are reviewing.
export function ReviewForm({ products }: { products: { productId?: string; title: string }[] }) {
  const id = useId();
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    if (!data.name?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email ?? "") || !rating || !data.body?.trim()) {
      setStatus({ kind: "error", message: "Please add your name, a valid email, a star rating and your review." });
      return;
    }
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, rating }),
      });
      const json = await res.json();
      if (!res.ok) setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
      else if (json.preview)
        setStatus({ kind: "preview", message: "Preview only: reviews open when Judge.me is connected. Your review was not sent." });
      else {
        setStatus({ kind: "done", message: "Thank you. Your review will appear once it has been approved." });
        form.reset();
        setRating(0);
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't send your review just now. Please try again." });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid max-w-xl gap-5">
      {products.length > 1 ? (
        <div className="grid gap-2">
          <label htmlFor={`${id}-product`} className="eyebrow">Product</label>
          <select id={`${id}-product`} name="productId" className={field}>
            {products.map((p) => (
              <option key={p.title} value={p.productId ?? ""}>{p.title}</option>
            ))}
          </select>
        </div>
      ) : (
        <input type="hidden" name="productId" value={products[0]?.productId ?? ""} />
      )}
      <fieldset className="grid gap-2">
        <legend className="eyebrow mb-2">Your rating</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-ink">
              <input type="radio" name="rating-choice" value={n} checked={rating === n} onChange={() => setRating(n)} className="sr-only" />
              <span className="sr-only">{n} {n === 1 ? "star" : "stars"}</span>
              <svg viewBox="0 0 20 20" className="size-7 text-gold" aria-hidden>
                <path
                  d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z"
                  fill={n <= rating ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`${id}-name`} className="eyebrow">Name</label>
          <input id={`${id}-name`} name="name" autoComplete="name" required className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={`${id}-email`} className="eyebrow">Email (not published)</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={field} />
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-title`} className="eyebrow">Review title</label>
        <input id={`${id}-title`} name="title" maxLength={200} className={field} />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-body`} className="eyebrow">Your review</label>
        <textarea id={`${id}-body`} name="body" required rows={5} maxLength={5000} className={field} />
      </div>
      <div aria-hidden className="hidden">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p role="status" aria-live="polite" className={`min-h-5 text-[0.9rem] ${status.kind === "error" ? "text-[#9b3a24]" : "text-muted"}`}>
        {status.message}
      </p>
      <div>
        <button type="submit" disabled={status.kind === "busy"} className="btn btn-primary">
          {status.kind === "busy" ? "Sending…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}
