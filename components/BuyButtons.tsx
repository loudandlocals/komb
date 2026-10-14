"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import type { Product, SellingPlan } from "@/lib/types";
import { useCart, type CartItem } from "./CartProvider";

// With a plan, the line carries the plan's id and its per-delivery price.
function toItem(p: Product, plan?: SellingPlan): Omit<CartItem, "quantity"> {
  return {
    ...(plan && { sellingPlanId: plan.id, planName: plan.name }),
    variantId: p.variantId,
    handle: p.handle,
    title: p.title,
    kind: p.kind,
    size: p.size,
    imageUrl: p.imageUrl,
    price: plan?.price ?? p.price,
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
  plan,
}: {
  products: Product[];
  // A subscription plan for a single product bought this way.
  plan?: SellingPlan;
  label?: string;
  className?: string;
  ariaLabel?: string;
  quantity?: number;
  // Adds the total for these products to the label: "Buy the routine — $78.98 USD".
  showPrice?: boolean;
}) {
  const { checkout, pending } = useCart();
  const total = {
    amount: products.reduce((n, p) => n + (plan?.price ?? p.price).amount * quantity, 0),
    currencyCode: products[0]?.price.currencyCode ?? "USD",
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
        await checkout(products.map((p) => ({ ...toItem(p, plan), quantity })));
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

// Adds several products to the cart in one go, one of each, as one-time
// purchases, with the combined price on the label: "Add both steps — $78.98 USD".
export function AddBundleButton({
  products,
  label,
  className = "",
  ariaLabel,
}: {
  products: Product[];
  label: string;
  className?: string;
  // Starts with the visible label, then names the products.
  ariaLabel?: string;
}) {
  const { add } = useCart();
  const total = {
    amount: products.reduce((n, p) => n + p.price.amount, 0),
    currencyCode: products[0]?.price.currencyCode ?? "USD",
  };
  return (
    <button
      type="button"
      className={`btn btn-outline ${className}`}
      aria-label={ariaLabel && `${ariaLabel}, ${formatMoney(total)}`}
      disabled={products.some((p) => !p.availableForSale)}
      onClick={() => products.forEach((p) => add(toItem(p)))}
    >
      {label}
      <span aria-hidden className="mx-[0.6em]">
        —
      </span>
      <span className="sr-only">, </span>
      {formatMoney(total)}
    </button>
  );
}

export function AddToCartButton({
  product,
  className = "",
  quantity = 1,
  primary = false,
  showPrice = false,
  plan,
}: {
  product: Product;
  // The chosen subscription plan, if any.
  plan?: SellingPlan;
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
      onClick={() => add(toItem(product, plan), quantity)}
    >
      Add to cart
      {showPrice && (
        <>
          <span aria-hidden className="mx-[0.6em]">
            —
          </span>
          <span className="sr-only">, </span>
          {formatMoney({
            ...product.price,
            amount: (plan?.price ?? product.price).amount * quantity,
          })}
        </>
      )}
    </button>
  );
}
