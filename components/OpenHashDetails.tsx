"use client";

import { useEffect } from "react";

// Opens the accordion row a link points at. A link ending in #full-ingredients
// should land on the open list, not on a closed row.
export function OpenHashDetails() {
  useEffect(() => {
    const open = () => {
      const id = window.location.hash.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (el instanceof HTMLDetailsElement) {
        el.open = true;
        el.scrollIntoView({ block: "center" });
      }
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
