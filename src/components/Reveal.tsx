"use client";

import { cloneElement, isValidElement, useEffect, useRef, useState, type ReactElement } from "react";

/**
 * Wraps a single host element (section, div, article, Link...) and fades/slides
 * it in the first time it scrolls into view. Clones the child instead of adding
 * a wrapper node so it doesn't disturb layout (grids, flex rows, etc).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactElement<Record<string, unknown>>;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!isValidElement(children)) return children;

  const childProps = children.props as { className?: string; style?: React.CSSProperties };

  return cloneElement(children, {
    ref,
    className: [
      childProps.className,
      "transition-all duration-700 ease-out",
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      ...childProps.style,
      transitionDelay: visible ? `${delay}ms` : "0ms",
    },
  });
}
