import { transactionsQueryDto } from "@/mock-api/contracts";
import { json, mockApiGuard, requireSession } from "@/mock-api/http";
import { listTransactions } from "@/mock-api/services/transactionsService";

export async function GET(request: Request) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  const parsed = transactionsQueryDto.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  return json(listTransactions(parsed.data));
}
