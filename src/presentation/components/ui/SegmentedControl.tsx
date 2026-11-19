"use client";

import { cn } from "@/shared/lib/cn";

type Option<T extends string> = { value: T; label: string };

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className="flex gap-1 rounded-button bg-mint p-1">
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex-1 rounded-chip px-4 py-2 text-sm font-medium",
              selected ? "bg-primary text-white" : "text-muted",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
