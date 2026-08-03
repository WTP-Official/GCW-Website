import type { Metadata } from "next";
import { Users2 } from "lucide-react";
import content from "./content.json";
import { SplitImageList } from "@/components/SplitImageList";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function WorkshopsPage() {
  return (
    <SplitImageList
      icon={Users2}
      content={content}
      backHref="/su-kien"
      backLabel="Quay lại Sự kiện"
      basePath="/su-kien/workshop"
    />
  );
}
