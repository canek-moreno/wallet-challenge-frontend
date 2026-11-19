import type { SeedTransaction } from "../seed/transactions";
import { memoryStore } from "../store/memoryStore";

type ListOptions = {
  filter: "all" | "income" | "expense";
  accountId?: string;
  cursor?: string;
  limit: number;
};

export function listTransactions({ filter, accountId, cursor, limit }: ListOptions) {
  const offset = Number(cursor ?? 0);
  const matching = memoryStore.transactions
    .filter((tx) => !accountId || tx.accountId === accountId)
    .filter((tx) => filter === "all" || tx.direction === filter)
    .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  const nextOffset = offset + limit;
  return {
    items: matching.slice(offset, nextOffset).map(toTransaction),
    nextCursor: nextOffset < matching.length ? String(nextOffset) : null,
  };
}

function toTransaction(tx: SeedTransaction) {
  return {
    id: tx.id,
    name: tx.name,
    merchantLogoUrl: tx.merchantLogoUrl,
    category: tx.category,
    direction: tx.direction,
    amount: { amountCents: tx.amountCents, currency: tx.currency },
    occurredAt: tx.occurredAt,
  };
}
