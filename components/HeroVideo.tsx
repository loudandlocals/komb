"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Looping boomerang hero video (pre-rendered forward then reverse, so the loop
// is seamless). The poster shows first. The video is fetched only once the
// page has finished loading and the browser is idle, so it never competes
// with the first paint; phones get a smaller file. It only plays when the
// visitor has not asked for reduced motion. It can always
// be paused: by clicking or tapping it, or from the keyboard (WCAG 2.2.2).
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState("/media/hero-boomerang.mp4");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 767px)").matches) {
      setSrc("/media/hero-boomerang-mobile.mp4");
    }
    let idle = 0;
    const start = () => {
      idle = window.requestIdleCallback
        ? window.requestIdleCallback(() => setEnabled(true), { timeout: 3000 })
        : window.setTimeout(() => setEnabled(true), 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const toggle = () => {
    if (!enabled) {
      setEnabled(true);
      return;
    }
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  return (
    <>
      <Image
        src="/media/hero-poster.jpg"
        alt="A woman with long, softly waved hair moving in a light breeze"
        fill
        sizes="(min-width: 768px) 72vw, 100vw"
        // The largest element on a phone screen, so it loads first.
        priority
        onClick={toggle}
        className="origin-[45%_40%] translate-x-[7%] scale-120 object-cover object-[16%_30%]"
      />
      {enabled && (
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          tabIndex={-1}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={toggle}
          className="absolute inset-0 size-full origin-[45%_40%] translate-x-[7%] scale-120 object-cover object-[16%_30%]"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      {/* No visible control: clicking or tapping the video pauses it, and this
          button appears only when reached by keyboard (WCAG 2.2.2). */}
      <button
        type="button"
        onClick={toggle}
        className="sr-only z-10 bg-offwhite px-3 py-2 font-sans text-[0.7rem] font-medium tracking-[0.16em] text-ink uppercase focus-visible:not-sr-only focus-visible:absolute focus-visible:right-4 focus-visible:bottom-3"
      >
        {playing ? "Pause" : "Play"}
        <span className="sr-only"> video</span>
      </button>
    </>
  );
}
