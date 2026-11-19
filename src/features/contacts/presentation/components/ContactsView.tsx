"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Badge, Input } from "@/presentation/components/ui";
import { useListContactsQuery } from "../api/contactsApi";

export function ContactsView() {
  const [q, setQ] = useState("");
  const favorites = useListContactsQuery({ favorites: true });
  const all = useListContactsQuery({ q: q.trim() || undefined });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <Input id="contact-search" label="Buscar contacto" value={q} onChange={(event) => setQ(event.target.value)} />
        <Link href="/contacts/new" className="shrink-0 rounded-button bg-primary px-[18px] py-[13px] text-sm font-semibold text-white">
          Agregar nuevo contacto
        </Link>
      </div>

      <section aria-label="Favoritos" className="flex flex-col gap-3">
        <h2 className="text-sm font-medium text-muted">Favoritos</h2>
        {favorites.data && favorites.data.length === 0 ? <p className="text-sm text-muted">Aún no tienes favoritos.</p> : null}
        <ul className="flex gap-4 overflow-x-auto">
          {favorites.data?.map((contact) => (
            <li key={contact.id} className="flex w-[72px] shrink-0 flex-col items-center gap-2 text-center">
              <Avatar name={contact.fullName} />
              <span className="truncate text-xs text-ink">{contact.fullName.split(" ")[0]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Todos los contactos" className="flex flex-col gap-2">
        {all.isLoading ? <p className="text-sm text-muted">Cargando contactos…</p> : null}
        {all.data && all.data.length === 0 ? <p className="text-sm text-muted">No encontramos contactos.</p> : null}
        <ul className="divide-y divide-border">
          {all.data?.map((contact) => (
            <li key={contact.id} className="flex items-center gap-3 py-3">
              <Avatar name={contact.fullName} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-sm font-medium text-ink">{contact.fullName}</span>
                <span className="flex items-center gap-2 text-xs text-muted">
                  <Badge tone="mint">{contact.bank}</Badge>
                  •••• {contact.accountNumber.slice(-4)}
                </span>
              </div>
              <Link
                href={`/transfer/amount?contactId=${encodeURIComponent(contact.id)}`}
                className="text-sm font-medium text-primary"
              >
                Enviar
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
