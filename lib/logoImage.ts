import { LOGO_K, LOGO_PATHS, LOGO_VIEWBOX } from "@/components/Logo";

// The logo as an SVG data URI, for the generated icons and share image.
export function logoDataUri(color: string, which: "full" | "k" = "full") {
  const paths = which === "full" ? LOGO_PATHS : [LOGO_K];
  // The K alone is framed square with some breathing room.
  const viewBox = which === "full" ? LOGO_VIEWBOX : "-10.2 -8.75 72 72";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="${color}">${paths
    .map((d) => `<path d="${d}"/>`)
    .join("")}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export const BRAND = { cream: "#EFE4D3", linen: "#F7F2E9", gold: "#A87E34", ink: "#272522" };
