import type { Metadata } from "next";
import { Radio } from "lucide-react";
import content from "./content.json";
import { SplitImageList } from "@/components/SplitImageList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function WebcastsPage() {
  return (
    <SplitImageList
      icon={Radio}
      content={content}
      backHref="/su-kien"
      backLabel="Quay lại Sự kiện"
    />
  );
}
