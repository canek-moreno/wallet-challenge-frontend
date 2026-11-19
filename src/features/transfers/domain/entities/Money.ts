export type Currency = "MXN" | "USD";

export type Money = Readonly<{ amountCents: number; currency: Currency }>;

export function money(amountCents: number, currency: Currency): Money {
  if (!Number.isSafeInteger(amountCents)) throw new RangeError("amountCents debe ser un entero seguro");
  return { amountCents, currency };
}
