import { describe, expect, it } from "vitest";
import { currentUser, login } from "./authService";

describe("authService", () => {
  it("acepta los dos usuarios dados de alta", () => {
    expect(login("mariana.lopez@email.com", "demo1234")).toEqual({
      name: "Mariana López",
      email: "mariana.lopez@email.com",
      token: "session:mariana.lopez@email.com",
    });
    expect(login("diego.ramirez@email.com", "demo5678")?.name).toBe("Diego Ramírez");
  });

  it("rechaza credenciales que no coinciden con un usuario", () => {
    expect(login("mariana.lopez@email.com", "demo5678")).toBeNull();
    expect(login("desconocido@email.com", "demo1234")).toBeNull();
  });

  it("resuelve el usuario desde el token de sesión", () => {
    expect(currentUser("session:diego.ramirez@email.com")).toEqual({
      name: "Diego Ramírez",
      email: "diego.ramirez@email.com",
    });
    expect(currentUser("token-invalido")).toBeNull();
    expect(currentUser(undefined)).toBeNull();
  });
});
