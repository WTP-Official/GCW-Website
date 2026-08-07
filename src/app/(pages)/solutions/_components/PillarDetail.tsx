import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Program = {
  name: string;
  description: string;
  href: string;
  image: string;
};

type Content = {
  title: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  stat: { value: string; label: string };
  programs: Program[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function PillarDetail({ content }: { content: Content }) {
  const { eyebrow, heading, intro, stat, programs, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Vì sao chọn GCW
          </Link>
          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-white/60">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-2xl font-serif-hero text-4xl leading-snug sm:text-5xl">
            {heading}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">{intro}</p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="font-serif-hero text-4xl font-light text-ink sm:text-5xl">
            {stat.value}
          </p>
          <p className="mt-3 max-w-md text-sm text-ink-soft">{stat.label}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            Chương trình liên quan
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {programs.map((program) => (
              <Link
                key={program.name}
                href={program.href}
                className="group flex flex-col overflow-hidden rounded-md bg-bg-dark text-white transition-shadow hover:shadow-md sm:flex-row"
              >
                <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden sm:w-48">
                  <Image
                    src={program.image}
                    alt={program.name}
                    fill
                    sizes="(min-width: 640px) 192px, 100vw"
                    className="photo-grade object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6">
                  <span className="flex items-center gap-1 text-lg text-white group-hover:text-brand-200">
                    {program.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="mt-2 text-sm text-white/70">{program.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bg-muted">
        <div className="mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="text-2xl leading-snug text-ink sm:text-3xl">{cta.heading}</h2>
          <p className="mt-4 text-ink-soft">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
