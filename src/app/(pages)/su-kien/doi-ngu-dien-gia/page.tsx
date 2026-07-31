import type { Metadata } from "next";
import { Mic } from "lucide-react";
import content from "./content.json";
import { SpeakerGrid } from "@/components/SpeakerGrid";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

export default function SpeakersBureauPage() {
  return (
    <SpeakerGrid
      icon={Mic}
      content={content}
      backHref="/su-kien"
      backLabel="Quay lại Sự kiện"
    />
  );
}
