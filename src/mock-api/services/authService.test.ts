import { describe, expect, it } from "vitest";
import { login } from "./authService";

describe("authService.login", () => {
  it("acepta los dos usuarios dados de alta", () => {
    expect(login("mariana.lopez@email.com", "demo1234")).toEqual({ name: "Mariana López", token: "mock-session-token" });
    expect(login("diego.ramirez@email.com", "demo5678")?.name).toBe("Diego Ramírez");
  });

  it("rechaza credenciales que no coinciden con un usuario", () => {
    expect(login("mariana.lopez@email.com", "demo5678")).toBeNull();
    expect(login("desconocido@email.com", "demo1234")).toBeNull();
  });
});
