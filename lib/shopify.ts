import "server-only";
import { CONTENT, LOCAL_IMAGES, MOCK_PRODUCTS } from "./catalog";
import {
  SELLING_PLAN_FIELDS,
  toSellingPlans,
  type ShopifySellingPlanGroups,
} from "./sellingPlans";
import type { CheckoutLine, Product, ProductContent } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const version = process.env.SHOPIFY_API_VERSION ?? "2026-07";

export const isShopifyConfigured = Boolean(domain && token);

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = 60
): Promise<T> {
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token!,
    },
    body: JSON.stringify({ query, variables }),
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
  });
  if (!res.ok) throw new Error(`Storefront API responded ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data as T;
}

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    handle
    title
    description
    availableForSale
    featuredImage { url altText }
    ${SELLING_PLAN_FIELDS}
    variants(first: 1) {
      nodes { id availableForSale price { amount currencyCode } }
    }
  }
`;

type ShopifyProduct = {
  handle: string;
  title: string;
  description: string;
  availableForSale: boolean;
  featuredImage: { url: string; altText: string | null } | null;
  requiresSellingPlan: boolean;
  sellingPlanGroups: ShopifySellingPlanGroups;
  variants: {
    nodes: {
      id: string;
      availableForSale: boolean;
      price: { amount: string; currencyCode: string };
    }[];
  };
};

function fallbackContent(p: ShopifyProduct): ProductContent {
  return {
    kind: "other",
    category: "other",
    summary: p.description,
    benefits: [],
  };
}

function toProduct(p: ShopifyProduct): Product | null {
  const variant = p.variants.nodes[0];
  if (!variant) return null;
  const price = {
    amount: Number(variant.price.amount),
    currencyCode: variant.price.currencyCode,
  };
  return {
    handle: p.handle,
    title: p.title,
    variantId: variant.id,
    price,
    sellingPlans: toSellingPlans(p.sellingPlanGroups, price),
    requiresSellingPlan: p.requiresSellingPlan,
    availableForSale: p.availableForSale && variant.availableForSale,
    imageUrl: p.featuredImage?.url ?? LOCAL_IMAGES[p.handle]?.url,
    pdpImageUrl: p.featuredImage ? undefined : LOCAL_IMAGES[p.handle]?.pdpUrl,
    imageAlt: p.featuredImage?.altText ?? LOCAL_IMAGES[p.handle]?.alt ?? p.title,
    ...(CONTENT[p.handle] ?? fallbackContent(p)),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS;
  const data = await storefront<{ products: { nodes: ShopifyProduct[] } }>(
    `${PRODUCT_FIELDS}
     query Products { products(first: 24) { nodes { ...ProductFields } } }`
  );
  return data.products.nodes
    .map(toProduct)
    .filter((p): p is Product => p !== null);
}

export async function getProduct(handle: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
  const data = await storefront<{ product: ShopifyProduct | null }>(
    `${PRODUCT_FIELDS}
     query Product($handle: String!) { product(handle: $handle) { ...ProductFields } }`,
    { handle }
  );
  return data.product ? toProduct(data.product) : null;
}

// Creates a Shopify cart for the given lines and returns its hosted checkout URL.
export async function createCheckoutUrl(lines: CheckoutLine[]): Promise<string> {
  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CartCreate($lines: [CartLineInput!]!) {
       cartCreate(input: { lines: $lines }) {
         cart { checkoutUrl }
         userErrors { message }
       }
     }`,
    {
      lines: lines.map((l) => ({
        merchandiseId: l.variantId,
        quantity: l.quantity,
        ...(l.sellingPlanId && { sellingPlanId: l.sellingPlanId }),
      })),
    },
    false
  );
  const { cart, userErrors } = data.cartCreate;
  if (!cart) throw new Error(userErrors[0]?.message ?? "Could not create cart");
  return cart.checkoutUrl;
}
