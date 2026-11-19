"use client";

import Link from "next/link";
import { Toggle } from "@/presentation/components/ui";
import type { Account } from "../../domain/entities/Account";
import { useSetAccountFrozenMutation } from "../api/accountsApi";

const actions = [
  { href: "/statements", label: "Estado de cuenta" },
  { href: "/transfer", label: "Transferir" },
  { href: "/receive", label: "Recibir" },
  { href: "/bill-payments", label: "Pagar servicios" },
] as const;

export function ProductQuickActions({ account }: { account: Account }) {
  const [setFrozen, { isLoading }] = useSetAccountFrozenMutation();

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {actions.map((action) => (
        <li key={action.href}>
          <Link
            href={action.href}
            className="flex h-full flex-col justify-between rounded-card border border-border bg-surface p-4 text-sm font-medium text-ink"
          >
            {action.label}
          </Link>
        </li>
      ))}
      {account.type !== "vault" && (
        <li className="flex flex-col justify-between gap-3 rounded-card border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Apagar producto</span>
            <Toggle
              label="Apagar producto"
              checked={account.frozen}
              onChange={(frozen) => {
                if (!isLoading) setFrozen({ accountId: account.id, frozen });
              }}
            />
          </div>
          <span className="text-xs text-muted">
            {account.frozen ? "Uso físico bloqueado. Digital disponible." : "Bloquea el uso físico de la tarjeta."}
          </span>
        </li>
      )}
    </ul>
  );
}
