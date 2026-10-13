"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./BuyButtons";

// Product page purchase row: the quantity stepper, then Add to cart beside it.
export function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="grid gap-2.5">
      <div className="flex items-stretch gap-3">
        <div className="inline-flex shrink-0 items-center border border-ink/50">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="h-full min-h-12 w-11 disabled:opacity-40 lg:w-9"
          >
            −
          </button>
          <span aria-live="polite" aria-label={`Quantity ${quantity}`} className="min-w-7 text-center">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="h-full min-h-12 w-11 lg:w-9"
          >
            +
          </button>
        </div>
        <AddToCartButton
          product={product}
          quantity={quantity}
          primary
          showPrice
          className="min-h-12 flex-1 px-2.5 text-[0.68rem] tracking-[0.12em]"
        />
      </div>
      {product.size && (
        <p className="text-[0.68rem] font-medium tracking-[0.12em] text-muted uppercase">
          {product.size}
        </p>
      )}
    </div>
  );
}
