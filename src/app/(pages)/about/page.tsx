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
import { Reveal } from "@/components/Reveal";

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
        <Reveal>
          <div className="mx-auto max-w-3xl px-4 py-32 text-center sm:py-40">
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
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-32">
        <div className="grid gap-10 sm:grid-cols-3 lg:gap-12">
          {pillars.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={index * 100}>
                <div className="rounded-md border border-black/5 bg-surface p-6 transition-shadow hover:shadow-md">
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
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-20 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <div className="text-center">
                <p className="font-serif-hero text-2xl text-ink sm:text-3xl">
                  {stat.value}
                  {stat.value === "70%" && (
                    <sup className="ml-0.5 text-base text-ink/60">*</sup>
                  )}
                </p>
                <p className="mt-2 text-sm text-ink-soft">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="ecosystem" className="scroll-mt-24 border-t border-black/5 bg-white py-32">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
                {ecosystem.heading.split(", ")[0]},{" "}
                <em className="italic text-brand-600">
                  {ecosystem.heading.split(", ")[1]}
                </em>
              </h2>
              <p className="mt-4 text-ink-soft">{ecosystem.body}</p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {ecosystem.members.map((member, index) => {
              const Icon = ICONS[member.icon];
              return (
                <Reveal key={member.name} delay={(index % 3) * 100}>
                  <div className="rounded-md bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                    <h3 className="mt-4 text-base text-ink">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft">
                      {member.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="differentiators" className="mx-auto max-w-6xl scroll-mt-24 border-t border-black/5 px-4 py-32">
        <Reveal>
          <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
            {differentiators.heading}
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {differentiators.items.map((item, index) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal key={item.title} delay={(index % 4) * 90}>
                <div className="rounded-md border border-black/5 p-6 transition-shadow hover:shadow-md">
                  <Icon className="h-6 w-6 text-ink-soft" aria-hidden="true" />
                  <h3 className="mt-4 text-lg text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-bg-dark text-white">
        <Reveal>
          <div className="mx-auto max-w-2xl px-4 py-32 text-center sm:py-40">
            <h2 className="font-serif-hero text-2xl leading-snug sm:text-3xl">{cta.heading}</h2>
            <p className="mt-4 text-white/70">{cta.body}</p>
            <Link
              href={cta.href}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-md"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
