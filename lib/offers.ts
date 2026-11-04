// The store's offers in one place, so a change from the client is a one-line
// edit. Prices themselves live in Shopify; these are the rules and wording
// around them. All amounts are US dollars until the Canadian prices are set.

// Orders at or over this subtotal ship free. The rate itself is set in
// Shopify > Settings > Shipping and delivery; this only drives the wording.
export const FREE_SHIPPING_THRESHOLD = 75;

export const SHIPPING_BANNER = `Free shipping on orders over $${FREE_SHIPPING_THRESHOLD} and on Duo subscriptions.`;

// First-order offer for joining the email list. The code is created in
// Shopify > Discounts and sent by Klaviyo's welcome email.
export const WELCOME_OFFER = { percent: 10, code: "WELCOME10" };

// The Routine Duo: one serum and one moisturizer as a single Shopify product.
// When it exists in Shopify, "Buy the routine" buttons sell it instead of the
// two products separately.
export const DUO_HANDLE = "routine-duo";

// The 3-month supply is a subscription plan in its own group in Appstle. The
// group's name tells the site which plans are supply plans; each delivery is
// this many units, all shipped together.
export const SUPPLY = {
  groupName: /3[- ]?month|supply/i,
  quantity: 3,
};

// Which purchase option the product page selects on arrival:
// "one-time", "subscription" or "supply".
export const DEFAULT_PURCHASE: "one-time" | "subscription" | "supply" = "one-time";
