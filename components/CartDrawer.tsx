"use client";

import { useEffect, useRef } from "react";
import { formatMoney } from "@/lib/format";
import { useCart, lineKey } from "./CartProvider";
import { ProductArt } from "./ProductArt";

// A native modal <dialog>: the browser traps focus, closes on Escape and
// returns focus to the button that opened it.
export function CartDrawer() {
  const { items, subtotal, isOpen, close, setQuantity, checkout, notice, pending } =
    useCart();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="cart-title"
      onClose={close}
      onClick={(e) => e.target === ref.current && close()}
      className="cart-dialog fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(26rem,100%)] max-w-none bg-offwhite text-ink"
    >
      <div className="flex h-full flex-col p-6">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <h2 id="cart-title" className="text-[1.9rem]!">
            Your cart
          </h2>
          <button
            type="button"
            className="py-2 text-[0.75rem] tracking-[0.16em] uppercase"
            onClick={close}
          >
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p className="pt-8 text-muted">Your cart is empty.</p>
        ) : (
          <ul className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <li
                key={lineKey(item)}
                className="grid grid-cols-[4.5rem_1fr_auto] gap-4 border-b border-line py-5"
              >
                <div className="grid aspect-4/5 place-items-center bg-greige">
                  <ProductArt kind={item.kind} imageUrl={item.imageUrl} alt="" sizes="72px" />
                </div>
                <div>
                  <p className="font-caslon">{item.title}</p>
                  {item.size && <p className="text-[0.82rem] text-muted">{item.size}</p>}
                  {item.planName && <p className="text-[0.82rem] text-muted">{item.planName}</p>}
                  <div className="mt-2.5 inline-flex items-center gap-1 border border-ink/50">
                    <button
                      type="button"
                      className="size-9"
                      aria-label={`Decrease quantity of ${item.title}`}
                      onClick={() => setQuantity(lineKey(item), item.quantity - 1)}
                    >
                      −
                    </button>
                    <span aria-live="polite" aria-label={`Quantity ${item.quantity}`}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="size-9"
                      aria-label={`Increase quantity of ${item.title}`}
                      onClick={() => setQuantity(lineKey(item), item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p>
                  {formatMoney({ ...item.price, amount: item.price.amount * item.quantity })}
                </p>
              </li>
            ))}
          </ul>
        )}

        {subtotal && (
          <div className="grid gap-3 pt-5">
            <p className="flex justify-between font-normal">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </p>
            <p className="text-[0.82rem] text-muted">
              Shipping and taxes are calculated at checkout.
            </p>
            <p role="status" className={notice ? "on-greige bg-greige px-4 py-3 text-[0.88rem]" : "sr-only"}>
              {notice}
            </p>
            <button
              type="button"
              className="btn btn-primary w-full"
              disabled={pending}
              onClick={() => checkout()}
            >
              {pending ? "One moment…" : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
