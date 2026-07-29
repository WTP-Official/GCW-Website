"use client";

import Script from "next/script";
import { Calendar } from "lucide-react";

const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";

export function CalendlyButton() {
  if (!CALENDLY_URL) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://assets.calendly.com/assets/external/widget.css"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <button
        type="button"
        onClick={() =>
          window.Calendly?.initPopupWidget({ url: CALENDLY_URL })
        }
        aria-label="Schedule a meeting"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-white shadow-lg transition-colors hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        <Calendar className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm font-medium">Book a call</span>
      </button>
    </>
  );
}

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}
