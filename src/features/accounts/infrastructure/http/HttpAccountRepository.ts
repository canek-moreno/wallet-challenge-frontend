import { err, ok, type Result } from "@/shared/domain/Result";
import { httpGet, httpPatch } from "@/shared/infrastructure/http/httpClient";
import type { Account } from "../../domain/entities/Account";
import type { AccountError } from "../../domain/errors/AccountError";
import type { AccountRepository } from "../../domain/ports/AccountRepository";
import { accountDto, accountsResponseDto } from "../dto/accountDto";

function failure(status: number): Result<never, AccountError> {
  if (status === 401) return err({ kind: "Unauthorized" });
  if (status === 404) return err({ kind: "NotFound" });
  return err({ kind: "Network" });
}

export function createHttpAccountRepository(): AccountRepository {
  return {
    async list() {
      let response: Response;
      try {
        response = await httpGet("/accounts");
      } catch {
        return err({ kind: "Network" });
      }
      if (!response.ok) return failure(response.status);

      const parsed = accountsResponseDto.safeParse(await response.json().catch(() => null));
      if (!parsed.success) return err({ kind: "Unknown" });
      return ok({
        netWorthCents: parsed.data.netWorth.amountCents,
        currency: parsed.data.netWorth.currency,
        accounts: parsed.data.accounts,
      });
    },

    async setFrozen(accountId, frozen) {
      let response: Response;
      try {
        response = await httpPatch(`/accounts/${encodeURIComponent(accountId)}/freeze`, { frozen });
      } catch {
        return err({ kind: "Network" });
      }
      if (!response.ok) return failure(response.status);

      const parsed = accountDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data as Account) : err({ kind: "Unknown" });
    },
  };
}
