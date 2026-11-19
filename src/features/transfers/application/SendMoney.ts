import { err, type Result } from "@/shared/domain/Result";
import type { Money } from "../domain/entities/Money";
import type { TransferReceipt, TransferRequest } from "../domain/entities/Transfer";
import type { TransferError } from "../domain/errors/TransferError";
import type { TransferRepository } from "../domain/ports/TransferRepository";
import { validateTransfer, type TransferValidationError } from "../domain/rules/validateTransfer";

export type SendMoneyError = TransferValidationError | TransferError;

export function makeSendMoney(repository: TransferRepository) {
  return async function sendMoney(
    request: TransferRequest,
    available: Money,
  ): Promise<Result<TransferReceipt, SendMoneyError>> {
    const validation = validateTransfer(request.amount, available);
    if (!validation.ok) return err(validation.error);
    return repository.send(request);
  };
}
