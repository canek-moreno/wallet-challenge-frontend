import { ProductDetail } from "@/features/accounts";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-4">
      <ProductDetail accountId={id} />
    </main>
  );
}
