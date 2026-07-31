"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { FieldConfig } from "../../_lib/entities";

type Item = Record<string, unknown> & { id: string };

function emptyForm(fields: FieldConfig[]): Record<string, string> {
  return Object.fromEntries(fields.map((field) => [field.key, ""]));
}

export function EntityManager({ slug, fields }: { slug: string; fields: FieldConfig[] }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, string>>(() => emptyForm(fields));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

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
        field.type === "tags" && Array.isArray(value) ? value.join(", ") : String(value ?? "");
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
      <form onSubmit={handleSubmit} className="rounded-md border border-black/5 bg-surface p-6">
        <h2 className="text-base text-ink">{editingId ? "Sửa mục" : "Thêm mục mới"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="block text-sm font-medium text-ink" htmlFor={field.key}>
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  required
                  rows={3}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="mt-1 w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-600"
                />
              ) : field.type === "select" ? (
                <select
                  id={field.key}
                  required
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
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
                  required={field.type !== "tags"}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
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
        <h2 className="text-base text-ink">Danh sách hiện có ({items.length})</h2>
        <ul className="mt-4 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-md border border-black/5 bg-white p-4"
            >
              <div>
                <p className="text-sm font-medium text-ink">
                  {String(item.title ?? item.name ?? item.id)}
                </p>
                {typeof item.description === "string" && (
                  <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
                )}
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
        {items.length === 0 && <p className="mt-4 text-sm text-ink-soft">Chưa có mục nào.</p>}
      </div>
    </div>
  );
}
