import type { Currency } from "@/features/transfers";

export type SeedAccount = {
  id: string;
  type: "debit" | "credit" | "vault";
  last4: string;
  network: "visa" | "mastercard";
  expiration?: string;
  balanceCents: number;
  currency: Currency;
  frozen: boolean;
};

export const seedAccounts: SeedAccount[] = [
  { id: "acc-debit-1", type: "debit", last4: "4321", network: "visa", expiration: "08/29", balanceCents: 1250000, currency: "MXN", frozen: false },
  { id: "acc-credit-1", type: "credit", last4: "8810", network: "mastercard", expiration: "11/30", balanceCents: 0, currency: "MXN", frozen: false },
  { id: "acc-vault-1", type: "vault", last4: "0007", network: "visa", balanceCents: 500000, currency: "MXN", frozen: false },
];

export const seedUsers = [
  { name: "Mariana López", email: "mariana.lopez@email.com", password: "demo1234" },
  { name: "Diego Ramírez", email: "diego.ramirez@email.com", password: "demo5678" },
];
