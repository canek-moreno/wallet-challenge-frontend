"use client";

import { useState } from "react";
import { SegmentedControl } from "@/presentation/components/ui";
import type { TransactionFilter } from "../../domain/entities/Transaction";
import { groupByDate } from "../../domain/rules/groupByDate";
import { useListTransactionsQuery } from "../api/transactionsApi";
import { TransactionRow } from "./TransactionRow";

const filterOptions = [
  { value: "all", label: "Todos" },
  { value: "income", label: "Ingresos" },
  { value: "expense", label: "Egresos" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", timeZone: "UTC" });

export function TransactionList({ accountId, limit = 20 }: { accountId?: string; limit?: number }) {
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const { data, error, isLoading } = useListTransactionsQuery({ filter, accountId, limit });

  return (
    <section className="flex flex-col gap-4">
      <SegmentedControl options={filterOptions} value={filter} onChange={setFilter} label="Filtrar movimientos" />
      {isLoading && <p className="text-sm text-muted">Cargando movimientos…</p>}
      {error ? <p className="text-sm text-danger">No pudimos cargar los movimientos.</p> : null}
      {data && data.items.length === 0 && <p className="text-sm text-muted">Aún no hay movimientos.</p>}
      {data &&
        groupByDate(data.items).map((group) => (
          <div key={group.date} className="flex flex-col">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted">
              {dateFormatter.format(new Date(`${group.date}T00:00:00Z`))}
            </h3>
            <ul className="divide-y divide-border">
              {group.items.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          </div>
        ))}
    </section>
  );
}
