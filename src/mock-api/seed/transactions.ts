import type { Currency } from "@/features/transfers";

export type SeedTransaction = {
  id: string;
  accountId: string;
  name: string;
  merchantLogoUrl: string | null;
  category: string;
  direction: "income" | "expense";
  amountCents: number;
  currency: Currency;
  occurredAt: string;
};

export const seedTransactions: SeedTransaction[] = [
  { id: "tx-1", accountId: "acc-debit-1", name: "Starbucks Reforma", merchantLogoUrl: null, category: "Alimentos", direction: "expense", amountCents: 12500, currency: "MXN", occurredAt: "2026-11-17T09:15:00.000Z" },
  { id: "tx-2", accountId: "acc-debit-1", name: "Uber", merchantLogoUrl: null, category: "Transporte", direction: "expense", amountCents: 8900, currency: "MXN", occurredAt: "2026-11-14T21:40:00.000Z" },
  { id: "tx-3", accountId: "acc-credit-1", name: "Liverpool", merchantLogoUrl: null, category: "Compras", direction: "expense", amountCents: 245000, currency: "MXN", occurredAt: "2026-11-12T13:05:00.000Z" },
  { id: "tx-4", accountId: "acc-debit-1", name: "Netflix", merchantLogoUrl: null, category: "Entretenimiento", direction: "expense", amountCents: 27900, currency: "MXN", occurredAt: "2026-11-10T04:00:00.000Z" },
  { id: "tx-5", accountId: "acc-debit-1", name: "Nómina Empresa SA", merchantLogoUrl: null, category: "Ingresos", direction: "income", amountCents: 4500000, currency: "MXN", occurredAt: "2026-11-15T06:00:00.000Z" },
  { id: "tx-6", accountId: "acc-vault-1", name: "Rendimiento bóveda", merchantLogoUrl: null, category: "Inversiones", direction: "income", amountCents: 1250, currency: "MXN", occurredAt: "2026-11-01T00:00:00.000Z" },
  { id: "tx-7", accountId: "acc-debit-1", name: "CFE", merchantLogoUrl: null, category: "Servicios", direction: "expense", amountCents: 91500, currency: "MXN", occurredAt: "2026-10-28T15:20:00.000Z" },
  { id: "tx-8", accountId: "acc-debit-1", name: "Transferencia recibida de Luis", merchantLogoUrl: null, category: "Transferencias", direction: "income", amountCents: 150000, currency: "MXN", occurredAt: "2026-10-25T18:00:00.000Z" },
];
