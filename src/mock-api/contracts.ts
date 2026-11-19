import { z } from "zod";
import { identifierKind } from "@/features/auth/domain/rules/identifier";

export const loginDto = z.object({
  identifier: z.string().refine((value) => identifierKind(value) !== null),
  password: z.string().min(1),
});

export const freezeDto = z.object({ frozen: z.boolean() });

export const transactionsQueryDto = z.object({
  filter: z.enum(["all", "income", "expense"]).default("all"),
  accountId: z.string().min(1).optional(),
  cursor: z.string().regex(/^\d+$/).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const contactsQueryDto = z.object({
  q: z.string().max(100).optional(),
  favorites: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

export const createContactDto = z.object({
  fullName: z.string().min(2).max(120),
  bank: z.string().min(2),
  accountNumber: z.string().regex(/^([0-9]{18}|[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30})$/),
  alias: z.string().max(60).optional(),
});
