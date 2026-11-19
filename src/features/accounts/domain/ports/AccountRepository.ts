import type { Result } from "@/shared/domain/Result";
import type { Account, AccountsSnapshot } from "../entities/Account";
import type { AccountError } from "../errors/AccountError";

export interface AccountRepository {
  list(): Promise<Result<AccountsSnapshot, AccountError>>;
  setFrozen(accountId: string, frozen: boolean): Promise<Result<Account, AccountError>>;
}
