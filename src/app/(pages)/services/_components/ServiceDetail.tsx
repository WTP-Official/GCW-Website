import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ServiceDetailContent = {
  eyebrow: string;
  icon: string;
  name: string;
  tagline: string;
  intro: string;
  audience: string[];
  included: string[];
  related: { label: string; href: string; description: string };
  cta: { heading: string; body: string; label: string; href: string };
};

export function ServiceDetail({ content }: { content: ServiceDetailContent }) {
  const { eyebrow, name, tagline, intro, audience, included, related, cta } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <p className="text-sm font-semibold text-ink">{eyebrow}</p>
          <h1 className="mt-2 max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">{name}</h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-24">
        <p className="text-ink-soft">{intro}</p>

        <h2 className="mt-12 text-xl text-ink">
          Phù hợp với doanh nghiệp nào?
        </h2>
        <ul className="mt-4 space-y-2">
          {audience.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 text-xl text-ink">
          {name} bao gồm những gì?
        </h2>
        <ul className="mt-4 space-y-2">
          {included.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-md border border-black/5 bg-surface p-6">
          <p className="text-sm font-medium text-ink">
            Giải pháp liên quan
          </p>
          <p className="mt-2 text-sm text-ink-soft">{related.description}</p>
          <Link
            href={related.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {related.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
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
