"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { SuccessView } from "@/presentation/components/status/StatusViews";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectTransferFlow, transferFlowActions } from "../state/transferFlowSlice";

const subscribeNoop = () => () => {};
const canShareOnClient = () => "share" in navigator;
const canShareOnServer = () => false;

export function SuccessStep() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { receipt } = useAppSelector(selectTransferFlow);
  const canShare = useSyncExternalStore(subscribeNoop, canShareOnClient, canShareOnServer);

  useEffect(() => {
    if (!receipt) router.replace("/transfer");
  }, [receipt, router]);

  if (!receipt) return null;

  const share = () =>
    navigator.share?.({
      title: "Comprobante luma.",
      text: `Transferencia ${receipt.id} por ${receipt.amountCents / 100} ${receipt.currency}`,
    });

  return (
    <SuccessView
      amountCents={receipt.amountCents}
      feeCents={receipt.feeCents}
      currency={receipt.currency}
      destinationLabel={receipt.destinationLabel}
      reference={receipt.id}
      createdAt={receipt.createdAt}
      canShare={canShare}
      onShare={share}
      onHome={() => {
        dispatch(transferFlowActions.resetFlow());
        router.push("/");
      }}
    />
  );
}
