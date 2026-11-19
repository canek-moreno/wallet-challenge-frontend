import { cn } from "@/shared/lib/cn";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import type { Account } from "../../domain/entities/Account";
import { accountTypeLabel } from "./accountLabels";

const toneByType: Record<Account["type"], string> = {
  debit: "bg-accent-lime text-ink",
  credit: "bg-credit-tint text-ink",
  vault: "bg-brand-dark text-white",
};

export function CardVisual({
  account,
  selected = false,
  hideBalance = false,
}: {
  account: Account;
  selected?: boolean;
  hideBalance?: boolean;
}) {
  return (
    <article
      className={cn(
        "flex h-[200px] w-[320px] shrink-0 snap-start flex-col justify-between rounded-card p-6 transition-shadow",
        toneByType[account.type],
        selected && "ring-2 ring-primary ring-offset-2",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[23px] font-bold tracking-[-0.46px]">luma.</span>
        <span className="text-xs">{accountTypeLabel[account.type]}</span>
      </div>
      <p className="text-[27px] font-semibold tracking-[-0.54px]">
        {hideBalance ? "••••••" : formatCurrency(account.balanceCents, account.currency)}
      </p>
      <div className="flex items-center justify-between text-sm font-medium">
        <span>•••• {account.last4}</span>
        <span>{account.expiration ?? ""}</span>
      </div>
      <div className="flex items-center justify-between text-[11px] uppercase">
        <span>{account.frozen ? "Uso físico bloqueado" : "Activa"}</span>
        <span className="font-bold">{account.network === "visa" ? "VISA" : "Mastercard"}</span>
      </div>
    </article>
  );
}
