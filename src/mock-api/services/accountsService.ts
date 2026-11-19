import { memoryStore } from "../store/memoryStore";

export function listAccounts() {
  const netWorthCents = memoryStore.accounts
    .filter((account) => account.currency === "MXN")
    .reduce((sum, account) => sum + account.balanceCents, 0);
  return { netWorth: { amountCents: netWorthCents, currency: "MXN" as const }, accounts: memoryStore.accounts };
}

export function setAccountFrozen(accountId: string, frozen: boolean) {
  const account = memoryStore.accounts.find((item) => item.id === accountId);
  if (!account) return null;
  account.frozen = frozen;
  return account;
}
