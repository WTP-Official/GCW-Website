import type { Metadata } from "next";
import Link from "next/link";
import { ENTITIES } from "./lib/entities";

export const metadata: Metadata = {
  title: "Quản lý nội dung",
  robots: { index: false, follow: false },
};

export default function AdminHomePage() {
  return (
    <main className="flex flex-col w-full items-center px-4 py-16">
      <h1 className="text-2xl text-ink">Quản lý nội dung</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Thêm / sửa / xóa các mục trên trang Tài nguyên và Sự kiện. Chỉ hoạt động
        khi chạy{" "}
        <code className="rounded bg-surface px-1.5 py-0.5">pnpm dev</code> — xem
        ghi chú cuối trang.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {ENTITIES.map((entity) => (
          <Link
            key={entity.slug}
            href={`/admin/${entity.slug}`}
            className="rounded-md border border-black/5 bg-white p-5 transition-shadow hover:shadow-md"
          >
            <h2 className="text-base text-ink">{entity.label}</h2>
            <p className="mt-1 text-sm text-ink-soft">{entity.description}</p>
            <p className="mt-3 text-xs font-medium text-brand-600">
              {entity.publicHref}
            </p>
          </Link>
        ))}
      </div>

      <p className="mt-10 border-t border-black/5 pt-6 text-xs text-muted">
        Trang admin này chưa có xác thực, nên <code>middleware.ts</code> đã chặn
        (trả 404) mọi request tới <code>/admin</code> và <code>/api/admin</code>{" "}
        khi không chạy ở môi trường development. Chỉ dùng khi chạy dev cục bộ
        rồi tự commit + push thay đổi trong các file <code>content.json</code>{" "}
        tương ứng.
      </p>
    </main>
  );
}
