"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// The one shared scroll-enter animation. Any [data-reveal] element fades up
// as it scrolls into view, once. Children of a [data-reveal="stagger"] element
// follow one after another, and a [data-reveal="image"] element fades in
// while settling from a slight zoom instead of moving.
// The inline styles are cleared when each animation ends, so a leftover
// transform never traps a sticky or blended child.
// Content already on screen at load is left alone, so nothing flashes and the
// largest paint is never delayed. Skipped entirely for reduced-motion users.
// The animation library is fetched only when the browser is idle, so it is
// not part of the first load.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
    let cancelled = false;
    let revert = () => {};

    const run = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const below = (el: Element) =>
          el.getBoundingClientRect().top > window.innerHeight * 0.9;

        gsap.utils.toArray<HTMLElement>("[data-reveal]").filter(below).forEach((el) => {
          const mode = el.dataset.reveal;
          const image = mode === "image";
          gsap.from(mode === "stagger" ? el.children : el, {
            autoAlpha: 0,
            y: image ? 0 : 22,
            scale: image ? 1.04 : 1,
            duration: image ? 1 : 0.75,
            ease: "power2.out",
            stagger: mode === "stagger" ? 0.1 : 0,
            clearProps: "opacity,visibility,transform",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      });
      revert = () => ctx.revert();
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(run, { timeout: 2000 })
      : window.setTimeout(run, 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      revert();
    };
  }, [pathname]);

  return null;
}
