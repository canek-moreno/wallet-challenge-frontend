import { z } from "zod";

const currencyDto = z.enum(["MXN", "USD"]);

export const transferRequestDto = z.object({
  sourceAccountId: z.string().min(1),
  destinationId: z.string().min(1),
  amountCents: z.number().int().positive(),
  currency: currencyDto,
  concept: z.string().max(120).optional(),
});

export const transferReceiptDto = z.object({ id: z.string().min(1) });

export const transferErrorDto = z.object({
  code: z.enum(["INSUFFICIENT_FUNDS", "TIMEOUT", "NETWORK", "UNKNOWN"]),
  availableCents: z.number().int().nonnegative().optional(),
  currency: currencyDto.optional(),
  reference: z.string().optional(),
});

export type TransferRequestDto = z.infer<typeof transferRequestDto>;
