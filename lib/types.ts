export type ProductKind = "serum" | "moisturizer" | "ties" | "brush";

export type Money = { amount: number; currencyCode: string };

// Commerce fields come from Shopify (or the mock catalog); editorial fields
// come from lib/catalog.ts and are matched to Shopify products by handle.
export type Product = {
  handle: string;
  title: string;
  variantId: string;
  price: Money;
  availableForSale: boolean;
  imageUrl?: string;
  imageAlt?: string;
} & ProductContent;

export type ProductContent = {
  kind: ProductKind;
  category: "scalp" | "lengths" | "accessories";
  titleFr?: string;
  size?: string;
  tagline?: string;
  taglineFr?: string;
  summary: string;
  benefits: string[];
  directions?: string;
  ingredients?: string;
  keyIngredients?: string[];
  notes?: string[];
  step?: string;
};

export type CheckoutLine = { variantId: string; quantity: number };
