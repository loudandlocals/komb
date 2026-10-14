import { ImageResponse } from "next/og";
import { BRAND, logoDataUri } from "@/lib/logoImage";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home screen icon: the full Komb Hair logo in gold on cream.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: BRAND.cream }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoDataUri(BRAND.gold)} width={140} height={63} alt="" />
      </div>
    ),
    size
  );
}
