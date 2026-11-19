import { z } from "zod";

export const contactDto = z.object({
  id: z.string(),
  fullName: z.string(),
  bank: z.string(),
  accountNumber: z.string(),
  alias: z.string().nullable(),
  favorite: z.boolean(),
});

export const contactsResponseDto = z.object({ items: z.array(contactDto) });
