"use client";

import Link from "next/link";
import { Icon, type IconName, Toggle } from "@/presentation/components/ui";
import type { Account } from "../../domain/entities/Account";
import { useSetAccountFrozenMutation } from "../api/accountsApi";

const actions: { href: string; label: string; icon: IconName }[] = [
  { href: "/statements", label: "Estado de cuenta", icon: "statement" },
  { href: "/transfer", label: "Transferir", icon: "transfer" },
  { href: "/receive", label: "Recibir", icon: "receive" },
  { href: "/bill-payments", label: "Pagar servicios", icon: "bill" },
];

export function ProductQuickActions({ account }: { account: Account }) {
  const [setFrozen, { isLoading }] = useSetAccountFrozenMutation();

  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
      {actions.map((action) => (
        <li key={action.href}>
          <Link
            href={action.href}
            className="flex h-full flex-col justify-between gap-6 rounded-card border border-border bg-surface p-4 text-sm font-medium text-ink"
          >
            <Icon name={action.icon} className="size-6 text-primary" />
            {action.label}
          </Link>
        </li>
      ))}
      {account.type !== "vault" && (
        <li className="flex flex-col justify-between gap-3 rounded-card border border-border bg-surface p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <Icon name="lock" className="size-4 text-primary" />
              Apagar producto
            </span>
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
