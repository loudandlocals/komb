import type { Metadata } from "next";
import Link from "next/link";
import { CompanyContact, LegalPage } from "@/components/LegalPage";
import { SITE } from "@/lib/site";

// Draft written for the client to review. Not legal advice; Komb Hair Inc.
// should have it checked before launch.
export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using komb.ca and buying from Komb Hair Inc.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms of Use" title={<>Terms of <em>Use</em></>} updated="[October 2026]">
      <section>
        <h2>About these terms</h2>
        <p>
          These terms apply to your use of {SITE.url.replace("https://", "")} (the
          &ldquo;site&rdquo;) and to any order you place with Komb Hair Inc. (&ldquo;Komb&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;). By using the site or placing an order, you agree to
          them. If you do not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2>Our products</h2>
        <p>
          Komb products are cosmetics for the scalp and hair. They are not intended to
          diagnose, treat, cure or prevent any disease or medical condition, including
          hair loss. Results vary from person to person.
        </p>
        <p>
          Please read the full ingredient list and directions before use. Our products
          are for external use only. Avoid contact with the eyes, stop using a product if
          irritation occurs, and keep products out of reach of children. If you have
          allergies, a sensitive scalp or a skin condition, speak with a healthcare
          professional before use.
        </p>
      </section>

      <section>
        <h2>Prices and payment</h2>
        <p>
          Prices are shown in the currency of your region, for example US dollars (USD)
          or Canadian dollars (CAD), and may change without notice. Taxes and shipping
          are calculated at checkout. Checkout and payment are handled securely by
          Shopify; we do not see or store your full card details.
        </p>
      </section>

      <section>
        <h2>Orders</h2>
        <p>
          Your order is an offer to buy. It is accepted when we send a shipping
          confirmation. We may refuse or cancel an order, for example if a product is
          unavailable, a price was displayed in error, or we suspect fraud. If we cancel
          an order you have paid for, we will refund you in full.
        </p>
      </section>

      <section>
        <h2>Subscriptions</h2>
        <ul>
          <li>
            A subscription renews automatically at the frequency you choose and is
            charged to your saved payment method before each delivery, at the
            subscription price shown when you subscribed.
          </li>
          <li>
            You can pause, skip, change or cancel your subscription at any time from
            your account. Changes made at least [X days] before the next renewal apply
            to that renewal.
          </li>
          <li>
            We will tell you in advance by email about any change to the price of your
            subscription.
          </li>
        </ul>
      </section>

      <section>
        <h2>Offers and discount codes</h2>
        <p>
          Offers such as 15% off a first order for joining our emails are limited to one
          per customer, cannot be combined with other offers unless we say so, have no
          cash value, and may end at any time. [Any exclusions to be confirmed.]
        </p>
      </section>

      <section>
        <h2>Shipping and returns</h2>
        <p>
          Shipping, returns and refunds are covered by our{" "}
          <Link href="/shipping-returns">Shipping &amp; Returns</Link> policy.
        </p>
      </section>

      <section>
        <h2>Reviews and content you share</h2>
        <p>
          If you send us a review, photo or comment, you confirm it is your own and
          honest, and you allow us to show it on the site and in our marketing, with your
          first name and last initial. We may edit it for length or remove it, and we will
          not publish anything that makes medical claims about our products.
        </p>
      </section>

      <section>
        <h2>Our content</h2>
        <p>
          The Komb name, logo, photography and text on the site belong to Komb Hair Inc.
          or its licensors. You may not copy or use them for commercial purposes without
          our written permission.
        </p>
      </section>

      <section>
        <h2>Accuracy and availability</h2>
        <p>
          We work to keep product information, images and prices accurate, but colours
          and packaging may vary slightly, and errors can occur. The site may
          occasionally be unavailable for maintenance.
        </p>
      </section>

      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the extent permitted by law, Komb is not liable for indirect or
          consequential losses arising from your use of the site or our products, and our
          total liability for any order is limited to the amount you paid for it. Nothing
          in these terms limits rights you have under consumer protection law.
        </p>
      </section>

      <section>
        <h2>Privacy</h2>
        <p>
          How we handle your personal information is explained in our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the Province of Ontario and the federal
          laws of Canada that apply there. [If customers outside Canada are served,
          confirm any additional terms.]
        </p>
      </section>

      <section>
        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. The date at the top shows when
          they last changed. Orders are governed by the terms in place when they were
          placed.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <CompanyContact />
      </section>
    </LegalPage>
  );
}
