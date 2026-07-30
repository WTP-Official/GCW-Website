import type { Metadata } from "next";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
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
  Handshake,
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
      <section className="bg-gradient-to-b from-brand-900 via-brand-700 to-brand-600 text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
            {hero.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-50/90">
            {hero.body}
          </p>
        </div>
        <div className="relative mx-auto aspect-[21/9] w-full max-w-6xl overflow-hidden px-4 pb-16 sm:pb-20">
          <div className="relative h-full w-full overflow-hidden rounded-lg shadow-xl">
            <ImagePlaceholder
              icon={Handshake}
              className="h-full w-full"
              iconClassName="h-14 w-14"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 bg-surface p-6"
              >
                <span className="text-sm font-bold text-brand-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
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

      <section className="bg-blue-cta text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-2 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">
              {ecosystem.heading}
            </h2>
            <p className="mt-4 text-ink-soft">{ecosystem.body}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.members.map((member) => {
              const Icon = ICONS[member.icon];
              return (
                <div
                  key={member.name}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-ink">
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

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">
          {differentiators.heading}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
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

      <section className="bg-brand-700">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{cta.heading}</h2>
          <p className="mt-4 text-brand-50/90">{cta.body}</p>
          <Link
            href={cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-50"
          >
            {cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
