"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type StripIngredient = {
  name: string;
  // Short tagline split over two lines.
  tagline: [string, string];
  where: string;
  // Two or three sentences shown in the pop-up.
  description: string;
  // Optional while a photo is still to come; a marked placeholder shows.
  image?: string;
  alt: string;
};

// An open grid of ingredients with no cards or lines and generous gaps. Each
// cell pairs a text block with a photo, and the order flips from one cell to
// the next so text and photos alternate. The last cell is a text-only link to
// the full ingredient lists. 3 columns on laptops and up, 2 on tablets, and on
// phones a single column where each ingredient is a row with its text beside
// its photo.
//
// Each ingredient has a description. On tablets and up it is a small card
// beside the ingredient: it opens on hover with a mouse, on keyboard focus, or
// on tap, and closes on mouse-out, when focus leaves, on a second tap, or with
// Escape. On phones, tapping anywhere on the ingredient opens it as a bottom
// sheet instead: a native modal dialog, so focus is trapped, Escape closes it,
// and so does the close button or a tap outside.
const cellTitle =
  "font-sans text-[clamp(1.1rem,1.7vw,1.45rem)] leading-[1.05] font-bold tracking-[-0.02em] uppercase";
const cellTagline =
  "mt-1.5 font-caslon text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.15] tracking-[-0.02em] italic";
const linkButton = "btn btn-outline min-h-11 px-6 text-[0.72rem] hover:bg-greige";
const isPhone = () => window.matchMedia("(max-width: 767px)").matches;

