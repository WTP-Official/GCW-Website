import type { Metadata } from "next";
import { Mic2 } from "lucide-react";
import content from "./content.json";
import { FeaturedSeriesGrid } from "@/components/FeaturedSeriesGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function PodcastPage() {
  return (
    <FeaturedSeriesGrid
      icon={Mic2}
      content={content}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
