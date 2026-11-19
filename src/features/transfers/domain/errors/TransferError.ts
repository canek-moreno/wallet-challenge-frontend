import type { Money } from "../entities/Money";

export type TransferError =
  | { kind: "InsufficientFunds"; available: Money }
  | { kind: "Timeout" }
  | { kind: "Network" }
  | { kind: "Unknown"; reference: string };
