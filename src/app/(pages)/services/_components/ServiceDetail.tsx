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
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

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
      <section className="bg-gradient-to-b from-brand-900 via-brand-700 to-brand-600 text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
              {eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              {name}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-brand-50/90">{tagline}</p>
          </div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
            <ImagePlaceholder icon={Icon} className="h-full w-full" iconClassName="h-16 w-16" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-ink-soft">{intro}</p>

        <h2 className="mt-10 text-xl font-semibold text-ink">
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

        <h2 className="mt-10 text-xl font-semibold text-ink">
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

        <div className="mt-10 rounded-lg border border-black/5 bg-surface p-6">
          <p className="text-sm font-semibold text-ink">
            Giải pháp liên quan
          </p>
          <p className="mt-2 text-sm text-ink-soft">{related.description}</p>
          <Link
            href={related.href}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            {related.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="bg-brand-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{cta.heading}</h2>
          <p className="mt-4 text-brand-50/90">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
