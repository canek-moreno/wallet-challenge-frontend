import { seedAccounts, type SeedAccount } from "../seed/accounts";
import { seedContacts, type SeedContact } from "../seed/contacts";
import { seedTransactions, type SeedTransaction } from "../seed/transactions";

export type StoredResponse = { status: number; body: unknown };

export const memoryStore = {
  accounts: structuredClone(seedAccounts) as SeedAccount[],
  transactions: structuredClone(seedTransactions) as SeedTransaction[],
  contacts: structuredClone(seedContacts) as SeedContact[],
  idempotency: new Map<string, StoredResponse>(),
};
