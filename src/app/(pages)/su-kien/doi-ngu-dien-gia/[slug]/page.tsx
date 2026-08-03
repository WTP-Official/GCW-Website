import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Mic } from "lucide-react";
import content from "../content.json";
import { ItemDetail } from "@/components/ItemDetail";

type Speaker = {
  id: string;
  name: string;
  role: string;
  bio: string;
  topics: string[];
  image?: string;
  body?: string;
};

const speakerList = content.speakers as Speaker[];

export function generateStaticParams() {
  return speakerList.map((speaker) => ({ slug: speaker.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = speakerList.find((s) => s.id === slug);
  if (!speaker) return {};
  return { title: speaker.name, description: speaker.bio };
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const speaker = speakerList.find((s) => s.id === slug);
  if (!speaker) notFound();

  return (
    <ItemDetail
      icon={Mic}
      eyebrow={speaker.role}
      heading={speaker.name}
      image={speaker.image}
      body={speaker.body || speaker.bio}
      tags={speaker.topics}
      backHref="/su-kien/doi-ngu-dien-gia"
      backLabel="Quay lại danh sách"
      cta={content.cta}
    />
  );
}
