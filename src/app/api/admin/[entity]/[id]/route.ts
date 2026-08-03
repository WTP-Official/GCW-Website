import { NextRequest, NextResponse } from "next/server";
import { getEntity } from "@/app/admin/lib/entities";
import { mutateContentItems } from "../../_lib/content-store";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> },
) {
  const { entity: slug, id } = await params;
  const entity = getEntity(slug);
  if (!entity) {
    return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload không hợp lệ" }, { status: 400 });
  }

  try {
    const updated = await mutateContentItems(
      entity.contentFile,
      entity.itemsKey,
      (items) => {
        const index = items.findIndex((item) => item.id === id);
        if (index === -1) {
          return { items, result: null };
        }
        const next = [...items];
        next[index] = { ...next[index], ...body, id };
        return { items: next, result: next[index] };
      },
    );

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error(`[admin:${slug}] PATCH failed`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi lưu" },
      { status: 500 },
    );
  }
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

  try {
    const deleted = await mutateContentItems(
      entity.contentFile,
      entity.itemsKey,
      (items) => {
        const next = items.filter((item) => item.id !== id);
        return { items: next, result: next.length !== items.length };
      },
    );

    if (!deleted) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[admin:${slug}] DELETE failed`, err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Đã có lỗi xảy ra khi xóa" },
      { status: 500 },
    );
  }
}
