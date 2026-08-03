import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/about", label: "Về GCW" },
  { href: "/services", label: "Dịch vụ" },
  { href: "/solutions", label: "Giải pháp" },
  { href: "/packages", label: "Gói dịch vụ" },
  { href: "/tai-nguyen/blog", label: "Tin tức" },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.facebook.com/gcwjsc",
    label: "Facebook",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.2 4.32 15.19 4.23 14 4.23c-2.42 0-4.08 1.48-4.08 4.2v2.07H7.4v3H9.92V21h3.58Z"
        />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/company/gcw-dich-vu-nhan-su/",
    label: "LinkedIn",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.68 1.68 0 1 0 0 3.36A1.68 1.68 0 0 0 5.5 4ZM20 13.4c0-3.1-1.66-4.54-3.87-4.54a3.34 3.34 0 0 0-3.03 1.67V8.5H10.2c.04.85 0 12 0 12h2.9v-6.7c0-.36.03-.72.13-.98.29-.72.95-1.47 2.06-1.47 1.45 0 2.03 1.1 2.03 2.72V20H20v-6.6Z"
        />
      </svg>
    ),
  },
  {
    href: "https://www.messenger.com/t/gcwjsc",
    label: "Messenger",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 3C6.95 3 3 6.69 3 11.5c0 2.61 1.17 4.93 3.05 6.5V21l2.79-1.53c.72.2 1.48.31 2.16.31 5.05 0 9-3.69 9-8.5S17.05 3 12 3Zm.94 11.4-2.3-2.46-4.49 2.46 4.94-5.24 2.36 2.46 4.43-2.46-4.94 5.24Z"
        />
      </svg>
    ),
  },
  {
    href: "https://zalo.me/0868974899",
    label: "Zalo",
    icon: (props: { className?: string }) => (
      <svg viewBox="0 0 24 24" className={props.className} aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
          d="M4 5.5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-4.5 3.2a.4.4 0 0 1-.63-.33V16.5A2 2 0 0 1 4 14.5v-9Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.3 8h5l-5 6h5"
        />
      </svg>
    ),
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-footer-dark text-footer-light">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid gap-10 sm:grid-cols-5">
          <div className="sm:col-span-2">
            <Image src="/logo.avif" alt="GCW" width={375} height={116} className="h-10 w-auto" />
            <p className="mt-4 text-sm text-footer-light/70">
              Strategic HR Operator — đối tác vận hành và quản trị nhân sự
              đồng hành thực thi cùng doanh nghiệp SME Việt Nam. Thành viên
              của WTP Group.
            </p>
            <p className="mt-3 text-xs text-footer-light/50">
              Công ty Cổ phần GCW (GCW JSC) — MST 0316153919
            </p>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Khám phá</p>
            <ul className="mt-4 space-y-2">
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
            <p className="text-base font-semibold text-white">Liên hệ</p>
            <ul className="mt-4 space-y-2 text-sm text-footer-light/70">
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

          <div>
            <p className="text-base font-semibold text-white">Theo dõi</p>
            <div className="mt-4 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-footer-light/70 transition-colors hover:border-white/30 hover:text-white"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-xs text-footer-light/60">
          <p>
            *Dựa trên cam kết tiết kiệm chi phí của GCW khi triển khai dịch vụ
            Tuyển dụng và Nhân sự - Tính lương (C&B) thuê ngoài, so với doanh
            nghiệp tự tổ chức bộ phận tương ứng.
          </p>
          <p className="mt-3">© {year} GCW JSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
