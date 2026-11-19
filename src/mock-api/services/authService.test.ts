import { describe, expect, it } from "vitest";
import { currentUser, login } from "./authService";

describe("authService", () => {
  it("acepta correo o teléfono de los dos usuarios dados de alta", () => {
    expect(login("mariana.lopez@email.com", "demo1234")?.name).toBe("Mariana López");
    expect(login("+52 55 1234 5678", "demo1234")?.name).toBe("Mariana López");
    expect(login("diego.ramirez@email.com", "demo5678")?.name).toBe("Diego Ramírez");
    expect(login("+52 55 9876 5432", "demo5678")?.name).toBe("Diego Ramírez");
  });

  it("no distingue mayúsculas en el correo", () => {
    expect(login("Mariana.Lopez@Email.com", "demo1234")?.name).toBe("Mariana López");
  });

  it("rechaza credenciales que no coinciden con un usuario", () => {
    expect(login("mariana.lopez@email.com", "demo5678")).toBeNull();
    expect(login("+52 55 0000 0000", "demo1234")).toBeNull();
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
