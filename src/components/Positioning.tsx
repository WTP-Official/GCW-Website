import Link from "next/link";
import { ArrowRight } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

export function Positioning() {
  const { positioning } = content;

  return (
    <>
      <section className="py-10 sm:py-12">
        <div className="mx-auto grid max-w-6xl gap-x-16 gap-y-8 px-4 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
              {positioning.heading}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <p className="text-ink-soft">{positioning.body}</p>
              <Link
                href={positioning.linkHref}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-brand-600"
              >
                {positioning.linkLabel}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="mx-auto max-w-[1320px] px-4">
        <span className="block h-px w-full bg-black" aria-hidden="true" />
      </div>
    </>
  );
}
