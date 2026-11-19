import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().min(1, "Ingresa tu correo o documento."),
  password: z.string().min(1, "Ingresa tu contraseña."),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
