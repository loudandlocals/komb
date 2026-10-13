"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart, type CartItem } from "./CartProvider";

function toItem(p: Product): Omit<CartItem, "quantity"> {
  return {
    variantId: p.variantId,
    handle: p.handle,
    title: p.title,
    kind: p.kind,
    size: p.size,
    imageUrl: p.imageUrl,
    price: p.price,
  };
}

// Buy now skips the cart and the cart drawer: just these products, at this
// quantity, go straight to checkout.
export function BuyNowButton({
  products,
  label = "Buy now",
  className = "",
  ariaLabel,
  quantity = 1,
  showPrice = false,
}: {
  products: Product[];
  label?: string;
  className?: string;
  ariaLabel?: string;
  quantity?: number;
  // Adds the total for these products to the label: "Buy the routine — $86".
  showPrice?: boolean;
}) {
  const { checkout, pending } = useCart();
  const total = {
    amount: products.reduce((n, p) => n + p.price.amount * quantity, 0),
    currencyCode: products[0]?.price.currencyCode ?? "CAD",
  };
  const [mine, setMine] = useState(false);
  const soldOut = products.some((p) => !p.availableForSale);

  return (
    <button
      type="button"
      className={`btn btn-primary ${className}`}
      aria-label={ariaLabel}
      aria-busy={mine && pending}
      disabled={pending || soldOut}
      onClick={async () => {
        setMine(true);
        await checkout(products.map((p) => ({ ...toItem(p), quantity })));
        setMine(false);
      }}
    >
      {soldOut ? "Sold out" : mine && pending ? "One moment…" : label}
      {showPrice && !soldOut && !(mine && pending) && (
        <>
          <span aria-hidden className="mx-[0.6em]">
            —
          </span>
          <span className="sr-only">, </span>
          {formatMoney(total)}
        </>
      )}
    </button>
  );
}

export function AddToCartButton({
  product,
  className = "",
  quantity = 1,
  primary = false,
  showPrice = false,
}: {
  product: Product;
  className?: string;
  quantity?: number;
  // Dark, filled style for places where this is the main action.
  primary?: boolean;
  // Adds the total for the chosen quantity to the label: "Add to cart — $48".
  showPrice?: boolean;
}) {
  const { add } = useCart();
  return (
    <button
      type="button"
      className={`btn ${primary ? "btn-primary" : "btn-outline"} ${className}`}
      disabled={!product.availableForSale}
      onClick={() => add(toItem(product), quantity)}
    >
      Add to cart
      {showPrice && (
        <>
          <span aria-hidden className="mx-[0.6em]">
            —
          </span>
          <span className="sr-only">, </span>
          {formatMoney({ ...product.price, amount: product.price.amount * quantity })}
        </>
      )}
    </button>
  );
}
