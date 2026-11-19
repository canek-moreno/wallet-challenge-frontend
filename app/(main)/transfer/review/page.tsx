import { ReviewStep } from "@/features/transfers";

export default function ReviewPage() {
  return (
    <main className="flex flex-col gap-6 p-4 md:p-10">
      <h1 className="text-[30px] font-semibold tracking-[-0.6px] text-ink">Revisa tu transferencia</h1>
      <ReviewStep />
    </main>
  );
}
