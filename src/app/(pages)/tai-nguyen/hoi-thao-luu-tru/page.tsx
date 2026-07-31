import type { Metadata } from "next";
import { PlayCircle } from "lucide-react";
import content from "./content.json";
import { FeaturedAccordionList } from "@/components/FeaturedAccordionList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function OnDemandWebcastsPage() {
  return (
    <FeaturedAccordionList
      icon={<PlayCircle className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={content}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
    />
  );
}
