import { describe, expect, it } from "vitest";
import { accountKind, isValidAccountNumber } from "./validateContact";

describe("validateContact", () => {
  it("acepta una CLABE de 18 dígitos", () => {
    expect(isValidAccountNumber("012180001234567891")).toBe(true);
    expect(accountKind("012180001234567891")).toBe("CLABE");
  });

  it("acepta un IBAN con formato válido", () => {
    expect(isValidAccountNumber("ES9121000418450200051332")).toBe(true);
    expect(accountKind("ES9121000418450200051332")).toBe("IBAN");
  });

  it("rechaza números que no son CLABE ni IBAN", () => {
    expect(isValidAccountNumber("12345")).toBe(false);
    expect(isValidAccountNumber("01218000123456789A")).toBe(false);
    expect(accountKind("12345")).toBeNull();
  });
});
