import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Libre_Caslon_Text, Roboto } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SignupPopup } from "@/components/SignupPopup";
import { OG_IMAGE, SITE } from "@/lib/site";
import "./globals.css";

// Only the two cuts the site uses: medium upright for the KOMB wordmark, and
// regular italic for the sign-off line on Our Story.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal"],
  variable: "--font-cormorant",
  display: "swap",
});
const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-cormorant-italic",
  display: "swap",
  // Used on one page only, so it is not fetched ahead of time everywhere.
  preload: false,
});
const caslon = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-caslon-text",
  display: "swap",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Scalp and haircare, starting at the root`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_CA",
    title: `${SITE.name} | Scalp and haircare, starting at the root`,
    description: SITE.description,
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f7f2e9" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-CA"
      className={`${cormorant.variable} ${cormorantItalic.variable} ${caslon.variable} ${roboto.variable}`}
    >
      <body>
        <CartProvider>
          <a
            href="#main"
            className="absolute top-0 -left-full z-50 bg-ink px-4 py-3 text-offwhite focus:left-0"
          >
            Skip to content
          </a>
          <Header />
          <main id="main" tabIndex={-1} className="pt-(--header-h) outline-none">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <ScrollReveal />
        <SignupPopup />
        {/* Klaviyo's onsite script: draws the Klaviyo form in the sign-up
            pop-up. Loaded after the page, and only once Klaviyo is set up. */}
        {process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID && (
          <Script
            src={`https://static.klaviyo.com/onsite/js/${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
            strategy="lazyOnload"
          />
        )}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Komb Hair Inc.",
            url: SITE.url,
            logo: `${SITE.url}/logo.png`,
            sameAs: [SITE.instagram],
            address: {
              "@type": "PostalAddress",
              postOfficeBoxNumber: "30022",
              addressLocality: "Woodbridge",
              addressRegion: "ON",
              postalCode: "L4L 0C7",
              addressCountry: "CA",
            },
          }}
        />
      </body>
    </html>
  );
}
