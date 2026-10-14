import type { Metadata } from "next";
import Link from "next/link";
import { CompanyContact, LegalPage } from "@/components/LegalPage";

// Draft written for the client to review against PIPEDA and CASL. Not legal
// advice; Komb Hair Inc. should have it checked before launch.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Komb Hair Inc. collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy Policy" title={<>Your <em>privacy</em></>} updated="[October 2026]">
      <section>
        <h2>Who we are</h2>
        <p>
          Komb Hair Inc. (&ldquo;Komb&rdquo;, &ldquo;we&rdquo;) is based in
          Woodbridge, Ontario, Canada. This policy explains how we collect, use, share and protect
          your personal information when you visit komb.ca, buy from us or join our
          emails. We follow Canada&rsquo;s Personal Information Protection and Electronic
          Documents Act (PIPEDA).
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong className="font-medium">Orders and accounts:</strong> your name, email,
            shipping and billing addresses, phone number, order history and subscription
            details. Payments are processed by Shopify; we do not receive your full card
            number.
          </li>
          <li>
            <strong className="font-medium">Email sign-up:</strong> your email address and
            the date you agreed to receive our emails.
          </li>
          <li>
            <strong className="font-medium">Messages:</strong> anything you send us through
            the contact form or by email.
          </li>
          <li>
            <strong className="font-medium">Your browser:</strong> your cart, and whether
            you have closed our sign-up pop-up, are saved in your own browser. Our store
            platform may also collect basic device and usage information to run the shop
            securely. [Add any analytics or advertising tools before launch.]
          </li>
        </ul>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To process, ship and support your orders and subscriptions.</li>
          <li>To answer your questions.</li>
          <li>
            To send you emails about scalp care, new products and offers, only if you have
            agreed to receive them.
          </li>
          <li>To keep the site secure and improve it.</li>
          <li>To meet our legal and accounting obligations.</li>
        </ul>
      </section>

      <section>
        <h2>Emails and your consent</h2>
        <p>
          We send marketing emails only with your consent, as required by Canada&rsquo;s
          Anti-Spam Legislation (CASL). Every email includes our contact details and a link
          to unsubscribe, and you can unsubscribe at any time. We will still send emails
          about orders you place.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>
          We do not sell your personal information. We share it only with service
          providers who help us run the business, such as Shopify (store, checkout and
          customer accounts), our payment processors, our subscription app, our email
          provider [to be named] and our shipping carriers, and only as needed for those
          services. Some of these providers store information outside Canada, including in
          the United States, where it may be accessible to authorities under local law.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          We keep your information for as long as needed for the purposes above, and as
          required for tax and accounting records. [Retention period to be confirmed.]
        </p>
      </section>

      <section>
        <h2>Keeping it safe</h2>
        <p>
          We use reputable providers and reasonable safeguards to protect your
          information. No method of transmission or storage is completely secure, but we
          work to protect your information and to respond promptly to any incident.
        </p>
      </section>

      <section>
        <h2>Your choices and rights</h2>
        <p>
          You can ask to see the personal information we hold about you, ask us to correct
          it, or withdraw your consent to its use, subject to legal limits. To do so,
          email us. If you are not satisfied with our answer, you can contact the Office
          of the Privacy Commissioner of Canada.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy. The date at the top shows when it last changed. See
          also our <Link href="/terms">Terms of Use</Link>.
        </p>
      </section>

      <section>
        <h2>Contact us</h2>
        <p>Questions about privacy can be sent to our privacy contact:</p>
        <CompanyContact />
      </section>
    </LegalPage>
  );
}
