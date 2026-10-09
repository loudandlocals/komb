import Link from "next/link";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types";
import { BuyNowButton } from "./BuyButtons";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product }: { product: Product }) {
  const href = `/products/${product.handle}`;
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden
        className="on-greige grid aspect-4/5 place-items-center overflow-hidden rounded-xs bg-greige"
      >
        <ProductArt
          kind={product.kind}
          imageUrl={product.imageUrl}
          alt=""
          className="w-[70%] transition-transform duration-500 group-hover:-translate-y-1"
        />
      </Link>
      <div className="grid flex-1 content-start gap-1.5">
        {product.step && <p className="eyebrow">{product.step}</p>}
        <h3>
          <Link href={href} className="hover:text-label">
            {product.title}
          </Link>
        </h3>
        <p className="text-[0.92rem] text-muted">{product.summary}</p>
        <p className="font-normal">
          {formatMoney(product.price)}
          {product.size && <span className="font-light text-muted"> · {product.size}</span>}
        </p>
      </div>
      <BuyNowButton
        products={[product]}
        className="w-full"
        ariaLabel={`Buy now: ${product.title}`}
      />
    </article>
  );
}
