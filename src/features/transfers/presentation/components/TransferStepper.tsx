import { cn } from "@/shared/lib/cn";

const steps = ["Destino", "Importe", "Revisión"] as const;

export function TransferStepper({ active }: { active: 1 | 2 | 3 }) {
  return (
    <ol aria-label="Progreso de transferencia" className="flex items-center gap-4">
      {steps.map((label, index) => {
        const number = index + 1;
        const current = number === active;
        return (
          <li key={label} aria-current={current ? "step" : undefined} className="flex items-center gap-1.5">
            <span
              className={cn(
                "flex items-center justify-center rounded-chip px-1.5 py-1 text-[11px] font-medium",
                current ? "bg-primary text-white" : "bg-credit-tint text-muted",
              )}
            >
              {number}
            </span>
            <span className={cn("text-[11px]", current ? "font-semibold text-ink" : "text-muted")}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
