import type { Money } from "./Money";

export type TransferRequest = Readonly<{
  sourceAccountId: string;
  destinationId: string;
  amount: Money;
  concept?: string;
  idempotencyKey: string;
}>;

export type TransferReceipt = Readonly<{ id: string }>;
