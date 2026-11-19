import { contactsQueryDto, createContactDto } from "@/mock-api/contracts";
import { json, mockApiGuard, requireSession } from "@/mock-api/http";
import { createContact, listContacts } from "@/mock-api/services/contactsService";

export async function GET(request: Request) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const parsed = contactsQueryDto.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  return json({ items: listContacts(parsed.data) });
}

export async function POST(request: Request) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const parsed = createContactDto.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  return json(createContact(parsed.data), 201);
}
