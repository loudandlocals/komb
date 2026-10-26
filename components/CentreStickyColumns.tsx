"use client";

import { useEffect } from "react";

// Product page top panel, large screens: the details and photo share one
// sticky wrapper (top-aligned) so they stay in view together while the
// purchase column grows. Top-aligned would put them above the purchase column
// on first load, so this gives the wrapper a top margin that centres it
// against the panel as first rendered. The margins are set once per layout and are not recalculated when
// an accordion opens, so nothing jumps while the visitor is using it.
export function CentreStickyColumns({ gridId }: { gridId: string }) {
  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const columns = Array.from(grid.children) as HTMLElement[];
    // The first child is the sticky wrapper holding the details and photo.
    const sticky = columns.slice(0, 1);
    const wide = window.matchMedia("(min-width: 1024px)");

    const reset = () =>
      sticky.forEach((el) => {
        el.style.marginTop = "";
        el.style.top = "";
      });

    const centre = () => {
      // Measure against the panel as it is at rest, with nothing expanded.
      if (grid.querySelector("details[open]")) return;
      reset();
      if (!wide.matches) return;
      const rowHeight = Math.max(...columns.map((el) => el.offsetHeight));
      sticky.forEach((el) => {
        el.style.marginTop = `${Math.max(0, (rowHeight - el.offsetHeight) / 2)}px`;
      });
      // Stick each column where it already sits on screen, so it simply stays
      // put once scrolling starts, kept fully below the header and on screen.
      if (window.scrollY > 0) return;
      const header = document.getElementById("site-header")?.offsetHeight ?? 0;
      // Read each column's natural position, without the stylesheet's
      // sticky offset nudging it.
      sticky.forEach((el) => (el.style.top = "auto"));
      sticky.forEach((el) => {
        const rest = el.getBoundingClientRect().top;
        const lowest = window.innerHeight - el.offsetHeight - 16;
        el.style.top = `${Math.max(header + 8, Math.min(rest, lowest))}px`;
      });
    };

    centre();
    wide.addEventListener("change", centre);
    window.addEventListener("resize", centre);
    return () => {
      wide.removeEventListener("change", centre);
      window.removeEventListener("resize", centre);
      reset();
    };
  }, [gridId]);

  return null;
}
