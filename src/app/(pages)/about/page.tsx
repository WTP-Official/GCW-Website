import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Building2,
  Compass,
  Calculator,
  GraduationCap,
  Landmark,
  Cpu,
  Network,
  Globe2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Users,
  Building2,
  Compass,
  Calculator,
  GraduationCap,
  Landmark,
  Cpu,
  Network,
  Globe2,
};

export default function AboutPage() {
  const { hero, pillars, stats, ecosystem, differentiators, cta } = content;

  return (
    <main>
      <section className="bg-bg-dark text-white">
        <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
          <p className="text-sm font-medium uppercase tracking-widest text-white/50">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-serif-hero text-3xl leading-snug sm:text-4xl">
            {hero.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
            {hero.body}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-md border border-black/5 bg-surface p-6"
              >
                <span className="text-sm font-medium text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Icon className="mt-3 h-6 w-6 text-ink-soft" aria-hidden="true" />
                <h3 className="mt-4 text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-bg-muted">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl text-ink sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="scroll-mt-24 bg-surface-2 py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
              {ecosystem.heading}
            </h2>
            <p className="mt-4 text-ink-soft">{ecosystem.body}</p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.members.map((member) => {
              const Icon = ICONS[member.icon];
              return (
                <div
                  key={member.name}
                  className="rounded-md bg-white p-6 shadow-sm"
                >
                  <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                  <h3 className="mt-4 text-base text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    {member.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="differentiators" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24">
        <h2 className="text-2xl leading-snug text-ink sm:text-3xl">
          {differentiators.heading}
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-md border border-black/5 p-6"
              >
                <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                <h3 className="mt-4 text-lg text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {item.description}
                </p>
              </div>
            );
          })}
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
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
