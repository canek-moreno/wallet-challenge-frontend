import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Modal } from "./Modal";
import { Sheet } from "./Sheet";

describe("Modal", () => {
  it("no renderiza nada cuando está cerrado", () => {
    render(<Modal open={false} onClose={() => {}} title="Confirmar"><p>Contenido</p></Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("se cierra con Escape y con el fondo", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirmar"><p>Contenido</p></Modal>);
    expect(screen.getByRole("dialog", { name: "Confirmar" })).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("no se cierra al hacer clic dentro del diálogo", async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} title="Confirmar"><p>Contenido</p></Modal>);
    await userEvent.click(screen.getByText("Contenido"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("Sheet usa el mismo diálogo anclado abajo", () => {
    render(<Sheet open onClose={() => {}} title="Destino"><p>Contenido</p></Sheet>);
    expect(screen.getByRole("dialog", { name: "Destino" })).toHaveClass("rounded-t-card");
  });
});
