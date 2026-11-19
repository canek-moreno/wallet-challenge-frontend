import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("asocia la etiqueta con el campo", () => {
    render(<Input id="email" label="Correo electrónico o teléfono" />);
    expect(screen.getByLabelText("Correo electrónico o teléfono")).toBeInTheDocument();
  });

  it("muestra el error y lo asocia al campo", () => {
    render(<Input id="email" label="Correo" error="Correo inválido" />);
    const input = screen.getByLabelText("Correo");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("Correo inválido");
  });
});
