export { ContactsView } from "./presentation/components/ContactsView";
export { ContactForm } from "./presentation/components/ContactForm";
export { useListContactsQuery, useCreateContactMutation } from "./presentation/api/contactsApi";
export { makeListContacts, makeCreateContact } from "./application/ContactUseCases";
export { createHttpContactRepository } from "./infrastructure/http/HttpContactRepository";
export { isValidAccountNumber } from "./domain/rules/validateContact";
export type { Contact, NewContact } from "./domain/entities/Contact";
export type { ContactError } from "./domain/errors/ContactError";
export type { ContactRepository, ContactQuery } from "./domain/ports/ContactRepository";
