"use client";

import { cn } from "@/shared/lib/cn";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn("relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors", checked ? "bg-primary" : "bg-border")}
    >
      <span
        className={cn("inline-block size-5 rounded-full bg-white transition-transform", checked ? "translate-x-6" : "translate-x-1")}
      />
    </button>
  );
}
