import { SUPPLY } from "./offers";
import type { Money, SellingPlan } from "./types";

// The shape of `product.sellingPlanGroups` in the Storefront API. Subscription
// apps (Shopify Subscriptions, Recharge, Skio and others) all publish their
// plans through it, so the storefront does not depend on which app is used.
export type ShopifySellingPlanGroups = {
  nodes: {
    name: string;
    sellingPlans: {
      nodes: {
        id: string;
        name: string;
        recurringDeliveries: boolean;
        options: { name: string; value: string }[];
        priceAdjustments: {
          adjustmentValue:
            | { __typename: "SellingPlanPercentagePriceAdjustment"; adjustmentPercentage: number }
            | {
                __typename: "SellingPlanFixedAmountPriceAdjustment";
                adjustmentAmount: { amount: string; currencyCode: string };
              }
            | {
                __typename: "SellingPlanFixedPriceAdjustment";
                price: { amount: string; currencyCode: string };
              };
        }[];
      }[];
    };
  }[];
};

export const SELLING_PLAN_FIELDS = /* GraphQL */ `
  requiresSellingPlan
  sellingPlanGroups(first: 5) {
    nodes {
      name
      sellingPlans(first: 10) {
        nodes {
          id
          name
          recurringDeliveries
          options { name value }
          priceAdjustments {
            adjustmentValue {
              __typename
              ... on SellingPlanPercentagePriceAdjustment { adjustmentPercentage }
              ... on SellingPlanFixedAmountPriceAdjustment { adjustmentAmount { amount currencyCode } }
              ... on SellingPlanFixedPriceAdjustment { price { amount currencyCode } }
            }
          }
        }
      }
    }
  }
`;

const round = (n: number) => Math.round(n * 100) / 100;

// Flattens the groups into the recurring-delivery plans the selector offers,
// each with the price of one unit after its first price adjustment. Plans in
// a group named like "3-month supply" are supply plans of SUPPLY.quantity
// units per delivery. Savings are measured against the compare-at price when
// the product has one (the Duo's separate prices), otherwise the price.
export function toSellingPlans(
  groups: ShopifySellingPlanGroups | null | undefined,
  price: Money,
  compareAtPrice?: Money
): SellingPlan[] {
  const basis = compareAtPrice && compareAtPrice.amount > price.amount ? compareAtPrice : price;
  return (groups?.nodes ?? []).flatMap((group) => {
    const supply = SUPPLY.groupName.test(group.name);
    const quantity = supply ? SUPPLY.quantity : 1;
    return group.sellingPlans.nodes
      .filter((plan) => plan.recurringDeliveries)
      .map((plan): SellingPlan => {
        const adjustment = plan.priceAdjustments[0]?.adjustmentValue;
        let amount = price.amount;
        if (adjustment?.__typename === "SellingPlanPercentagePriceAdjustment") {
          amount = price.amount * (1 - adjustment.adjustmentPercentage / 100);
        } else if (adjustment?.__typename === "SellingPlanFixedAmountPriceAdjustment") {
          amount = price.amount - Number(adjustment.adjustmentAmount.amount);
        } else if (adjustment?.__typename === "SellingPlanFixedPriceAdjustment") {
          amount = Number(adjustment.price.amount);
        }
        amount = round(Math.max(0, amount));
        const saved = round(Math.max(0, (basis.amount - amount) * quantity));
        return {
          id: plan.id,
          name: plan.name,
          kind: supply ? "supply" : "subscription",
          // "Deliver every 4 weeks" and "4 weeks" both read as "4 weeks".
          frequency: (plan.options[0]?.value ?? plan.name).replace(/^deliver(ed)? every\s+/i, ""),
          quantity,
          price: { amount, currencyCode: price.currencyCode },
          savings: { amount: saved, currencyCode: price.currencyCode },
          percentOff:
            basis.amount > 0 ? Math.round((1 - amount / basis.amount) * 100) : 0,
        };
      });
  });
}
