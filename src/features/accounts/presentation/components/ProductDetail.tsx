"use client";

import Link from "next/link";
import { TransactionList } from "@/features/transactions";
import { useGetAccountsQuery } from "../api/accountsApi";
import { useBalanceVisibility } from "../hooks/useBalanceVisibility";
import { CardVisual } from "./CardVisual";
import { ProductQuickActions } from "./ProductQuickActions";

export function ProductDetail({ accountId }: { accountId: string }) {
  const { data, error, isLoading } = useGetAccountsQuery();
  const { hidden } = useBalanceVisibility();

  if (isLoading) return <p className="text-sm">Cargando producto…</p>;
  if (error || !data) return <p className="text-sm">No pudimos cargar el producto. Intenta de nuevo.</p>;

  const account = data.accounts.find((item) => item.id === accountId);
  if (!account) return <p className="text-sm">No encontramos este producto.</p>;

  return (
    <div className="flex flex-col gap-6">
      <Link href="/products" className="text-sm font-medium text-primary">
        Volver a mis productos
      </Link>
      <CardVisual account={account} selected hideBalance={hidden} />
      <ProductQuickActions account={account} />
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink">Movimientos</h2>
        <TransactionList accountId={account.id} />
      </section>
    </div>
  );
}
