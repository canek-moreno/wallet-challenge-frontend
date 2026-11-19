import type { SeedContact } from "../seed/contacts";
import { memoryStore } from "../store/memoryStore";

type ListOptions = { q?: string; favorites: boolean; recent: boolean };

type CreateInput = { fullName: string; bank: string; accountNumber: string; alias?: string };

const RECENT_LIMIT = 5;

export function listContacts({ q, favorites, recent }: ListOptions): SeedContact[] {
  const term = q?.trim().toLocaleLowerCase("es");
  const matching = memoryStore.contacts
    .filter((contact) => !favorites || contact.favorite)
    .filter((contact) => {
      if (!term) return true;
      return [contact.fullName, contact.bank, contact.accountNumber, contact.alias ?? ""].some((field) =>
        field.toLocaleLowerCase("es").includes(term),
      );
    });

  if (recent) {
    return matching
      .filter((contact) => contact.lastTransferAt !== null)
      .sort((a, b) => (b.lastTransferAt ?? "").localeCompare(a.lastTransferAt ?? ""))
      .slice(0, RECENT_LIMIT);
  }
  return matching.sort((a, b) => a.fullName.localeCompare(b.fullName, "es"));
}

export function createContact(input: CreateInput): SeedContact {
  const contact: SeedContact = {
    id: `ct-${crypto.randomUUID()}`,
    fullName: input.fullName,
    bank: input.bank,
    accountNumber: input.accountNumber,
    alias: input.alias ?? null,
    favorite: false,
    lastTransferAt: null,
  };
  memoryStore.contacts.push(contact);
  return contact;
}
