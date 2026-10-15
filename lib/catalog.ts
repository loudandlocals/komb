import { toSellingPlans, type ShopifySellingPlanGroups } from "./sellingPlans";
import type { Product, ProductContent } from "./types";

export const WARNINGS =
  "For external use only. Avoid contact with eyes. Discontinue use if irritation occurs. Keep out of reach of children.";

// Editorial content, taken from the packaging. Keyed by Shopify product handle.
export const CONTENT: Record<string, ProductContent> = {
  "botanical-hair-serum": {
    kind: "serum",
    category: "scalp",
    step: "Step one",
    titleFr: "Sérum capillaire botanique",
    size: "50 mL / 1.7 fl oz",
    sku: "KB050SER",
    gtin12: "627146332224",
    tagline: "Nourish, Restore, Flourish",
    taglineFr: "Nourrir, Réparer, Rayonner",
    oneLine: "Ten botanical oils for the scalp.",
    goal: {
      statement: ["To give your scalp", "the care it has been missing."],
      problem: [
        "Your hair has started to feel different, and it is hard to know where to begin.",
        "Most routines start at the lengths and leave the scalp out.",
        "Too many products, and not enough clear instructions.",
      ],
      does: [
        "Nourishes the scalp and hair with ten botanical oils.",
        "Turns scalp care into a few quiet minutes of massage.",
        "Stays on for thirty minutes or overnight, then washes out.",
      ],
      fits: [
        "Step one of the two-step routine.",
        "Use it before you wash your hair.",
        "Follow with Renewal Hair Moisturizer on the lengths.",
      ],
      images: [
        { src: "/images/steps/1.png", alt: "Serum being applied with a dropper along the hair parting" },
        { src: "/images/benefits/scalp.jpg", alt: "Close-up of a scalp and hair parting" },
      ],
    },
    summary:
      "A lightweight blend of botanical oils infused with Pumpkin Seed, Rosemary and Juniper Berry Oils. Designed to moisturize a dry scalp and condition dry strands, this nourishing formula helps soften hair, smooth frizz, and enhance shine for a healthier-looking finish.",
    usageNote:
      "For best results, use 3\u20134 times per week. Shampoo and rinse thoroughly to remove the serum before applying the Renewal Hair Moisturizer.",
    benefitsDetailed: [
      { title: "Scalp Moisture & Comfort", body: "Helps replenish moisture and soften dry, flaky skin on the scalp." },
      { title: "Softens & Conditions", body: "Leaves dry, rough strands feeling softer, smoother, and more manageable." },
      { title: "Smooths Frizz & Flyaways", body: "Helps create a polished finish and reduce the appearance of split ends." },
      { title: "Helps Reduce Breakage", body: "Conditions strands to help reduce breakage during brushing and styling." },
      { title: "Enhances Shine & Vitality", body: "Adds lustre to dull hair, restoring a nourished, healthy-looking appearance." },
    ],
    benefits: [
      "Nourishes the scalp and hair",
      "A scalp massage ritual that takes a few minutes",
      "For all hair types",
    ],
    directions:
      "Apply one full dropper directly to the scalp, focusing on targeted areas. Gently massage into the scalp. Leave on for at least 30 minutes before washing, or leave on overnight for a more intensive treatment.",
    ingredients:
      "Persea Americana (Avocado) Oil, Simmondsia Chinensis (Jojoba) Oil, Oryza Sativa (Rice Bran) Oil, Helianthus Annuus (Sunflower) Seed Oil, Olea Europaea (Olive) Oil, Vitis Vinifera (Grape) Seed Oil, Carthamus Tinctorius (Safflower) Oil, Cucurbita Pepo (Pumpkin) Seed Oil, Rosmarinus Officinalis (Rosemary) Oil, Juniperus Communis (Juniper Berry) Oil, Limonene, Linalool.",
    keyIngredients: ["Pumpkin seed oil", "Rosemary oil", "Juniper berry oil", "Avocado oil", "Jojoba oil"],
    traits: [
      { label: "Where", from: "Scalp", to: "Lengths", at: 0 },
      { label: "Texture", from: "Oil", to: "Cream", at: 0 },
      { label: "Use", from: "Rinse out", to: "Leave in", at: 0 },
    ],
  },
  "renewal-hair-moisturizer": {
    kind: "moisturizer",
    category: "lengths",
    step: "Step two",
    titleFr: "Soin hydratant revitalisant",
    size: "100 mL / 3.4 fl oz",
    sku: "KB100MOI",
    gtin12: "627146332200",
    tagline: "Hydrate, Smooth, Revitalize",
    taglineFr: "Hydrater, Lisser, Revitaliser",
    oneLine: "Leave-in hydration for softer lengths.",
    goal: {
      statement: ["To leave your lengths feeling", "softer, smoother and easier to manage."],
      problem: [
        "Your lengths feel drier and more fragile than they used to.",
        "Frizz makes styling take longer than it should.",
        "It is hard to tell which product is meant to do what.",
      ],
      does: [
        "Hydrates dry, frizz-prone lengths with mango and shea butters.",
        "Leaves hair feeling softer, smoother and easier to manage.",
        "Works on wet or dry hair, with nothing to rinse.",
      ],
      fits: [
        "Step two of the two-step routine.",
        "Use it on the lengths, then style as you like.",
        "Pair with Botanical Hair Serum for the scalp.",
      ],
      images: [
        { src: "/images/steps/2.png", alt: "Moisturizer being worked through the lengths of damp hair, with the open jar in front" },
        { src: "/images/categories1.png", alt: "Smooth, hydrated lengths of hair" },
      ],
    },
    summary:
      "A rich leave-in moisturizer with mango and shea butters that hydrates the lengths, so hair feels softer, smoother and easier to manage.",
    usageNote:
      "Using the Botanical Hair Serum too? Wash it out first: shampoo and rinse thoroughly, then apply this leave-in moisturizer.",
    benefitsDetailed: [
      { title: "Nourishes & Moisturizes", body: "Helps replenish moisture in dry hair for a soft, supple feel." },
      { title: "Softens & Smooths", body: "Conditions rough strands and improves manageability." },
      { title: "Tames Frizz & Flyaways", body: "Helps smooth hair for a polished-looking finish." },
      { title: "Enhances Shine", body: "Adds lustre to dull strands for a healthy-looking appearance." },
      { title: "Silky Finish", body: "Leaves hair feeling smooth and soft." },
      { title: "Sweet, Creamy Scent", body: "Wraps your hair in a rich, deliciously scented fragrance." },
    ],
    benefits: [
      "Hydrates dry, frizz-prone lengths",
      "Leaves hair feeling softer and smoother",
      "Use on wet or dry hair, for all hair types",
    ],
    directions:
      "Apply to wet or dry hair, working section by section. Massage evenly through the hair, then style as desired.",
    ingredients:
      "Water (Aqua), Cetyl Alcohol, Butylene Glycol, Behentrimonium Methosulfate, Mangifera Indica (Mango) Seed Butter, Butyrospermum Parkii (Shea) Butter, Hydrogenated Vegetable Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Cyclomethicone, Dimethicone, Alkyl Benzoate, Isopropyl Myristate, Prunus Dulcis (Almond) Oil, Olea Europaea (Olive) Oil, Vitis Vinifera (Grape) Seed Oil, Attalea Speciosa (Babassu) Oil, Benzyl Alcohol, Benzyl Benzoate, Limonene, Citrus Aurantium Peel Oil, Fragrance (Parfum).",
    keyIngredients: ["Mango seed butter", "Shea butter", "Sweet almond oil", "Babassu oil"],
    traits: [
      { label: "Where", from: "Scalp", to: "Lengths", at: 1 },
      { label: "Texture", from: "Oil", to: "Cream", at: 1 },
      { label: "Use", from: "Rinse out", to: "Leave in", at: 1 },
    ],
    notes: [
      "Contains almond oil (tree nut).",
      "Contains fragrance and conditioning silicones.",
    ],
  },
};

