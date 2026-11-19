"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAccountsQuery } from "@/features/accounts";
import { useListContactsQuery } from "@/features/contacts";
import { Button, Input } from "@/presentation/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { money } from "../../domain/entities/Money";
import { validateTransfer } from "../../domain/rules/validateTransfer";
import { selectTransferFlow, transferFlowActions } from "../state/transferFlowSlice";
import { AmountKeypad } from "./AmountKeypad";

const messages: Record<string, string> = {
  InsufficientBalance: "El monto supera tu saldo disponible.",
  CurrencyMismatch: "La moneda no coincide con la cuenta.",
  AmountNotPositive: "Ingresa un monto mayor a cero.",
};

export function AmountStep({ contactId }: { contactId?: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectTransferFlow);
  const accounts = useGetAccountsQuery();
  const contacts = useListContactsQuery();
  const [digits, setDigits] = useState(flow.amountCents ? String(flow.amountCents) : "");
  const [concept, setConcept] = useState(flow.concept);

  const source = accounts.data?.accounts.find((account) => account.id === flow.sourceAccountId);
  const amountCents = Number(digits || 0);
  const validation = source
    ? validateTransfer(money(amountCents, source.currency), money(source.balanceCents, source.currency))
    : null;

  useEffect(() => {
    if (!contactId || flow.destination?.id === contactId) return;
    const contact = contacts.data?.find((item) => item.id === contactId);
    if (contact) {
      dispatch(
        transferFlowActions.setDestination({
          kind: "contact",
          id: contact.id,
          label: contact.fullName,
          detail: `${contact.bank} •••• ${contact.accountNumber.slice(-4)}`,
        }),
      );
    }
  }, [contactId, contacts.data, flow.destination?.id, dispatch]);

  useEffect(() => {
    if (!flow.destination && !contactId) router.replace("/transfer");
  }, [flow.destination, contactId, router]);

  const canContinue = Boolean(source && flow.destination && amountCents > 0 && validation?.ok);
  const errorKey = validation && !validation.ok ? validation.error : null;

  const onContinue = () => {
    dispatch(transferFlowActions.setAmount(amountCents));
    dispatch(transferFlowActions.setConcept(concept));
    router.push("/transfer/review");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 rounded-card bg-brand-dark p-6 text-white">
        <span className="text-sm text-brand-muted">
          {flow.destination ? `Para ${flow.destination.label}` : "Destino"}
        </span>
        <span className="text-[32px] font-semibold tracking-[-0.64px]">
          {source ? formatCurrency(amountCents, source.currency) : "$0.00"}
        </span>
        <span className="text-sm text-brand-muted">
          Disponible: {source ? formatCurrency(source.balanceCents, source.currency) : "—"}
        </span>
        <span className="text-xs text-brand-muted">Comisión: $0.00</span>
      </div>

      <AmountKeypad value={digits} onChange={setDigits} />

      {errorKey ? (
        <p role="alert" className="text-sm text-danger">
          {messages[errorKey] ?? "Revisa el monto."}
        </p>
      ) : null}

      <Input
        id="concept"
        label="Concepto (opcional)"
        value={concept}
        maxLength={120}
        onChange={(event) => setConcept(event.target.value)}
      />

      <Button onClick={onContinue} disabled={!canContinue}>
        Continuar
      </Button>
    </div>
  );
}
