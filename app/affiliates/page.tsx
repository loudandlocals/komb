import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";

// The application form lives with the affiliate app chosen by the client
// (for example UpPromote, GoAffPro or Shopify Collabs). Set its address in
// NEXT_PUBLIC_AFFILIATE_SIGNUP_URL; until then the button emails us instead.
const SIGNUP_URL = process.env.NEXT_PUBLIC_AFFILIATE_SIGNUP_URL || undefined;

export const metadata: Metadata = {
  title: "Affiliates",
  description: "Join the Komb Hair affiliate program: earn 10% on sales you refer, and give your audience 10% off.",
  alternates: { canonical: "/affiliates" },
  // Hidden from search until the program and its terms are final.
  robots: { index: false, follow: true },
};

const STEPS = [
  { title: "Apply", body: "Tell us a little about you and where you share. We review every application." },
  { title: "Share", body: "Once approved, you get your own link and a code that gives your audience 10% off." },
  { title: "Earn", body: "Earn 10% of eligible product sales from your link or code." },
];

// The affiliate program terms, matching the copy set in the affiliate app.
const TERMS_INTRO = [
  "Welcome to Komb Hair, and thank you for joining our Affiliate Program.",
  "These Terms and Conditions apply to everyone who takes part in the Komb Hair Affiliate Program (the \"Program\"). In these terms, \"Komb\", \"we\" and \"us\" mean Komb Hair Inc., and \"you\" and \"affiliate\" mean the person or business who refers customers to Komb.",
  "By applying to or taking part in the Program, you agree to these Terms and Conditions. If you do not agree with them in full, please do not register as an affiliate or take part in the Program.",
];

const TERMS = [
  {
    title: "1. Approval of registrations",
    body: [
      "We review every application and may approve or decline any registration at our sole discretion. A declined application does not give rise to any claim against Komb.",
    ],
  },
  {
    title: "2. Affiliate links and coupon codes",
    body: [
      "Once approved, you receive a personal affiliate link. You can also create links to specific products or collections from your affiliate dashboard.",
      "You may also be given a personal coupon code. Customers who use it receive 10% off eligible products. Affiliate codes cannot be combined with other discount codes. If you have not been given a coupon code, please do not promote one.",
      "If a customer uses your link and your code on the same order, you earn one commission, not two. If a customer clicks another affiliate's link and later clicks yours, the most recent click receives the credit. If a coupon code is used, the code's owner receives the credit.",
      "You may promote Komb online, for example on Instagram, TikTok, Facebook, YouTube, a blog or by email, and offline, for example in print or at events, as long as you follow these terms.",
    ],
  },
  {
    title: "3. Commission",
    body: [
      "You earn 10% commission on eligible orders referred through your link or code. Commission is calculated on the product subtotal after discounts. Taxes, shipping, duties and gift cards are not included.",
      "Commission is earned only on orders that are successfully completed. We review every referral order and approve its commission once the return period has ended, usually within 45 days of the order. Orders that are cancelled, refunded, returned, fraudulent or charged back do not earn commission, and commission already paid on them may be deducted from future payouts. Purchases you make for yourself do not earn commission.",
      "You can see the status of your commissions in the Commission tab of your affiliate dashboard, and paid commissions in the Payment tab.",
    ],
  },
  {
    title: "4. Payment",
    body: [
      "To be paid, add your payment details in the Settings section of your affiliate dashboard. Approved commissions are paid monthly, on the 15th, for commissions approved by the end of the previous month. The minimum payout is $25 CAD; smaller balances carry forward to the next month.",
    ],
  },
  {
    title: "5. Tracking",
    body: [
      "We use cookies to track customers who click your link. If a customer blocks or clears cookies, we may not be able to track their order, and no commission can be paid on it.",
      "Tracking lasts 30 days from the time a customer clicks your link or uses your code. During those 30 days, every order that customer places on komb.ca earns you commission, even if they do not click your link again. A new click on your link restarts the 30 days.",
    ],
  },
  {
    title: "6. Marketing materials",
    body: [
      "We may share banners, logos, photos and promotional material with you in the Marketing tools tab of your dashboard. You may download them or use the embed code to share them on your channels. Please do not edit Komb's logo or product images.",
    ],
  },
  {
    title: "7. Product claims",
    body: [
      "Komb products are cosmetics that care for the scalp and hair. When you talk about them, describe what they do: nourish the scalp, and help hair look and feel softer, smoother and healthier. Do not say or suggest that Komb products treat, prevent, stop or reverse hair loss, reduce shedding, regrow hair, or treat any medical condition. Only share results you have experienced yourself, and do not edit photos to exaggerate them.",
    ],
  },
  {
    title: "8. Disclosure",
    body: [
      "Whenever you share your link or code, clearly tell your audience that you are a Komb affiliate and may earn a commission, for example with #ad or \"affiliate link\". Disclosure must be easy to see and follow Ad Standards' Influencer Marketing Disclosure Guidelines and applicable law.",
    ],
  },
  {
    title: "9. Promotion rules",
    body: [
      "You may not bid on \"Komb\" or \"Komb Hair\" as search ads keywords, post your code on coupon or deal websites, send spam, or create pages or accounts that appear to be Komb's own.",
    ],
  },
  {
    title: "10. Leaving or removal from the Program",
    body: [
      "You can leave the Program at any time by emailing info@komb.ca. We may suspend or remove any affiliate who breaks these terms, harms the Komb brand, or misuses links or codes. Commissions earned through misuse are not paid.",
    ],
  },
  {
    title: "11. Changes to these terms",
    body: [
      "We may update these terms from time to time. We will let you know by email or in your affiliate dashboard, and continuing in the Program after an update means you accept it.",
    ],
  },
  {
    title: "12. Governing law",
    body: [
      "These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.",
    ],
  },
  {
    title: "Thank you, and happy referring!",
    body: [
      "Thank you for reading to the end. You can return to these terms at any time, and if you have any questions, email us at info@komb.ca.",
    ],
  },
];

export default function AffiliatesPage() {
  const apply = SIGNUP_URL ?? `mailto:${SITE.email}?subject=${encodeURIComponent("Komb affiliate application")}`;

  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-section grid items-center gap-[clamp(2rem,6vw,6rem)] md:grid-cols-[6fr_5fr]">
        <div className="grid max-w-xl justify-items-start gap-4">
          <p className="eyebrow">Affiliates</p>
          <h1>
            Share what you love, <em>earn with us</em>
          </h1>
          <p className="max-w-xl text-muted">
            Join the Komb Hair affiliate program. Earn 10% on the sales you refer, and give
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
        </div>
        <div className="arch relative mx-auto max-w-96 md:max-w-none" data-reveal="image">
          <Image
            src="/images/affiliates.jpg"
            alt="Woman with long, healthy-looking hair holding Komb Botanical Hair Serum and Renewal Hair Moisturizer"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 24rem"
            className="object-cover object-[50%_30%]"
          />
        </div>
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
        <div className="grid gap-3 text-[0.95rem]">
          {TERMS_INTRO.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {TERMS.map((section) => (
          <div key={section.title} className="grid gap-2 text-[0.95rem]">
            <h3 className="text-[1.3rem]">{section.title}</h3>
            {section.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ))}
        <p className="mt-2 border-t border-line pt-5 text-[0.9rem] text-muted">
          Questions? Email{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-label">
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
