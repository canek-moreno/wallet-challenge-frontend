import { AmountStep } from "@/features/transfers";

export default async function AmountPage({ searchParams }: { searchParams: Promise<{ contactId?: string }> }) {
  const { contactId } = await searchParams;
  return (
    <main className="flex flex-col gap-6 p-4 md:p-10">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">Monto</h1>
      <AmountStep contactId={contactId} />
    </main>
  );
}
