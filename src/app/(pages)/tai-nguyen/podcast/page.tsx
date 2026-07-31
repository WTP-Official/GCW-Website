import type { Metadata } from "next";
import { Mic2 } from "lucide-react";
import content from "./content.json";
import series from "@/app/_data/tai-nguyen-podcast-series.json";
import { FeaturedSeriesGrid } from "@/components/FeaturedSeriesGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function PodcastPage() {
  return (
    <FeaturedSeriesGrid
      icon={Mic2}
      content={{ ...content, series }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
