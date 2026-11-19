import type { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type BadgeTone = "mint" | "dark" | "error" | "warning";

const tones: Record<BadgeTone, string> = {
  mint: "bg-mint text-primary",
  dark: "bg-brand-raised text-accent-lime",
  error: "bg-error-tint text-danger",
  warning: "bg-warning-tint text-warning",
};

export function Badge({ tone = "mint", className, ...props }: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn("inline-flex items-center rounded-chip px-1.5 py-1.5 text-[11px] font-medium", tones[tone], className)}
      {...props}
    />
  );
}