export function IngredientStrip({
  items,
  linkTitle = "The full lists",
  links,
  columns = 3,
  centred = false,
  note,
}: {
  items: StripIngredient[];
  linkTitle?: string;
  // Where the last cell sends people for the complete ingredient lists.
  links: { href: string; label: string }[];
  // Columns on laptops and up. Two keeps the grid to two columns throughout.
  columns?: 2 | 3 | 5;
  // Centred rows: `columns` per row on laptops (two per row on tablets), any
  // shorter last row centred, and the full-list link moved under the grid.
  centred?: boolean;
  // An optional text-only cell after the ingredients.
  note?: { title: string; tagline: [string, string]; body: string };
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [sheet, setSheet] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const sheetItem = sheet === null ? null : items[sheet];

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (sheet !== null && !el.open) el.showModal();
    if (sheet === null && el.open) el.close();
  }, [sheet]);

  // In a two-column grid the link gets a cell only when that completes the
  // last row; otherwise it sits under the grid.
  const cells = items.length + (note ? 1 : 0);
  // Narrow cells (five across) get smaller names that may wrap.
  const five = centred && columns === 5;
  const linkInGrid = !centred && (columns === 3 || (columns === 2 && cells % 2 === 1));
  // Cell widths for the centred layout, which wraps and centres rows.
  const fiveCell = centred
    ? `md:w-[calc(50%-var(--gx)/2)] ${
        columns === 5
          ? "lg:w-[calc(20%-var(--gx)*4/5)]"
          : columns === 3
            ? "lg:w-[calc(33.333%-var(--gx)*2/3)]"
            : ""
      }`
    : "";
  const linkButtons = (
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) =>
            // A plain anchor for a link within the page, so the browser reports
            // the hash change and the accordion row can open.
            link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className={linkButton}>
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={linkButton}>
                {link.label}
              </Link>
            )
          )}
        </div>
  );
  const linkCell = (
    <>
        <div>
          <h3 className={cellTitle}>
            {linkTitle}
          </h3>
          <p className={cellTagline}>
            every ingredient,
            <br />
            plainly listed
          </p>
        </div>
      {linkButtons}
    </>
  );

  return (
    <>
    <ul
      className={`container-site gap-y-12 md:gap-y-20 ${
        centred
          ? `grid md:flex md:flex-wrap md:justify-center md:gap-x-(--gx) ${
              five ? "[--gx:clamp(1rem,2.5vw,2.5rem)]" : "[--gx:clamp(2rem,6vw,6rem)]"
            }`
          : columns === 2
            ? "grid max-w-[58rem]! gap-x-[clamp(2rem,8vw,8rem)] md:grid-cols-2"
            : "grid gap-x-[clamp(2rem,6vw,6rem)] md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {items.map((item, i) => {
        const isOpen = open === i;
        // Text and photos alternate like a checkerboard in two columns.
        const textFirst = (columns === 2 ? Math.floor(i / 2) + i : i) % 2 === 0;
        const cardId = `ingredient-card-${i}`;
        return (
          <li
            key={item.name}
            onPointerEnter={(e) => e.pointerType === "mouse" && !isPhone() && setOpen(i)}
            onClick={(e) => {
              if (isPhone()) {
                setSheet(i);
                return;
              }
              // A mouse already opens the card by hovering; taps and the keyboard toggle it.
              const pointer = (e.nativeEvent as PointerEvent).pointerType;
              if (pointer !== "mouse") setOpen(isOpen ? null : i);
            }}
            onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOpen((o) => (o === i ? null : o));
            }}
            onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
            className={`relative flex items-center gap-6 max-md:cursor-pointer ${five ? "md:gap-6" : "md:gap-10"} ${fiveCell} ${
              textFirst ? "flex-row md:flex-col" : "flex-row-reverse md:flex-col-reverse"
            }`}
          >
            {/* Only the text animates in. A transform or fade on the photo
                would stop it blending into the page while it runs. */}
            <div className="w-1/2 text-center md:w-auto" data-reveal>
              <h3
                className={`font-sans leading-[1.05] font-bold tracking-[-0.02em] uppercase ${
                  five
                    ? "text-[clamp(1rem,1.25vw,1.2rem)]"
                    : "text-[clamp(1.1rem,1.7vw,1.45rem)] md:whitespace-nowrap"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen || sheet === i}
                  aria-controls={cardId}
                  aria-haspopup="dialog"
                  onFocus={(e) =>
                    e.currentTarget.matches(":focus-visible") && !isPhone() && setOpen(i)
                  }
                  className="cursor-help uppercase"
                >
                  {item.name}
                </button>
              </h3>
              <p className="mt-1.5 font-caslon text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.15] tracking-[-0.02em] italic">
                {item.tagline[0]}
                <br />
                {item.tagline[1]}
              </p>
              <p className="mt-3 text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
                {item.where}
              </p>
            </div>
            {/* The photos are not true cut-outs. The copies in ingredients/clean
                have their pale backdrop levelled to pure white, which multiply
                then drops out against the page; the mask feathers the frame
                edge. The photo is scaled past its box so the ingredient reads
                larger without the grid cell growing. */}
            <div className="relative aspect-4/3 w-1/2 md:w-full">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 34vw, (min-width: 768px) 50vw, 60vw"
                  className="pointer-events-none scale-125 object-cover mix-blend-multiply [mask-image:radial-gradient(closest-side,#000_78%,transparent_100%)]"
                />
              ) : (
                <div className="grid size-full place-items-center border border-dashed border-gold-light text-center text-[0.68rem] font-medium tracking-[0.2em] text-muted uppercase">
                  Photo to come
                </div>
              )}
            </div>

            {/* Description card. It sits over the photo half of the cell, so
                the name and tagline stay readable beside it. */}
            <div
              id={cardId}
              role="region"
              aria-label={`About ${item.name}`}
              className={`absolute z-10 border ${five ? "inset-x-0 lg:-inset-x-6" : "inset-x-0"} border-gold-light bg-offwhite p-5 text-left shadow-[0_12px_40px_rgb(39_37_34/0.14)] transition-[opacity,visibility] duration-300 max-md:hidden ${
                textFirst ? "md:top-auto md:bottom-0" : "md:top-0"
              } ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}
            >
              <p className="font-caslon text-[1.15rem] tracking-[-0.02em] italic">{item.name}</p>
              <p className="mt-2 text-[0.9rem] text-muted">{item.description}</p>
              <p className="mt-3 text-[0.68rem] font-medium tracking-[0.2em] text-label uppercase">
                {item.where}
              </p>
            </div>
          </li>
        );
      })}
      {note && (
        <li className={`flex flex-col items-center justify-center gap-3 py-6 text-center ${fiveCell}`} data-reveal>
          <h3 className={cellTitle}>{note.title}</h3>
          <p className={cellTagline}>
            {note.tagline[0]}
            <br />
            {note.tagline[1]}
          </p>
          <p className="max-w-[22rem] text-[0.9rem] text-muted">{note.body}</p>
        </li>
      )}
      {/* The link cell takes whatever columns are left in the last row, so
          the grid always ends flush. */}
      {linkInGrid && (
        <li
          data-reveal
          className={`flex flex-col items-center justify-center gap-5 py-6 text-center ${
            columns === 2
              ? ""
              : `${cells % 2 === 0 ? "md:col-span-2" : ""} ${
                  ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"][cells % 3]
                }`
          }`}
        >
          {linkCell}
        </li>
      )}
    </ul>
    {!linkInGrid && (
      <div className="container-site mt-12 flex justify-center md:mt-16" data-reveal>{linkButtons}</div>
    )}

    {/* Phone: the description as a bottom sheet. */}
    <dialog
      ref={dialog}
      aria-labelledby="ingredient-sheet-title"
      onClose={() => setSheet(null)}
      onClick={(e) => e.target === dialog.current && setSheet(null)}
      className="sheet-dialog fixed inset-x-0 top-auto bottom-0 m-0 w-full max-w-none border-t border-gold-light bg-offwhite text-ink"
    >
      {sheetItem && (
        <div className="p-6 pb-8">
          <div className="flex items-start justify-between gap-6">
            <p id="ingredient-sheet-title" className="font-caslon text-[1.5rem] tracking-[-0.02em] italic">
              {sheetItem.name}
            </p>
            <button
              type="button"
              onClick={() => setSheet(null)}
              className="-mt-1 -mr-2 px-2 py-2 text-[0.75rem] tracking-[0.16em] uppercase"
            >
              Close
            </button>
          </div>
          <p className="mt-3 text-muted">{sheetItem.description}</p>
          <p className="mt-4 text-[0.68rem] font-medium tracking-[0.2em] text-label uppercase">
            {sheetItem.where}
          </p>
        </div>
      )}
    </dialog>
    </>
  );
}
