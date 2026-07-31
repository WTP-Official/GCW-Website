import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

type Speaker = { name: string; role: string; bio: string; topics: string[] };

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
}: {
  icon: LucideIcon;
  content: Content;
  backHref: string;
  backLabel: string;
}) {
  const { heading, intro, speakersHeading, speakers, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <Icon className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />
          <h1 className="mt-4 font-serif-hero text-3xl leading-snug sm:text-4xl">{heading}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{intro}</p>
        </div>
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
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <div key={speaker.name} className="rounded-md border border-black/5 bg-surface p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-dark text-white">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg text-ink">{speaker.name}</h3>
              <p className="text-sm font-medium text-brand-600">{speaker.role}</p>
              <p className="mt-3 text-sm text-ink-soft">{speaker.bio}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {speaker.topics.map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex rounded-none bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
