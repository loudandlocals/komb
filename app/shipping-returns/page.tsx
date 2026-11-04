import type { Metadata } from "next";
import Link from "next/link";
import { CompanyContact, LegalPage } from "@/components/LegalPage";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/offers";
import { SITE } from "@/lib/site";

// Draft. Everything in [square brackets] is a business decision for the
// client: rates, delivery times, the return window and opened products.
export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Shipping, returns and refunds for Komb Hair orders.",
  alternates: { canonical: "/shipping-returns" },
  robots: { index: false, follow: true },
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      eyebrow="Shipping & Returns"
      title={<>Shipping <em>&amp; returns</em></>}
      updated="[October 2026]"
    >
      <section>
        <h2>Where we ship</h2>
        <p>We ship to [Canada and the United States].</p>
      </section>

      <section>
        <h2>Shipping costs</h2>
        <ul>
          <li>Free shipping on orders of ${FREE_SHIPPING_THRESHOLD} USD or more [Canadian threshold to be confirmed].</li>
          <li>Free shipping on every Routine Duo subscription and every 3-month supply, whatever the order total.</li>
          <li>
            Serum or moisturizer subscriptions on their own follow the ${FREE_SHIPPING_THRESHOLD} rule, so
            shipping is charged on deliveries under ${FREE_SHIPPING_THRESHOLD}.
          </li>
          <li>Orders under ${FREE_SHIPPING_THRESHOLD}: [flat rate or calculated at checkout].</li>
        </ul>
        <p>Any taxes and duties are shown at checkout.</p>
      </section>

      <section>
        <h2>Processing and delivery</h2>
        <p>
          Orders are processed within [1 to 2 business days]. Delivery usually takes
          [X to Y business days] in Canada and [X to Y business days] in the United States.
          You will receive a tracking link by email when your order ships.
        </p>
      </section>

      <section>
        <h2>Returns</h2>
        <p>
          If you are not happy with your order, contact us within [30 days] of delivery.
          [Unopened products can be returned for a refund. Opened products: to be
          confirmed.] Return shipping is [paid by the customer / covered by Komb].
        </p>
      </section>

      <section>
        <h2>Damaged or incorrect items</h2>
        <p>
          If your order arrives damaged or incorrect, email us within [7 days] of delivery
          with your order number and a photo, and we will make it right.
        </p>
      </section>

      <section>
        <h2>Refunds</h2>
        <p>
          Approved refunds are made to your original payment method within [5 to 10
          business days] of our receiving the return. [Original shipping costs are /
          are not refunded.]
        </p>
      </section>

      <section>
        <h2>Subscriptions</h2>
        <p>
          You can skip, pause, change or cancel a subscription at any time from your
          account, with no commitment, so you only receive what you need. We email you
          5 days before each delivery ships and is charged. See our <Link href="/terms">Terms of Use</Link>{" "}
          for details.
        </p>
      </section>

      <section>
        <h2>How to start a return</h2>
        <p>
          Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your order number
          and the reason for the return. We will reply with the next steps.
        </p>
        <CompanyContact />
      </section>
    </LegalPage>
  );
}
