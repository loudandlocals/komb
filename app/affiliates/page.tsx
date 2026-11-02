import type { Metadata } from "next";
import { SITE } from "@/lib/site";

// The application form lives with the affiliate app chosen by the client
// (for example UpPromote, GoAffPro or Shopify Collabs). Set its address in
// NEXT_PUBLIC_AFFILIATE_SIGNUP_URL; until then the button emails us instead.
const SIGNUP_URL = process.env.NEXT_PUBLIC_AFFILIATE_SIGNUP_URL;

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

// The client's affiliate terms, verbatim.
const TERMS_INTRO = [
  "Welcome to KOMB! Thanks for joining our Affiliate program.",
  "These following terms and conditions apply to individuals who are accessing or using the Program both as a merchant (“we” or “merchant”) and an affiliate (“you” or “affiliate”) who refers customers to use product or service from the merchant.",
  "By participating in the Program, Affiliate agrees to use the Program in the manner specified in, and are bound by, these Terms and Conditions. If you do not agree to these Terms and Conditions in their entirety you are not authorized to register as an Affiliate or participate in the Program in any manner.",
];

const TERMS = [
  {
    title: "1. Approve or Reject of the Registration",
    body: [
      "We reserve the right to approve or reject ANY Affiliate Program Registration in our sole and absolute discretion. You will have no legal recourse against us for the rejection of your Affiliate Program Registration.",
    ],
  },
  {
    title: "2. Affiliate Links and Coupon",
    body: [
      "Affiliate link is automatically generated, but you can also generate an affiliate link for a specific product or collection. If a person clicks on someone else’s referral link and then later they click on yours, yours is the one that counts.",
      "Affiliate might or might not be assigned to one coupon code with details and usage clarified on Dashboard. If customer both click on the affiliate link and use coupon code, you will not receive a double commission. If you’re not assigned a branded coupon, then you’re not allowed to promote the coupon.",
      "Affiliate may also advertise merchant website on online channels such as Facebook, Instagram,... or offline classified channel ads, magazines, and newspapers.",
    ],
  },
  {
    title: "3. Commissions and payment",
    body: [
      "Refer any customer to make a purchase on our website, you will get a commission amount which is calculated based on Commission structure. Commission amount is dependent on order value and not including extra fee (tax, shipping cost,...).",
      "For an Affiliate to receive a commission, you need to specify the payment details on Settings. Payment schedule will be notified on Affiliate Guide page.",
      "Payments will only be sent for transactions that have been successfully completed. Use of the Affiliate Program is subject to a fair use policy which gives merchant the right to review each and every referral order. Status of commission if displayed in Commission tab, any paid commission will be listed on Payment tab. Transactions that result in charge backs or refunds will not be paid out.",
    ],
  },
  {
    title: "4. Marketing tool",
    body: [
      "We may share promotion media such as banner, logo or specific collection promotion to you through Marketing tool tab. You can download the media or get the HTML embed code in order to share on affiliate channels.",
    ],
  },
  {
    title: "5. Network",
    body: [
      "If Network tab is activated, affiliate can invite others to become their downline affiliate. If any downline affiliate brings order to merchant shop, upline affiliate will also get network commission which depends on merchant settings.",
      "To invite other affiliates into the system, share network link and any other affiliate who click on that link and sign up will become a downline affiliate.",
    ],
  },
  {
    title: "6. Cookie",
    body: [
      "We use a cookie to track people who have clicked on your link, so they need to be using cookies for us to track them.",
      "If a person doesn't allow cookies or clears their cookies then we can't track them so can't pay earnings on that person's activity.",
      "Cookies day is said on the Affiliate registration form. The tracking day will start from the time a customer clicks on the affiliate’s link or use the coupon. Within the cookie time, every order made by this customer at merchant website will automatically result in commissions to the affiliate (There’s no need for the customer to click on the affiliate link then).",
    ],
  },
  {
    title: "7. Removal from Referral Program",
    body: [
      "If an affiliate wishes to be removed from the affiliate program, they can do so by contacting: info@komb.ca.",
    ],
  },
  {
    title: "Go forward and refer!",
    body: [
      "We're very glad you've made it to the end of this important document.",
      "We wish you all the very best. You can always re-visit these Affiliate Program terms and conditions in the future and if you have any questions you can send email to info@komb.ca for support.",
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
          Komb products are cosmetics, so please do not say they treat, stop or reverse hair
          loss. Questions? Email{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-label">
            {SITE.email}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
