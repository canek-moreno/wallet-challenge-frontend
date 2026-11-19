import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { Contact, NewContact } from "../../domain/entities/Contact";
import type { ContactQuery } from "../../domain/ports/ContactRepository";

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listContacts: build.query<readonly Contact[], ContactQuery | void>({
      queryFn: async (query) => {
        const result = await container.listContacts(query ?? {});
        return result.ok ? { data: result.value } : { error: result.error };
      },
      providesTags: ["Contacts"],
    }),
    createContact: build.mutation<Contact, NewContact>({
      queryFn: async (contact) => {
        const result = await container.createContact(contact);
        return result.ok ? { data: result.value } : { error: result.error };
      },
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const { useListContactsQuery, useCreateContactMutation } = contactsApi;
