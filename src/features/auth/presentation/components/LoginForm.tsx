"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/presentation/components/ui";
import type { AuthError } from "../../domain/errors/AuthError";
import { useLoginMutation } from "../api/authApi";
import { loginFormSchema, type LoginFormValues } from "../schemas/loginFormSchema";
import { PasswordField } from "./PasswordField";

const errorMessage: Record<AuthError["kind"], string> = {
  InvalidCredentials: "Correo o contraseña incorrectos.",
  Unauthorized: "Tu sesión expiró. Vuelve a iniciar sesión.",
  Network: "No pudimos conectar. Revisa tu conexión e intenta de nuevo.",
  Unknown: "Algo no salió bien. Intenta de nuevo.",
};

export function LoginForm() {
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { identifier: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null);
    const result = await login(values);
    if ("error" in result) {
      const kind = (result.error as AuthError).kind;
      setFormError(errorMessage[kind]);
      return;
    }
    router.replace("/");
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-2">
        <Input
          id="identifier"
          label="Correo electrónico o teléfono"
          autoComplete="username"
          inputMode="email"
          placeholder="Correo o número de teléfono"
          error={errors.identifier?.message}
          {...register("identifier")}
        />
        {errors.identifier ? null : (
          <p className="text-xs text-muted">Si usas tu teléfono, incluye el código de país.</p>
        )}
      </div>
      <PasswordField
        id="password"
        label="Contraseña"
        autoComplete="current-password"
        aria-invalid={errors.password ? true : undefined}
        {...register("password")}
      />
      {errors.password && <p className="text-xs text-danger">{errors.password.message}</p>}
      <span aria-disabled="true" className="text-[13px] font-medium text-primary opacity-50">
        ¿Olvidaste tu contraseña?
      </span>
      {formError && (
        <p role="alert" className="rounded-button bg-error-tint p-3 text-sm text-danger">
          {formError}
        </p>
      )}
      <Button type="submit" disabled={isLoading}>
        Iniciar sesión
      </Button>
    </form>
  );
}
