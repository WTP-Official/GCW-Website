"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, RotateCcw } from "lucide-react";

const VALUES = [
  "Chính trực",
  "Học hỏi",
  "Cống hiến",
  "Can đảm",
  "Kỷ luật",
  "Sáng tạo",
  "Tin cậy",
  "Trách nhiệm",
  "Đồng cảm",
  "Kiên trì",
  "Khiêm tốn",
  "Ảnh hưởng",
];

const STEP_COUNT = 5;

type Variant = "personal" | "team" | "family";

const VARIANT_CARDS: {
  id: Variant;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    id: "personal",
    title: "Tuyên ngôn sứ mệnh cá nhân",
    description: "Xác định đam mê, giá trị và điều bạn thực sự muốn trong công việc và cuộc sống.",
    image: "/uploads/6entpvppl6i-unsplash-96301b9f.jpg",
  },
  {
    id: "team",
    title: "Tuyên ngôn sứ mệnh đội nhóm",
    description: "Đặt nền móng thành công cho đội nhóm hoặc tổ chức bằng cách xác định rõ sứ mệnh chung.",
    image: "/uploads/3ym6i13y9lu-unsplash-b49eef3c.jpg",
  },
  {
    id: "family",
    title: "Tuyên ngôn sứ mệnh gia đình",
    description: "Xác định điều quan trọng nhất đối với gia đình bạn.",
    image: "/uploads/imagine-buddy-vslbaidhwau-unsplash-341d5944.jpg",
  },
];

const VARIANT_COPY: Record<
  Variant,
  {
    nameLabel: string;
    namePlaceholder: string;
    valuesLabel: string;
    contributionLabel: string;
    legacyLabel: string;
    resultLabel: string;
    buildStatement: (name: string, values: string[], contribution: string, legacy: string) => string;
  }
> = {
  personal: {
    nameLabel: "Tên của bạn là gì?",
    namePlaceholder: "Nguyễn Văn A",
    valuesLabel: "Chọn tối đa 3 giá trị cốt lõi quan trọng nhất với bạn",
    contributionLabel: "Bạn muốn đóng góp điều gì cho công việc và tổ chức của mình?",
    legacyLabel: "Bạn muốn được ghi nhớ như một người như thế nào?",
    resultLabel: "Tuyên ngôn sứ mệnh cá nhân",
    buildStatement: (name, values, contribution, legacy) =>
      `Tôi, ${name}, sống với các giá trị ${values.join(", ")}. Sứ mệnh của tôi là ${contribution.trim().replace(/\.$/, "")}, để trở thành người được nhớ đến vì ${legacy.trim().replace(/\.$/, "")}.`,
  },
  team: {
    nameLabel: "Tên đội nhóm hoặc tổ chức của bạn là gì?",
    namePlaceholder: "Phòng Kinh doanh",
    valuesLabel: "Chọn tối đa 3 giá trị cốt lõi quan trọng nhất với đội nhóm bạn",
    contributionLabel: "Đội nhóm bạn muốn đóng góp điều gì cho tổ chức?",
    legacyLabel: "Đội nhóm bạn muốn được ghi nhớ như thế nào?",
    resultLabel: "Tuyên ngôn sứ mệnh đội nhóm",
    buildStatement: (name, values, contribution, legacy) =>
      `Chúng tôi, ${name}, cam kết với các giá trị ${values.join(", ")}. Sứ mệnh của chúng tôi là ${contribution.trim().replace(/\.$/, "")}, để trở thành đội ngũ được nhớ đến vì ${legacy.trim().replace(/\.$/, "")}.`,
  },
  family: {
    nameLabel: "Tên gia đình bạn là gì?",
    namePlaceholder: "Gia đình Nguyễn",
    valuesLabel: "Chọn tối đa 3 giá trị cốt lõi quan trọng nhất với gia đình bạn",
    contributionLabel: "Gia đình bạn muốn cùng nhau xây dựng điều gì?",
    legacyLabel: "Gia đình bạn muốn được ghi nhớ như thế nào?",
    resultLabel: "Tuyên ngôn sứ mệnh gia đình",
    buildStatement: (name, values, contribution, legacy) =>
      `${name} sống với các giá trị ${values.join(", ")}. Sứ mệnh của chúng tôi là ${contribution.trim().replace(/\.$/, "")}, để trở thành gia đình được nhớ đến vì ${legacy.trim().replace(/\.$/, "")}.`,
  },
};

