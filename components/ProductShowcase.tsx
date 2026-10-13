import Link from "next/link";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { BuyNowButton } from "./BuyButtons";
import { ProductArt } from "./ProductArt";

// Menu-style product display. The products sit large on the page background
// in a single row, stepping up slightly from left to right. Their details
// float above them as plain text: the first product's toward the left, the
// next toward the top right corner. The text is positioned off the photo, so
// the list reserves room for it at the top. On smaller screens the products
// stack with the text beside or below each one.
export function ProductShowcase({ products }: { products: Product[] }) {
  return (
    <div className="relative">
      <ul className="grid gap-y-14 lg:grid-cols-12 lg:-mb-16 lg:gap-y-0" data-reveal>
        {products.map((product, i) => (
          <li
            key={product.handle}
            // One row. Columns overlap so the photos can be large, and each
            // earlier product sits a small step lower for a slight diagonal.
            className="lg:col-span-7 lg:col-start-(--col) lg:row-start-1 lg:mt-(--drop)"
            style={
              {
                "--col": 1 + i * 5,
                "--drop": `${(products.length - 1 - i) * 4.5}rem`,
              } as React.CSSProperties
            }
          >
            <ShowcaseItem product={product} textLeft={i % 2 === 0} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShowcaseItem({ product, textLeft }: { product: Product; textLeft: boolean }) {
  const href = `/products/${product.handle}`;

  return (
    <article className="group relative grid items-center gap-x-8 gap-y-2 md:grid-cols-2 lg:block">
      <Link
        href={href}
        aria-label={`View details: ${product.title}`}
        className="group/media relative mx-auto block aspect-square w-full max-w-md md:max-w-none"
      >
        {/* The photo backdrop is a hair off the page colour, so its edges are
            feathered to melt into the page and read as a cut-out. The mask is
            on this wrapper so the button below is not faded with it. */}
        <span className="block size-full overflow-hidden [mask-image:radial-gradient(closest-side,#000_72%,transparent_100%)]">
          <ProductArt
            kind={product.kind}
            imageUrl={product.imageUrl}
            alt=""
            sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
          />
        </span>
        <span aria-hidden className="btn media-cta bottom-[6%]">
          View details
        </span>
      </Link>

      <div
        className={`relative z-1 w-fit pl-5 ${
          textLeft
            ? "lg:absolute lg:bottom-[77%] lg:left-[5%]"
            : "lg:absolute lg:right-0 lg:bottom-[77%] lg:pl-0 lg:text-right"
        }`}
      >
        <h3 className="font-sans text-[0.95rem] font-medium tracking-[0.16em] uppercase">
          <Link href={href} className="hover:text-label">
            {product.title}
          </Link>
        </h3>
        <p className="mt-2 font-caslon text-[0.9rem] leading-snug whitespace-nowrap text-muted italic">
          {product.oneLine ?? product.summary}
        </p>
        <p className="mt-3 font-caslon text-[0.95rem]">{formatMoney(product.price)}</p>
        <BuyNowButton
          products={[product]}
          className="mt-3 min-h-10! px-6! text-[0.72rem]!"
          ariaLabel={`Buy now: ${product.title}`}
        />
      </div>
    </article>
  );
}
