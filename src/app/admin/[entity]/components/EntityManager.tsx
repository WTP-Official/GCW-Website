"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import type { FieldConfig } from "../../lib/entities";
import { RichTextEditor } from "./RichTextEditor";

type Item = Record<string, unknown> & { id: string };

function emptyForm(fields: FieldConfig[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

export function EntityManager({
  slug,
  fields,
}: {
  slug: string;
  fields: FieldConfig[];
}) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>(() =>
    emptyForm(fields),
  );
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  async function handleFileChange(fieldKey: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingKey(fieldKey);
    setError(null);

    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await res.json().catch(() => ({}));

    setUploadingKey(null);
    if (!res.ok) {
      setError(data.error ?? "Tải ảnh lên thất bại, vui lòng thử lại.");
      return;
    }
    setForm((prev) => ({ ...prev, [fieldKey]: data.url }));
  }

  async function load() {
    const res = await fetch(`/api/admin/${slug}`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  function startEdit(item: Item) {
    setEditingId(item.id);
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = item[field.key];
      next[field.key] =
        field.type === "tags" && Array.isArray(value)
          ? value.join(", ")
          : String(value ?? "");
    }
    setForm(next);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm(fields));
    setError(null);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = {};
    for (const field of fields) {
      payload[field.key] =
        field.type === "tags"
          ? form[field.key]
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : form[field.key];
    }

    const res = await fetch(
      editingId ? `/api/admin/${slug}/${editingId}` : `/api/admin/${slug}`,
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }
    cancelEdit();
    load();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Xóa mục này?")) return;
    await fetch(`/api/admin/${slug}/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    load();
  }

  if (items === null) {
    return <p className="text-sm text-ink-soft">Đang tải...</p>;
  }

  return (
    <div className="space-y-10">
      <form
        onSubmit={handleSubmit}
        className="rounded-md border border-black/5 bg-surface p-6"
      >
        <h2 className="text-base text-ink">
          {editingId ? "Sửa mục" : "Thêm mục mới"}
        </h2>
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
              <label
                className="block text-sm font-medium text-ink"
                htmlFor={field.key}
              >
                {field.label}
              </label>
              {field.type === "richtext" ? (
                <RichTextEditor
                  id={field.key}
                  value={form[field.key]}
                  onChange={(html) => setForm({ ...form, [field.key]: html })}
                />
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  required={!field.optional}
                  rows={3}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
                />
              ) : field.type === "image" ? (
                <div className="mt-1 flex items-center gap-3">
                  {form[field.key] && (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white">
                      <Image
                        src={form[field.key]}
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
                      disabled={uploadingKey === field.key}
                      onChange={(e) => handleFileChange(field.key, e)}
                      className="text-sm text-ink-soft file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100"
                    />
                    {uploadingKey === field.key && (
                      <span className="text-xs text-ink-soft">Đang tải lên...</span>
                    )}
                    {form[field.key] && (
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, [field.key]: "" })}
                        className="w-fit text-xs font-medium text-red-600 hover:text-red-700"
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
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
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
                  type="text"
                  required={field.type !== "tags" && !field.optional}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) =>
                    setForm({ ...form, [field.key]: e.target.value })
                  }
                  className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
                />
              )}
            </div>
          ))}
        </div>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-md bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700 disabled:opacity-50"
          >
            {saving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Thêm mục"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center rounded-md border border-black/10 px-5 py-2.5 text-sm font-medium text-ink-soft hover:bg-white"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-base text-ink">
          Danh sách hiện có ({items.length})
        </h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-md border border-black/5 bg-white p-4"
            >
              <div className="flex items-start gap-3">
                {typeof item.image === "string" && item.image && (
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-black/10 bg-white">
                    <Image src={item.image} alt="" fill sizes="48px" className="object-cover" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-ink">
                    {String(item.title ?? item.name ?? item.id)}
                  </p>
                  {typeof item.description === "string" && (
                    <p className="mt-1 text-sm text-ink-soft">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="text-sm font-medium text-brand-600 hover:text-brand-700"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
        {items.length === 0 && (
          <p className="mt-4 text-sm text-ink-soft">Chưa có mục nào.</p>
        )}
      </div>
    </div>
  );
}
