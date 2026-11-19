import { ProductList } from "@/features/accounts";

export default function ProductsPage() {
  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-xl font-semibold">Mis productos</h1>
      <ProductList />
    </main>
  );
}
