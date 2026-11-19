"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAccountsQuery } from "@/features/accounts";
import { Button, Card } from "@/presentation/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { money } from "../../domain/entities/Money";
import type { SendMoneyError } from "../../application/SendMoney";
import { useSendMoneyMutation } from "../api/transfersApi";
import { selectTransferFlow, transferFlowActions } from "../state/transferFlowSlice";
import { TransferErrorState } from "./TransferErrorState";

export function ReviewStep() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectTransferFlow);
  const accounts = useGetAccountsQuery();
  const [sendMoney, { isLoading }] = useSendMoneyMutation();
  const [failure, setFailure] = useState<SendMoneyError | null>(null);
  const source = accounts.data?.accounts.find((account) => account.id === flow.sourceAccountId);

  useEffect(() => {
    if (!flow.destination || flow.amountCents <= 0) router.replace("/transfer");
  }, [flow.destination, flow.amountCents, router]);

  if (!flow.destination || !source) return <p className="text-sm text-muted">Cargando resumen…</p>;

  const submit = async () => {
    const key = flow.idempotencyKey ?? crypto.randomUUID();
    if (!flow.idempotencyKey) dispatch(transferFlowActions.startAttempt(key));
    setFailure(null);
    const result = await sendMoney({
      request: {
        sourceAccountId: source.id,
        destinationId: flow.destination!.id,
        amount: money(flow.amountCents, source.currency),
        concept: flow.concept || undefined,
        idempotencyKey: key,
      },
      available: money(source.balanceCents, source.currency),
    });
    if ("error" in result) {
      setFailure(result.error as SendMoneyError);
      return;
    }
    dispatch(
      transferFlowActions.setReceipt({
        id: result.data.id,
        amountCents: flow.amountCents,
        feeCents: 0,
        currency: source.currency,
        destinationLabel: flow.destination!.label,
        createdAt: new Date().toISOString(),
      }),
    );
    router.push("/transfer/success");
  };

  if (failure) {
    return (
      <div className="flex justify-center">
        <TransferErrorState
          error={failure}
          availableCents={source.balanceCents}
          currency={source.currency}
          onRetry={submit}
          onAdjust={() => router.push("/transfer/amount")}
          onCheckMovements={() => router.push("/transactions")}
          reloadHref={`/products/${source.id}`}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-col gap-4">
        <Row label="Desde" value={`Cuenta •••• ${source.last4}`} />
        <Row label="Para" value={flow.destination.label} />
        <Row label="Detalle" value={flow.destination.detail} />
        <Row label="Monto" value={formatCurrency(flow.amountCents, source.currency)} />
        <Row label="Comisión" value={formatCurrency(0, source.currency)} />
        {flow.concept ? <Row label="Concepto" value={flow.concept} /> : null}
      </Card>
      <Button onClick={submit} disabled={isLoading}>
        {isLoading ? "Enviando…" : "Confirmar transferencia"}
      </Button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-ink">{value}</span>
    </div>
  );
}
