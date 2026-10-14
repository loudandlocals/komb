import { NextResponse } from "next/server";

// Contact form endpoint. Where messages should go has not been decided yet
// (an email service, a help desk, or Shopify's own contact form), so for now
// it validates the message and replies in preview mode without storing or
// sending anything.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  // Hidden field that people never fill in; bots often do.
  if (typeof body?.website === "string" && body.website) {
    return NextResponse.json({ ok: true });
  }
  if (!name || name.length > 120 || !EMAIL.test(email) || !message || message.length > 5000) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  }
  return NextResponse.json({ ok: true, preview: true });
}
