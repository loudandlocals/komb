"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Looping boomerang hero video (pre-rendered forward then reverse, so the loop
// is seamless). The poster shows first; the video is fetched afterwards and
// only plays when the visitor has not asked for reduced motion. A pause
// control is always available (WCAG 2.2.2).
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEnabled(true);
    }
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
        sizes="(min-width: 768px) 85vw, 120vw"
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
          className="absolute inset-0 size-full origin-[45%_40%] translate-x-[7%] scale-120 object-cover object-[16%_30%]"
        >
          <source src="/media/hero-boomerang.mp4" type="video/mp4" />
        </video>
      )}
      <button
        type="button"
        onClick={toggle}
        className="absolute right-4 bottom-3 z-10 p-1 font-sans text-[0.65rem] font-medium tracking-[0.18em] text-offwhite uppercase underline-offset-4 [text-shadow:0_1px_8px_rgb(39_37_34/0.8)] hover:underline focus-visible:outline-offwhite"
      >
        {playing ? "Pause" : "Play"}
        <span className="sr-only"> video</span>
      </button>
    </>
  );
}
