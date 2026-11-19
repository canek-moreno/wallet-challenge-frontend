import { describe, expect, it } from "vitest";
import { transferFlowActions, transferFlowReducer } from "./transferFlowSlice";

const destination = { kind: "own" as const, id: "acc-credit-1", label: "Cuenta •••• 8810", detail: "$0.00" };

describe("transferFlow idempotency", () => {
  it("conserva la clave al reintentar con el mismo monto", () => {
    let state = transferFlowReducer(undefined, transferFlowActions.setAmount(5000));
    state = transferFlowReducer(state, transferFlowActions.startAttempt("key-1"));
    state = transferFlowReducer(state, transferFlowActions.setAmount(5000));
    expect(state.idempotencyKey).toBe("key-1");
  });

  it("descarta la clave al cambiar el monto", () => {
    let state = transferFlowReducer(undefined, transferFlowActions.setAmount(5000));
    state = transferFlowReducer(state, transferFlowActions.startAttempt("key-1"));
    state = transferFlowReducer(state, transferFlowActions.setAmount(7000));
    expect(state.idempotencyKey).toBeNull();
  });

  it("descarta la clave al cambiar el destino", () => {
    let state = transferFlowReducer(undefined, transferFlowActions.startAttempt("key-1"));
    state = transferFlowReducer(state, transferFlowActions.setDestination(destination));
    expect(state.idempotencyKey).toBeNull();
  });
});
