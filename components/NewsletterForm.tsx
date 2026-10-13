"use client";

import { useId, useState } from "react";
import { PRIVACY_URL } from "@/lib/site";

type Status = { kind: "idle" | "busy" | "done" | "preview" | "error"; message?: string };

// Footer email sign-up. Posts to /api/subscribe, which decides the provider.
// The consent line covers what Canadian anti-spam law asks for: what will be
// sent, who is sending it, and that it can be stopped at any time.
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputId = useId();
  const messageId = useId();
  const consentId = useId();
  const done = status.kind === "done" || status.kind === "preview";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setStatus({ kind: "error", message: "Please enter a valid email address, like name@example.com." });
      return;
    }
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
      } else if (data.preview) {
        setStatus({
          kind: "preview",
          message: "Preview only: sign-ups open when the store is connected. Your email was not saved.",
        });
      } else {
        setStatus({ kind: "done", message: "Thank you. You are on the list." });
        setEmail("");
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't sign you up just now. Please try again." });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-3">
      <label htmlFor={inputId} className="text-[0.68rem] font-medium tracking-[0.22em] text-gold-light uppercase">
        Email address
      </label>
      <div className="flex flex-wrap gap-3">
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status.kind === "error") setStatus({ kind: "idle" });
          }}
          aria-invalid={status.kind === "error"}
          aria-describedby={`${messageId} ${consentId}`}
          className="min-h-11 min-w-0 flex-[1_1_14rem] border border-offwhite/60 bg-transparent px-3.5 text-offwhite"
        />
        <button
          type="submit"
          disabled={status.kind === "busy"}
          className="btn min-h-11 border-gold-light bg-gold-light px-6 text-[0.72rem] text-ink enabled:hover:border-offwhite enabled:hover:bg-offwhite"
        >
          {status.kind === "busy" ? "One moment…" : "Sign up"}
        </button>
      </div>
      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={`min-h-5 text-[0.85rem] ${status.kind === "error" ? "text-[#f3c9b8]" : "text-offwhite"}`}
      >
        {status.kind === "error" && <span aria-hidden>! </span>}
        {status.message}
        {done && <span className="sr-only"> </span>}
      </p>
      <p id={consentId} className="text-[0.78rem] leading-relaxed text-offwhite/80">
        By signing up you agree to receive emails from Komb Hair Inc. about scalp care,
        new products and offers. You can unsubscribe at any time. Komb Hair Inc., PO Box
        30022 RPO Ansley Grove, Woodbridge, ON L4L 0C7, Canada.
        {PRIVACY_URL && (
          <>
            {" "}
            <a href={PRIVACY_URL} className="underline underline-offset-4 hover:text-gold-light">
              Privacy policy
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
