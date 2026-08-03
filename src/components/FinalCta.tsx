import Link from "next/link";
import content from "../app/content.json";

export function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="bg-bg-dark text-white">
      <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:py-40">
        <h2 className="font-serif-hero text-3xl leading-snug sm:text-4xl">{finalCta.heading}</h2>
        <p className="mt-4 text-white/70">{finalCta.body}</p>
        <Link
          href={finalCta.cta.href}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
        >
          {finalCta.cta.label}
        </Link>
      </div>
    </section>
  );
}
