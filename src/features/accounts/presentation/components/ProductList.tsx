"use client";

import Link from "next/link";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { useGetAccountsQuery } from "../api/accountsApi";
import { accountTypeLabel } from "./accountLabels";

export function ProductList() {
  const { data, error, isLoading } = useGetAccountsQuery();

  if (isLoading) return <p className="text-sm">Cargando productos…</p>;
  if (error || !data) return <p className="text-sm">No pudimos cargar tus productos. Intenta de nuevo.</p>;

  return (
    <ul className="flex flex-col gap-3">
      {data.accounts.map((account) => (
        <li key={account.id}>
          <Link href={`/products/${account.id}`} className="flex flex-col gap-1 rounded-card bg-white p-4 shadow-sm">
            <span className="text-sm font-medium">{accountTypeLabel[account.type]}</span>
            <span className="text-sm">•••• {account.last4}</span>
            <span className="text-lg font-semibold">{formatCurrency(account.balanceCents, account.currency)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
