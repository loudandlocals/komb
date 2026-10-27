"use client";

import { useEffect, useRef, useState } from "react";
import { ReviewForm } from "./ReviewForm";

// "Write a review" button that opens the review form in a pop-up (a native
// modal dialog: focus stays inside, Escape or the close button closes it).
export function WriteReview({
  products,
  className = "btn btn-primary",
  label = "Write a review",
}: {
  products: { productId?: string; title: string }[];
  className?: string;
  label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <>
      <button type="button" className={className} aria-haspopup="dialog" onClick={() => setOpen(true)}>
        {label}
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="write-review-title"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && setOpen(false)}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(100%-2rem,40rem)] max-w-none overflow-y-auto bg-offwhite p-0 text-ink backdrop:bg-ink/50"
      >
        <div className="relative grid gap-6 px-[clamp(1.25rem,5vw,2.75rem)] pt-10 pb-8">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-2 right-2 grid size-11 place-items-center text-[1.4rem] leading-none hover:text-label"
          >
            <span aria-hidden>×</span>
          </button>
          <div className="grid gap-2">
            <p className="eyebrow">Reviews</p>
            <h2 id="write-review-title" className="text-[clamp(1.8rem,3vw,2.4rem)]">
              Write a <em>review</em>
            </h2>
            {products.length === 1 && <p className="text-muted">{products[0].title}</p>}
          </div>
          {open && <ReviewForm products={products} />}
        </div>
      </dialog>
    </>
  );
}
