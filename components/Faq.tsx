import type { FaqItem } from "@/lib/faq";
import { JsonLd } from "./JsonLd";

// Shared FAQ section: heading on the left, accordion on the right. Uses the
// same accordion styling and easing as the product page details.
export function Faq({
  id,
  eyebrow = "Questions",
  title,
  items,
}: {
  id: string;
  eyebrow?: string;
  title: React.ReactNode;
  items: FaqItem[];
}) {
  const answered = items.filter((item) => !item.placeholder);

  return (
    <section aria-labelledby={id} className="container-site py-section">
      <div className="grid gap-x-[clamp(2rem,6vw,6rem)] gap-y-10 lg:grid-cols-[2fr_3fr]">
        <header className="grid content-start gap-4" data-reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id}>{title}</h2>
        </header>
        <div
          className="accordion border-t border-line [&_details]:border-b [&_details]:border-line [&_details>p]:max-w-2xl [&_details>p]:pb-5 [&_details>p]:text-[0.95rem] [&_details>p]:text-muted [&_summary]:gap-6 [&_summary]:text-left"
          data-reveal="stagger"
        >
          {items.map((item) => (
            <details key={item.question}>
              <summary>
                <h3 className="font-sans text-[0.78rem] font-medium tracking-[0.14em] uppercase">
                  {item.question}
                </h3>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {answered.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: answered.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          }}
        />
      )}
    </section>
  );
}
