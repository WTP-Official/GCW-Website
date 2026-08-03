import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mic2 } from "lucide-react";
import content from "../content.json";
import { ItemDetail } from "@/components/ItemDetail";

type SeriesItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  image?: string;
  body?: string;
  episodesUrl?: string;
};

const seriesList = content.series as SeriesItem[];

export function generateStaticParams() {
  return seriesList.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = seriesList.find((i) => i.id === slug);
  if (!item) return {};
  return { title: item.title, description: item.description };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = seriesList.find((i) => i.id === slug);
  if (!item) notFound();

  return (
    <ItemDetail
      icon={Mic2}
      eyebrow={item.label}
      heading={item.title}
      image={item.image}
      body={item.body || item.description}
      primaryAction={item.episodesUrl ? { label: "Nghe podcast", href: item.episodesUrl } : undefined}
      backHref="/tai-nguyen/podcast"
      backLabel="Quay lại danh sách"
      cta={content.cta}
    />
  );
}
