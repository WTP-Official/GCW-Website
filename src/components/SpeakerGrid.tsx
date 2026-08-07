import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Speaker = {
  id: string;
  name: string;
  role: string;
  bio: string;
  topics: string[];
  image?: string;
};

type Content = {
  heading: string;
  intro: string;
  speakersHeading: string;
  speakers: Speaker[];
  cta: { heading: string; body: string; label: string; href: string };
};

export function SpeakerGrid({
  icon: Icon,
  content,
  backHref,
  backLabel,
  basePath,
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
  basePath: string;
}) {
  const { heading, intro, speakersHeading, speakers, cta } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h1 className="max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">{heading}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">{intro}</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>

        <h2 className="mt-8 text-2xl leading-snug text-ink sm:text-3xl">{speakersHeading}</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {speakers.map((speaker, index) => (
            <Reveal key={speaker.id} delay={(index % 2) * 100}>
              <Link
                href={`${basePath}/${speaker.id}`}
                className="group block rounded-md bg-bg-dark p-8 text-white transition-shadow hover:shadow-md"
              >
                {speaker.image ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full">
                    <Image src={speaker.image} alt={speaker.name} fill sizes="80px" className="object-cover" />
                  </div>
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                )}
                <h3 className="mt-5 font-serif-hero text-2xl leading-snug">{speaker.name}</h3>
                <p className="text-sm font-medium text-white/60">{speaker.role}</p>
                <p className="mt-4 text-sm text-white/70">{speaker.bio}</p>
                <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors group-hover:bg-brand-700">
                  Tìm hiểu thêm
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-bg-muted">
        <Reveal>
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
        </Reveal>
      </section>
    </main>
  );
}
