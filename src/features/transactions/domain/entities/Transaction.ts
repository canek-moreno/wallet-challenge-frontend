import type { Currency } from "@/features/transfers";

export type TransactionDirection = "income" | "expense";

export type TransactionFilter = "all" | TransactionDirection;

export type Transaction = Readonly<{
  id: string;
  name: string;
  merchantLogoUrl: string | null;
  category: string;
  direction: TransactionDirection;
  amount: Readonly<{ amountCents: number; currency: Currency }>;
  occurredAt: string;
}>;

export type TransactionPage = Readonly<{
  items: readonly Transaction[];
  nextCursor: string | null;
}>;

export type TransactionQuery = Readonly<{
  filter?: TransactionFilter;
  accountId?: string;
  limit?: number;
  cursor?: string;
}>;
