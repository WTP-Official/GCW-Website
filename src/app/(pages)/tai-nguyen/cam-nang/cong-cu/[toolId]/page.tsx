import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import content from "../../content.json";
import { MissionStatementBuilder } from "../../_components/MissionStatementBuilder";
import { AssessmentPage } from "../../_components/AssessmentPage";

type Tool = {
  id: string;
  title: string;
  description: string;
  assessment?: {
    questions: { id: string; text: string }[];
    resultTiers: { minScore: number; maxScore: number; label: string; description: string }[];
  };
};

const tools = content.tools as Tool[];

export function generateStaticParams() {
  return tools.map((tool) => ({ toolId: tool.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ toolId: string }>;
}): Promise<Metadata> {
  const { toolId } = await params;
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) return {};
  return { title: tool.title, description: tool.description };
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ toolId: string }>;
}) {
  const { toolId } = await params;
  const tool = tools.find((t) => t.id === toolId);
  if (!tool) notFound();

  return (
    <main>
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="max-w-2xl font-serif-hero text-4xl leading-[1.1] text-ink sm:text-5xl">
            {tool.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">{tool.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <Link
          href="/tai-nguyen/cam-nang"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Quay lại Cẩm nang & Công cụ
        </Link>

        <div className="mt-10">
          {toolId === "tool-msb" ? (
            <MissionStatementBuilder />
          ) : tool.assessment ? (
            <AssessmentPage questions={tool.assessment.questions} resultTiers={tool.assessment.resultTiers} />
          ) : null}
        </div>
      </section>
    </main>
  );
}
