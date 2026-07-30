import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "Về GCW" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/solutions", label: "Giải pháp" },
  { href: "/packages", label: "Gói dịch vụ" },
  { href: "/news", label: "Tin tức" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-footer-dark text-footer-light">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="text-lg font-bold text-white">
              <span className="text-brand-400">GCW</span>
            </p>
            <p className="mt-3 text-sm text-footer-light/70">
              Strategic HR Operator — đối tác vận hành và quản trị nhân sự
              đồng hành thực thi cùng doanh nghiệp SME Việt Nam. Thành viên
              của WTP Group.
            </p>
            <p className="mt-3 text-xs text-footer-light/50">
              Công ty Cổ phần GCW (GCW JSC) — MST 0316153919
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Khám phá</p>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-footer-light/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Liên hệ</p>
            <ul className="mt-3 space-y-2 text-sm text-footer-light/70">
              <li>
                <a
                  href="mailto:tuvan@gcw.vn"
                  className="transition-colors hover:text-white"
                >
                  tuvan@gcw.vn
                </a>
              </li>
              <li>
                <a
                  href="tel:+84868974899"
                  className="transition-colors hover:text-white"
                >
                  +84 868 974 899
                </a>
              </li>
              <li>
                <a
                  href="tel:+84931239099"
                  className="transition-colors hover:text-white"
                >
                  +84 931 239 099
                </a>
              </li>
              <li className="text-footer-light/50">Tp. Hồ Chí Minh</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-footer-light/60">
          © {year} GCW JSC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
