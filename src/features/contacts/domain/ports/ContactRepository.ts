import type { Result } from "@/shared/domain/Result";
import type { Contact, NewContact } from "../entities/Contact";
import type { ContactError } from "../errors/ContactError";

export type ContactQuery = Readonly<{ q?: string; favorites?: boolean }>;

export interface ContactRepository {
  list(query: ContactQuery): Promise<Result<readonly Contact[], ContactError>>;
  create(contact: NewContact): Promise<Result<Contact, ContactError>>;
}
