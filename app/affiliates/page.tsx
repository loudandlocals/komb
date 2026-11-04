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

// The affiliate program terms, as approved by Komb (final version, effective November 2, 2026).
// Keep in sync with the Terms pop-up in the affiliate app.
const TERMS_EFFECTIVE = "November 2, 2026";

const TERMS_INTRO = [
  "Welcome to the KOMB Hair Affiliate Program! We're excited to work with people who love sharing products and helping others discover KOMB.",
  "These Affiliate Program Terms and Conditions (\"Terms\") govern your participation in the KOMB Hair Affiliate Program (\"Program\"), operated by Komb Hair Inc. (\"KOMB,\" \"we,\" \"us\" or \"our\").",
  "By applying to or participating in the Program, you (\"Affiliate,\" \"you\" or \"your\") agree to these Terms. If you do not agree, please do not apply to or participate in the Program.",
];

type TermsBlock = string | { sub: string } | { list: string[]; ordered: boolean };

const TERMS: { title: string; blocks: TermsBlock[] }[] = [
  {
    title: "1. Application and Acceptance",
    blocks: [
      "You must apply and be approved by KOMB before participating in the Program. We reserve the right to accept or decline any application at our discretion.",
      "You agree to provide accurate information when applying and to keep your contact and payment information up to date in your affiliate dashboard.",
    ],
  },
  {
    title: "2. Affiliate Links and Discount Codes",
    blocks: [
      "Once approved, you will receive a unique affiliate link and, unless we advise otherwise, a unique affiliate discount code to share with your audience.",
      "Your link directs customers to the KOMB website and helps us track eligible referrals. You may also be able to create links to specific products or collections through your affiliate dashboard.",
      "Your affiliate code gives customers 10% off eligible products. The code cannot be combined with other promotional codes. KOMB may identify products or promotions that are not eligible for the discount.",
      "You may only promote codes that have been assigned or authorized for your use. Do not advertise an expired, unauthorized or misleading code or offer.",
      "If a customer uses both an affiliate link and an affiliate code on the same order, only one affiliate commission is payable for that order, as explained in Section 4.",
    ],
  },
  {
    title: "3. Commission Rate and Eligible Sales",
    blocks: [
      "You will earn a commission equal to 10% of eligible net product sales attributed to your affiliate link or code under these Terms.",
      "\"Eligible net product sales\" means the product subtotal after discounts, excluding:",
      { list: ["Shipping charges;", "Taxes;", "Duties; and", "Gift card purchases."], ordered: false },
      "Payment processing fees are not deducted when calculating eligible net product sales.",
      "For example, if a customer purchases $100 CAD of eligible products and receives a 10% discount, the eligible net product sale is $90 CAD. Your 10% commission would be $9 CAD, subject to the order meeting the other requirements in these Terms.",
      "KOMB may review referral orders before approving or paying commissions.",
      { sub: "Gift Card Purchases and Redemptions" },
      "Purchases of gift cards do not earn affiliate commission.",
      "However, eligible products purchased using a gift card as full or partial payment may earn commission if the order meets the Program's eligibility and attribution requirements.",
      "Commission is calculated on the eligible product subtotal after discounts, before gift card payment is applied. Gift card payment is treated as a payment method, not an additional discount.",
      "Shipping, taxes, duties and any gift cards purchased in the same order remain excluded from the commission calculation.",
    ],
  },
  {
    title: "4. Tracking and Attribution",
    blocks: [
      { sub: "Affiliate Link Tracking" },
      "When a customer clicks your affiliate link, a 30-day tracking window begins. If the customer clicks an eligible affiliate link again, a new 30-day window begins from the most recent click.",
      "If no affiliate code is used, the order is attributed to the affiliate whose eligible link was clicked most recently within an active tracking window.",
      { sub: "Code Attribution" },
      "If an affiliate code is used on an order, the order is attributed to the affiliate assigned that code, even if the customer previously clicked another affiliate's link.",
      "Only one affiliate can receive commission for an order. Using both a link and a code does not create a second commission.",
      "Using an affiliate code on an order does not, by itself, start or restart a tracking window for future orders.",
      { sub: "Tracking Limitations" },
      "Link tracking may depend on cookies or similar technology. If a customer blocks or clears cookies, uses a different device or browser, or otherwise cannot be tracked, the link referral may not be recorded.",
      "An eligible order placed with your affiliate code may still be attributed to you, subject to the Program's tracking capabilities and these Terms.",
    ],
  },
  {
    title: "5. Repeat Purchases and Subscription Orders",
    blocks: [
      { sub: "Repeat Purchases" },
      "You may earn commission on a customer's repeat order if:",
      { list: ["The order is placed within an active 30-day tracking window and is attributed to you under Section 4; or", "The customer uses your affiliate code on that order."], ordered: false },
      "There is no lifetime commission on a customer's purchases.",
      "If the tracking window has expired and the customer does not use your code, you will not earn commission on that order unless it is attributed to you through a new eligible link click.",
      { sub: "Subscription Orders and Renewals" },
      "An initial subscription order may earn commission if it meets the Program's eligibility and attribution requirements.",
      "Each subscription renewal is treated as a separate order. A renewal earns commission only if it is attributed to you within an active 30-day tracking window or your affiliate code is applied to that renewal order.",
      "Starting a subscription through your link or code does not create lifetime commission rights. A code used on the initial order qualifies later renewals only if that code is also applied to those renewal orders.",
      "All subscription commissions are calculated on the eligible product subtotal after discounts and remain subject to the usual exclusions, holding period and refund adjustments.",
    ],
  },
  {
    title: "6. Commission Holding Period and Payments",
    blocks: [
      "Commission is held until the later of:",
      { list: ["30 days after the order is delivered; or", "The date the applicable return window closes."], ordered: true },
      "Eligible commissions that have cleared by the end of a calendar month will be paid on the 15th of the following month, provided your payable balance has reached the minimum payout threshold and your payment details are complete.",
      "The minimum payout is $25 CAD while your affiliate account remains active. If your cleared balance is less than $25 CAD, it will carry forward to a future payment period.",
      "You are responsible for providing and maintaining accurate payment information in your affiliate dashboard. Missing or incorrect payment details may delay payment.",
      "Your dashboard may show pending, approved or paid commissions. Dashboard entries remain subject to review and adjustment under these Terms.",
      "Final payouts when participation ends are addressed in Section 13.",
    ],
  },
  {
    title: "7. Cancellations, Refunds, Chargebacks and Fraud",
    blocks: [
      "No commission is earned on orders that are cancelled, fully refunded, fraudulent or subject to a chargeback.",
      "For a partial refund, the commission will be reduced proportionally based on the eligible product amount refunded.",
      "If commission has already been paid on an order that is later refunded, cancelled, charged back or found to be fraudulent, KOMB may deduct the applicable commission adjustment from future payouts.",
    ],
  },
  {
    title: "8. Personal Purchases",
    blocks: [
      "You may not earn commission on your own purchases, including purchases made using your own affiliate link or code.",
      "You may share your code with others in accordance with these Terms, but you may not use it or your link to generate commission on purchases made for yourself.",
    ],
  },
  {
    title: "9. Advertising Disclosures",
    blocks: [
      "You must clearly and prominently disclose your relationship with KOMB whenever you promote KOMB products and may earn a commission or receive another benefit, such as free products.",
      "For example, a disclosure could say:",
      "\"I'm a KOMB affiliate and may earn a commission if you purchase through my link.\"",
      "Make the disclosure easy to notice and understand, close to the endorsement or affiliate link. Include it on each platform where you promote KOMB, and use appropriate disclosures in videos and other formats.",
      "Simply sharing a discount code, tagging KOMB or linking to the website may not be enough.",
      "You are responsible for following applicable advertising and disclosure requirements in the markets where you promote KOMB.",
    ],
  },
  {
    title: "10. Product Claims and Honest Endorsements",
    blocks: [
      "You may share your genuine opinions and experiences with KOMB products, but your content must be truthful and must not be misleading.",
      "You must not:",
      { list: ["Claim that KOMB products treat, stop or reverse hair loss;", "Claim that products regrow hair, cure a medical condition or guarantee specific results;", "Make claims about product benefits that KOMB has not approved or that you cannot substantiate;", "Present altered, fabricated or misleading before-and-after images as real results;", "Say you have used a product if you have not; or", "Misrepresent your experience or suggest results are typical without an appropriate basis."], ordered: false },
      "Please use the product descriptions, directions and approved claims provided by KOMB.",
      "If you are unsure whether a statement is appropriate, contact info@komb.ca before posting it.",
    ],
  },
  {
    title: "11. Promotional Methods and Brand Materials",
    blocks: [
      { sub: "11.1 Social Media and Websites" },
      "You may share your assigned affiliate link and code in organic posts, videos, stories, profile bios and link-in-bio pages on social media accounts you own or control, and on your own website or blog. Your content must comply with Sections 9 and 10, applicable laws and platform rules. Identify yourself as an independent affiliate and do not make your account or website appear to be an official KOMB channel.",
      { sub: "11.2 Paid Advertising" },
      "You must obtain KOMB's written approval at info@komb.ca before running any paid promotion of KOMB products or your affiliate link or code. This includes paid search, social media ads, boosted posts, sponsored placements and ads directing visitors to your own page that promotes KOMB. Approval applies only to the channels, content, targeting and period expressly approved; approval of one campaign does not approve future campaigns.",
      "Unless KOMB expressly approves otherwise in writing, you may not bid on or target KOMB, KOMB Hair, komb.ca or confusingly similar variations or misspellings as paid-search keywords, or use them in paid-search display URLs. For any approved search campaign, use negative keywords where available to prevent these brand searches from triggering your ads. You may not run ads that impersonate KOMB or imply that you are its official store. You are responsible for all advertising costs unless KOMB agrees otherwise in writing.",
      { sub: "11.3 Email Text Messages and Direct Messages" },
      "You may promote KOMB by email, SMS/text or direct message only to your own audience whose documented opt-in consent covers the promotional messages and channel used. This is a Program requirement even where applicable law may permit a different basis for sending. Consent to receive email does not automatically authorize text messages. You must not use purchased, rented, scraped or otherwise unauthorized contact lists, send unsolicited bulk messages or use automated promotional calls.",
      "Each promotional message must clearly identify you as the sender, disclose your affiliate relationship, include any legally required sender and contact information, and provide a simple way to unsubscribe or opt out. Honour requests promptly and within applicable legal deadlines. Keep records of consent and opt-outs, and provide reasonable evidence of compliance to KOMB on request without unnecessarily disclosing recipients' personal information. Follow applicable anti-spam, privacy and telemarketing laws, including Canada's Anti-Spam Legislation where applicable. KOMB's approval does not replace consent or other legal requirements.",
      "You must not send messages as if you are KOMB, access or use KOMB's customer lists, or collect customer information on KOMB's behalf without a separate written agreement.",
      { sub: "11.4 Brand Names Domains and Materials" },
      "You may refer to KOMB by name in truthful promotional content and use KOMB-approved images, banners, logos and product information while you are an active affiliate. KOMB grants you a limited, non-exclusive, non-transferable and revocable permission to use these materials solely to promote KOMB under these Terms. Do not alter logos or make materials inaccurate or misleading, and do not claim ownership of KOMB's branding.",
      "Without KOMB's prior written approval, you may not register or use domain names, subdomains, social media handles, account names or email addresses containing KOMB, KOMB Hair or confusingly similar variations or misspellings. This does not prevent ordinary references to KOMB in posts, website content or product review page titles on your independently branded channels. Do not impersonate KOMB, suggest you are its employee or official representative, or misrepresent prices, discounts, availability, shipping, returns or other offer terms.",
      { sub: "11.5 Coupon Sites Incentives and Referral Integrity" },
      "Unless KOMB approves in writing, you may not submit or arrange placement of your link or code on coupon, deal, cashback or discount-aggregator sites, or offer cash, gifts, rebates or other rewards for using your link or code beyond KOMB's authorized customer discount. You may share your assigned code with your own audience on the channels permitted above.",
      "You may not use bots, click farms, fabricated engagement, forced redirects or cookie stuffing, or otherwise create tracking without a customer intentionally clicking your link. Do not overwrite another affiliate's attribution deceptively, alter or conceal tracking parameters, or use misleading redirects. Ordinary link-in-bio services and platform link shortening are permitted if they preserve tracking and do not mislead customers. You may not share your affiliate account, operate a sub-affiliate network or promise others a KOMB commission without KOMB's written approval. Personal purchase restrictions remain governed by Section 8.",
      { sub: "11.6 Content Corrections and Enforcement" },
      "If KOMB asks you to correct or remove promotional content, stop a campaign or stop using brand materials because they breach these Terms or create a legal, platform or customer deception concern, you must do so within 24 hours of notice. If a platform prevents completion within that time, promptly notify KOMB, take all available steps to stop further distribution and complete the correction or removal as soon as possible.",
      "KOMB may suspend the affected promotion or your participation under Section 13. No commission is earned on orders generated through a prohibited promotional method; KOMB may reject or reverse only the commissions reasonably attributable to that breach and deduct those amounts from future payouts. Unrelated eligible commissions remain payable under these Terms. KOMB's review or approval does not remove your responsibility for your content, consent practices or compliance with applicable laws and platform rules.",
    ],
  },
  {
    title: "12. Affiliate Status and Expenses",
    blocks: [
      "You participate in the Program as an independent affiliate. These Terms do not create an employment, agency, partnership or joint-venture relationship between you and KOMB.",
      "You are responsible for your own business expenses and any taxes or reporting obligations related to your affiliate earnings.",
      "You are not authorized to make commitments or enter into agreements on behalf of KOMB.",
    ],
  },
  {
    title: "13. Suspension, Removal and Final Payout",
    blocks: [
      "You may leave the Program at any time by contacting info@komb.ca.",
      "KOMB may suspend or end your participation if you breach these Terms, engage in fraudulent or misleading activity, make prohibited claims or otherwise misuse the Program. KOMB may also end the affiliate relationship at its discretion.",
      "When your participation ends, you must stop presenting yourself as a KOMB affiliate and stop using your affiliate link, code and KOMB-provided promotional materials.",
      { sub: "Final Payout" },
      "If you leave the Program or KOMB ends your participation, any remaining eligible commission will be paid even if the balance is below the usual $25 CAD minimum.",
      "Commissions earned before termination remain subject to the applicable holding period and any adjustments for refunds, cancellations, fraud or chargebacks.",
      "The remaining eligible balance will be paid on the next scheduled monthly payment date after it clears, provided your payment details are complete and accurate.",
      "The $25 CAD minimum applies only while your affiliate account remains active.",
      "Commissions associated with fraudulent, cancelled, fully refunded or charged-back orders remain ineligible. Partial refunds reduce commissions as described in Section 7.",
    ],
  },
  {
    title: "14. Changes to the Program or Terms",
    blocks: [
      "KOMB may update these Terms or change or discontinue the Program. We will communicate material changes to active affiliates before they take effect.",
      "Changes apply going forward from their stated effective date. Continuing to participate after an updated version takes effect means you agree to the updated Terms.",
    ],
  },
  {
    title: "15. Questions and Support",
    blocks: [
      "If you have questions about your application, links, discount code, commissions or these Terms, please contact:",
      "Komb Hair Inc. · info@komb.ca",
      "Thank you for being part of the KOMB community!",
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
        <p className="text-[0.9rem] text-muted">Effective date: {TERMS_EFFECTIVE}</p>
        <div className="grid gap-3 text-[0.95rem]">
          {TERMS_INTRO.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        {TERMS.map((section) => (
          <div key={section.title} className="grid gap-2 text-[0.95rem]">
            <h3 className="text-[1.3rem]">{section.title}</h3>
            {section.blocks.map((block, i) => {
              if (typeof block === "string") return <p key={i}>{block}</p>;
              if ("sub" in block)
                return (
                  <h4 key={i} className="mt-2 font-medium">
                    {block.sub}
                  </h4>
                );
              const List = block.ordered ? "ol" : "ul";
              return (
                <List
                  key={i}
                  className={`grid gap-1 pl-5 ${block.ordered ? "list-decimal" : "list-disc"}`}
                >
                  {block.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </List>
              );
            })}
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
