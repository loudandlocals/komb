"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Fades up any [data-reveal] element as it scrolls into view. Children of a
// [data-reveal="stagger"] element animate one after another.
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
          const stagger = el.dataset.reveal === "stagger";
          gsap.from(stagger ? el.children : el, {
            autoAlpha: 0,
            y: 28,
            duration: 0.9,
            ease: "power2.out",
            stagger: stagger ? 0.12 : 0,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
