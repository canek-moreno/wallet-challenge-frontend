import { z } from "zod";

const currencyDto = z.enum(["MXN", "USD"]);

export const accountDto = z.object({
  id: z.string(),
  type: z.enum(["debit", "credit", "vault"]),
  last4: z.string().regex(/^[0-9]{4}$/),
  expiration: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)
    .optional(),
  network: z.enum(["visa", "mastercard"]),
  balanceCents: z.number().int(),
  currency: currencyDto,
  frozen: z.boolean(),
});

export const accountsResponseDto = z.object({
  netWorth: z.object({ amountCents: z.number().int(), currency: currencyDto }),
  accounts: z.array(accountDto),
});
