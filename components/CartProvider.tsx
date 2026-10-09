"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CheckoutLine, Money, ProductKind } from "@/lib/types";

export type CartItem = {
  variantId: string;
  handle: string;
  title: string;
  kind: ProductKind;
  size?: string;
  imageUrl?: string;
  price: Money;
  quantity: number;
};

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
  setQuantity: (variantId: string, quantity: number) => void;
  checkout: (lines?: CheckoutLine[]) => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "komb-cart";

const MOCK_NOTICE =
  "Preview mode: checkout opens on Shopify once the store is connected.";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

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
      const existing = current.find((i) => i.variantId === item.variantId);
      if (existing) {
        return current.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...current, { ...item, quantity }];
    });
    setNotice(null);
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((current) =>
      quantity <= 0
        ? current.filter((i) => i.variantId !== variantId)
        : current.map((i) => (i.variantId === variantId ? { ...i, quantity } : i))
    );
  }, []);

  const checkout = useCallback<CartContextValue["checkout"]>(
    async (lines) => {
      const payload =
        lines ?? items.map((i) => ({ variantId: i.variantId, quantity: i.quantity }));
      if (payload.length === 0) return;
      setPending(true);
      setNotice(null);
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lines: payload }),
        });
        const data = await res.json();
        if (data.url) {
          window.location.assign(data.url);
          return;
        }
        setNotice(data.mock ? MOCK_NOTICE : data.error ?? "Something went wrong.");
        setIsOpen(true);
      } catch {
        setNotice("We couldn't start checkout. Please try again.");
        setIsOpen(true);
      } finally {
        setPending(false);
      }
    },
    [items]
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
