// Share image for pages without their own. A page that sets its own Open
// Graph block replaces the site default, so each one passes this in again.
export const OG_IMAGE = {
  url: "/media/hero-poster.jpg",
  width: 1664,
  height: 1248,
  alt: "A woman with long, softly waved hair",
};

// Shopify's hosted customer accounts (sign-in, orders, subscriptions). Until
// the store is connected this falls back to the placeholder page at /account.
export const ACCOUNT_URL = process.env.NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL || "/account";

export const SITE = {
  name: "Komb Hair",
  url: "https://www.komb.ca",
  instagram: "https://www.instagram.com/kombhairinc",
  description:
    "A simple two-step routine for changing hair: Botanical Hair Serum for the scalp and Renewal Hair Moisturizer for the lengths. Nourish. Restore. Flourish.",
};
