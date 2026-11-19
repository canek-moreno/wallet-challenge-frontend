import { z } from "zod";
import { identifierKind } from "../../domain/rules/identifier";

export const loginFormSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Ingresa tu correo o teléfono.")
    .refine(
      (value) => identifierKind(value) !== null,
      "Ingresa un correo válido o un teléfono con código de país, por ejemplo +52 55 1234 5678.",
    ),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
