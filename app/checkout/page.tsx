import type { Metadata } from "next";
import { CheckoutPreview } from "@/components/CheckoutPreview";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

// Only reached in preview mode. With Shopify connected, Buy now and Checkout
// redirect to Shopify's hosted checkout instead.
export default function CheckoutPage() {
  return (
    <div className="container-site max-w-2xl! pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-10 grid gap-4">
        <p className="eyebrow">Checkout</p>
        <h1>Your order</h1>
      </header>
      <CheckoutPreview />
    </div>
  );
}
