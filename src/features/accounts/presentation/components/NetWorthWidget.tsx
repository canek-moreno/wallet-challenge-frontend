"use client";

import { formatCurrency } from "@/shared/lib/formatCurrency";
import { useBalanceVisibility } from "../hooks/useBalanceVisibility";
import { useGetAccountsQuery } from "../api/accountsApi";

export function NetWorthWidget() {
  const { data, error, isLoading } = useGetAccountsQuery();
  const { hidden } = useBalanceVisibility();

  return (
    <section className="flex flex-col gap-2 rounded-card bg-brand-dark p-6 text-white">
      <p className="text-sm text-brand-muted">Patrimonio total</p>
      {isLoading && <p className="text-sm">Cargando…</p>}
      {error ? <p className="text-sm">No pudimos cargar tu patrimonio.</p> : null}
      {data && (
        <p className="text-[32px] font-semibold tracking-[-0.64px]">
          {hidden ? "••••••" : formatCurrency(data.netWorthCents, data.currency)}
        </p>
      )}
    </section>
  );
}