export function MissionStatementBuilder() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [values, setValues] = useState<string[]>([]);
  const [contribution, setContribution] = useState("");
  const [legacy, setLegacy] = useState("");

  function toggleValue(value: string) {
    setValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : prev.length < 3
          ? [...prev, value]
          : prev,
    );
  }

  function reset() {
    setStep(0);
    setName("");
    setValues([]);
    setContribution("");
    setLegacy("");
  }

  if (!variant) {
    return (
      <div>
        <h2 className="font-serif-hero text-2xl leading-snug text-ink sm:text-3xl">
          Chọn loại tuyên ngôn sứ mệnh
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {VARIANT_CARDS.map((card) => (
            <div
              key={card.id}
              className="flex flex-col overflow-hidden rounded-md bg-bg-dark text-white"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-serif-hero text-lg leading-snug">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{card.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setVariant(card.id)}
                  className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
                >
                  Bắt đầu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const copy = VARIANT_COPY[variant];
  const canProceed =
    (step === 0 && name.trim().length > 0) ||
    (step === 1 && values.length > 0) ||
    (step === 2 && contribution.trim().length > 0) ||
    (step === 3 && legacy.trim().length > 0);

  const statement =
    name && values.length > 0 && contribution && legacy
      ? copy.buildStatement(name, values, contribution, legacy)
      : "";

  return (
    <div className="mx-auto max-w-xl rounded-md border border-black/10 bg-white p-6 sm:p-10">
      {step < STEP_COUNT ? (
        <>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-brand-600 transition-all"
              style={{ width: `${(step / STEP_COUNT) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-xs font-medium text-ink-soft">
            Bước {step + 1}/{STEP_COUNT}
          </p>

          {step === 0 && (
            <div className="mt-6">
              <label className="block text-base text-ink" htmlFor="msb-name">
                {copy.nameLabel}
              </label>
              <input
                id="msb-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={copy.namePlaceholder}
                className="mt-4 w-full rounded-md border border-black/10 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-600"
              />
            </div>
          )}

          {step === 1 && (
            <div className="mt-6">
              <p className="text-base text-ink">{copy.valuesLabel}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {VALUES.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => toggleValue(value)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      values.includes(value)
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-black/10 text-ink-soft hover:bg-surface"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="mt-6">
              <label className="block text-base text-ink" htmlFor="msb-contribution">
                {copy.contributionLabel}
              </label>
              <textarea
                id="msb-contribution"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                rows={3}
                placeholder="giúp đội ngũ của mình phát triển năng lực lãnh đạo mỗi ngày"
                className="mt-4 w-full rounded-md border border-black/10 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-600"
              />
            </div>
          )}

          {step === 3 && (
            <div className="mt-6">
              <label className="block text-base text-ink" htmlFor="msb-legacy">
                {copy.legacyLabel}
              </label>
              <textarea
                id="msb-legacy"
                value={legacy}
                onChange={(e) => setLegacy(e.target.value)}
                rows={3}
                placeholder="luôn giữ lời hứa và truyền cảm hứng cho người khác"
                className="mt-4 w-full rounded-md border border-black/10 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-600"
              />
            </div>
          )}

          {step === 4 && (
            <div className="mt-6">
              <p className="text-base text-ink">{copy.resultLabel}</p>
              <p className="mt-4 font-serif-hero text-xl leading-snug text-ink">{statement}</p>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
              >
                Quay lại
              </button>
            )}
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-brand-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === 3 ? "Tạo tuyên ngôn sứ mệnh" : "Tiếp tục"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </>
      ) : (
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-brand-600">
            {copy.resultLabel}
          </p>
          <p className="mt-4 font-serif-hero text-2xl leading-snug text-ink">{statement}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Làm lại
            </button>
            <button
              type="button"
              onClick={() => {
                setVariant(null);
                reset();
              }}
              className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface"
            >
              Chọn loại khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
