import { ImageResponse } from "next/og";
import { BRAND, logoDataUri } from "@/lib/logoImage";

export const alt = "Komb Hair: Nourish. Restore. Flourish.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share image for links to the site: the logo in gold on the brand cream,
// with the tagline beneath.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 48,
          background: BRAND.cream,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri(BRAND.gold)} width={560} height={254} alt="" />
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 10, color: BRAND.ink, textTransform: "uppercase" }}>
          Nourish · Restore · Flourish
        </div>
      </div>
    ),
    size
  );
}
