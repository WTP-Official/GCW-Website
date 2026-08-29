import Link from "next/link";
import { ChevronRight } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

const LINKS = ["/solutions", "/solutions", "/solutions"];

export function ValueProps() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1320px] px-4">
        <Reveal>
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            Là đối tác phát triển lãnh đạo và hiệu suất tổ chức, GCW giúp bạn:
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-3">
          {content.valueProps.map((item, index) => (
            <Reveal key={item.title} delay={index * 100}>
              <Link href={LINKS[index] ?? "/solutions"} className="group block">
                <span className="flex items-center justify-between text-lg font-semibold text-ink">
                  {item.title}
                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-3 block h-[3px] w-full bg-brand-600" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid gap-[35px] sm:grid-cols-2 lg:grid-cols-4">
          {content.featuredResources.map((resource, index) => (
            <Reveal key={resource.title} delay={index * 75}>
              <div
                className={
                  resource.dark
                    ? "flex h-full min-h-[420px] flex-col justify-between rounded-lg bg-bg-dark p-8 text-white"
                    : "flex h-full min-h-[420px] flex-col justify-between rounded-lg bg-bg-muted p-8 text-ink"
                }
              >
                <div>
                  <p className={resource.dark ? "text-xs font-medium text-white/60" : "text-xs font-medium text-ink-soft"}>
                    {resource.eyebrow}
                  </p>
                  <p className="mt-4 font-serif-hero text-2xl leading-snug">{resource.title}</p>
                  <p className={resource.dark ? "mt-6 text-sm text-white/70" : "mt-6 text-sm text-ink-soft"}>
                    {resource.description}
                  </p>
                </div>
                <Link
                  href={resource.href}
                  className="mt-8 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  {resource.ctaLabel}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <span className="mt-14 block h-px w-full bg-black" aria-hidden="true" />
      </div>
    </section>
  );
}
