"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

type Question = { id: string; text: string };
type ResultTier = { minScore: number; maxScore: number; label: string; description: string };

export function AssessmentPage({
  questions,
  resultTiers,
}: {
  questions: Question[];
  resultTiers: ResultTier[];
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function answer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStep((s) => s + 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  const isDone = step >= questions.length;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const tier =
    resultTiers.find((t) => score >= t.minScore && score <= t.maxScore) ??
    resultTiers[resultTiers.length - 1];

  return (
    <div className="mx-auto max-w-xl rounded-md border border-black/10 bg-white p-6 sm:p-10">
      {!isDone ? (
        <>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-brand-600 transition-all"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-medium text-ink-soft">
            Câu hỏi {step + 1}/{questions.length}
          </p>
          <p className="mt-4 text-lg text-ink">{questions[step].text}</p>
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => answer(questions[step].id, 1)}
              className="flex-1 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Có
            </button>
            <button
              type="button"
              onClick={() => answer(questions[step].id, 0)}
              className="flex-1 rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
            >
              Chưa
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-sm text-ink-soft">
            Kết quả: {score}/{questions.length} điểm
          </p>
          <p className="mt-3 font-serif-hero text-2xl leading-snug text-brand-600">{tier.label}</p>
          <p className="mt-3 text-ink-soft">{tier.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Làm lại
            </button>
            <Link
              href="/contact"
              className="rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Nhận tư vấn chi tiết
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
