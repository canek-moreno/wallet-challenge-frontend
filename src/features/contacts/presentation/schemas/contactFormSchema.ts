import { z } from "zod";
import { isValidAccountNumber } from "../../domain/rules/validateContact";

export const contactFormSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa el nombre completo.").max(120),
  bank: z.string().trim().min(2, "Ingresa el banco."),
  accountNumber: z
    .string()
    .trim()
    .refine(isValidAccountNumber, "Ingresa una CLABE de 18 dígitos o un IBAN válido."),
  alias: z.string().trim().max(60).optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
