import Link from "next/link";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

export function FinalCta() {
  const { finalCta } = content;

  return (
    <section className="border-t border-black/10">
      <Reveal>
        <div className="mx-auto grid max-w-6xl gap-8 border-b border-black/10 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {finalCta.heading}
          </h2>
          <div className="lg:border-l lg:border-black/10 lg:pl-16">
            <p className="text-ink-soft">{finalCta.body}</p>
            <Link
              href={finalCta.cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            >
              {finalCta.cta.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
