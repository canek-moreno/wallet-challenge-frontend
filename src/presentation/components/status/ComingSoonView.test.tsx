import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ComingSoonView } from "./ComingSoonView";

describe("ComingSoonView", () => {
  it("muestra el título del módulo y el aviso de disponibilidad", () => {
    render(<ComingSoonView title="Estado de cuenta" />);
    expect(screen.getByRole("heading", { name: "Estado de cuenta" })).toBeInTheDocument();
    expect(screen.getByText("Este módulo estará disponible muy pronto.")).toBeInTheDocument();
  });

  it("ofrece volver al inicio", () => {
    render(<ComingSoonView title="Recibir" />);
    expect(screen.getByRole("link", { name: "Volver al inicio" })).toHaveAttribute("href", "/");
  });
});
