import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { getEntity } from "@/app/admin/lib/entities";

// Dev-only: reads/writes each route's own content.json on disk. Vercel's
// production filesystem is read-only, so writes only work via `pnpm dev`.
function contentFilePath(contentFile: string) {
  return path.join(process.cwd(), "src/app/(pages)", contentFile);
}

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

  const raw = await readFile(contentFilePath(entity.contentFile), "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  return NextResponse.json(data[entity.itemsKey] ?? []);
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

  const body = await req.json();
  for (const field of entity.fields) {
    if (field.type === "tags" || field.type === "image" || field.optional) continue;
    if (!String(body[field.key] ?? "").trim()) {
      return NextResponse.json(
        { error: `Thiếu trường bắt buộc: ${field.label}` },
        { status: 400 },
      );
    }
  }

  const filePath = contentFilePath(entity.contentFile);
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  const items = (data[entity.itemsKey] as Record<string, unknown>[]) ?? [];

  const label = String(body.title ?? body.name ?? "").trim();
  const id = uniqueSlug(
    slugify(label),
    new Set(items.map((item) => String(item.id))),
  );
  const newItem = { id, ...body };
  items.push(newItem);
  data[entity.itemsKey] = items;
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");

  return NextResponse.json(newItem, { status: 201 });
}
