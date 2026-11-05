"use client";

import { useId, useState } from "react";
import { formatMoney } from "@/lib/format";
import { DEFAULT_PURCHASE, FREE_SHIPPING_THRESHOLD } from "@/lib/offers";
import type { Money, Product, ProductKind, SellingPlan } from "@/lib/types";
import { AddBundleButton, AddToCartButton } from "./BuyButtons";

const option =
  "flex cursor-pointer items-center gap-3 border-transparent px-3.5 py-3 text-[0.9rem] font-normal has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink";

// The chosen option is filled with the greige tint (and `on-greige` darkens the
// muted text to keep it at AA); the radio dot still marks it without colour.
const active = "on-greige border-greige bg-greige";
const idle = "border-line";
// The native arrow sits flush against the edge, so the menu draws its own.
const chevron =
  "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2012%208%22%20fill=%22none%22%20stroke=%22%23272522%22%20stroke-width=%221.5%22%3E%3Cpath%20d=%22M1%201.5l5%205%205-5%22/%3E%3C/svg%3E')] bg-size-[0.7rem] bg-position-[right_0.9rem_center] bg-no-repeat pr-9 pl-3";

type Choice = "one-time" | "subscription" | "supply";

// "3 serums", "3 Duos": what a 3-month supply delivery holds.
function units(kind: ProductKind, title: string, n: number) {
  if (kind === "serum") return `${n} serums`;
  if (kind === "moisturizer") return `${n} moisturizers`;
  if (kind === "duo") return `${n} Duos (${n} serums + ${n} moisturizers)`;
  return `${n} × ${title}`;
}

const times = (m: Money, n: number): Money => ({ ...m, amount: Math.round(m.amount * n * 100) / 100 });

// Product page purchase controls. With subscription plans in Shopify, the
// choices are listed 3-month supply first (marked "Best value"), then
// Subscribe & Save, then one-time, each with its price per delivery and its
// saving; a product with no plans shows none of it. Below: the quantity
// stepper, then Add to cart, whose price follows the choice.
export function PurchasePanel({
  product,
  duo,
}: {
  product: Product;
  // The Routine Duo, offered as a quieter second button under Add to cart on
  // the serum and moisturizer pages.
  duo?: Product | null;
}) {
  const [quantity, setQuantity] = useState(1);
  const plans = product.sellingPlans ?? [];
  const byKind = {
    supply: plans.filter((p) => p.kind === "supply"),
    subscription: plans.filter((p) => p.kind === "subscription"),
  };
  const offered: Choice[] = [
    ...(byKind.supply.length ? (["supply"] as const) : []),
    ...(byKind.subscription.length ? (["subscription"] as const) : []),
    ...(product.requiresSellingPlan && plans.length ? [] : (["one-time"] as const)),
  ];
  const [choice, setChoice] = useState<Choice>(
    offered.includes(DEFAULT_PURCHASE) ? DEFAULT_PURCHASE : offered[0]
  );
  const [planIds, setPlanIds] = useState({
    supply: byKind.supply[0]?.id,
    subscription: byKind.subscription[0]?.id,
  });
  const name = useId();
  const frequencyId = useId();

  const chosenOf = (kind: "supply" | "subscription"): SellingPlan | undefined =>
    byKind[kind].find((p) => p.id === planIds[kind]) ?? byKind[kind][0];
  const plan = choice === "one-time" ? undefined : chosenOf(choice);
  const shipsFree = (kind: "supply" | "subscription") =>
    kind === "supply" || product.kind === "duo";

  function planOption(kind: "supply" | "subscription") {
    const p = chosenOf(kind);
    if (!p) return null;
    const selected = choice === kind;
    const list = byKind[kind];
    const details = [
      kind === "supply"
        ? `${units(product.kind, product.title, p.quantity)} ship together every ${p.frequency}`
        : `Delivered every ${p.frequency}`,
      p.savings.amount > 0 && `Save ${formatMoney(p.savings)} (${p.percentOff}%)`,
      shipsFree(kind) ? "Free shipping" : null,
    ].filter(Boolean);
    return (
      <div key={kind} className={`border transition-colors ${selected ? active : idle}`}>
        <label className={option}>
          <input
            type="radio"
            name={name}
            checked={selected}
            onChange={() => setChoice(kind)}
            className="size-4 shrink-0 accent-ink"
          />
          <span className="grid flex-1 gap-0.5">
            <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              {kind === "supply" ? "3-month supply" : "Subscribe & Save"}
              {kind === "supply" && (
                <span className="bg-ink px-2 py-0.5 text-[0.62rem] tracking-[0.14em] text-offwhite uppercase">
                  Best value
                </span>
              )}
            </span>
            <span className="text-[0.78rem] text-muted">{details.join(" · ")}</span>
          </span>
          <span className="text-right">{formatMoney(times(p.price, p.quantity))}</span>
        </label>
        {selected && list.length > 1 && (
          <div className="flex items-center gap-3 px-3.5 pb-3 text-[0.82rem]">
            <label htmlFor={frequencyId} className="font-normal text-muted">
              Deliver every
            </label>
            <select
              id={frequencyId}
              value={p.id}
              onChange={(e) => setPlanIds((ids) => ({ ...ids, [kind]: e.target.value }))}
              className={`min-h-9 flex-1 border border-ink/50 bg-offwhite font-normal ${chevron}`}
            >
              {list.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.frequency}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      {plans.length > 0 && (
        <fieldset className="mb-1.5 grid gap-2">
          <legend className="sr-only">Purchase options</legend>
          {offered.map((kind) =>
            kind === "one-time" ? (
              <div key={kind} className={`border transition-colors ${choice === kind ? active : idle}`}>
                <label className={option}>
                  <input
                    type="radio"
                    name={name}
                    checked={choice === kind}
                    onChange={() => setChoice(kind)}
                    className="size-4 shrink-0 accent-ink"
                  />
                  <span className="flex-1">One-time purchase</span>
                  <span>{formatMoney(product.price)}</span>
                </label>
              </div>
            ) : (
              planOption(kind)
            )
          )}
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
      {plans.length > 0 && (
        <p className="text-[0.8rem] text-muted">
          Free shipping on orders over ${FREE_SHIPPING_THRESHOLD}, and on Duo and 3-month
          subscriptions. Skip, pause, change or cancel your subscription anytime from your
          account.
        </p>
      )}
      {duo && (
        <AddBundleButton
          products={[duo]}
          label="Add the Routine Duo"
          ariaLabel="Add the Routine Duo to cart: Botanical Hair Serum and Renewal Hair Moisturizer"
          className="min-h-11 w-full px-2.5 text-[0.68rem] tracking-[0.12em]"
        />
      )}
    </div>
  );
}
