import { err, ok } from "@/shared/domain/Result";
import { httpGet } from "@/shared/infrastructure/http/httpClient";
import type { TransactionQuery } from "../../domain/entities/Transaction";
import type { TransactionError } from "../../domain/errors/TransactionError";
import type { TransactionRepository } from "../../domain/ports/TransactionRepository";
import { transactionPageDto } from "../dto/transactionDto";

export function createHttpTransactionRepository(): TransactionRepository {
  return {
    async list(query: TransactionQuery) {
      const params = new URLSearchParams();
      if (query.filter) params.set("filter", query.filter);
      if (query.accountId) params.set("accountId", query.accountId);
      if (query.limit) params.set("limit", String(query.limit));
      if (query.cursor) params.set("cursor", query.cursor);
      const search = params.toString();

      let response: Response;
      try {
        response = await httpGet(`/transactions${search ? `?${search}` : ""}`);
      } catch {
        return err<TransactionError>({ kind: "Network" });
      }
      if (response.status === 401) return err<TransactionError>({ kind: "Unauthorized" });
      if (!response.ok) return err<TransactionError>({ kind: "Network" });

      const parsed = transactionPageDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data) : err<TransactionError>({ kind: "Unknown" });
    },
  };
}
