import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  Compass,
  Calculator,
  GraduationCap,
  Landmark,
  Cpu,
  Network,
  Globe2,
  Award,
  Newspaper,
  MessageSquareText,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import content from "./content.json";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const ICONS: Record<string, LucideIcon> = {
  Users,
  Compass,
  Calculator,
  GraduationCap,
  Landmark,
  Cpu,
  Network,
  Globe2,
  Award,
  Newspaper,
  MessageSquareText,
};

export default function AboutPage() {
  const { hero, whoWeAre, links, stats, ecosystem, differentiators, cta } = content;

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <Reveal>
          <div className="mx-auto max-w-6xl px-4 py-16">
            <p className="text-sm font-semibold text-ink">{hero.eyebrow}</p>
            <h1 className="mt-2 max-w-2xl font-serif-hero text-5xl leading-[1.1] text-ink sm:text-6xl">
              {hero.heading}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-ink-soft">
              {hero.body}
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-b border-black/10 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div>
              <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
                {whoWeAre.heading}
              </h2>
              <div className="mt-6 max-w-3xl space-y-4">
                {whoWeAre.body.split("\n\n").map((paragraph) => (
                  <p key={paragraph} className="text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {links.map((link) => {
              const Icon = ICONS[link.icon];
              return (
                <Link key={link.name} href={link.href} className="group flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1 text-base font-semibold text-brand-600 group-hover:text-brand-700">
                      {link.name}
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="mt-1 block text-sm text-ink-soft">
                      {link.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap gap-x-8 gap-y-10">
            {stats.map((stat) => (
              <Reveal key={stat.label} className="min-w-48 flex-1">
                <div>
                  <p className="font-serif-hero text-5xl font-light text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-3 max-w-56 text-sm text-ink-soft">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="scroll-mt-24 border-b border-black/10 bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div>
              <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
                {ecosystem.heading.split(", ")[0]},{" "}
                <em className="not-italic text-brand-600">
                  {ecosystem.heading.split(", ")[1]}
                </em>
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">{ecosystem.body}</p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystem.members.map((member, index) => {
              const Icon = ICONS[member.icon];
              return (
                <Reveal key={member.name} delay={(index % 3) * 100}>
                  <div className="rounded-md bg-bg-dark p-6 text-white transition-shadow hover:shadow-md">
                    <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                    <h3 className="mt-4 text-base text-white">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      {member.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="differentiators" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
        <Reveal>
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {differentiators.heading}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={(index % 4) * 90}>
                <div className="rounded-md bg-bg-dark p-6 text-white transition-shadow hover:shadow-md">
                  <Icon className="h-6 w-6 text-brand-300" aria-hidden="true" />
                  <h3 className="mt-4 text-base text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-black/10">
        <Reveal>
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:items-center lg:gap-16">
            <h2 className="font-serif-hero text-4xl leading-tight text-ink sm:text-5xl">
              {cta.heading}
            </h2>
            <div className="lg:border-l lg:border-black/10 lg:pl-16">
              <p className="text-ink-soft">{cta.body}</p>
              <Link
                href={cta.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
              >
                {cta.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
