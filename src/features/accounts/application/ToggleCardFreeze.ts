import type { AccountRepository } from "../domain/ports/AccountRepository";

export function makeSetAccountFrozen(repository: AccountRepository) {
  return (accountId: string, frozen: boolean) => repository.setFrozen(accountId, frozen);
}
