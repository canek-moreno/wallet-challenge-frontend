import { describe, expect, it } from "vitest";
import { identifierKind, normalizeIdentifier } from "./identifier";

describe("identifier", () => {
  it("acepta un correo válido en cualquier mayúscula", () => {
    expect(identifierKind("Mariana.Lopez@Email.com")).toBe("email");
  });

  it("acepta un teléfono con código de país, con o sin separadores", () => {
    expect(identifierKind("+52 55 1234 5678")).toBe("phone");
    expect(identifierKind("+52-55-1234-5678")).toBe("phone");
    expect(identifierKind("+525512345678")).toBe("phone");
  });

  it("rechaza un teléfono sin código de país", () => {
    expect(identifierKind("5512345678")).toBeNull();
  });

  it("rechaza teléfonos demasiado cortos o largos", () => {
    expect(identifierKind("+52 55 12")).toBeNull();
    expect(identifierKind("+1234567890123456")).toBeNull();
  });

  it("rechaza correos mal formados", () => {
    expect(identifierKind("mariana@")).toBeNull();
    expect(identifierKind("mariana@correo")).toBeNull();
    expect(identifierKind("mariana lopez@email.com")).toBeNull();
  });

  it("normaliza el identificador para comparar", () => {
    expect(normalizeIdentifier("  Mariana@Email.com ")).toBe("mariana@email.com");
    expect(normalizeIdentifier("+52 (55) 1234-5678")).toBe("+525512345678");
  });
});
