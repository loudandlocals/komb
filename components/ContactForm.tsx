"use client";

import { useId, useState } from "react";
import { SITE } from "@/lib/site";

type Status = { kind: "idle" | "busy" | "done" | "preview" | "error"; message?: string };

const field = "min-h-11 w-full border border-ink/50 bg-offwhite px-3.5 py-2.5";

// Name, email and message, posted to /api/contact. Errors and results are
// announced to screen readers. In preview mode nothing is sent.
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const id = useId();
  const statusId = `${id}-status`;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const name = String(data.name ?? "").trim();
    const email = String(data.email ?? "").trim();
    const message = String(data.message ?? "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !message) {
      setStatus({ kind: "error", message: "Please fill in your name, a valid email and a message." });
      return;
    }
    setStatus({ kind: "busy" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", message: json.error ?? "Something went wrong. Please try again." });
      } else if (json.preview) {
        setStatus({
          kind: "preview",
          message: `Preview only: this form is not connected yet, so your message was not sent. Please email ${SITE.email}.`,
        });
      } else {
        setStatus({ kind: "done", message: "Thank you. We will be in touch soon." });
        form.reset();
      }
    } catch {
      setStatus({ kind: "error", message: `We couldn't send your message. Please email ${SITE.email}.` });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-5" aria-describedby={statusId}>
      <div className="grid gap-2">
        <label htmlFor={`${id}-name`} className="eyebrow">Name</label>
        <input id={`${id}-name`} name="name" autoComplete="name" required maxLength={120} className={field} />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-email`} className="eyebrow">Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={field} />
      </div>
      <div className="grid gap-2">
        <label htmlFor={`${id}-message`} className="eyebrow">Message</label>
        <textarea id={`${id}-message`} name="message" required rows={6} maxLength={5000} className={field} />
      </div>
      {/* Hidden from people; catches automated spam. */}
      <div aria-hidden className="hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`min-h-5 text-[0.9rem] ${status.kind === "error" ? "text-[#9b3a24]" : "text-muted"}`}
      >
        {status.message}
      </p>
      <div>
        <button type="submit" disabled={status.kind === "busy"} className="btn btn-primary">
          {status.kind === "busy" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
