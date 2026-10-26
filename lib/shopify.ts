import "server-only";
import { CONTENT, LOCAL_IMAGES, MOCK_PRODUCTS } from "./catalog";
import {
  SELLING_PLAN_FIELDS,
  toSellingPlans,
  type ShopifySellingPlanGroups,
} from "./sellingPlans";
import type { CheckoutLine, Product, ProductContent } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const version = process.env.SHOPIFY_API_VERSION ?? "2026-07";

// All Storefront API calls run on the server, so the private token is
// preferred (it is meant for server use and has higher rate limits). The
// public token works as a fallback. Both come from Shopify admin > Sales
// channels > Headless > Storefront API.
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
const publicToken =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ??
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_PUBLIC_TOKEN;

const authHeader: Record<string, string> = privateToken
  ? { "Shopify-Storefront-Private-Token": privateToken }
  : publicToken
    ? { "X-Shopify-Storefront-Access-Token": publicToken }
    : {};

export const isShopifyConfigured = Boolean(domain && (privateToken || publicToken));

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = 60
): Promise<T> {
  const res = await fetch(`https://${domain}/api/${version}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
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

// Shopify Markets: with a country, the Storefront API returns that market's
// prices and currency (CAD for Canada, USD for the US). Without one, the
// store's primary market is used.
const inContext = (country?: string) =>
  country
    ? { vars: "$country: CountryCode", directive: "@inContext(country: $country)", value: { country } }
    : { vars: "", directive: "", value: {} };

export async function getProducts(country?: string): Promise<Product[]> {
  if (!isShopifyConfigured) return MOCK_PRODUCTS;
  const ctx = inContext(country);
  const data = await storefront<{ products: { nodes: ShopifyProduct[] } }>(
    `${PRODUCT_FIELDS}
     query Products${ctx.vars ? `(${ctx.vars})` : ""} ${ctx.directive} {
       products(first: 24) { nodes { ...ProductFields } }
     }`,
    ctx.value
  );
  return data.products.nodes
    .map(toProduct)
    .filter((p): p is Product => p !== null);
}

export async function getProduct(handle: string, country?: string): Promise<Product | null> {
  if (!isShopifyConfigured) {
    return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? null;
  }
  const ctx = inContext(country);
  const data = await storefront<{ product: ShopifyProduct | null }>(
    `${PRODUCT_FIELDS}
     query Product($handle: String!${ctx.vars ? `, ${ctx.vars}` : ""}) ${ctx.directive} {
       product(handle: $handle) { ...ProductFields }
     }`,
    { handle, ...ctx.value }
  );
  return data.product ? toProduct(data.product) : null;
}

// Creates a Shopify cart for the given lines and returns its hosted checkout
// URL. The buyer's country sets the market, so checkout charges in their
// currency.
export async function createCheckoutUrl(
  lines: CheckoutLine[],
  country?: string
): Promise<string> {
  const data = await storefront<{
    cartCreate: {
      cart: { checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation CartCreate($lines: [CartLineInput!]!, $buyerIdentity: CartBuyerIdentityInput) {
       cartCreate(input: { lines: $lines, buyerIdentity: $buyerIdentity }) {
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
      buyerIdentity: country ? { countryCode: country } : null,
    },
    false
  );
  const { cart, userErrors } = data.cartCreate;
  if (!cart) throw new Error(userErrors[0]?.message ?? "Could not create cart");
  return cart.checkoutUrl;
}
