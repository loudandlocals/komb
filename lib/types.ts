// "other" covers any Shopify product without editorial content in lib/catalog.ts
export type ProductKind = "serum" | "moisturizer" | "other";

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
  // Tighter crop for the product page; falls back to imageUrl.
  pdpImageUrl?: string;
  imageAlt?: string;
  // Subscription options from Shopify. Empty or missing means one-time only.
  sellingPlans?: SellingPlan[];
  // True when the product can only be bought on a plan.
  requiresSellingPlan?: boolean;
} & ProductContent;

export type SellingPlan = {
  id: string;
  name: string;
  // How often it is delivered, as the store words it: "Every 4 weeks".
  frequency: string;
  // Price of one delivery on this plan.
  price: Money;
  percentOff: number;
};

export type ProductContent = {
  kind: ProductKind;
  category: "scalp" | "lengths" | "other";
  titleFr?: string;
  size?: string;
  // From the carton, for search-engine product data.
  sku?: string;
  gtin12?: string;
  tagline?: string;
  taglineFr?: string;
  // "The goal" section on the product page: what the product is for.
  goal?: {
    // Statement split so the second part can take the accent colour.
    statement: [string, string];
    // The three numbered blocks beside the statement, as short bullet lists.
    problem: string[];
    does: string[];
    fits: string[];
    // Two photos: a tall portrait first, then a smaller square close-up.
    images: [{ src: string; alt: string }, { src: string; alt: string }];
  };
  // One short line for compact displays such as the home page showcase.
  oneLine?: string;
  summary: string;
  benefits: string[];
  directions?: string;
  // Extra usage guidance shown under "How to use" on the product page only.
  usageNote?: string;
  // The "Benefits" row on the product page, in the client's wording.
  benefitsDetailed?: { title: string; body: string }[];
  ingredients?: string;
  keyIngredients?: string[];
  // Factual either/or descriptors shown as marker lines in "The goal".
  // `at` is 0 for the first end of the line, 1 for the second.
  traits?: { label: string; from: string; to: string; at: 0 | 1 }[];
  notes?: string[];
  step?: string;
};

export type CheckoutLine = { variantId: string; quantity: number; sellingPlanId?: string };
