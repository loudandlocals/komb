"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import type { Money, ProductKind } from "@/lib/types";

export type CartItem = {
  variantId: string;
  handle: string;
  title: string;
  kind: ProductKind;
  size?: string;
  imageUrl?: string;
  price: Money;
  quantity: number;
  // Set when the line is a subscription; `price` is then the plan's price.
  sellingPlanId?: string;
  planName?: string;
};

// The same product one-time and on a plan are separate cart lines.
export const lineKey = (item: Pick<CartItem, "variantId" | "sellingPlanId">) =>
  `${item.variantId}::${item.sellingPlanId ?? ""}`;

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: Money | null;
  isOpen: boolean;
  notice: string | null;
  pending: boolean;
  open: () => void;
  close: () => void;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  checkout: (lines?: CartItem[]) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "komb-cart";

export const CHECKOUT_PREVIEW_KEY = "komb-checkout-preview";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const add = useCallback<CartContextValue["add"]>((item, quantity = 1) => {
    setItems((current) => {
      const key = lineKey(item);
      const existing = current.find((i) => lineKey(i) === key);
      if (existing) {
        return current.map((i) =>
          lineKey(i) === key
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...current, { ...item, quantity }];
    });
    setNotice(null);
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => lineKey(i) !== key)
        : current.map((i) => (lineKey(i) === key ? { ...i, quantity } : i))
    );
  }, []);

  // Sends the given items (the whole cart by default) to checkout. With Shopify
  // connected this redirects to the hosted checkout; in preview mode it goes
  // to the placeholder checkout page with the same items.
  const checkout = useCallback<CartContextValue["checkout"]>(
    async (lines) => {
      const selected = lines ?? items;
      if (selected.length === 0) return;
      setPending(true);
      setNotice(null);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            lines: selected.map((i) => ({
              variantId: i.variantId,
              quantity: i.quantity,
              sellingPlanId: i.sellingPlanId,
            })),
          }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.assign(data.url);
          return;
        }
        if (data.mock) {
          try {
            sessionStorage.setItem(CHECKOUT_PREVIEW_KEY, JSON.stringify(selected));
          } catch {}
          setIsOpen(false);
          router.push("/checkout");
          return;
        }
        setNotice(data.error ?? "Something went wrong.");
        setIsOpen(true);
      } catch {
        setNotice("We couldn't start checkout. Please try again.");
        setIsOpen(true);
      } finally {
        setPending(false);
      }
    },
    [items, router]
  );

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.length
      ? {
          amount: items.reduce((n, i) => n + i.price.amount * i.quantity, 0),
          currencyCode: items[0].price.currencyCode,
        }
      : null;
    return {
      items,
      count,
      subtotal,
      isOpen,
      notice,
      pending,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      checkout,
    };
  }, [items, isOpen, notice, pending, add, setQuantity, checkout]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
