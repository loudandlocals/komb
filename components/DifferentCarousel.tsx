"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

export type DifferentSlide = {
  title: string;
  body: string;
  image: string;
  alt: string;
  position?: string;
};

// "Why we're different" as a carousel. The photo row on the right runs off the
// edge of the page; whichever photo is in front decides the title and copy
// shown on the left. It advances on its own every few seconds and loops, and
// can be driven by the arrows, the list of points, swipe or trackpad scroll,
// or the left/right arrow keys. Autoplay stops for good on any of those, holds
// while the pointer or keyboard focus is inside, has a pause/play control, and
// never starts for visitors who ask for reduced motion (WCAG 2.2.2).
const INTERVAL_MS = 5500;
export function DifferentCarousel({
  slides,
  children,
}: {
  slides: DifferentSlide[];
  // The call to action, rendered on the server and shown under the copy.
  children?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLUListElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const settle = useRef<ReturnType<typeof setTimeout>>(undefined);
  const slide = slides[index];

  const offsetOf = (i: number) => {
    const el = rail.current;
    const card = el?.children[i] as HTMLElement | undefined;
    return el && card ? card.offsetLeft - el.offsetLeft : 0;
  };

  const show = (next: number) => {
    const i = (next + slides.length) % slides.length;
    setIndex(i);
    rail.current?.scrollTo({ left: offsetOf(i) });
  };

  // Any deliberate move by the visitor also ends autoplay.
  const go = (next: number) => {
    setPlaying(false);
    show(next);
  };

  // Start autoplay only when motion is welcome, and run it only on screen.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
    const el = root.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || held || !inView) return;
    const timer = setInterval(() => {
      if (!document.hidden) show(index + 1);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, held, inView, index]);

  // Swiping or scrolling the row picks the photo that ends up in front.
  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const el = rail.current;
      if (!el) return;
      let nearest = 0;
      for (let i = 1; i < slides.length; i++) {
        if (Math.abs(offsetOf(i) - el.scrollLeft) < Math.abs(offsetOf(nearest) - el.scrollLeft)) {
          nearest = i;
        }
      }
      setIndex(nearest);
    }, 120);
  };

  useEffect(() => () => clearTimeout(settle.current), []);

  // Crossfade the copy when the slide changes, unless motion is reduced.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          copy.current,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      });
      return () => mm.revert();
    },
    { dependencies: [index] }
  );

  return (
    <div
      ref={root}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
      className="grid items-center gap-x-[clamp(2rem,5vw,5rem)] gap-y-10 lg:grid-cols-[2fr_3fr]"
    >
      <div className="grid justify-items-start gap-5 pr-gutter lg:pr-0">
        <p className="eyebrow">Why we&rsquo;re different</p>
        <div
          ref={copy}
          // Quiet while autoplaying, so screen readers are not interrupted.
          aria-live={playing ? "off" : "polite"}
          className="grid min-h-48 content-start gap-4"
        >
          <p className="text-[0.8rem] tracking-[0.14em] text-muted">
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </p>
          <h3 className="font-caslon text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em] text-balance italic">
            {slide.title}
          </h3>
          <p className="max-w-md text-[0.95rem] text-muted">{slide.body}</p>
        </div>
        {children}
      </div>

      <div className="min-w-0">
        <ul
          ref={rail}
          tabIndex={0}
          aria-label="Photos for each point. Use the left and right arrow keys to change."
          onScroll={onScroll}
          onPointerDown={() => setPlaying(false)}
          onTouchStart={() => setPlaying(false)}
          onWheel={(e) => {
            // Only a sideways scroll of the row counts, not scrolling the page.
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) setPlaying(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              go(index + 1);
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
              go(index - 1);
            }
          }}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <li key={s.title} className="w-[62%] shrink-0 snap-start sm:w-[42%]">
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Show: ${s.title}`}
                aria-current={i === index}
                tabIndex={-1}
                className={`relative block aspect-3/4 w-full overflow-hidden transition-opacity duration-500 ${
                  i === index ? "opacity-100" : "opacity-55 hover:opacity-80"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 62vw"
                  className={`object-cover ${s.position ?? ""}`}
                />
              </button>
            </li>
          ))}
          {/* Spacer so the last photos can still scroll to the front. */}
          <li aria-hidden className="w-[58%] shrink-0" />
        </ul>

        <div className="mt-6 flex items-center justify-between pr-gutter lg:pr-(--bleed)">
          <p className="text-[0.72rem] font-medium tracking-[0.22em] uppercase">
            What sets Komb apart
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="mr-2 px-1 py-2 text-[0.68rem] font-medium tracking-[0.18em] text-muted uppercase hover:text-ink"
            >
              {playing ? "Pause" : "Play"}
              <span className="sr-only"> slideshow</span>
            </button>
            <button
              type="button"
              aria-label="Previous point"
              onClick={() => go(index - 1)}
              className="grid size-10 place-items-center text-muted hover:text-ink"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              aria-label="Next point"
              onClick={() => go(index + 1)}
              className="grid size-10 place-items-center text-muted hover:text-ink"
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <ol className="pr-gutter lg:pr-(--bleed)">
          {slides.map((s, i) => (
            <li key={s.title} className="border-t border-ink/20 last:border-b">
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={`flex w-full items-baseline gap-4 py-3 text-left text-[0.95rem] transition-colors ${
                  i === index ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className="text-[0.72rem] tracking-[0.14em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={i === index ? "font-normal" : ""}>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
