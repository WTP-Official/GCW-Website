import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BASE_URL } from "@/constants/site";
import { CalendlyButton } from "@/components/CalendlyButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800", "900"],
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
    google: [
      process.env.GOOGLE_SITE_VERIFICATION,
      process.env.GOOGLE_SITE_VERIFICATION_2,
    ].filter(Boolean) as string[],
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
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
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink-soft">
        <Header />
        {children}
        <Footer />
        <CalendlyButton />
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
