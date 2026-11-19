import type { SeedContact } from "../seed/contacts";
import { memoryStore } from "../store/memoryStore";

type ListOptions = { q?: string; favorites: boolean };

type CreateInput = { fullName: string; bank: string; accountNumber: string; alias?: string };

export function listContacts({ q, favorites }: ListOptions): SeedContact[] {
  const term = q?.trim().toLocaleLowerCase("es");
  return memoryStore.contacts
    .filter((contact) => !favorites || contact.favorite)
    .filter((contact) => {
      if (!term) return true;
      return [contact.fullName, contact.bank, contact.accountNumber, contact.alias ?? ""].some((field) =>
        field.toLocaleLowerCase("es").includes(term),
      );
    })
    .sort((a, b) => a.fullName.localeCompare(b.fullName, "es"));
}

export function createContact(input: CreateInput): SeedContact {
  const contact: SeedContact = {
    id: `ct-${crypto.randomUUID()}`,
    fullName: input.fullName,
    bank: input.bank,
    accountNumber: input.accountNumber,
    alias: input.alias ?? null,
    favorite: false,
  };
  memoryStore.contacts.push(contact);
  return contact;
}
