import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Why Komb starts with the scalp, and who we make it for: women whose hair is changing through postpartum and perimenopause.",
  alternates: { canonical: "/our-story" },
  openGraph: { url: "/our-story", images: [OG_IMAGE] },
};

export default function OurStoryPage() {
  return (
    <div className="container-site pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-[clamp(2.5rem,5vw,4rem)] grid max-w-208 gap-4">
        <p className="eyebrow">Our story</p>
        <h1>
          For the season when your hair <em>starts to change.</em>
        </h1>
      </header>

      <div className="grid items-start gap-[clamp(2rem,6vw,6rem)] md:grid-cols-[5fr_6fr]">
        <div className="arch relative mx-auto max-w-96 md:max-w-none" data-reveal="image">
          <Image
            src="/images/steps/center-image.png"
            alt="A hand reaching for the serum on a wooden bedside table, with the moisturizer and a hairbrush beside it"
            fill
            sizes="(min-width: 768px) 40vw, 24rem"
            className="object-cover object-[50%_75%]"
          />
        </div>
        <div className="grid max-w-xl justify-items-start gap-5" data-reveal="stagger">
          <p className="text-[1.1rem] text-muted">
            Maybe it is a wider part, a thinner ponytail, or more hair in the shower
            than there used to be. Maybe your hair simply feels drier and harder to
            manage than it once did.
          </p>
          <p>
            These changes are common in your 30s and 40s, especially around
            postpartum and perimenopause, and they can affect how you feel as much
            as how you look. Komb was created for that moment.
          </p>
          <p>
            Our approach is simple. Start with the scalp, the foundation of any
            haircare routine, then carry that care through the lengths. One serum,
            one moisturizer, clear directions.
          </p>
          <p>
            We chose our ingredients thoughtfully and list every one of them, in
            English and French. And we keep our promises realistic: Komb supports
            scalp care and healthier-looking hair. It is not a treatment for hair
            loss.
          </p>
          <p className="font-display text-[1.75rem] text-accent italic">
            Nourish. Restore. Flourish.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Shop the routine
          </Link>
        </div>
      </div>
    </div>
  );
}
