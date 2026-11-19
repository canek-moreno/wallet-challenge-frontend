import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PasswordField } from "./PasswordField";

describe("PasswordField", () => {
  it("oculta la contraseña por defecto", () => {
    render(<PasswordField id="password" label="Contraseña" />);
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
  });

  it("muestra y oculta la contraseña al pulsar el botón", async () => {
    const user = userEvent.setup();
    render(<PasswordField id="password" label="Contraseña" />);
    const input = screen.getByLabelText("Contraseña");

    await user.click(screen.getByRole("button", { name: "Mostrar contraseña" }));
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Ocultar contraseña" }));
    expect(input).toHaveAttribute("type", "password");
  });
});
