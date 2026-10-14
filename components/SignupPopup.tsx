"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";

const SEEN_KEY = "komb-signup-popup";
const DELAY_MS = 15_000;

// "Subscribe for 15% off your first order", offered once, 15 seconds into a
// visit. Closing it or signing up means it does not come back. It never opens
// over checkout or the account page, or on top of another open dialog such as
// the cart. The discount code itself is sent by the email provider's welcome
// email, set up on their side.
export function SignupPopup() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const timer = window.setTimeout(() => {
      if (/^\/(checkout|account)/.test(window.location.pathname)) return;
      if (document.querySelector("dialog[open]")) return;
      setOpen(true);
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
    // Started once per visit; navigating between pages does not restart it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  const remember = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  const close = () => {
    remember();
    setOpen(false);
  };

  if (/^\/(checkout|account)/.test(pathname) && !open) return null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby="signup-popup-title"
      onClose={close}
      onClick={(e) => e.target === dialog.current && close()}
      className="m-auto w-[min(100%-2rem,34rem)] max-w-none bg-umber p-0 text-offwhite backdrop:bg-ink/50 md:w-[min(100%-3rem,56rem)] [&_:focus-visible]:outline-offwhite"
    >
      {/* Two halves from tablets up: the photo first, then the offer. Phones
          get the offer alone, to keep the pop-up short. */}
      <div className="md:grid md:grid-cols-[5fr_6fr]">
      <div className="relative max-md:hidden">
        <Image
          src="/images/steps/center-image.png"
          alt=""
          fill
          sizes="(min-width: 768px) 25rem, 1px"
          className="object-cover object-[50%_70%]"
        />
      </div>
      <div className="relative grid content-center gap-5 px-[clamp(1.5rem,5vw,3rem)] pt-12 pb-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-2 right-2 grid size-11 place-items-center text-[1.4rem] leading-none hover:text-gold-light"
        >
          <span aria-hidden>×</span>
        </button>
        <p className="text-[0.68rem] font-medium tracking-[0.22em] text-gold-light uppercase">
          Welcome to Komb
        </p>
        <h2
          id="signup-popup-title"
          className="font-caslon text-[clamp(1.7rem,4vw,2.3rem)] leading-tight tracking-[-0.02em] text-offwhite italic"
        >
          Subscribe for 15% off <span className="text-gold-light">your first order</span>
        </h2>
        <p className="text-[0.95rem] text-offwhite/85">
          Join our emails for notes on scalp care, new arrivals and routine tips.
          Your code arrives in your welcome email.
        </p>
        <NewsletterForm onSubscribed={remember} />
        <button
          type="button"
          onClick={close}
          className="justify-self-start text-[0.78rem] tracking-[0.12em] text-offwhite/80 uppercase underline underline-offset-4 hover:text-gold-light"
        >
          No thanks
        </button>
      </div>
      </div>
    </dialog>
  );
}
