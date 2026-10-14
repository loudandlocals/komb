import { ImageResponse } from "next/og";
import { BRAND, logoDataUri } from "@/lib/logoImage";

export const dynamic = "force-static";

// A square PNG of the logo for search engines (Organization logo) and the
// web app manifest.
export function GET() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.cream }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri(BRAND.gold)} width={400} height={181} alt="" />
      </div>
    ),
    { width: 512, height: 512 }
  );
}
