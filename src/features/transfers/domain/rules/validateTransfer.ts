import { err, ok, type Result } from "@/shared/domain/Result";
import type { Money } from "../entities/Money";

export type TransferValidationError = "AmountNotPositive" | "CurrencyMismatch" | "InsufficientBalance";

export function validateTransfer(amount: Money, available: Money): Result<Money, TransferValidationError> {
  if (amount.amountCents <= 0) return err("AmountNotPositive");
  if (amount.currency !== available.currency) return err("CurrencyMismatch");
  if (amount.amountCents > available.amountCents) return err("InsufficientBalance");
  return ok(amount);
}
