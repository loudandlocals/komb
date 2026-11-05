import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The Ingredients page was folded into the product pages.
      { source: "/ingredients", destination: "/shop", permanent: false },
      // The old komb.ca links page, which the label QR code may lead to.
      { source: "/online", destination: "/links", permanent: false },
    ];
  },
  images: {
    // AVIF first where the browser supports it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
