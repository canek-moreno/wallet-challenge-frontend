import { err, ok } from "@/shared/domain/Result";
import { httpGet } from "@/shared/infrastructure/http/httpClient";
import type { AccountRepository } from "../../domain/ports/AccountRepository";
import type { AccountError } from "../../domain/errors/AccountError";
import { accountsResponseDto } from "../dto/accountDto";

export function createHttpAccountRepository(): AccountRepository {
  return {
    async list() {
      let response: Response;
      try {
        response = await httpGet("/accounts");
      } catch {
        return err<AccountError>({ kind: "Network" });
      }
      if (response.status === 401) return err<AccountError>({ kind: "Unauthorized" });
      if (!response.ok) return err<AccountError>({ kind: "Network" });

      const parsed = accountsResponseDto.safeParse(await response.json().catch(() => null));
      if (!parsed.success) return err<AccountError>({ kind: "Unknown" });
      return ok({
        netWorthCents: parsed.data.netWorth.amountCents,
        currency: parsed.data.netWorth.currency,
        accounts: parsed.data.accounts,
      });
    },
  };
}
