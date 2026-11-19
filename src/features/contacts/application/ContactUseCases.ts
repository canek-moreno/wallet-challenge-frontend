import type { ContactRepository } from "../domain/ports/ContactRepository";

export function makeListContacts(repository: ContactRepository) {
  return (query: Parameters<ContactRepository["list"]>[0]) => repository.list(query);
}

export function makeCreateContact(repository: ContactRepository) {
  return (contact: Parameters<ContactRepository["create"]>[0]) => repository.create(contact);
}
