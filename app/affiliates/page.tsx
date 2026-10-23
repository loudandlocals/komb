import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

// The application form lives with the affiliate app chosen by the client
// (for example UpPromote, GoAffPro or Shopify Collabs). Set its address in
// NEXT_PUBLIC_AFFILIATE_SIGNUP_URL; until then the button emails us instead.
const SIGNUP_URL = process.env.NEXT_PUBLIC_AFFILIATE_SIGNUP_URL;

export const metadata: Metadata = {
  title: "Affiliates",
  description: "Join the Komb Hair affiliate program: earn 15% on sales you refer, and give your audience 10% off.",
  alternates: { canonical: "/affiliates" },
  // Hidden from search until the program and its terms are final.
  robots: { index: false, follow: true },
};

const STEPS = [
  { title: "Apply", body: "Tell us a little about you and where you share. We review every application." },
  { title: "Share", body: "Once approved, you get your own link and a code that gives your audience 10% off." },
  { title: "Earn", body: "Earn 15% of eligible product sales from your link or code, paid monthly." },
];

const TERMS = [
  "Commission is 15% of eligible net product sales attributed to your link or code.",
  "Customers using your code get 10% off eligible products. Affiliate codes cannot be combined with other promo codes.",
  "Links track for 30 days from the click. A new click on your link restarts the 30 days.",
  "If a code is used, the code gets the credit. Otherwise the most recent eligible link does. Each order has one affiliate.",
  "Repeat orders earn commission only within an active tracking window or when your code is used. There is no lifetime commission.",
  "Commission is on the product subtotal after discounts. Shipping, taxes, duties and gift cards are excluded. Payment processing fees are not deducted.",
  "Commission is held for 30 days after delivery, or until the return window closes, whichever is later.",
  "Payouts are made monthly on the 15th for commissions that cleared their holding period by the end of the previous month.",
  "The minimum payout is $25 CAD. Smaller balances carry forward to the next month.",
  "Cancelled, fully refunded, fraudulent or charged-back orders earn no commission. Partial refunds reduce commission proportionally, and commission already paid on them is deducted from future payouts.",
  "Your own purchases do not earn commission.",
];

export default function AffiliatesPage() {
  const apply = SIGNUP_URL ?? `mailto:${SITE.email}?subject=${encodeURIComponent("Komb affiliate application")}`;

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-208 justify-items-start gap-4">
        <p className="eyebrow">Affiliates</p>
        <h1>
          Share what you love, <em>earn with us</em>
        </h1>
        <p className="max-w-xl text-muted">
          Join the Komb Hair affiliate program. Earn 15% on the sales you refer, and give
          your audience 10% off their order.
        </p>
        <a href={apply} className="btn btn-primary mt-2">
          Apply to join
        </a>
        {!SIGNUP_URL && (
          <p className="text-[0.85rem] text-muted">
            Applications open soon. In the meantime, the button emails us at {SITE.email}.
          </p>
        )}
      </header>

      <section aria-labelledby="how-title" className="mb-section">
        <h2 id="how-title" className="mb-8 text-[clamp(1.8rem,3vw,2.4rem)]">
          How it <em>works</em>
        </h2>
        <ol className="grid gap-8 md:grid-cols-3" data-reveal="stagger">
          {STEPS.map((step, i) => (
            <li key={step.title} className="grid content-start gap-2 border-t border-line pt-5">
              <span aria-hidden className="font-caslon text-[1.4rem] leading-none text-accent italic">
                0{i + 1}
              </span>
              <h3 className="text-[1.3rem]">{step.title}</h3>
              <p className="text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="terms-title" className="grid max-w-3xl gap-6">
        <h2 id="terms-title" className="text-[clamp(1.8rem,3vw,2.4rem)]">
          Program <em>terms</em>
        </h2>
        <ul className="grid gap-3 text-[0.95rem]">
          {TERMS.map((term) => (
            <li
              key={term}
              className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-gold"
            >
              {term}
            </li>
          ))}
        </ul>
        <p className="text-[0.9rem] text-muted">
          Affiliates must follow our product guidelines: Komb products are cosmetics, so
          please do not say they treat, stop or reverse hair loss. Questions? Email{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-label">
            {SITE.email}
          </a>{" "}
          or see our <Link href="/terms" className="underline underline-offset-4 hover:text-label">Terms of Use</Link>.
        </p>
      </section>
    </div>
  );
}
