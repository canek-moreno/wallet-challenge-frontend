import { TransactionList } from "@/features/transactions";

export default function TransactionsPage() {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-10">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">Movimientos</h1>
      <TransactionList />
    </main>
  );
}
