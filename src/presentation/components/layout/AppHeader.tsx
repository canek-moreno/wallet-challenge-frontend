"use client";

import Link from "next/link";
import { useBalanceVisibility } from "@/features/accounts";
import { useGetSessionQuery } from "@/features/auth";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "../ui/Avatar";

export function AppHeader() {
  const { hidden, toggle } = useBalanceVisibility();
  const { data: session } = useGetSessionQuery();

  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-surface px-4 py-3 md:px-10">
      <span className="text-lg font-bold text-ink md:hidden">luma.</span>
      <span className="hidden text-xs text-muted md:block">Cuenta personal</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={hidden}
          className={cn("rounded-chip px-2.5 py-1.5 text-xs font-medium", hidden ? "bg-mint text-primary" : "text-muted")}
        >
          {hidden ? "Mostrar saldos" : "Ocultar saldos"}
        </button>
        <button
          type="button"
          disabled
          title="Próximamente"
          aria-label="Notificaciones próximamente"
          className="text-sm text-muted disabled:opacity-50"
        >
          Notificaciones
        </button>
        <Link href="/help" className="text-sm font-medium text-muted md:hidden">
          Ayuda
        </Link>
        {session && <Avatar name={session.name} className="md:hidden" />}
      </div>
    </header>
  );
}
