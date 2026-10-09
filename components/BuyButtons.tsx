"use client";

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

// Buy now skips the cart: the products are added, then sent straight to checkout.
export function BuyNowButton({
  products,
  label = "Buy now",
  className = "",
  ariaLabel,
}: {
  products: Product[];
  label?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const { checkout, pending, add, items } = useCart();
  const soldOut = products.some((p) => !p.availableForSale);

  return (
    <button
      type="button"
      className={`btn btn-primary ${className}`}
      aria-label={ariaLabel}
      disabled={pending || soldOut}
      onClick={async () => {
        // Cart state updates asynchronously, so build the checkout lines here.
        const quantities = new Map(items.map((i) => [i.variantId, i.quantity]));
        products.forEach((p) => {
          quantities.set(p.variantId, (quantities.get(p.variantId) ?? 0) + 1);
          add(toItem(p));
        });
        await checkout(
          [...quantities].map(([variantId, quantity]) => ({ variantId, quantity }))
        );
      }}
    >
      {soldOut ? "Sold out" : pending ? "One moment…" : label}
    </button>
  );
}

export function AddToCartButton({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { add } = useCart();
  return (
    <button
      type="button"
      className={`btn btn-outline ${className}`}
      disabled={!product.availableForSale}
      onClick={() => add(toItem(product))}
    >
      Add to cart
    </button>
  );
}
