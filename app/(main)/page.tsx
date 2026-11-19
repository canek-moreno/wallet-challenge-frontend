import Link from "next/link";
import { CardCarousel, NetWorthWidget } from "@/features/accounts";
import { TransactionList } from "@/features/transactions";
import { Greeting } from "@/presentation/components/layout/Greeting";

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-8 p-4 md:p-10">
      <Greeting />
      <NetWorthWidget />
      <CardCarousel />
      <nav aria-label="Acciones rápidas" className="grid grid-cols-3 gap-3">
        <Link href="/transfer" className="rounded-card border border-border bg-surface p-4 text-center text-sm font-medium">
          Transferir
        </Link>
        <Link href="/receive" className="rounded-card border border-border bg-surface p-4 text-center text-sm font-medium">
          Recibir
        </Link>
        <Link href="/bill-payments" className="rounded-card border border-border bg-surface p-4 text-center text-sm font-medium">
          Pagar servicios
        </Link>
      </nav>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink">Movimientos recientes</h2>
        <TransactionList limit={3} />
      </section>
    </main>
  );
}
