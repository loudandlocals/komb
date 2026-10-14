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
          <p>
            Maybe it&rsquo;s a wider part, a thinner ponytail, or more hair in the
            shower than you remember. Maybe your hair feels drier, less manageable,
            or simply different than it once did. We know how personal those
            changes can feel, because we&rsquo;ve experienced them ourselves.
          </p>
          <p>
            Komb was started by two women navigating their own hair changes through
            aging, hormonal shifts, motherhood, and life. We wanted nourishing
            haircare that felt simple to use and met the standards we held for
            ourselves. So, we created it.
          </p>
          <p>
            Our approach starts at the scalp and carries that care through the
            lengths. One serum, one moisturizer, and clear directions to make
            consistent care an easy part of your routine.
          </p>
          <p>
            We choose our ingredients thoughtfully and share every one. Our promise
            is personal: the same care, consideration, and standards we want for our
            own hair go into every product we create for yours.
          </p>
          <p className="[font-family:var(--font-cormorant-italic),Georgia,serif] text-[1.75rem] text-accent italic">
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
