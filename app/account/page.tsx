import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

// Placeholder. Once NEXT_PUBLIC_SHOPIFY_ACCOUNT_URL is set, the header's
// Account link goes straight to Shopify's hosted customer accounts and this
// page is no longer linked.
export default function AccountPage() {
  return (
    <div className="container-site max-w-2xl! pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-10 grid gap-4">
        <p className="eyebrow">Account</p>
        <h1>Your account</h1>
      </header>
      <div className="grid gap-8">
        <p role="status" className="on-greige border border-ink/20 bg-greige px-5 py-4 text-[0.95rem]">
          <strong className="font-medium">Preview page.</strong> Accounts open when the
          store is connected. Nothing can be signed in to here yet.
        </p>
        <div className="grid gap-3">
          <p>This is where you will be able to:</p>
          <ul className="grid gap-1.5 text-muted">
            {[
              "Sign in with a one-time code sent to your email, with no password to remember",
              "See your orders and reorder",
              "Update your addresses",
              "Pause, skip, change or cancel a subscription",
            ].map((line) => (
              <li
                key={line}
                className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-gold"
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
        <p>
          <Link href="/shop" className="btn btn-outline hover:bg-greige">
            Back to the shop
          </Link>
        </p>
      </div>
    </div>
  );
}
