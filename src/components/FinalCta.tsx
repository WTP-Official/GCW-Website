import Link from "next/link";
import content from "../app/content.json";

export function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="bg-bg-muted">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{finalCta.heading}</h2>
        <p className="mt-4 text-ink-soft">{finalCta.body}</p>
        <Link
          href={finalCta.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          {finalCta.cta.label}
        </Link>
      </div>
    </section>
  );
}
