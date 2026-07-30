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
      className={`flex items-center justify-center bg-gradient-to-br from-brand-500 to-brand-800 ${className}`}
    >
      <Icon className={`text-white/90 ${iconClassName}`} aria-hidden="true" />
    </div>
  );
}
