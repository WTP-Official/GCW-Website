import type { Metadata } from "next";
import { Presentation } from "lucide-react";
import content from "./content.json";
import { SplitImageList } from "@/components/SplitImageList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function ConferencesPage() {
  return (
    <SplitImageList
      icon={Presentation}
      content={content}
      backHref="/su-kien"
      backLabel="Quay lại Sự kiện"
    />
  );
}
