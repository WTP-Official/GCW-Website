import { NextRequest, NextResponse } from "next/server";
import { mkdir, unlink, writeFile } from "fs/promises";
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
const MAX_SIZE = 20 * 1024 * 1024;

const DIACRITICS = /[̀-ͯ]/g;

// Turns the original filename into a URL-safe slug so uploads stay
// human-readable, e.g. "Anh bia sach.png" -> "anh-bia-sach".
function slugifyBaseName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  const slug = base
    .normalize("NFD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return slug || "image";
}

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
      return NextResponse.json({ error: "Ảnh vượt quá 20MB" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const baseSlug = slugifyBaseName(file.name);
    const uniqueSuffix = crypto.randomUUID().slice(0, 8);
    const fileName = `${baseSlug}-${uniqueSuffix}.${extension}`;
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

// Only accepts filenames this route itself generates (slug-uuid8 or the
// older bare-uuid form + a known extension), so this can't be used to
// delete arbitrary files on disk.
const UPLOAD_FILENAME = /^[a-z0-9-]+\.(jpg|png|webp|avif|gif)$/i;

export async function DELETE(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (typeof url !== "string" || !url.startsWith("/uploads/")) {
      return NextResponse.json({ error: "URL không hợp lệ" }, { status: 400 });
    }

    const fileName = url.slice("/uploads/".length);
    if (!UPLOAD_FILENAME.test(fileName)) {
      return NextResponse.json({ error: "URL không hợp lệ" }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public/uploads", fileName);
    await unlink(filePath).catch((err) => {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin:upload] DELETE failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Xóa ảnh thất bại" },
      { status: 500 },
    );
  }
}
