import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Libre_Caslon_Text, Roboto } from "next/font/google";
import { CartDrawer } from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReveal } from "@/components/ScrollReveal";
import { OG_IMAGE, SITE } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
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
      className={`${cormorant.variable} ${caslon.variable} ${roboto.variable}`}
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
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Komb Hair Inc.",
            url: SITE.url,
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
