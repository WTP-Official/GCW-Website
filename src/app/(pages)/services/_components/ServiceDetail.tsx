import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gauge,
  TrendingUp,
  UserSearch,
  Receipt,
  MessageSquareText,
};

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
  const { eyebrow, icon, name, tagline, intro, audience, included, related, cta } =
    content;
  const Icon = ICONS[icon];

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-2xl px-4 py-28 text-center sm:py-32">
          <Icon className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />
          <p className="mt-4 text-sm font-medium uppercase tracking-widest text-white/50">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif-hero text-3xl leading-snug sm:text-4xl">{name}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">{tagline}</p>
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
