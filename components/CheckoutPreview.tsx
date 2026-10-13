"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/format";
import { CHECKOUT_PREVIEW_KEY, lineKey, type CartItem } from "./CartProvider";

// Stand-in for Shopify checkout while the store is not connected. It only
// shows what would be sent to checkout; nothing can be paid for here.
export function CheckoutPreview() {
  const [items, setItems] = useState<CartItem[] | null>(null);

  useEffect(() => {
    try {
      setItems(JSON.parse(sessionStorage.getItem(CHECKOUT_PREVIEW_KEY) ?? "[]"));
    } catch {
      setItems([]);
    }
  }, []);

  const subtotal = items?.length
    ? {
        amount: items.reduce((n, i) => n + i.price.amount * i.quantity, 0),
        currencyCode: items[0].price.currencyCode,
      }
    : null;

  return (
    <div className="grid gap-8">
      <p role="status" className="on-greige border border-ink/20 bg-greige px-5 py-4 text-[0.95rem]">
        <strong className="font-medium">Preview checkout.</strong> This page stands in for
        Shopify checkout while the store is being connected. No order is placed and no
        payment is taken.
      </p>

      {items === null ? null : items.length === 0 ? (
        <p className="text-muted">There is nothing in this checkout.</p>
      ) : (
        <>
          <ul className="border-t border-line">
            {items.map((item) => (
              <li key={lineKey(item)} className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <span>
                  <span className="font-caslon text-[1.1rem]">{item.title}</span>
                  <span className="block text-[0.85rem] text-muted">
                    {item.size ? `${item.size} · ` : ""}Quantity {item.quantity}
                    {item.planName ? ` · Subscription: ${item.planName.toLowerCase()}` : ""}
                  </span>
                </span>
                <span>{formatMoney({ ...item.price, amount: item.price.amount * item.quantity })}</span>
              </li>
            ))}
          </ul>
          {subtotal && (
            <p className="flex justify-between text-lg font-normal">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </p>
          )}
          <p className="text-[0.85rem] text-muted">
            Shipping and taxes will be calculated at the real checkout.
          </p>
        </>
      )}

      <p>
        <Link href="/shop" className="btn btn-outline hover:bg-greige">
          Back to the shop
        </Link>
      </p>
    </div>
  );
}
