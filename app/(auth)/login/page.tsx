import { PasswordField } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[375px] flex-col justify-center gap-6 p-6 md:max-w-md">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      <PasswordField id="password" name="password" label="Contraseña" autoComplete="current-password" />
    </main>
  );
}
