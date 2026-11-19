import { seedAccounts, type SeedAccount } from "../seed/accounts";

export type StoredResponse = { status: number; body: unknown };

export const memoryStore = {
  accounts: structuredClone(seedAccounts) as SeedAccount[],
  idempotency: new Map<string, StoredResponse>(),
};
