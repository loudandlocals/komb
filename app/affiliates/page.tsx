import type { Metadata } from "next";
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
  "Welcome to KOMB! Thank you for joining our Affiliate Program.",
  "These terms and conditions apply to everyone who takes part in the Komb Hair Affiliate Program (the “Program”). In these terms, “we”, “us” and “merchant” mean Komb Hair Inc., and “you” and “affiliate” mean a person who refers customers to buy our products.",
  "By taking part in the Program, you agree to use it as described in these terms and to be bound by them. If you do not agree to all of these terms, you may not register as an affiliate or take part in the Program.",
];

const TERMS = [
  {
    title: "1. Approval of registrations",
    body: [
      "We may approve or reject any affiliate registration at our sole discretion. You will have no legal recourse against us if your registration is rejected.",
    ],
  },
  {
    title: "2. Affiliate links and coupon codes",
    body: [
      "Your affiliate link is generated automatically. You can also create a link for a specific product or collection. If a customer clicks someone else’s affiliate link and later clicks yours, your link gets the credit.",
      "You may be assigned a coupon code. Its details and how it can be used are shown on your Dashboard. If a customer uses both your link and your coupon code, you earn one commission, not two. If you have not been assigned a branded coupon code, you may not promote one.",
      "You may promote the Komb website online, for example on Facebook and Instagram, and offline, for example in classified ads, magazines and newspapers.",
    ],
  },
  {
    title: "3. Commission and payment",
    body: [
      "You earn a 10% commission on eligible purchases made on our website by customers you refer. Commission is calculated on the order value and does not include taxes, shipping or other fees.",
      "To receive commission, add your payment details in Settings. The payment schedule is shown on the Affiliate Guide page.",
      "Commission is paid only on completed orders. The Program is subject to a fair use policy, and we may review any referred order. You can see the status of your commission in the Commission tab and your paid commission in the Payment tab. Orders that are refunded or charged back do not earn commission.",
    ],
  },
  {
    title: "4. Marketing materials",
    body: [
      "We may share promotional materials, such as banners, logos and collection images, in the Marketing Tool tab. You can download them or copy the HTML embed code to share on your channels.",
    ],
  },
  {
    title: "5. Network",
    body: [
      "If the Network tab is turned on, you can invite others to join as affiliates under you by sharing your network link. Anyone who signs up through it becomes your downline affiliate, and you earn a network commission on orders they refer, as set by us.",
    ],
  },
  {
    title: "6. Cookies and tracking",
    body: [
      "We use a cookie to track people who click your link, so we can only track customers whose browsers accept cookies. If a customer blocks or clears cookies, we cannot track them or pay commission on their orders.",
      "The tracking period is shown on the affiliate registration form. It starts when a customer clicks your link or uses your coupon code. During that period, every order the customer places on our website earns you commission, even if they do not click your link again.",
    ],
  },
  {
    title: "7. Product claims",
    body: [
      "Komb products are cosmetics. When promoting them, do not say they treat, prevent, stop or reverse hair loss, or that they regrow hair. You may describe them as scalp and hair care for healthier-looking hair.",
    ],
  },
  {
    title: "8. Leaving the Program",
    body: [
      "To leave the Program, email us at info@komb.ca. We may remove an affiliate who breaks these terms.",
    ],
  },
  {
    title: "9. Changes to these terms",
    body: [
      "We may update these terms from time to time. The current version is always available on our website.",
    ],
  },
  {
    title: "Go forward and refer!",
    body: [
      "Thank you for reading to the end. We wish you all the best. You can come back to these terms at any time, and if you have any questions, email us at info@komb.ca.",
    ],
  },
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
