import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Globe, Building2, Hash, MapPin } from "lucide-react";

const FOOTER_LINKS = [
  { href: "/about", label: "Về GCW" },
  { href: "/services", label: "Chương trình" },
  { href: "/solutions", label: "Vì sao chọn GCW" },
  { href: "/packages", label: "Gói All Access" },
  { href: "/giao-duc", label: "Giáo dục" },
  { href: "/blog", label: "Tin tức" },
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
    <footer className="relative mt-auto overflow-hidden text-footer-light">
      <div className="absolute inset-0 z-0 bg-linear-to-r from-ink/95 via-ink/70 to-ink/30" />
      <Image
        src="/deal_6-Awvr3DrXZKTLRZkm.avif"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none z-10 object-cover"
      />
      <div className="absolute inset-0 z-[15] bg-footer-dark opacity-90" />
      <div className="relative z-20 mx-auto max-w-none px-[70px] pt-[52px] pb-4">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-4xl shrink-0">
            <div className="flex items-center gap-4">
              <Image
                src="/GCW_Icon_Color_Transparent.png"
                alt="GCW"
                width={1182}
                height={1182}
                className="h-[104px] w-auto shrink-0"
              />
              <div>
                <p className="max-w-xl text-lg text-balance text-footer-light/70">
                  Đối tác phát triển lãnh đạo & hiệu suất tổ chức — đồng hành
                  thực thi cùng doanh nghiệp Việt Nam. Thành viên của WTP Group.
                </p>
              </div>
            </div>

            <div className="mt-6 ml-[30px] max-w-4xl space-y-2 text-xl">
              <p className="flex items-center gap-2 text-lg font-bold text-orange-500">
                <Building2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                Công ty Cổ phần GCW
              </p>
              <p className="flex items-center gap-2 text-base text-footer-light/70">
                <Hash className="h-4 w-4 shrink-0" aria-hidden="true" />
                MST: 0316153919
              </p>
              <p className="flex items-center gap-2 text-base whitespace-nowrap text-footer-light/70">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Add-1: 75 Đường 39, Khu đô thị Vạn Phúc, Phường Hiệp Bình, Tp. Hồ Chí Minh
              </p>
              <p className="flex items-center gap-2 text-base whitespace-nowrap text-footer-light/70">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                Add-2: A4 Đường D4, KDC Him Lam, Phường Tân Hưng, Tp. Hồ Chí Minh
              </p>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="text-base font-semibold text-white">Khám phá</p>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href} className="leading-6">
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
              <li className="flex items-center gap-2 leading-6">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="mailto:tuvan@gcw.vn"
                  className="transition-colors hover:text-white"
                >
                  tuvan@gcw.vn
                </a>
              </li>
              <li className="flex items-center gap-2 leading-6">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+84868974899" className="transition-colors hover:text-white">
                  +84 868 974 899
                </a>
              </li>
              <li className="flex items-center gap-2 leading-6">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+84931239099" className="transition-colors hover:text-white">
                  +84 931 239 099
                </a>
              </li>
              <li className="flex items-center gap-2 leading-6">
                <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a
                  href="https://gcw.vn"
                  className="transition-colors hover:text-white"
                >
                  gcw.vn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-base font-semibold text-white">Theo dõi</p>
            <div className="mt-4 flex flex-col space-y-2 text-sm">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 leading-6 text-footer-light/70 transition-colors hover:text-white"
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {social.label}
                  </a>
                );
              })}
            </div>
          </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-4 text-xs text-footer-light/60">
          <p className="text-center">© {year} GCW JSC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
