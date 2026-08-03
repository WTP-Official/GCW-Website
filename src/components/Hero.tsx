import Link from "next/link";
import { ArrowRight } from "lucide-react";
import content from "../app/content.json";

export function Hero() {
  const { hero } = content;
  const [headingLead, headingEmphasis] = hero.heading.split(", ");

  return (
    <section className="bg-bg-dark text-white">
      <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:py-40">
        <p className="text-sm font-medium uppercase tracking-widest text-white/50">
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 font-serif-hero text-4xl leading-snug sm:text-5xl">
          {headingEmphasis ? (
            <>
              {headingLead}, <em className="italic text-brand-300">{headingEmphasis}</em>
            </>
          ) : (
            hero.heading
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          {hero.subheading}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
          >
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
