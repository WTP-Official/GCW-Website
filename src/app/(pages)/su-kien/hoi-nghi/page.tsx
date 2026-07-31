import type { Metadata } from "next";
import { Presentation } from "lucide-react";
import content from "./content.json";
import items from "@/app/_data/su-kien-hoi-nghi.json";
import { SplitImageList } from "@/components/SplitImageList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function ConferencesPage() {
  return (
    <SplitImageList
      icon={Presentation}
      content={{ ...content, items }}
      backHref="/su-kien"
      backLabel="Quay lại Sự kiện"
    />
  );
}
