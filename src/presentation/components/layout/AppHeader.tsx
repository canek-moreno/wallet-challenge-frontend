"use client";

import Link from "next/link";
import { useBalanceVisibility } from "@/features/accounts";
import { LogoutButton, useGetSessionQuery } from "@/features/auth";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "../ui/Avatar";
import { Icon } from "../ui/Icon";

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
          aria-label={hidden ? "Mostrar saldos" : "Ocultar saldos"}
          className={cn(
            "flex items-center gap-1.5 rounded-chip px-2.5 py-1.5 text-xs font-medium",
            hidden ? "bg-mint text-primary" : "text-muted",
          )}
        >
          <Icon name={hidden ? "eyeOff" : "eye"} className="size-4" />
          <span className="hidden md:inline">{hidden ? "Mostrar saldos" : "Ocultar saldos"}</span>
        </button>
        <button
          type="button"
          disabled
          title="Próximamente"
          aria-label="Notificaciones próximamente"
          className="text-muted disabled:opacity-50"
        >
          <Icon name="bell" />
        </button>
        <Link href="/help" aria-label="Ayuda" className="text-muted md:hidden">
          <Icon name="help" />
        </Link>
        <LogoutButton iconOnly className="text-muted md:hidden" />
        {session && <Avatar name={session.name} className="md:hidden" />}
      </div>
    </header>
  );
}
