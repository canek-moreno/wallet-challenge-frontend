import { describe, expect, it } from "vitest";
import { money } from "../entities/Money";
import { validateTransfer } from "./validateTransfer";

describe("validateTransfer", () => {
  const available = money(100_00, "MXN");

  it("acepta un monto válido dentro del saldo", () => {
    expect(validateTransfer(money(50_00, "MXN"), available)).toEqual({ ok: true, value: money(50_00, "MXN") });
  });

  it("acepta un monto igual al saldo disponible", () => {
    expect(validateTransfer(money(100_00, "MXN"), available).ok).toBe(true);
  });

  it("rechaza montos cero o negativos", () => {
    expect(validateTransfer(money(0, "MXN"), available)).toEqual({ ok: false, error: "AmountNotPositive" });
    expect(validateTransfer(money(-1, "MXN"), available)).toEqual({ ok: false, error: "AmountNotPositive" });
  });

  it("rechaza montos mayores al saldo", () => {
    expect(validateTransfer(money(100_01, "MXN"), available)).toEqual({ ok: false, error: "InsufficientBalance" });
  });

  it("rechaza monedas distintas a la de la cuenta", () => {
    expect(validateTransfer(money(10_00, "USD"), available)).toEqual({ ok: false, error: "CurrencyMismatch" });
  });
});
