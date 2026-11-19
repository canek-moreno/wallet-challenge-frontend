import type { TransferRequestDto } from "@/features/transfers";
import { resolveScenario } from "../scenarios/scenarios";
import { memoryStore, type StoredResponse } from "../store/memoryStore";

const TIMEOUT_DELAY_MS = 30_000;

export async function sendTransfer(
  request: TransferRequestDto,
  idempotencyKey: string,
  scenarioHeader: string | null,
): Promise<StoredResponse> {
  const replay = memoryStore.idempotency.get(idempotencyKey);
  if (replay) return replay;

  const scenario = resolveScenario(request.amountCents, scenarioHeader);
  if (scenario === "network") return { status: 503, body: { code: "NETWORK" } };
  if (scenario === "timeout") {
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT_DELAY_MS));
    return { status: 504, body: { code: "TIMEOUT" } };
  }
  if (scenario === "generic") return { status: 500, body: { code: "UNKNOWN", reference: `TRX-${Date.now()}` } };

  const source = memoryStore.accounts.find((account) => account.id === request.sourceAccountId);
  if (!source || source.currency !== request.currency) {
    return { status: 404, body: { code: "NOT_FOUND" } };
  }
  if (scenario === "insufficient" || source.balanceCents < request.amountCents) {
    return {
      status: 422,
      body: { code: "INSUFFICIENT_FUNDS", availableCents: source.balanceCents, currency: source.currency },
    };
  }

  source.balanceCents -= request.amountCents;
  const destinationContact = memoryStore.contacts.find((contact) => contact.id === request.destinationId);
  if (destinationContact) destinationContact.lastTransferAt = new Date().toISOString();
  const transactionId = `TRX-${crypto.randomUUID()}`;
  memoryStore.transactions.unshift({
    id: transactionId,
    accountId: source.id,
    name: "Transferencia enviada",
    merchantLogoUrl: null,
    category: "Transferencias",
    direction: "expense",
    amountCents: request.amountCents,
    currency: request.currency,
    occurredAt: new Date().toISOString(),
  });
  const response: StoredResponse = { status: 200, body: { id: transactionId } };
  memoryStore.idempotency.set(idempotencyKey, response);
  return response;
}
