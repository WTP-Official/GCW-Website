import type { Metadata } from "next";
import content from "./content.json";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold">{content.heading}</h1>
      <p className="mt-4 text-ink-soft">{content.body}</p>
    </main>
  );
}
