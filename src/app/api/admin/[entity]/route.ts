import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { getEntity } from "@/app/admin/_lib/entities";

// Dev-only: reads/writes JSON files on disk under src/app/_data. Vercel's
// production filesystem is read-only, so writes only work via `pnpm dev`.
function dataFilePath(fileName: string) {
  return path.join(process.cwd(), "src/app/_data", fileName);
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

  const raw = await readFile(dataFilePath(entity.dataFile), "utf-8");
  return NextResponse.json(JSON.parse(raw));
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
    if (field.type === "tags") continue;
    if (!String(body[field.key] ?? "").trim()) {
      return NextResponse.json(
        { error: `Thiếu trường bắt buộc: ${field.label}` },
        { status: 400 },
      );
    }
  }

  const filePath = dataFilePath(entity.dataFile);
  const raw = await readFile(filePath, "utf-8");
  const items = JSON.parse(raw) as Record<string, unknown>[];

  const newItem = { id: crypto.randomUUID(), ...body };
  items.push(newItem);
  await writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, "utf-8");

  return NextResponse.json(newItem, { status: 201 });
}
