import type { Metadata } from "next";
import { Video } from "lucide-react";
import content from "./content.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function VideosPage() {
  return (
    <FeaturedAccordionList
      icon={<Video className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={content}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
