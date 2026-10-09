import { NextResponse } from "next/server";
import { createCheckoutUrl, isShopifyConfigured } from "@/lib/shopify";
import type { CheckoutLine } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    lines?: CheckoutLine[];
  } | null;
  const lines = (body?.lines ?? []).filter(
    (l) => typeof l.variantId === "string" && l.quantity > 0
  );
  if (lines.length === 0) {
    return NextResponse.json({ error: "No items to check out." }, { status: 400 });
  }

  if (!isShopifyConfigured) {
    return NextResponse.json({ mock: true });
  }

  try {
    return NextResponse.json({ url: await createCheckoutUrl(lines) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "We couldn't start checkout. Please try again." },
      { status: 502 }
    );
  }
}
