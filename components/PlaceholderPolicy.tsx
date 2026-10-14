import Link from "next/link";
import { SITE } from "@/lib/site";

// Shared layout for policy pages whose text the client has not sent yet. It
// says so plainly, gives the contact address, and is kept out of search
// results until the real text replaces it.
export function PlaceholderPolicy({
  eyebrow,
  title,
  topics,
}: {
  eyebrow: string;
  title: React.ReactNode;
  topics: string[];
}) {
  return (
    <div className="container-site max-w-2xl! pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-10 grid gap-4">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>
      <div className="grid gap-8">
        <p role="status" className="on-greige border border-ink/20 bg-greige px-5 py-4 text-[0.95rem]">
          <strong className="font-medium">Coming soon.</strong> We are finalising this
          page and will publish it before we open for orders.
        </p>
        <div className="grid gap-3">
          <p>It will cover:</p>
          <ul className="grid gap-1.5 text-muted">
            {topics.map((topic) => (
              <li
                key={topic}
                className="relative pl-6 before:absolute before:top-[0.8em] before:left-0 before:h-px before:w-3 before:bg-gold"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <p>
          Questions in the meantime? Email us at{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4 hover:text-label">
            {SITE.email}
          </a>
          .
        </p>
        <p>
          <Link href="/shop" className="btn btn-outline hover:bg-greige">
            Back to the shop
          </Link>
        </p>
      </div>
    </div>
  );
}
