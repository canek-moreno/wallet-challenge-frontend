import type { Currency } from "@/features/transfers";

export type SeedAccount = {
  id: string;
  type: "debit" | "credit" | "vault";
  last4: string;
  network: "visa" | "mastercard";
  balanceCents: number;
  currency: Currency;
};

export const seedAccounts: SeedAccount[] = [
  { id: "acc-debit-1", type: "debit", last4: "4321", network: "visa", balanceCents: 1250000, currency: "MXN" },
  { id: "acc-credit-1", type: "credit", last4: "8810", network: "mastercard", balanceCents: 0, currency: "MXN" },
  { id: "acc-vault-1", type: "vault", last4: "0007", network: "visa", balanceCents: 500000, currency: "MXN" },
];

export const seedUser = { name: "Ana", email: "demo@wallet.test", password: "demo1234" };
