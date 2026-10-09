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
    tagline: "Nourish, Restore, Flourish",
    taglineFr: "Nourrir, Réparer, Rayonner",
    summary:
      "A lightweight blend of nine botanical oils, made to be massaged into the scalp and left to do its quiet work.",
    benefits: [
      "Nourishes the scalp and hair",
      "A scalp massage ritual that takes a few minutes",
      "For all hair types",
    ],
    directions:
      "Apply a few drops directly to the scalp, focusing on targeted areas. Gently massage into the scalp. Leave on for at least 30 minutes before washing, or leave on overnight for a more intensive treatment.",
    ingredients:
      "Persea Americana (Avocado) Oil, Simmondsia Chinensis (Jojoba) Oil, Oryza Sativa (Rice Bran) Oil, Helianthus Annuus (Sunflower) Seed Oil, Olea Europaea (Olive) Oil, Vitis Vinifera (Grape) Seed Oil, Carthamus Tinctorius (Safflower) Oil, Rosmarinus Officinalis (Rosemary) Oil, Juniperus Communis (Juniper Berry) Oil, Limonene, Linalool.",
    keyIngredients: ["Avocado oil", "Jojoba oil", "Rosemary oil", "Juniper berry oil"],
  },
  "renewal-hair-moisturizer": {
    kind: "moisturizer",
    category: "lengths",
    step: "Step two",
    titleFr: "Soin hydratant revitalisant",
    size: "100 mL / 3.4 fl oz",
    tagline: "Hydrate, Smooth, Revitalize",
    taglineFr: "Hydrater, Lisser, Revitaliser",
    summary:
      "A rich leave-in moisturizer with mango and shea butters that hydrates the lengths, so hair feels softer, smoother and easier to manage.",
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
    notes: [
      "Contains almond oil (tree nut).",
      "Contains fragrance and conditioning silicones.",
    ],
  },
  "hair-ties": {
    kind: "ties",
    category: "accessories",
    summary: "Soft ties that hold without pulling, for the days your hair goes up.",
    benefits: ["Gentle hold", "Pairs with the routine"],
  },
  "hair-brush": {
    kind: "brush",
    category: "accessories",
    summary: "An everyday brush for working through the lengths with care.",
    benefits: ["Everyday detangling", "Pairs with the routine"],
  },
};

// MOCK DATA. Used until Shopify credentials are set in .env.local.
// Prices and the accessory names below are placeholders, not Komb's real ones.
const mock = (
  handle: string,
  title: string,
  amount: number
): Product => ({
  handle,
  title,
  variantId: `mock-variant-${handle}`,
  price: { amount, currencyCode: "CAD" },
  availableForSale: true,
  ...CONTENT[handle],
});

export const MOCK_PRODUCTS: Product[] = [
  mock("botanical-hair-serum", "Botanical Hair Serum", 48),
  mock("renewal-hair-moisturizer", "Renewal Hair Moisturizer", 38),
  mock("hair-ties", "Hair Ties", 14),
  mock("hair-brush", "Hair Brush", 24),
];

export const ROUTINE_HANDLES = ["botanical-hair-serum", "renewal-hair-moisturizer"];
