"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const INSURANCE_RATE = 0.105; // BHXH 8% + BHYT 1.5% + BHTN 1%
const SELF_DEDUCTION = 15_500_000;
const DEPENDENT_DEDUCTION = 6_200_000;

const TAX_BRACKETS = [
  { upTo: 5_000_000, rate: 0.05 },
  { upTo: 10_000_000, rate: 0.1 },
  { upTo: 18_000_000, rate: 0.15 },
  { upTo: 32_000_000, rate: 0.2 },
  { upTo: 52_000_000, rate: 0.25 },
  { upTo: 80_000_000, rate: 0.3 },
  { upTo: Infinity, rate: 0.35 },
];

function calculatePersonalIncomeTax(taxableIncome: number) {
  let remaining = taxableIncome;
  let previousCap = 0;
  let tax = 0;
  for (const bracket of TAX_BRACKETS) {
    if (remaining <= 0) break;
    const bracketWidth = bracket.upTo - previousCap;
    const amountInBracket = Math.min(remaining, bracketWidth);
    tax += amountInBracket * bracket.rate;
    remaining -= amountInBracket;
    previousCap = bracket.upTo;
  }
  return tax;
}

function formatVnd(amount: number) {
  return Math.round(amount).toLocaleString("vi-VN") + " đ";
}

export function GrossNetCalculatorButton({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const [grossInput, setGrossInput] = useState("20000000");
  const [dependents, setDependents] = useState(0);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const result = useMemo(() => {
    const gross = Number(grossInput.replace(/[^\d]/g, "")) || 0;
    const insurance = gross * INSURANCE_RATE;
    const deduction = SELF_DEDUCTION + dependents * DEPENDENT_DEDUCTION;
    const taxableIncome = Math.max(0, gross - insurance - deduction);
    const tax = calculatePersonalIncomeTax(taxableIncome);
    const net = gross - insurance - tax;
    return { gross, insurance, taxableIncome, tax, net };
  }, [grossInput, dependents]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 inline-flex w-fit items-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
      >
        {label}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={() => setOpen(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="gross-net-calculator-title"
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-md bg-white p-6 shadow-lg sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 id="gross-net-calculator-title" className="text-lg font-medium text-ink">
                  Bộ tính lương Gross-Net nhanh
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Đóng"
                  className="shrink-0 rounded-md p-1 text-ink-soft hover:bg-surface"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium text-ink">Lương Gross (VNĐ/tháng)</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={grossInput}
                    onChange={(e) => setGrossInput(e.target.value)}
                    className="mt-1.5 w-full rounded-md border border-black/10 px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
                    placeholder="20.000.000"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-ink">Số người phụ thuộc</span>
                  <input
                    type="number"
                    min={0}
                    value={dependents}
                    onChange={(e) => setDependents(Math.max(0, Number(e.target.value) || 0))}
                    className="mt-1.5 w-full rounded-md border border-black/10 px-3 py-2 text-sm text-ink focus:border-brand-600 focus:outline-none"
                  />
                </label>
              </div>

              <dl className="mt-6 space-y-2 rounded-md bg-surface p-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Bảo hiểm (BHXH, BHYT, BHTN 10.5%)</dt>
                  <dd className="text-ink">-{formatVnd(result.insurance)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Thu nhập tính thuế</dt>
                  <dd className="text-ink">{formatVnd(result.taxableIncome)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Thuế TNCN</dt>
                  <dd className="text-ink">-{formatVnd(result.tax)}</dd>
                </div>
                <div className="flex justify-between border-t border-black/10 pt-2 text-base font-medium">
                  <dt className="text-ink">Lương Net</dt>
                  <dd className="text-brand-600">{formatVnd(result.net)}</dd>
                </div>
              </dl>

              <p className="mt-4 text-xs text-ink-soft">
                Kết quả chỉ mang tính tham khảo dựa trên mức giảm trừ gia cảnh và biểu thuế lũy tiến
                hiện hành, chưa tính trần đóng bảo hiểm theo vùng. Không thay thế tư vấn thuế chính
                thức.
              </p>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
