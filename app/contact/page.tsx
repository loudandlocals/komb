import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about Komb Hair, your order or your routine? Email info@komb.ca or send us a message.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

const linkList = "grid gap-2 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-label";

export default function ContactPage() {
  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-208 gap-4">
        <p className="eyebrow">Contact</p>
        <h1>
          We&rsquo;d love <em>to hear from you</em>
        </h1>
        <p className="max-w-xl text-muted">
          Questions about your order, your routine or our ingredients? Send us a message
          and we will reply by email.
        </p>
      </header>

      <div className="grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-14 md:grid-cols-[2fr_3fr]">
        <aside className="grid content-start gap-10">
          <div className="grid gap-2">
            <h2 className="eyebrow">Email</h2>
            <a href={`mailto:${SITE.email}`} className="font-caslon text-[1.4rem] underline underline-offset-4 hover:text-label">
              {SITE.email}
            </a>
          </div>
          <div className="grid gap-2">
            <h2 className="eyebrow">Mailing address</h2>
            <address className="not-italic">
              Komb Hair Inc.
              <br />
              PO Box 30022 RPO Ansley Grove
              <br />
              Woodbridge, ON L4L 0C7, Canada
            </address>
          </div>
          <div className="grid gap-2">
            <h2 className="eyebrow">Instagram</h2>
            <a href={SITE.instagram} rel="noopener noreferrer" target="_blank" className="underline underline-offset-4 hover:text-label">
              @kombhairinc<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <nav aria-label="Help" className="grid gap-2">
            <h2 className="eyebrow">Helpful links</h2>
            <ul className={linkList}>
              <li><Link href="/#faq-title">Frequently asked questions</Link></li>
              <li><Link href="/shipping-returns">Shipping &amp; Returns</Link></li>
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </nav>
        </aside>

        <section aria-labelledby="contact-form-title" className="grid content-start gap-6">
          <h2 id="contact-form-title" className="text-[clamp(1.6rem,2.6vw,2.1rem)]">
            Send a <em>message</em>
          </h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
