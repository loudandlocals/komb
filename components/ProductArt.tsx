import Image from "next/image";
import type { ProductKind } from "@/lib/types";

// Shows the product photo when there is one (Shopify image or the local photo
// in public/products); otherwise falls back to a simple illustration.
export function ProductArt({
  kind,
  imageUrl,
  alt,
  className = "w-[70%]",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  priority = false,
}: {
  kind: ProductKind;
  imageUrl?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={800}
        height={1000}
        sizes={sizes}
        // The product page's main photo: preloaded in the page head and fetched
        // first, so it is ready as the panel appears.
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? "eager" : undefined}
        // Shopify images can be any shape, often a tight cut-out, so they are
        // fitted whole with some room around them. The site's own shots are
        // already framed on a square and fill their box.
        className={`size-full transition-transform duration-500 group-hover:scale-[1.03] ${
          imageUrl.startsWith("http") ? "object-contain p-[10%]" : "object-cover"
        }`}
      />
    );
  }
  return (
    <svg
      className={`h-auto ${className}`}
      viewBox="0 0 240 300"
      {...(alt
        ? { role: "img", "aria-label": `${alt} (illustration)` }
        : { "aria-hidden": true })}
    >
      <ellipse cx="120" cy="276" rx="70" ry="8" fill="#272522" opacity=".08" />
      {ART[kind]}
    </svg>
  );
}

const label = { fill: "#EFE4D3", stroke: "#D5C396", strokeWidth: 1 };
const wordmark = {
  fill: "#A18041",
  fontFamily: "var(--font-cormorant), serif",
  textAnchor: "middle" as const,
};

const ART: Partial<Record<ProductKind, React.ReactNode>> = {
  serum: (
    <g>
      {/* dropper bulb and bamboo collar */}
      <rect x="107" y="22" width="26" height="46" rx="12" fill="#272522" />
      <rect x="98" y="64" width="44" height="30" rx="3" fill="#CF9356" />
      <path d="M98 74h44M98 84h44" stroke="#B57D45" strokeWidth="1" />
      {/* glass bottle */}
      <path
        d="M104 94h32v10c0 8 22 12 22 30v124a14 14 0 0 1-14 14H96a14 14 0 0 1-14-14V134c0-18 22-22 22-30z"
        fill="#D9C290"
        opacity=".55"
        stroke="#A18041"
        strokeWidth="1.2"
      />
      <path d="M92 150v100" stroke="#fff" strokeWidth="3" opacity=".5" strokeLinecap="round" />
      <rect x="90" y="150" width="60" height="96" rx="2" {...label} />
      <text x="120" y="182" fontSize="11" letterSpacing="2" {...wordmark}>KOMB</text>
      <text x="120" y="194" fontSize="6" letterSpacing="3" {...wordmark}>HAIR</text>
      <path d="M104 206h32" stroke="#A18041" strokeWidth=".6" />
      <text x="120" y="220" fontSize="5.5" fill="#272522" textAnchor="middle" letterSpacing=".6">BOTANICAL</text>
      <text x="120" y="229" fontSize="5.5" fill="#272522" textAnchor="middle" letterSpacing=".6">HAIR SERUM</text>
    </g>
  ),
  moisturizer: (
    <g>
      <rect x="52" y="120" width="136" height="34" rx="6" fill="#E6D9C4" stroke="#D5C396" />
      <path d="M52 146h136" stroke="#D5C396" />
      <path
        d="M56 154h128v102a16 16 0 0 1-16 16H72a16 16 0 0 1-16-16z"
        fill="#EFE4D3"
        stroke="#D5C396"
        strokeWidth="1.2"
      />
      <g fill="#A18041" opacity=".35">
        <circle cx="70" cy="170" r="1" /><circle cx="168" cy="182" r="1.2" />
        <circle cx="80" cy="250" r="1" /><circle cx="160" cy="256" r="1" />
        <circle cx="66" cy="214" r="1.2" /><circle cx="176" cy="226" r="1" />
        <circle cx="96" cy="132" r="1" /><circle cx="150" cy="136" r="1.2" />
      </g>
      <text x="120" y="200" fontSize="15" letterSpacing="3" {...wordmark}>KOMB</text>
      <text x="120" y="213" fontSize="7" letterSpacing="4" {...wordmark}>HAIR</text>
      <path d="M96 224h48" stroke="#A18041" strokeWidth=".6" />
      <text x="120" y="238" fontSize="6" fill="#272522" textAnchor="middle" letterSpacing=".8">RENEWAL HAIR MOISTURIZER</text>
    </g>
  ),
};
