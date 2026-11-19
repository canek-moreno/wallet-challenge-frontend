import type { Result } from "@/shared/domain/Result";
import type { TransactionPage, TransactionQuery } from "../entities/Transaction";
import type { TransactionError } from "../errors/TransactionError";

export interface TransactionRepository {
  list(query: TransactionQuery): Promise<Result<TransactionPage, TransactionError>>;
}
