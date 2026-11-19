"use client";

import { GenericErrorView, InsufficientFundsView, NetworkErrorView, TimeoutView } from "@/presentation/components/status/StatusViews";
import type { SendMoneyError } from "../../application/SendMoney";

export function TransferErrorState({
  error,
  availableCents,
  currency,
  onRetry,
  onAdjust,
  onCheckMovements,
  reloadHref,
}: {
  error: SendMoneyError;
  availableCents: number;
  currency: "MXN" | "USD";
  onRetry: () => void;
  onAdjust: () => void;
  onCheckMovements: () => void;
  reloadHref: string;
}) {
  if (typeof error === "string" || error.kind === "InsufficientFunds") {
    const available = typeof error === "string" ? availableCents : error.available.amountCents;
    return <InsufficientFundsView availableCents={available} currency={currency} onAdjust={onAdjust} reloadHref={reloadHref} />;
  }
  if (error.kind === "Network") return <NetworkErrorView onRetry={onRetry} />;
  if (error.kind === "Timeout") return <TimeoutView onCheck={onCheckMovements} onRetry={onRetry} />;
  return <GenericErrorView reference={error.kind === "Unknown" ? error.reference : ""} onRetry={onRetry} />;
}
