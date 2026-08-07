"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { FieldConfig } from "../../lib/entities";
import { FieldRow } from "./FieldRow";
import { toUploadableFile } from "./toUploadableFile";

function emptyForm(fields: FieldConfig[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

export function SingletonEntityForm({
  slug,
  fields,
}: {
  slug: string;
  fields: FieldConfig[];
}) {
  const [form, setForm] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [originalImages, setOriginalImages] = useState<Record<string, string>>(
    {},
  );

  function deleteUpload(url: string) {
    if (!url.startsWith("/uploads/")) return;
    fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => {});
  }

  async function handleFileChange(
    fieldKey: string,
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingKey(fieldKey);
    setError(null);

    const body = new FormData();
    body.append("file", toUploadableFile(file));
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json().catch(() => ({}));

    setUploadingKey(null);
    if (!res.ok) {
      setError(data.error ?? "Tải ảnh lên thất bại, vui lòng thử lại.");
      return;
    }

    const previous = form?.[fieldKey];
    setForm((prev) => (prev ? { ...prev, [fieldKey]: data.url } : prev));
    if (previous && previous !== originalImages[fieldKey]) {
      deleteUpload(previous);
    }
  }

  function clearImage(fieldKey: string) {
    const current = form?.[fieldKey];
    setForm((prev) => (prev ? { ...prev, [fieldKey]: "" } : prev));
    if (current && current !== originalImages[fieldKey]) {
      deleteUpload(current);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch(`/api/admin/${slug}`, { cache: "no-store" });
      if (cancelled) return;
      if (!res.ok) {
        setForm(emptyForm(fields));
        return;
      }
      const data = await res.json();
      const next: Record<string, string> = {};
      const images: Record<string, string> = {};
      for (const field of fields) {
        const value = data[field.key];
        next[field.key] = String(value ?? "");
        if (field.type === "image" && typeof value === "string" && value) {
          images[field.key] = value;
        }
      }
      setForm(next);
      setOriginalImages(images);
    }
    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch(`/api/admin/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }
    for (const field of fields) {
      if (field.type !== "image") continue;
      const original = originalImages[field.key];
      if (original && original !== form[field.key]) {
        deleteUpload(original);
      }
    }
    setOriginalImages(
      Object.fromEntries(
        fields
          .filter((f) => f.type === "image" && form[f.key])
          .map((f) => [f.key, form[f.key]]),
      ),
    );
    setSaved(true);
  }

  if (form === null) {
    return (
      <div className="w-4xl animate-pulse rounded-md border border-black/5 bg-surface p-6">
        <div className="h-4 w-28 rounded bg-black/10" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div
              key={field.key}
              className={
                field.type === "textarea" || field.type === "richtext"
                  ? "sm:col-span-2"
                  : ""
              }
            >
              <div className="h-3.5 w-24 rounded bg-black/10" />
              <div
                className={`mt-2 rounded-md bg-black/5 ${
                  field.type === "textarea" || field.type === "richtext"
                    ? "h-24"
                    : "h-10"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 h-10 w-32 rounded-md bg-black/10" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-4xl rounded-md border border-black/5 bg-surface p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <FieldRow
            key={field.key}
            field={field}
            value={form[field.key]}
            onChange={(value) =>
              setForm((prev) => (prev ? { ...prev, [field.key]: value } : prev))
            }
            uploading={uploadingKey === field.key}
            onFileChange={(e) => handleFileChange(field.key, e)}
            onClearImage={() => clearImage(field.key)}
          />
        ))}
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      {saved && !error && (
        <p className="mt-3 text-sm text-brand-600">Đã lưu thay đổi.</p>
      )}

      <div className="mt-4">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
        >
          {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
