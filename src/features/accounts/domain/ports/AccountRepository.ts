import type { Result } from "@/shared/domain/Result";
import type { AccountsSnapshot } from "../entities/Account";
import type { AccountError } from "../errors/AccountError";

export interface AccountRepository {
  list(): Promise<Result<AccountsSnapshot, AccountError>>;
}
