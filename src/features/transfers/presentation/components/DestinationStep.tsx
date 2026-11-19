"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetAccountsQuery } from "@/features/accounts";
import { useListContactsQuery } from "@/features/contacts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SegmentedControl } from "@/presentation/components/ui";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { selectTransferFlow, transferFlowActions, type Destination } from "../state/transferFlowSlice";

const kindOptions = [
  { value: "own", label: "Cuentas propias" },
  { value: "contacts", label: "A contactos" },
] as const;

export function DestinationStep() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectTransferFlow);
  const accounts = useGetAccountsQuery();
  const contacts = useListContactsQuery();
  const [kind, setKind] = useState<"own" | "contacts">(flow.destination?.kind === "contact" ? "contacts" : "own");

  const sourceId = flow.sourceAccountId ?? accounts.data?.accounts.find((account) => account.type === "debit")?.id ?? null;

  const choose = (destination: Destination) => {
    if (sourceId) dispatch(transferFlowActions.setSource(sourceId));
    dispatch(transferFlowActions.setDestination(destination));
    router.push("/transfer/amount");
  };

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={kindOptions}
        value={kind}
        onChange={setKind}
        label="Tipo de destino"
      />
      {kind === "own" ? (
        <ul className="flex flex-col gap-3">
          {accounts.data?.accounts
            .filter((account) => account.id !== sourceId)
            .map((account) => (
              <li key={account.id}>
                <button
                  type="button"
                  onClick={() =>
                    choose({
                      kind: "own",
                      id: account.id,
                      label: `Cuenta •••• ${account.last4}`,
                      detail: formatCurrency(account.balanceCents, account.currency),
                    })
                  }
                  className="flex w-full items-center justify-between rounded-card border border-border bg-surface p-4 text-left"
                >
                  <span className="text-sm font-medium text-ink">Cuenta •••• {account.last4}</span>
                  <span className="text-sm text-muted">{formatCurrency(account.balanceCents, account.currency)}</span>
                </button>
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-4">
          <Link href="/contacts/new" className="text-sm font-medium text-primary">
            Nuevo contacto
          </Link>
          <ul className="flex flex-col gap-3">
            {contacts.data?.map((contact) => (
              <li key={contact.id}>
                <button
                  type="button"
                  onClick={() =>
                    choose({
                      kind: "contact",
                      id: contact.id,
                      label: contact.fullName,
                      detail: `${contact.bank} •••• ${contact.accountNumber.slice(-4)}`,
                    })
                  }
                  className="flex w-full flex-col rounded-card border border-border bg-surface p-4 text-left"
                >
                  <span className="text-sm font-medium text-ink">{contact.fullName}</span>
                  <span className="text-xs text-muted">
                    {contact.bank} •••• {contact.accountNumber.slice(-4)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
