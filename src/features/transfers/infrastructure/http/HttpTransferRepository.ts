import { err, ok } from "@/shared/domain/Result";
import { httpPost } from "@/shared/infrastructure/http/httpClient";
import type { TransferRequest } from "../../domain/entities/Transfer";
import { money } from "../../domain/entities/Money";
import type { TransferError } from "../../domain/errors/TransferError";
import type { TransferRepository } from "../../domain/ports/TransferRepository";
import { transferErrorDto, transferReceiptDto, type TransferRequestDto } from "../dto/transferDto";

export function createHttpTransferRepository(): TransferRepository {
  return {
    async send(request) {
      let response: Response;
      try {
        response = await httpPost("/transfers", toDto(request), { "Idempotency-Key": request.idempotencyKey });
      } catch (cause) {
        const isTimeout = cause instanceof Error && cause.name === "TimeoutError";
        return err<TransferError>(isTimeout ? { kind: "Timeout" } : { kind: "Network" });
      }
      const body: unknown = await response.json().catch(() => null);
      if (response.ok) return ok(transferReceiptDto.parse(body));
      return err(toDomainError(transferErrorDto.safeParse(body)));
    },
  };
}

function toDto(request: TransferRequest): TransferRequestDto {
  return {
    sourceAccountId: request.sourceAccountId,
    destinationId: request.destinationId,
    amountCents: request.amount.amountCents,
    currency: request.amount.currency,
    concept: request.concept,
  };
}

function toDomainError(parsed: ReturnType<typeof transferErrorDto.safeParse>): TransferError {
  if (!parsed.success) return { kind: "Unknown", reference: "INVALID_RESPONSE" };
  const { code, availableCents, currency, reference } = parsed.data;
  switch (code) {
    case "INSUFFICIENT_FUNDS":
      return { kind: "InsufficientFunds", available: money(availableCents ?? 0, currency ?? "MXN") };
    case "TIMEOUT":
      return { kind: "Timeout" };
    case "NETWORK":
      return { kind: "Network" };
    default:
      return { kind: "Unknown", reference: reference ?? "" };
  }
}
