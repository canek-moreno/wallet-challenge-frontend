import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("es de tipo button por defecto y dispara onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Iniciar sesión</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("no dispara onClick cuando está deshabilitado", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Confirmar</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Confirmar" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
