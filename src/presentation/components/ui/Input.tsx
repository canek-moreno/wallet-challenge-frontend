import type { InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string; id: string; error?: string };

export function Input({ label, id, error, className, ...props }: InputProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded-card border bg-surface px-4 py-3.5 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-primary",
          error ? "border-danger" : "border-border",
          className,
        )}
        {...props}
      />
      {error && (
        <p id={errorId} className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