// Product photos in public/products, keyed by handle. `pdpUrl` is a tighter
// crop used for the large image on the product page, and `packedUrl` shows
// the product beside its carton. Used for the mock catalog
// and as the fallback when a Shopify product has no featured image.
export const LOCAL_IMAGES: Record<
  string,
  { url: string; pdpUrl?: string; packedUrl?: string; packedAlt?: string; alt: string }
> = {
  "botanical-hair-serum": {
    url: "/products/serum.png",
    pdpUrl: "/products/serum-pdp.png",
    packedUrl: "/products/serum-packed.png.png",
    packedAlt: "Botanical Hair Serum dropper bottle standing beside its cream carton",
    alt: "Komb Botanical Hair Serum, a 50 mL clear glass dropper bottle with a bamboo collar",
  },
  "renewal-hair-moisturizer": {
    url: "/products/moisturizer.png",
    pdpUrl: "/products/moisturizer-pdp.png",
    packedUrl: "/products/moisturizer-packed.png",
    packedAlt: "Renewal Hair Moisturizer jar standing beside its cream carton",
    alt: "Komb Renewal Hair Moisturizer, a 100 mL speckled cream jar",
  },
};

// MOCK DATA. Used until Shopify credentials are set in .env.local.
// Prices are the client's US dollar prices (revision list, October 2026).
// Canadian prices come from Shopify Markets once the store is connected.
// PLACEHOLDER SUBSCRIPTION PLANS. Not Komb's real offer: the frequencies and
// the 10% saving are stand-ins until the client's subscription app is set up.
// Shaped exactly like `product.sellingPlanGroups` from the Storefront API, so
// the same code reads the real plans once the store is connected.
const MOCK_SELLING_PLAN_GROUPS: ShopifySellingPlanGroups = {
  nodes: [
    {
      name: "Subscribe and save (placeholder)",
      sellingPlans: {
        nodes: [4, 6, 8].map((weeks) => ({
          id: `gid://shopify/SellingPlan/placeholder-${weeks}-weeks`,
          name: `Deliver every ${weeks} weeks`,
          recurringDeliveries: true,
          options: [{ name: "Deliver every", value: `${weeks} weeks` }],
          priceAdjustments: [
            {
              adjustmentValue: {
                __typename: "SellingPlanPercentagePriceAdjustment" as const,
                adjustmentPercentage: 10,
              },
            },
          ],
        })),
      },
    },
  ],
};

const mock = (
  handle: string,
  title: string,
  amount: number
): Product => ({
  handle,
  title,
  variantId: `mock-variant-${handle}`,
  price: { amount, currencyCode: "USD" },
  sellingPlans: toSellingPlans(MOCK_SELLING_PLAN_GROUPS, { amount, currencyCode: "USD" }),
  availableForSale: true,
  imageUrl: LOCAL_IMAGES[handle]?.url,
  pdpImageUrl: LOCAL_IMAGES[handle]?.pdpUrl,
  imageAlt: LOCAL_IMAGES[handle]?.alt,
  ...CONTENT[handle],
});

export const MOCK_PRODUCTS: Product[] = [
  mock("botanical-hair-serum", "Botanical Hair Serum", 43.99),
  mock("renewal-hair-moisturizer", "Renewal Hair Moisturizer", 34.99),
];

export const ROUTINE_HANDLES = ["botanical-hair-serum", "renewal-hair-moisturizer"];
