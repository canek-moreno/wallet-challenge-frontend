import { err, ok, type Result } from "@/shared/domain/Result";
import { httpGet, httpPost } from "@/shared/infrastructure/http/httpClient";
import type { Contact, NewContact } from "../../domain/entities/Contact";
import type { ContactError } from "../../domain/errors/ContactError";
import type { ContactRepository } from "../../domain/ports/ContactRepository";
import { contactDto, contactsResponseDto } from "../dto/contactDto";

function failure(status: number): Result<never, ContactError> {
  if (status === 401) return err({ kind: "Unauthorized" });
  if (status === 400) return err({ kind: "Invalid" });
  return err({ kind: "Network" });
}

export function createHttpContactRepository(): ContactRepository {
  return {
    async list(query) {
      const params = new URLSearchParams();
      if (query.q) params.set("q", query.q);
      if (query.favorites) params.set("favorites", "true");
      const search = params.toString();

      let response: Response;
      try {
        response = await httpGet(`/contacts${search ? `?${search}` : ""}`);
      } catch {
        return err({ kind: "Network" });
      }
      if (!response.ok) return failure(response.status);
      const parsed = contactsResponseDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data.items as Contact[]) : err({ kind: "Unknown" });
    },

    async create(contact: NewContact) {
      let response: Response;
      try {
        response = await httpPost("/contacts", contact);
      } catch {
        return err({ kind: "Network" });
      }
      if (!response.ok) return failure(response.status);
      const parsed = contactDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data) : err({ kind: "Unknown" });
    },
  };
}
