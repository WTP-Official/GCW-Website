import type { LucideIcon } from "lucide-react";

export function ImagePlaceholder({
  icon: Icon,
  className = "",
  iconClassName = "h-10 w-10",
}: {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-black/5 bg-bg-muted ${className}`}
    >
      <Icon className={`text-ink-soft/60 ${iconClassName}`} aria-hidden="true" />
    </div>
  );
}
