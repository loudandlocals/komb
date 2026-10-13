"use client";

import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { BuyNowButton } from "./BuyButtons";

// Phones only: a slim bar pinned to the bottom of the screen once the hero has
// scrolled away, so the routine and its price stay within reach down the page.
// The spacer keeps the bar from covering the end of the footer.
export function StickyBuyBar({ products }: { products: Product[] }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-media");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (products.length === 0) return null;
  const total = {
    amount: products.reduce((n, p) => n + p.price.amount, 0),
    currencyCode: products[0].price.currencyCode,
  };

  return (
    <>
      <div
        // `inert` keeps the hidden bar out of the tab order and away from screen readers.
        inert={!shown}
        className={`fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-line bg-offwhite px-gutter py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 md:hidden ${
          shown ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <p className="text-[0.82rem] leading-tight">
          <span className="block font-medium">The two-step routine</span>
          <span className="text-muted">Serum + moisturizer, {formatMoney(total)}</span>
        </p>
        <BuyNowButton
          products={products}
          className="min-h-11! shrink-0 px-5! text-[0.72rem]!"
          ariaLabel="Buy now: the two-step routine"
        />
      </div>
      <div aria-hidden className="h-18 bg-offwhite md:hidden" />
    </>
  );
}
