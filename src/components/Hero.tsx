import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import content from "../app/content.json";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function Hero() {
  const { hero } = content;

  return (
    <section className="bg-gradient-to-b from-brand-900 via-brand-700 to-brand-600 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-50/90">
            {hero.subheading}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl lg:aspect-square">
          <ImagePlaceholder
            icon={Handshake}
            className="h-full w-full"
            iconClassName="h-20 w-20"
          />
        </div>
      </div>
    </section>
  );
}
