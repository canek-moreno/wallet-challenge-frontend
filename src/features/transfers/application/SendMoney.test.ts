import { describe, expect, it, vi } from "vitest";
import { ok } from "@/shared/domain/Result";
import { money } from "../domain/entities/Money";
import type { TransferRequest } from "../domain/entities/Transfer";
import type { TransferRepository } from "../domain/ports/TransferRepository";
import { makeSendMoney } from "./SendMoney";

const request: TransferRequest = {
  sourceAccountId: "acc-debit-1",
  destinationId: "contact-1",
  amount: money(50_00, "MXN"),
  idempotencyKey: "key-1",
};

describe("SendMoney", () => {
  it("no llama al repositorio si la validación falla", async () => {
    const send = vi.fn();
    const sendMoney = makeSendMoney({ send } as TransferRepository);

    const result = await sendMoney(request, money(10_00, "MXN"));

    expect(result).toEqual({ ok: false, error: "InsufficientBalance" });
    expect(send).not.toHaveBeenCalled();
  });

  it("envía al repositorio cuando la validación pasa y devuelve su resultado", async () => {
    const send = vi.fn().mockResolvedValue(ok({ id: "TRX-1" }));
    const sendMoney = makeSendMoney({ send } as TransferRepository);

    const result = await sendMoney(request, money(100_00, "MXN"));

    expect(send).toHaveBeenCalledWith(request);
    expect(result).toEqual({ ok: true, value: { id: "TRX-1" } });
  });
});
