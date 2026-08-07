import Link from "next/link";
import { ChevronRight } from "lucide-react";
import content from "../app/content.json";
import { Reveal } from "@/components/Reveal";

const LINKS = ["/solutions", "/solutions", "/solutions"];

export function ValueProps() {
  return (
    <section className="border-b border-black/5 py-20">
      <div className="mx-auto max-w-6xl px-4">
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
      </div>
    </section>
  );
}
