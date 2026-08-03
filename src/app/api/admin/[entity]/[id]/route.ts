import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { getEntity } from "@/app/admin/lib/entities";

// Dev-only: see ../route.ts for the filesystem caveat.
function contentFilePath(contentFile: string) {
  return path.join(process.cwd(), "src/app/(pages)", contentFile);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: slug, id } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  const body = await req.json();
  const filePath = contentFilePath(entity.contentFile);
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  const items = (data[entity.itemsKey] as Record<string, unknown>[]) ?? [];

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  items[index] = { ...items[index], ...body, id };
  data[entity.itemsKey] = items;
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");

  return NextResponse.json(items[index]);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: slug, id } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  const filePath = contentFilePath(entity.contentFile);
  const raw = await readFile(filePath, "utf-8");
  const data = JSON.parse(raw) as Record<string, unknown>;
  const items = (data[entity.itemsKey] as Record<string, unknown>[]) ?? [];

  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  data[entity.itemsKey] = next;
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
  return NextResponse.json({ ok: true });
}
