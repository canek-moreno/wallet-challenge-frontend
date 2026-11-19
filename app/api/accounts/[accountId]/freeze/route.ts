import { freezeDto } from "@/mock-api/contracts";
import { json, mockApiGuard, requireSession } from "@/mock-api/http";
import { setAccountFrozen } from "@/mock-api/services/accountsService";

export async function PATCH(request: Request, { params }: { params: Promise<{ accountId: string }> }) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const parsed = freezeDto.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  const account = setAccountFrozen((await params).accountId, parsed.data.frozen);
  return account ? json(account) : json({ code: "NOT_FOUND" }, 404);
}
