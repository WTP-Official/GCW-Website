"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1200;

export function Counter({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!match) return;
    const el = ref.current;
    if (!el) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const padLength = digits.length;
    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / DURATION_MS, 1);
            const current = Math.round(progress * target);
            setDisplay(`${prefix}${String(current).padStart(padLength, "0")}${suffix}`);
            if (progress < 1) {
              frame = requestAnimationFrame(tick);
            }
          };
          frame = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // match is derived from value on every render; re-running the effect per keystroke isn't a concern here since value is static content
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span ref={ref}>{display}</span>;
}
