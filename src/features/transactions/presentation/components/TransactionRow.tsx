import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { Transaction } from "../../domain/entities/Transaction";

export function TransactionRow({ transaction }: { transaction: Transaction }) {
  const { direction, amount, name, category, occurredAt } = transaction;
  const time = new Date(occurredAt).toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
  const sign = direction === "income" ? "+" : "-";
  return (
    <li className="flex items-center gap-3 py-3">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-icon bg-mint text-sm font-semibold text-primary">
        {name.charAt(0)}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-medium text-ink">{name}</span>
        <span className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-chip bg-mint px-1.5 py-0.5 text-primary">{category}</span>
          {time}
        </span>
      </div>
      <span className={direction === "income" ? "text-sm font-semibold text-primary" : "text-sm font-semibold text-ink"}>
        {sign} {formatCurrency(amount.amountCents, amount.currency)}
      </span>
    </li>
  );
}
