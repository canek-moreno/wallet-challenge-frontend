export function formatCurrency(amountCents: number, currency: string) {
  return new Intl.NumberFormat("es-MX", { style: "currency", currency }).format(amountCents / 100);
}
