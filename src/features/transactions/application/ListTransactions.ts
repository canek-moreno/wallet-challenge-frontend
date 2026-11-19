import type { TransactionRepository } from "../domain/ports/TransactionRepository";

export function makeListTransactions(repository: TransactionRepository) {
  return (query: Parameters<TransactionRepository["list"]>[0]) => repository.list(query);
}
