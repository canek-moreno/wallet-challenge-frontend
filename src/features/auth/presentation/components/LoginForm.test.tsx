import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "../../../../../tests/setup/renderWithProviders";
import { container } from "@/container";
import { LoginForm } from "./LoginForm";

const replace = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, refresh }),
}));

describe("LoginForm", () => {
  beforeEach(() => {
    replace.mockClear();
    refresh.mockClear();
  });

  it("muestra validación cuando los campos están vacíos y no envía", async () => {
    const login = vi.spyOn(container, "login");
    renderWithProviders(<LoginForm />);

    await userEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(await screen.findByText("Ingresa tu correo o teléfono.")).toBeInTheDocument();
    expect(screen.getByText("Ingresa tu contraseña.")).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it("muestra un mensaje cuando las credenciales son incorrectas", async () => {
    vi.spyOn(container, "login").mockResolvedValue({ ok: false, error: { kind: "InvalidCredentials" } });
    renderWithProviders(<LoginForm />);

    await userEvent.type(screen.getByLabelText("Correo electrónico o teléfono"), "mariana.lopez@email.com");
    await userEvent.type(screen.getByLabelText("Contraseña"), "incorrecta");
    await userEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Correo o contraseña incorrectos.");
    await waitFor(() => expect(replace).not.toHaveBeenCalled());
  });
});
