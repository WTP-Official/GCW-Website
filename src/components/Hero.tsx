import Link from "next/link";
import { ArrowRight } from "lucide-react";
import content from "../app/content.json";

export function Hero() {
  const { hero } = content;

  return (
    <section className="bg-bg-dark text-white">
      <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
        <p className="text-sm font-medium uppercase tracking-widest text-white/50">
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 font-serif-hero text-4xl leading-snug sm:text-5xl">
          {hero.heading}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          {hero.subheading}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href={hero.primaryCta.href}
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {hero.primaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="inline-flex items-center gap-2 rounded-md border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
