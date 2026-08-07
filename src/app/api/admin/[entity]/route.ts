import { NextRequest, NextResponse } from "next/server";
import { getEntity } from "@/app/admin/lib/entities";
import {
  mutateContentItems,
  mutateContentObject,
  readContentItems,
  readContentObject,
} from "../_lib/content-store";

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string, existing: Set<string>) {
  let slug = base || "item";
  let n = 2;
  while (existing.has(slug)) {
    slug = `${base}-${n++}`;
  }
  return slug;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  try {
    if (entity.mode === "singleton") {
      const value = await readContentObject(entity.contentFile, entity.itemsKey);
      return NextResponse.json(value);
    }
    const items = await readContentItems(entity.contentFile, entity.itemsKey);
    return NextResponse.json(items);
  } catch (err) {
    console.error(`[admin:${slug}] GET failed`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Không đọc được dữ liệu" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }
  if (entity.mode !== "singleton") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  for (const field of entity.fields) {
    if (field.type === "tags" || field.type === "image" || field.optional) continue;
    if (!String(body[field.key] ?? "").trim()) {
      return NextResponse.json(
        { error: `Thiếu trường bắt buộc: ${field.label}` },
        { status: 400 },
      );
    }
  }

  try {
    const updated = await mutateContentObject(
      entity.contentFile,
      entity.itemsKey,
      (value) => {
        const next = { ...value, ...body };
        return { value: next, result: next };
      },
    );
    return NextResponse.json(updated);
  } catch (err) {
    console.error(`[admin:${slug}] PATCH failed`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi lưu" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string }> },
) {
  const { entity: slug } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }
  if (entity.mode === "singleton") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  for (const field of entity.fields) {
    if (field.type === "tags" || field.type === "image" || field.optional) continue;
    if (!String(body[field.key] ?? "").trim()) {
      return NextResponse.json(
        { error: `Thiếu trường bắt buộc: ${field.label}` },
        { status: 400 },
      );
    }
  }

  try {
    const newItem = await mutateContentItems(
      entity.contentFile,
      entity.itemsKey,
      (items) => {
        const label = String(body.title ?? body.name ?? "").trim();
        const id = uniqueSlug(
          slugify(label),
          new Set(items.map((item) => String(item.id))),
        );
        const created = { id, ...body };
        return { items: [...items, created], result: created };
      },
    );
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    console.error(`[admin:${slug}] POST failed`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi lưu" },
      { status: 500 },
    );
  }
}
