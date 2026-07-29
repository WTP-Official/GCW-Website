import type { Metadata } from "next";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{content.heading}</h1>
      <p className="mt-4 text-ink-soft">{content.body}</p>
      <a
        href={`mailto:${content.email}`}
        className="mt-8 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        Gửi email tới {content.email}
      </a>
    </main>
  );
}
