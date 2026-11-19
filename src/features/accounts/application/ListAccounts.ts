import type { AccountRepository } from "../domain/ports/AccountRepository";

export function makeListAccounts(repository: AccountRepository) {
  return () => repository.list();
}
