"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetAccountsQuery } from "@/features/accounts";
import { ContactForm, useListContactsQuery, type Contact } from "@/features/contacts";
import { Avatar, Button, Input, SegmentedControl } from "@/presentation/components/ui";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { selectTransferFlow, transferFlowActions, type Destination } from "../state/transferFlowSlice";

type Mode = "own" | "contacts" | "new";

const kindOptions = [
  { value: "own", label: "Cuentas propias" },
  { value: "contacts", label: "A contactos" },
] as const;

function contactDestination(contact: Contact): Destination {
  return {
    kind: "contact",
    id: contact.id,
    label: contact.fullName,
    detail: `${contact.bank} •••• ${contact.accountNumber.slice(-4)}`,
  };
}

function ContactRow({ contact, onSelect }: { contact: Contact; onSelect: (contact: Contact) => void }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(contact)}
        className="flex w-full items-center gap-3 rounded-card border border-border bg-surface p-3 text-left"
      >
        <Avatar name={contact.fullName} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-ink">{contact.fullName}</span>
          <span className="text-xs text-muted">
            {contact.bank} •••• {contact.accountNumber.slice(-4)}
          </span>
        </span>
      </button>
    </li>
  );
}

export function DestinationStep() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectTransferFlow);
  const accounts = useGetAccountsQuery();
  const [mode, setMode] = useState<Mode>(flow.destination?.kind === "contact" ? "contacts" : "own");
  const [q, setQ] = useState("");
  const recent = useListContactsQuery({ recent: true });
  const all = useListContactsQuery({ q: q.trim() || undefined });

  const sourceId = flow.sourceAccountId ?? accounts.data?.accounts.find((account) => account.type === "debit")?.id ?? null;

  const choose = (destination: Destination) => {
    if (sourceId) dispatch(transferFlowActions.setSource(sourceId));
    dispatch(transferFlowActions.setDestination(destination));
    router.push("/transfer/amount");
  };

  if (mode === "new") {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="secondary" onClick={() => setMode("contacts")} className="self-start">
          Volver a contactos
        </Button>
        <ContactForm onSaved={(contact) => choose(contactDestination(contact))} onCancel={() => setMode("contacts")} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SegmentedControl
        options={kindOptions}
        value={mode === "own" ? "own" : "contacts"}
        onChange={(value) => setMode(value)}
        label="Tipo de destino"
      />

      {mode === "own" ? (
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
        <div className="flex flex-col gap-5">
          <Input
            id="contact-search"
            label="Buscar contacto"
            placeholder="Nombre, alias o cuenta"
            value={q}
            onChange={(event) => setQ(event.target.value)}
          />

          {!q.trim() && recent.data && recent.data.length > 0 ? (
            <section aria-label="Recientes" className="flex flex-col gap-3">
              <h2 className="text-[10px] font-semibold tracking-wide text-muted">RECIENTES</h2>
              <ul className="flex flex-col gap-3">
                {recent.data.map((contact) => (
                  <ContactRow key={contact.id} contact={contact} onSelect={(c) => choose(contactDestination(c))} />
                ))}
              </ul>
            </section>
          ) : null}

          <section aria-label="Todos los contactos" className="flex flex-col gap-3">
            <h2 className="text-[10px] font-semibold tracking-wide text-muted">TODOS</h2>
            {all.data && all.data.length === 0 ? <p className="text-sm text-muted">No encontramos contactos.</p> : null}
            <ul className="flex flex-col gap-3">
              {all.data?.map((contact) => (
                <ContactRow key={contact.id} contact={contact} onSelect={(c) => choose(contactDestination(c))} />
              ))}
            </ul>
          </section>

          <Button variant="secondary" onClick={() => setMode("new")}>
            Agregar nuevo contacto
          </Button>
        </div>
      )}
    </div>
  );
}
