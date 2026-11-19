import Link from "next/link";
import { CardCarousel, NetWorthWidget } from "@/features/accounts";
import { TransactionList } from "@/features/transactions";
import { Greeting } from "@/presentation/components/layout/Greeting";
import { Icon, type IconName } from "@/presentation/components/ui";

const quickActions: { href: string; label: string; icon: IconName }[] = [
  { href: "/transfer", label: "Transferir", icon: "transfer" },
  { href: "/receive", label: "Recibir", icon: "receive" },
  { href: "/bill-payments", label: "Pagar servicios", icon: "bill" },
];

export default function DashboardPage() {
  return (
    <main className="flex flex-col gap-8 p-4 md:p-10">
      <Greeting />
      <NetWorthWidget />
      <CardCarousel />
      <nav aria-label="Acciones rápidas" className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 rounded-card border border-border bg-surface p-4 text-center text-sm font-medium"
          >
            <Icon name={action.icon} className="size-6 text-primary" />
            {action.label}
          </Link>
        ))}
      </nav>
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-ink">Movimientos recientes</h2>
        <TransactionList limit={3} />
      </section>
    </main>
  );
}
