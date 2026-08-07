"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import type { FieldConfig } from "../../lib/entities";
import { ConfirmDialog } from "./ConfirmDialog";
import { FieldRow } from "./FieldRow";
import { toUploadableFile } from "./toUploadableFile";

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
  const [originalImages, setOriginalImages] = useState<Record<string, string>>(
    {},
  );
  const [deleteTarget, setDeleteTarget] = useState<Item | null>(null);
  const [deleting, setDeleting] = useState(false);

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

    const previous = form[fieldKey];
    setForm((prev) => ({ ...prev, [fieldKey]: data.url }));
    // Only clean up an abandoned in-session upload, never the persisted
    // original — that one is only safe to delete once the form is saved.
    if (previous && previous !== originalImages[fieldKey]) {
      deleteUpload(previous);
    }
  }

  function clearImage(fieldKey: string) {
    const current = form[fieldKey];
    setForm((prev) => ({ ...prev, [fieldKey]: "" }));
    if (current && current !== originalImages[fieldKey]) {
      deleteUpload(current);
    }
  }

  // Saving/deleting writes to content.json, which the public page for this
  // entity imports directly — that write briefly kicks off a dev-server
  // recompile, and a reload fetch that lands in that window can come back
  // as an HTML 404 instead of JSON. Retry a couple of times so the list
  // below doesn't get stuck showing pre-edit data.
  async function tryLoad(): Promise<boolean> {
    try {
      const res = await fetch(`/api/admin/${slug}`, { cache: "no-store" });
      if (!res.ok) return false;
      const data = await res.json();
      if (!Array.isArray(data)) return false;
      setItems(data);
      return true;
    } catch {
      return false;
    }
  }

  async function load() {
    for (let attempt = 0; attempt < 4; attempt++) {
      if (attempt > 0) await new Promise((r) => setTimeout(r, 400));
      if (await tryLoad()) return;
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  function startEdit(item: Item) {
    setEditingId(item.id);
    const next: Record<string, string> = {};
    const images: Record<string, string> = {};
    for (const field of fields) {
      const value = item[field.key];
      next[field.key] =
        field.type === "tags" && Array.isArray(value)
          ? value.join(", ")
          : String(value ?? "");
      if (field.type === "image" && typeof value === "string" && value) {
        images[field.key] = value;
      }
    }
    setForm(next);
    setOriginalImages(images);
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm(fields));
    setOriginalImages({});
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
    // Now that the new value is actually saved, the old file (if replaced or
    // cleared) is no longer referenced anywhere and is safe to delete.
    for (const field of fields) {
      if (field.type !== "image") continue;
      const original = originalImages[field.key];
      if (original && original !== payload[field.key]) {
        deleteUpload(original);
      }
    }
    cancelEdit();
    load();
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    setDeleting(true);
    await fetch(`/api/admin/${slug}/${id}`, { method: "DELETE" });
    if (editingId === id) cancelEdit();
    for (const field of fields) {
      if (field.type !== "image") continue;
      const value = deleteTarget[field.key];
      if (typeof value === "string" && value) deleteUpload(value);
    }
    setDeleting(false);
    setDeleteTarget(null);
    load();
  }

  if (items === null) {
    return (
      <div className="space-y-10 w-4xl">
        <div className="animate-pulse rounded-md border border-black/5 bg-surface p-6">
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

        <div>
          <div className="h-4 w-40 animate-pulse rounded bg-black/10" />
          <ul className="mt-4 space-y-3">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="flex animate-pulse items-center justify-between gap-4 rounded-md border border-black/5 bg-white p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-md bg-black/10" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-40 rounded bg-black/10" />
                    <div className="h-3 w-56 rounded bg-black/5" />
                  </div>
                </div>
                <div className="flex shrink-0 gap-3">
                  <div className="h-3.5 w-8 rounded bg-black/10" />
                  <div className="h-3.5 w-8 rounded bg-black/10" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-4xl">
      <form
        onSubmit={handleSubmit}
        className="rounded-md border border-black/5 bg-surface p-6"
      >
        <h2 className="text-base text-ink">
          {editingId ? "Sửa mục" : "Thêm mục mới"}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <FieldRow
              key={field.key}
              field={field}
              value={form[field.key]}
              onChange={(value) => setForm({ ...form, [field.key]: value })}
              uploading={uploadingKey === field.key}
              onFileChange={(e) => handleFileChange(field.key, e)}
              onClearImage={() => clearImage(field.key)}
            />
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
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
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
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="cursor-pointer rounded-md border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-600 transition-colors hover:bg-brand-100 hover:text-brand-700"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(item)}
                  className="cursor-pointer rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
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

      {deleteTarget && (
        <ConfirmDialog
          title="Xóa mục này?"
          description={`"${String(deleteTarget.title ?? deleteTarget.name ?? deleteTarget.id)}" sẽ bị xóa vĩnh viễn.`}
          pending={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
