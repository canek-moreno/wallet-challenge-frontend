import { LoginBrandPanel, LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col md:flex-row">
      <LoginBrandPanel />
      <section className="flex flex-1 items-center justify-center bg-surface p-6">
        <div className="flex w-full max-w-[400px] flex-col gap-6">
          <span className="inline-flex w-fit rounded-chip bg-mint px-1.5 py-1.5 text-[11px] font-medium text-primary">
            BIENVENIDA A LUMA
          </span>
          <div className="flex flex-col gap-2">
            <h1 className="text-[34px] font-semibold tracking-[-0.68px] text-ink">Qué gusto verte.</h1>
            <p className="text-[15px] text-muted">Entra y toma el control de tu dinero.</p>
          </div>
          <LoginForm />
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            o entra con
            <span className="h-px flex-1 bg-border" />
          </div>
          <button
            type="button"
            disabled
            title="Próximamente"
            className="inline-flex items-center justify-center rounded-button border border-border bg-surface px-[18px] py-[13px] text-sm font-semibold text-ink disabled:opacity-50"
          >
            Usar passkey o biometría
          </button>
          <p className="text-xs text-muted">Conexión segura y datos protegidos</p>
        </div>
      </section>
    </main>
  );
}
