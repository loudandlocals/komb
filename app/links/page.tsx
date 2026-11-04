import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

// The page the QR code on the labels can point to: every way to reach Komb in
// one place, as the old komb.ca links page offered. The old page's address,
// /online, redirects here (next.config.ts).
export const metadata: Metadata = {
  title: "Links",
  description: "Shop Komb Hair, follow us on Instagram and TikTok, or get in touch.",
  alternates: { canonical: "/links" },
};

const LINKS = [
  { href: "/shop", label: "Shop the routine", primary: true },
  { href: "/products/botanical-hair-serum#how-to-use", label: "How to use the serum" },
  { href: "/products/renewal-hair-moisturizer#how-to-use", label: "How to use the moisturizer" },
  { href: SITE.instagram, label: "Instagram" },
  { href: "https://www.tiktok.com/@kombhairinc", label: "TikTok" },
  { href: "https://api.whatsapp.com/send?phone=14164195779", label: "WhatsApp" },
  { href: `mailto:${SITE.email}`, label: "Email us" },
];

export default function LinksPage() {
  return (
    <div className="container-site grid max-w-md! justify-items-center gap-6 py-section text-center">
      <p className="eyebrow">Komb Hair</p>
      <h1 className="text-[clamp(2rem,6vw,3rem)]">
        Nourish. Restore. <em>Flourish.</em>
      </h1>
      <ul className="grid w-full gap-3">
        {LINKS.map((l) => (
          <li key={l.href}>
            {l.href.startsWith("/") ? (
              <Link href={l.href} className={`btn ${l.primary ? "btn-primary" : "btn-outline"} w-full`}>
                {l.label}
              </Link>
            ) : (
              <a href={l.href} className="btn btn-outline w-full">
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
