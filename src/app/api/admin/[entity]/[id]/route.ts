import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { getEntity } from "@/app/admin/_lib/entities";

// Dev-only: see ../route.ts for the filesystem caveat.
function dataFilePath(fileName: string) {
  return path.join(process.cwd(), "src/app/_data", fileName);
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
  const filePath = dataFilePath(entity.dataFile);
  const raw = await readFile(filePath, "utf-8");
  const items = JSON.parse(raw) as Record<string, unknown>[];

  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  items[index] = { ...items[index], ...body, id };
  await writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, "utf-8");

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

  const filePath = dataFilePath(entity.dataFile);
  const raw = await readFile(filePath, "utf-8");
  const items = JSON.parse(raw) as Record<string, unknown>[];

  const next = items.filter((item) => item.id !== id);
  if (next.length === items.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await writeFile(filePath, `${JSON.stringify(next, null, 2)}\n`, "utf-8");
  return NextResponse.json({ ok: true });
}
