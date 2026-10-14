import type { Metadata } from "next";
import { PlaceholderPolicy } from "@/components/PlaceholderPolicy";

// Placeholder until the client sends the shipping and return policy.
export const metadata: Metadata = {
  title: "Shipping & Returns",
  alternates: { canonical: "/shipping-returns" },
  robots: { index: false, follow: true },
};

export default function ShippingReturnsPage() {
  return (
    <PlaceholderPolicy
      eyebrow="Shipping & Returns"
      title={
        <>
          Shipping <em>&amp; returns</em>
        </>
      }
      topics={[
        "Where we ship, and delivery times",
        "Shipping costs, including free shipping on subscriptions and orders over $50",
        "How to return or exchange a product",
        "Refunds, and how long they take",
      ]}
    />
  );
}
