import Link from "next/link";
import { SITE } from "@/lib/site";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { NewsletterForm } from "./NewsletterForm";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/#routine", label: "The Routine" },
  { href: "/our-story", label: "Our Story" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
  { href: "/affiliates", label: "Affiliates" },
];

const PRODUCTS = [
  { href: "/products/botanical-hair-serum", label: "Botanical Hair Serum" },
  { href: "/products/renewal-hair-moisturizer", label: "Renewal Hair Moisturizer" },
];

const label = "text-[0.68rem] font-medium tracking-[0.22em] text-gold-light uppercase";
const smallLink =
  "underline decoration-offwhite/40 underline-offset-4 hover:text-gold-light hover:decoration-gold-light";

// A single rounded panel inset from the page edges, in a dark warm brown.
// Cream carries the text (10.4:1) and light gold the small labels and hover
// accents (6.6:1), both past AA; Komb Gold is kept to the tab and dividers,
// where it does not have to carry small text.
export function Footer() {
  return (
    <footer className="bg-offwhite px-3 pb-3 md:px-4 md:pb-4">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-umber px-gutter pt-24 pb-7 text-offwhite [&_:focus-visible]:outline-offwhite">
        {/* Monogram tab hanging from the top edge */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 grid h-16 w-14 -translate-x-1/2 place-items-center rounded-b-2xl bg-komb-gold font-display text-[1.7rem] leading-none font-medium text-ink"
        >
          K
        </div>

        <div className="grid justify-items-center gap-5 text-center" data-reveal>
          <p className="font-display text-[clamp(4.5rem,19vw,17rem)] leading-[0.82] font-medium tracking-[0.1em] text-offwhite">
            <span className="sr-only">Komb Hair</span>
            <span aria-hidden className="block pl-[0.1em]">
              KOMB
            </span>
          </p>
          <p aria-hidden className="pl-[0.7em] text-[0.72rem] font-medium tracking-[0.7em] text-gold-light uppercase">
            Hair
          </p>
          <p className="font-caslon text-[clamp(1.1rem,1.8vw,1.5rem)] leading-snug">
            Nourish. Restore.
            <br />
            <em>Flourish.</em>
          </p>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-3" data-reveal="stagger">
          <div className="grid content-start justify-items-start gap-6">
            <p className="font-caslon text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight tracking-[-0.01em]">
              Care that starts
              <br />
              <em>at the scalp.</em>
            </p>
            <Link
              href="/shop"
              className="btn min-h-11 border-gold-light bg-gold-light px-6 text-[0.72rem] text-ink hover:border-offwhite hover:bg-offwhite"
            >
              Shop the routine
            </Link>
          </div>

          <div className="grid content-start gap-6 text-[0.9rem]">
            <div className="grid justify-items-start gap-2">
              <p className={label}>Komb Hair Inc.</p>
              <address className="not-italic">
                PO Box 30022 RPO Ansley Grove
                <br />
                Woodbridge, ON L4L 0C7, Canada
              </address>
              <a className={smallLink} href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
              <a className={smallLink} href={SITE.instagram} rel="noopener noreferrer" target="_blank">
                @kombhairinc<span className="sr-only"> on Instagram (opens in a new tab)</span>
              </a>
            </div>
            <nav aria-label="Products" className="grid justify-items-start gap-2">
              <p className={label}>Products</p>
              {PRODUCTS.map((item) => (
                <Link key={item.href} href={item.href} className={smallLink}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-start justify-between gap-8 md:justify-end md:gap-14">
            <nav aria-label="Footer" className="grid justify-items-start gap-1.5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-caslon text-[clamp(1.25rem,1.9vw,1.6rem)] leading-snug hover:text-gold-light"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={SITE.instagram}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Komb Hair on Instagram (opens in a new tab)"
              className="mt-1.5 grid size-10 place-items-center rounded-full border border-offwhite/40 hover:border-gold-light hover:text-gold-light"
            >
              <svg viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        <section
          aria-labelledby="newsletter-title"
          className="mt-14 grid gap-x-10 gap-y-6 border-t border-komb-gold/70 pt-10 md:grid-cols-[1fr_minmax(0,1.4fr)]"
          data-reveal
        >
          <h2
            id="newsletter-title"
            className="font-caslon text-[clamp(1.4rem,2.2vw,1.9rem)] leading-tight tracking-[-0.01em] text-offwhite"
          >
            Notes on scalp care,
            <br />
            <em className="text-gold-light">new arrivals and routine tips.</em>
          </h2>
          <NewsletterForm />
        </section>

        <div className="mt-12 grid gap-4 border-t border-komb-gold/70 pt-6 text-[0.78rem] text-offwhite/80 xl:grid-cols-[auto_1fr] xl:gap-10">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="whitespace-nowrap">© {new Date().getFullYear()} Komb Hair Inc.</p>
            <Link href="/terms" className={smallLink}>
              Terms of Use
            </Link>
            <Link href="/shipping-returns" className={smallLink}>
              Shipping &amp; Returns
            </Link>
            <Link href="/privacy" className={smallLink}>
              Privacy Policy
            </Link>
            <CurrencySwitcher />
          </div>
          <p className="max-w-3xl xl:max-w-none xl:text-right">
            Komb products are cosmetics that care for the scalp and hair. They are not
            intended to diagnose, treat or prevent any medical condition, including
            hair loss.
          </p>
        </div>
        <p className="mt-6 text-[0.68rem] font-medium tracking-[0.22em] text-offwhite/70 uppercase md:text-right">
          Site by JLU Creative
        </p>
      </div>
    </footer>
  );
}
