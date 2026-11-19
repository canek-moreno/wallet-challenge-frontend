import type { Transaction } from "../entities/Transaction";

export type TransactionGroup = { date: string; items: Transaction[] };

export function groupByDate(transactions: readonly Transaction[]): TransactionGroup[] {
  const sorted = [...transactions].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt));
  const groups = new Map<string, Transaction[]>();
  for (const transaction of sorted) {
    const date = transaction.occurredAt.slice(0, 10);
    groups.set(date, [...(groups.get(date) ?? []), transaction]);
  }
  return [...groups].map(([date, items]) => ({ date, items }));
}
