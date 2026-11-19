import { DestinationStep, TransferStepper } from "@/features/transfers";

export default function TransferPage() {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-10">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">¿A quién le enviamos?</h1>
      <TransferStepper active={1} />
      <DestinationStep />
    </main>
  );
}
