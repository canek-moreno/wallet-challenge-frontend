"use client";

import { cn } from "@/shared/lib/cn";

const MAX_DIGITS = 10;
const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "⌫"] as const;

export function nextAmountDigits(current: string, key: (typeof keys)[number]) {
  if (key === "⌫") return current.slice(0, -1);
  const next = `${current}${key}`.replace(/^0+(?=\d)/, "");
  return next.length > MAX_DIGITS ? current : next;
}

export function AmountKeypad({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div role="group" aria-label="Teclado numérico" className="grid grid-cols-3 gap-3">
      {keys.map((key) => (
        <button
          key={key}
          type="button"
          aria-label={key === "⌫" ? "Borrar" : key}
          onClick={() => onChange(nextAmountDigits(value, key))}
          className={cn(
            "rounded-button bg-surface py-4 text-xl font-semibold text-ink border border-border",
            key === "⌫" && "text-base",
          )}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
