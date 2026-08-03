import type { Metadata } from "next";
import { Inter, Manrope, Lora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BASE_URL, GOOGLE_VERIFICATION_TOKENS } from "@/constants/site";
import { CalendlyButton } from "@/components/CalendlyButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GCW - Đối Tác Vận Hành Nhân Sự Chiến Lược Cho Doanh Nghiệp SME",
    template: "%s | GCW",
  },
  description:
    "GCW (GCW JSC) là Strategic HR Operator đồng hành thực thi quản trị nhân sự cho doanh nghiệp SME Việt Nam: tuân thủ lao động, lương - bảo hiểm - thuế TNCN, tuyển dụng và tư vấn chiến lược nhân sự.",
  keywords: [
    "GCW",
    "GCW JSC",
    "dịch vụ nhân sự thuê ngoài",
    "HR Outsourcing Việt Nam",
    "tư vấn nhân sự doanh nghiệp SME",
    "quản lý lương bảo hiểm xã hội thuế TNCN",
    "tuyển dụng nhân sự",
    "giám đốc nhân sự thuê ngoài CHRO",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "GCW",
    title: "GCW - Đối Tác Vận Hành Nhân Sự Chiến Lược Cho Doanh Nghiệp SME",
    description:
      "GCW đồng hành thực thi quản trị nhân sự cùng doanh nghiệp SME Việt Nam — không chỉ tư vấn lý thuyết.",
  },
  verification: {
    google: GOOGLE_VERIFICATION_TOKENS,
  },
  icons: {
    icon: { url: "/icon.png", sizes: "32x32", type: "image/png" },
    apple: { url: "/icon.png", sizes: "32x32", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${manrope.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink-soft">
        <Header />
        {children}
        <Footer />
        <CalendlyButton />
        <Script id="rocketchat-livechat" strategy="afterInteractive">
          {`(function(w, d, s, u) {
    w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
    var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
    j.async = true; j.src = 'https://livechat.jarvis.cx/livechat/rocketchat-livechat.min.js?_=201903270000';
    h.parentNode.insertBefore(j, h);
    w.ticketplus = w.ticketplus || {};
    w.ticketplus.tenantid = 'ca965aac-e908-408e-bc8b-15c93eb31233';
    w.RocketChat(function() { this.setLanguage('vi-VN') });
  })(window, document, 'script', 'https://livechat.jarvis.cx/livechat');`}
        </Script>
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
