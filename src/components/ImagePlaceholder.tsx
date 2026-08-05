import { forwardRef } from "react";
import type { LucideIcon } from "lucide-react";

export const ImagePlaceholder = forwardRef<
  HTMLDivElement,
  {
    icon: LucideIcon;
    className?: string;
    iconClassName?: string;
    style?: React.CSSProperties;
  }
>(function ImagePlaceholder(
  { icon: Icon, className = "", iconClassName = "h-10 w-10", style },
  ref,
) {
  return (
    <div
      ref={ref}
      style={style}
      className={`flex items-center justify-center border border-black/5 bg-bg-muted ${className}`}
    >
      <Icon className={`text-ink-soft/60 ${iconClassName}`} aria-hidden="true" />
    </div>
  );
});
