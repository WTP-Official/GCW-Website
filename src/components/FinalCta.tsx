import Link from "next/link";
import content from "../app/content.json";

export function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="bg-brand-700">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-3xl">{finalCta.heading}</h2>
        <p className="mt-4 text-brand-50/90">{finalCta.body}</p>
        <Link
          href={finalCta.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
        >
          {finalCta.cta.label}
        </Link>
      </div>
    </section>
  );
}
