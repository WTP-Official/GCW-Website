"use client";

import { useEffect, useRef } from "react";

/**
 * Embeds a Jarvis helpdesk form via iframe and bridges host <-> iframe
 * messaging for auto-resize and font inheritance.
 */
export function JarvisFormEmbed({
  formId,
  title = "Jarvis Form",
  className,
  minHeight = 480,
  maxHeight,
}: {
  formId: string;
  title?: string;
  className?: string;
  minHeight?: number;
  maxHeight?: number;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const appliedHeightRef = useRef(0);

  useEffect(() => {
    function sendHostStyle() {
      const f = iframeRef.current;
      if (!f || !f.contentWindow) return;
      const fontLinks = Array.from(
        document.querySelectorAll<HTMLLinkElement>(
          'link[rel="stylesheet"][href*="fonts.googleapis.com"]',
        ),
      ).map((l) => l.href);
      f.contentWindow.postMessage(
        {
          type: "jarvis-form-host-style",
          fontFamily: getComputedStyle(document.body).fontFamily,
          fontLinks,
        },
        "*",
      );
    }

    let timerId = 0;
    function onMessage(e: MessageEvent) {
      if (!e.data) return;
      if (e.data.type === "jarvis-form-resize") {
        const incoming = e.data.height;
        clearTimeout(timerId);
        timerId = window.setTimeout(() => {
          const f = iframeRef.current;
          if (!f) return;
          let h = Math.max(Math.ceil(incoming), minHeight);
          if (maxHeight) h = Math.min(h, maxHeight);
          // Only grow — never shrink. Prevents oscillation loop.
          if (h > appliedHeightRef.current) {
            appliedHeightRef.current = h;
            f.style.height = `${h}px`;
          }
        }, 150);
      }
      if (e.data.type === "jarvis-form-request-style") sendHostStyle();
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("load", sendHostStyle);
    // The iframe may already be loaded by the time this effect runs.
    sendHostStyle();

    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("load", sendHostStyle);
      clearTimeout(timerId);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={`https://helpdesk.jarvis.cx/embed/form/${formId}`}
      title={title}
      loading="lazy"
      className={className}
      style={{
        width: "100%",
        border: 0,
        minHeight,
        resize: "none",
        overflow: "hidden",
      }}
    />
  );
}
