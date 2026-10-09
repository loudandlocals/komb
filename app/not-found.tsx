import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site grid max-w-3xl! justify-items-center gap-5 py-section text-center">
      <p className="eyebrow">Page not found</p>
      <h1>We couldn&rsquo;t find that page.</h1>
      <p className="text-muted">It may have moved, or the link may be out of date.</p>
      <Link href="/shop" className="btn btn-primary">
        Shop the routine
      </Link>
    </div>
  );
}
