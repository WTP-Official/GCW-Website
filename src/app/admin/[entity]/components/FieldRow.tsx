"use client";

import type { ChangeEvent } from "react";
import Image from "next/image";
import type { FieldConfig } from "../../lib/entities";
import { RichTextEditor } from "./RichTextEditor";

export function FieldRow({
  field,
  value,
  onChange,
  uploading,
  onFileChange,
  onClearImage,
}: {
  field: FieldConfig;
  value: string;
  onChange: (value: string) => void;
  uploading?: boolean;
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearImage?: () => void;
}) {
  return (
    <div
      className={
        field.type === "textarea" || field.type === "richtext"
          ? "sm:col-span-2"
          : ""
      }
    >
      <label className="block text-sm font-medium text-ink" htmlFor={field.key}>
        {field.label}
      </label>
      {field.type === "richtext" ? (
        <RichTextEditor id={field.key} value={value} onChange={onChange} />
      ) : field.type === "textarea" ? (
        <textarea
          id={field.key}
          required={!field.optional}
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
        />
      ) : field.type === "image" ? (
        <div className="mt-1 flex items-center gap-3">
          {value && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white">
              <Image
                src={value}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <input
              id={field.key}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              disabled={uploading}
              onChange={onFileChange}
              className="text-sm text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100"
            />
            {uploading && (
              <span className="text-xs text-ink-soft">Đang tải lên...</span>
            )}
            {value && (
              <button
                type="button"
                onClick={onClearImage}
                className="w-fit cursor-pointer rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
              >
                Xóa ảnh
              </button>
            )}
          </div>
        </div>
      ) : field.type === "select" ? (
        <select
          id={field.key}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
        >
          <option value="" disabled>
            Chọn...
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.key}
          type={
            field.type === "url"
              ? "url"
              : field.type === "datetime-local"
                ? "datetime-local"
                : "text"
          }
          required={field.type !== "tags" && !field.optional}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
        />
      )}
    </div>
  );
}
