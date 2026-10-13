"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The one shared scroll-enter animation. Any [data-reveal] element fades up
// as it scrolls into view, once. Children of a [data-reveal="stagger"] element
// follow one after another, and a [data-reveal="image"] element fades in
// while settling from a slight zoom instead of moving.
// The inline styles are cleared when each animation ends, so a leftover
// transform never traps a sticky or blended child.
// Content already on screen at load is left alone, so nothing flashes and the
// largest paint is never delayed. Skipped entirely for reduced-motion users.
export function ScrollReveal() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
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
      return () => mm.revert();
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
