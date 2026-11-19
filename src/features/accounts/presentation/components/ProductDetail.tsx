"use client";

import Link from "next/link";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { useGetAccountsQuery } from "../api/accountsApi";
import { accountTypeLabel } from "./accountLabels";

export function ProductDetail({ accountId }: { accountId: string }) {
  const { data, error, isLoading } = useGetAccountsQuery();

  if (isLoading) return <p className="text-sm">Cargando producto…</p>;
  if (error || !data) return <p className="text-sm">No pudimos cargar el producto. Intenta de nuevo.</p>;

  const account = data.accounts.find((item) => item.id === accountId);
  if (!account) return <p className="text-sm">No encontramos este producto.</p>;

  return (
    <section className="flex flex-col gap-3 rounded-card bg-white p-4 shadow-sm">
      <h1 className="text-xl font-semibold">{accountTypeLabel[account.type]}</h1>
      <p className="text-sm">•••• {account.last4}</p>
      {account.expiration && <p className="text-sm">Vence {account.expiration}</p>}
      <p className="text-2xl font-semibold">{formatCurrency(account.balanceCents, account.currency)}</p>
      {account.frozen && <p className="text-sm">Uso físico bloqueado. Digital disponible.</p>}
      <Link href="/products" className="text-sm font-medium underline">
        Volver a mis productos
      </Link>
    </section>
  );
}
