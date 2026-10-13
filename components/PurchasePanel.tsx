"use client";

import { useId, useState } from "react";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { AddToCartButton } from "./BuyButtons";

const option =
  "flex cursor-pointer items-center gap-3 border px-3.5 py-3 text-[0.9rem] font-normal transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink";

// The chosen option is filled with the greige tint (and `on-greige` darkens the
// muted text to keep it at AA); the radio dot still marks it without colour.
const active = "on-greige border-greige bg-greige";
const idle = "border-line";
// The native arrow sits flush against the edge, so the menu draws its own.
const chevron =
  "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%20fill=%22none%22%20stroke=%22%23272522%22%20stroke-width=%221.5%22%3E%3Cpath%20d=%22M1%201.5l5%205%205-5%22/%3E%3C/svg%3E')] bg-size-[0.7rem] bg-position-[right_0.9rem_center] bg-no-repeat pr-9 pl-3";

// Product page purchase controls. When the product has subscription plans, a
// one-time or subscribe choice sits on top, with a delivery frequency menu
// while subscribing; a product with no plans shows none of it. Below: the
// quantity stepper, then Add to cart, whose price follows the choice.
export function PurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const plans = product.sellingPlans ?? [];
  const subscriptionOnly = Boolean(product.requiresSellingPlan) && plans.length > 0;
  const [subscribe, setSubscribe] = useState(subscriptionOnly);
  const [planId, setPlanId] = useState(plans[0]?.id);
  const name = useId();
  const frequencyId = useId();

  const chosen = plans.find((p) => p.id === planId) ?? plans[0];
  const plan = subscribe ? chosen : undefined;
  // The saving is named in the label only when every plan shares it.
  const saving =
    plans.length > 0 && plans.every((p) => p.percentOff === plans[0].percentOff)
      ? plans[0].percentOff
      : 0;

  return (
    <div className="grid gap-2.5">
      {plans.length > 0 && (
        <fieldset className="mb-1.5 grid gap-2">
          <legend className="sr-only">Purchase options</legend>
          {!subscriptionOnly && (
            <label className={`${option} ${subscribe ? idle : active}`}>
              <input
                type="radio"
                name={name}
                checked={!subscribe}
                onChange={() => setSubscribe(false)}
                className="size-4 shrink-0 accent-ink"
              />
              <span className="flex-1">One-time purchase</span>
              <span>{formatMoney(product.price)}</span>
            </label>
          )}
          <div className={`border transition-colors ${subscribe ? active : idle}`}>
            <label className={`${option} border-transparent`}>
              <input
                type="radio"
                name={name}
                checked={subscribe}
                onChange={() => setSubscribe(true)}
                className="size-4 shrink-0 accent-ink"
              />
              <span className="flex-1">
                Subscribe{saving > 0 && <> and save {saving}%</>}
              </span>
              <span>{formatMoney(chosen.price)}</span>
            </label>
            {subscribe && (
              <div className="flex items-center gap-3 px-3.5 pb-3 text-[0.82rem]">
                <label htmlFor={frequencyId} className="font-normal text-muted">
                  Deliver every
                </label>
                <select
                  id={frequencyId}
                  value={chosen.id}
                  onChange={(e) => setPlanId(e.target.value)}
                  className={`min-h-9 flex-1 border border-ink/50 bg-offwhite font-normal ${chevron}`}
                >
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.frequency}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </fieldset>
      )}

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
          plan={plan}
          primary
          showPrice
          className="min-h-12 flex-1 px-2.5 text-[0.68rem] tracking-[0.12em]"
        />
      </div>
      {product.size && (
        <p className="text-[0.68rem] font-medium tracking-[0.12em] text-muted uppercase">
          {product.size}
          {plan && <> · {plan.name}</>}
        </p>
      )}
    </div>
  );
}
