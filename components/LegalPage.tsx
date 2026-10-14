import { SITE } from "@/lib/site";

// Shared layout for the policy pages. While `draft` is true a note says the
// text is awaiting the client's review; set it to false (or delete the prop)
// once they approve it.
export function LegalPage({
  eyebrow,
  title,
  updated,
  draft = true,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  updated: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="container-site max-w-3xl! pt-[clamp(3rem,6vw,5rem)] pb-section">
      <header className="mb-10 grid gap-4">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="text-[0.85rem] text-muted">Last updated: {updated}</p>
      </header>
      {draft && (
        <p role="note" className="on-greige mb-10 border border-ink/20 bg-greige px-5 py-4 text-[0.95rem]">
          <strong className="font-medium">Draft.</strong> This page is awaiting review by
          Komb Hair Inc. Text in [square brackets] is still to be confirmed.
        </p>
      )}
      <div className="grid gap-8 text-[0.98rem] leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-label [&_h2]:mb-3 [&_h2]:text-[clamp(1.5rem,2.4vw,1.9rem)] [&_li]:mt-1.5 [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </div>
  );
}

export function CompanyContact() {
  return (
    <address className="mt-3 not-italic">
      Komb Hair Inc.
      <br />
      PO Box 30022 RPO Ansley Grove
      <br />
      Woodbridge, ON L4L 0C7, Canada
      <br />
      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
    </address>
  );
}
