import { z } from "zod";

export const transactionPageDto = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      merchantLogoUrl: z.string().nullable(),
      category: z.string(),
      direction: z.enum(["income", "expense"]),
      amount: z.object({ amountCents: z.number().int(), currency: z.enum(["MXN", "USD"]) }),
      occurredAt: z.string(),
    }),
  ),
  nextCursor: z.string().nullable(),
});
