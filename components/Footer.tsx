import Link from "next/link";
import { SITE } from "@/lib/site";

const heading =
  "mb-1.5 font-sans text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-light";
const column = "grid content-start justify-items-start gap-2 text-[0.92rem]";
const link = "underline-offset-4 hover:text-gold-light hover:underline";

export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-offwhite">
      <div className="container-site grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div className={column}>
          <p className="wordmark text-[1.7rem] text-gold-light!">
            KOMB <span>HAIR</span>
          </p>
          <p className="font-caslon italic">Nourish. Restore. Flourish.</p>
        </div>
        <nav aria-label="Shop" className={column}>
          <h2 className={heading}>Shop</h2>
          <Link className={link} href="/products/botanical-hair-serum">Botanical Hair Serum</Link>
          <Link className={link} href="/products/renewal-hair-moisturizer">Renewal Hair Moisturizer</Link>
          <Link className={link} href="/shop">All products</Link>
        </nav>
        <nav aria-label="Learn" className={column}>
          <h2 className={heading}>Learn</h2>
          <Link className={link} href="/#routine">The routine</Link>
          <Link className={link} href="/ingredients">Ingredients</Link>
          <Link className={link} href="/our-story">Our story</Link>
        </nav>
        <div className={column}>
          <h2 className={heading}>Komb Hair Inc.</h2>
          <address className="not-italic">
            PO Box 30022 RPO Ansley Grove
            <br />
            Woodbridge, ON L4L 0C7, Canada
          </address>
          <a className={link} href={SITE.instagram} rel="noopener noreferrer" target="_blank">
            @kombhairinc<span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <p className="container-site mt-12 text-[0.8rem] text-offwhite/80">
        <span className="block border-t border-offwhite/20 pt-6">
          Komb products are cosmetics that care for the scalp and hair. They are not
          intended to diagnose, treat or prevent any medical condition, including
          hair loss. © {new Date().getFullYear()} Komb Hair Inc.
        </span>
      </p>
    </footer>
  );
}
