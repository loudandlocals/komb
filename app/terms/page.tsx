import type { Metadata } from "next";
import { PlaceholderPolicy } from "@/components/PlaceholderPolicy";

// Placeholder until the client sends the Terms of Use text.
export const metadata: Metadata = {
  title: "Terms of Use",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <PlaceholderPolicy
      eyebrow="Terms of Use"
      title={
        <>
          Terms of <em>Use</em>
        </>
      }
      topics={[
        "Using this website and placing orders",
        "Prices, payment and taxes",
        "Subscriptions: how they renew, and how to pause or cancel",
        "Product information and intended use",
        "Contact details for Komb Hair Inc.",
      ]}
    />
  );
}
