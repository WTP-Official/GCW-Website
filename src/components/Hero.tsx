import Link from "next/link";
import Image from "next/image";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  const { hero } = content;

  return (
    <section className="relative overflow-hidden text-white">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="photo-grade object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/70 to-ink/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-white/60">
              {hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 font-serif-hero text-5xl leading-[1.1] sm:text-6xl lg:text-7xl">
              <span className="block">{hero.headingLine1}</span>
              <span
                className="my-3 block h-px max-w-md bg-white/30 sm:my-4"
                aria-hidden="true"
              />
              <span className="block">
                <em className="italic text-white">{hero.headingEmphasis}</em>
                {hero.headingLine2Suffix}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-8 max-w-lg text-lg text-white/80">
              {hero.subheading}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-ink"
              >
                {hero.primaryCta.label}
              </Link>
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
