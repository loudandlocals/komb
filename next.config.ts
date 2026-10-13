import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Ingredients page was folded into the product pages.
  async redirects() {
    return [{ source: "/ingredients", destination: "/shop", permanent: false }];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
};

export default nextConfig;
