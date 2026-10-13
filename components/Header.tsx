"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ACCOUNT_URL } from "@/lib/site";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/#routine", label: "The Routine" },
  { href: "/our-story", label: "Our Story" },
];

const navText = "text-[0.74rem] whitespace-nowrap uppercase tracking-[0.16em]";

// On the home page the header is fully transparent while it sits over the
// hero imagery (light text with a soft shadow, backed by a subtle fade inside
// the hero), then turns into the translucent cream bar once the hero has
// scrolled past.
function useOverHero() {
  const isHome = usePathname() === "/";
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    const hero = isHome ? document.getElementById("hero-media") : null;
    if (!hero) {
      setOverHero(false);
      return;
    }
    const update = () => {
      const headerHeight = document.getElementById("site-header")?.offsetHeight ?? 0;
      setOverHero(hero.getBoundingClientRect().bottom > headerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome]);

  return overHero;
}

export function Header() {
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const clear = useOverHero() && !menuOpen;

  return (
    <header
      id="site-header"
      className={`fixed inset-x-0 top-0 z-20 border-b transition-colors duration-300 ${
        clear
          ? "border-transparent bg-transparent font-medium text-offwhite [text-shadow:0_1px_10px_rgb(39_37_34/0.7)] [&_:focus-visible]:outline-offwhite"
          : "border-line bg-offwhite text-ink"
      }`}
    >
      <p className="flex h-(--bar-h) items-center justify-center bg-umber px-4 font-caslon text-[0.8rem] font-normal tracking-[0.04em] text-offwhite italic [text-shadow:none]">
        Nourish. Restore. Flourish.
      </p>
      <div className="container-site grid h-17 grid-cols-[1fr_auto_1fr] items-center">
        <button
          type="button"
          className={`${navText} justify-self-start py-2 lg:hidden`}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="site-nav"
          aria-label="Main"
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b border-line bg-offwhite px-gutter pb-5 lg:static lg:flex lg:flex-row lg:gap-[clamp(1rem,2.2vw,2rem)] lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`${navText} border-b border-line py-3.5 underline-offset-8 hover:underline lg:border-0 lg:py-2`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/"
          aria-label="Komb Hair home"
          className={`wordmark text-[1.4rem] transition-colors duration-300 sm:text-[1.7rem] ${
            clear ? "text-offwhite!" : ""
          }`}
        >
          KOMB <span>HAIR</span>
        </Link>
        <div className="flex items-center gap-1 justify-self-end sm:gap-3">
        {/* A plain anchor: once set, the account lives on Shopify, off this site. */}
        <a
          href={ACCOUNT_URL}
          aria-label="Account"
          className="grid size-11 place-items-center"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20.5c1.2-3.8 4.3-5.5 8-5.5s6.8 1.7 8 5.5" />
          </svg>
        </a>
        <button
          type="button"
          className={`${navText} py-2`}
          aria-haspopup="dialog"
          onClick={open}
        >
          Cart
          <span
            className={`ml-1.5 inline-grid h-6 min-w-6 place-items-center rounded-full tracking-normal transition-colors duration-300 ${
              clear ? "bg-offwhite text-ink [text-shadow:none]" : "bg-ink text-offwhite"
            }`}
          >
            {count}
          </span>
          {/* The spoken name starts with the visible "Cart 0", as speech-input users expect. */}
          <span className="sr-only">{count === 1 ? " item" : " items"}</span>
        </button>
        </div>
      </div>
    </header>
  );
}
