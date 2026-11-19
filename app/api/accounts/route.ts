import { json, mockApiGuard, requireSession } from "@/mock-api/http";
import { listAccounts } from "@/mock-api/services/accountsService";

export async function GET() {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;
  return json(listAccounts());
}
