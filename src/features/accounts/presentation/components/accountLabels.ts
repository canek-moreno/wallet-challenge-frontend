import type { AccountType } from "../../domain/entities/Account";

export const accountTypeLabel: Record<AccountType, string> = {
  debit: "Débito",
  credit: "Crédito",
  vault: "Bóveda virtual",
};
