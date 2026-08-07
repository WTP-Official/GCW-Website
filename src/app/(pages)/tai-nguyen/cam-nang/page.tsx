import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import content from "./content.json";
import { FeaturedAccordionList, type ToolCard } from "@/components/FeaturedAccordionList";
import { groupByCategory } from "@/lib/groupByCategory";
import { GrossNetCalculatorButton } from "./_components/GrossNetCalculatorButton";
import { SelfAssessmentButton } from "./_components/SelfAssessmentButton";

export const metadata: Metadata = {
  title: content.title,
  description: content.metaDescription,
};

const PILLARS = ["Phát triển lãnh đạo", "Xây dựng văn hoá tin cậy", "Tạo kết quả đột phá"];

type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  image?: string;
  fileUrl?: string;
};

type ToolAssessment = {
  questions: { id: string; text: string }[];
  resultTiers: { minScore: number; maxScore: number; label: string; description: string }[];
};

function renderToolAction(tool: ToolCard & { assessment?: ToolAssessment }) {
  if (tool.id === "tool-02") {
    return <GrossNetCalculatorButton label={tool.ctaLabel} />;
  }
  if (tool.assessment) {
    return (
      <SelfAssessmentButton
        ctaLabel={tool.ctaLabel}
        title={tool.title}
        questions={tool.assessment.questions}
        resultTiers={tool.assessment.resultTiers}
      />
    );
  }
  return undefined;
}

export default function GuidesPage() {
  const items = (content.items as Item[]).map((item) => ({
    ...item,
    actionLabel: item.fileUrl ? "Tải checklist" : undefined,
    actionHref: item.fileUrl,
  }));
  const categories = groupByCategory(items, PILLARS);

  return (
    <FeaturedAccordionList
      icon={<ClipboardList className="mx-auto h-8 w-8 text-white/60" aria-hidden="true" />}
      content={{ ...content, categories }}
      backHref="/tai-nguyen"
      backLabel="Quay lại Tài nguyên"
      renderToolAction={renderToolAction}
    />
  );
}
