import type { Currency } from "@/features/transfers";

export type AccountType = "debit" | "credit" | "vault";

export type Account = Readonly<{
  id: string;
  type: AccountType;
  last4: string;
  network: "visa" | "mastercard";
  expiration?: string;
  balanceCents: number;
  currency: Currency;
  frozen: boolean;
}>;

export type AccountsSnapshot = Readonly<{
  netWorthCents: number;
  currency: Currency;
  accounts: readonly Account[];
}>;
