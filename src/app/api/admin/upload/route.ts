import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

// Dev-only: writes to public/uploads. Vercel's production filesystem is
// read-only, so uploads only work via `pnpm dev` — same caveat as ../[entity]/route.ts.
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thiếu file" }, { status: 400 });
    }

    const extension = ALLOWED_TYPES[file.type];
    if (!extension) {
      return NextResponse.json(
        { error: "Chỉ chấp nhận ảnh JPEG, PNG, WebP, AVIF hoặc GIF" },
        { status: 400 },
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Ảnh vượt quá 5MB" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const fileName = `${crypto.randomUUID()}.${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, fileName), buffer);

    return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
  } catch (err) {
    console.error("[admin:upload] POST failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Tải ảnh lên thất bại" },
      { status: 500 },
    );
  }
}
