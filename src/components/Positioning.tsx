import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import content from "../app/content.json";

export function Positioning() {
  const { positioning } = content;

  return (
    <section className="overflow-hidden py-32 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-5 lg:items-center lg:gap-8">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-md shadow-lg lg:col-span-3 lg:aspect-auto lg:h-104 lg:-ml-4">
          <Image
            src={positioning.image}
            alt={positioning.heading}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="photo-grade object-cover"
          />
        </div>
        <div className="lg:col-span-2">
          <h2 className="font-serif-hero text-3xl leading-snug text-ink sm:text-4xl">
            {positioning.heading}
          </h2>
          <p className="mt-5 text-ink-soft">{positioning.body}</p>
          <Link
            href={positioning.linkHref}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-brand-600"
          >
            {positioning.linkLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
