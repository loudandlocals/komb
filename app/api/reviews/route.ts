import { NextResponse } from "next/server";
import { isJudgeMeConfigured, submitReview } from "@/lib/judgeme";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Review form endpoint. With Judge.me connected the review goes to Judge.me
// for moderation; without it this replies in preview mode and stores nothing.
export async function POST(request: Request) {
  const b = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const str = (k: string) => (typeof b?.[k] === "string" ? (b[k] as string).trim() : "");
  const rating = Number(b?.rating);
  const input = {
    productId: str("productId"),
    name: str("name"),
    email: str("email"),
    title: str("title"),
    body: str("body"),
    rating,
  };
  if (str("website")) return NextResponse.json({ ok: true }); // spam trap
  if (
    !input.name ||
    !EMAIL.test(input.email) ||
    !(rating >= 1 && rating <= 5) ||
    !input.body ||
    input.body.length > 5000 ||
    input.title.length > 200
  ) {
    return NextResponse.json({ error: "Please add your name, a valid email, a star rating and your review." }, { status: 400 });
  }
  if (!isJudgeMeConfigured || !input.productId) {
    return NextResponse.json({ ok: true, preview: true });
  }
  try {
    await submitReview(input);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "We couldn't send your review just now. Please try again." }, { status: 502 });
  }
}
