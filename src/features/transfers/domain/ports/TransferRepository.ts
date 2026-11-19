import type { Result } from "@/shared/domain/Result";
import type { TransferReceipt, TransferRequest } from "../entities/Transfer";
import type { TransferError } from "../errors/TransferError";

export interface TransferRepository {
  send(request: TransferRequest): Promise<Result<TransferReceipt, TransferError>>;
}
