import { transferRequestDto } from "@/features/transfers";
import { json, mockApiGuard } from "@/mock-api/http";
import { sendTransfer } from "@/mock-api/services/transfersService";

export async function POST(request: Request) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;

  const idempotencyKey = request.headers.get("Idempotency-Key");
  if (!idempotencyKey) return json({ code: "VALIDATION_ERROR" }, 400);

  const parsed = transferRequestDto.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  const { status, body } = await sendTransfer(parsed.data, idempotencyKey, request.headers.get("X-Mock-Scenario"));
  return json(body, status);
}
