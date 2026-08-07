"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { X } from "lucide-react";

type Question = { id: string; text: string };
type ResultTier = { minScore: number; maxScore: number; label: string; description: string };

export function SelfAssessmentButton({
  ctaLabel,
  title,
  questions,
  resultTiers,
}: {
  ctaLabel: string;
  title: string;
  questions: Question[];
  resultTiers: ResultTier[];
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    setOpen(false);
    setStep(0);
    setAnswers({});
  }

  function answer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStep((s) => s + 1);
  }

  const isDone = step >= questions.length;
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const tier =
    resultTiers.find((t) => score >= t.minScore && score <= t.maxScore) ??
    resultTiers[resultTiers.length - 1];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        {ctaLabel}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={close}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="self-assessment-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-md bg-white p-6 shadow-lg sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 id="self-assessment-title" className="text-lg font-medium text-ink">
                  {title}
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Đóng"
                  className="shrink-0 rounded-md p-1 text-ink-soft hover:bg-surface"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {!isDone ? (
                <div className="mt-6">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all"
                      style={{ width: `${(step / questions.length) * 100}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs font-medium text-ink-soft">
                    Câu hỏi {step + 1}/{questions.length}
                  </p>
                  <p className="mt-3 text-base text-ink">{questions[step].text}</p>
                  <div className="mt-6 flex gap-3">
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
                </div>
              ) : (
                <div className="mt-6">
                  <p className="text-sm text-ink-soft">
                    Kết quả: {score}/{questions.length} điểm
                  </p>
                  <p className="mt-2 text-xl font-medium text-brand-600">{tier.label}</p>
                  <p className="mt-3 text-sm text-ink-soft">{tier.description}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(0);
                        setAnswers({});
                      }}
                      className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
                    >
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
          </div>,
          document.body,
        )}
    </>
  );
}
