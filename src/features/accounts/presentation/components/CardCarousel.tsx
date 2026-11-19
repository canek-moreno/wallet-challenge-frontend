"use client";

import Link from "next/link";
import { useBalanceVisibility } from "../hooks/useBalanceVisibility";
import { useGetAccountsQuery } from "../api/accountsApi";
import { CardVisual } from "./CardVisual";

export function CardCarousel() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const { hidden } = useBalanceVisibility();

  if (isLoading) return <p className="text-sm text-muted">Cargando productos…</p>;
  if (error || !data) return <p className="text-sm text-danger">No pudimos cargar tus productos.</p>;

  return (
    <ul aria-label="Mis tarjetas" className="flex snap-x gap-4 overflow-x-auto pb-2">
      {data.accounts.map((account) => (
        <li key={account.id}>
          <Link href={`/products/${account.id}`} className="block">
            <CardVisual account={account} hideBalance={hidden} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
