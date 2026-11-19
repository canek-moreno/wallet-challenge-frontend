import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonVariant = "primary" | "secondary";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white",
  secondary: "border border-border bg-surface text-ink",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-button px-[18px] py-[13px] text-sm font-semibold disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
