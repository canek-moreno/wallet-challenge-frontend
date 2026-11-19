import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SideNav } from "./SideNav";

vi.mock("next/navigation", () => ({ usePathname: () => "/products/acc-debit-1" }));

vi.mock("@/features/auth", () => ({
  useGetSessionQuery: () => ({ data: { name: "Mariana López" } }),
}));

describe("SideNav", () => {
  it("marca como activa la sección de la ruta actual", () => {
    render(<SideNav />);
    expect(screen.getByRole("link", { name: "Mis productos" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Inicio" })).not.toHaveAttribute("aria-current");
  });

  it("muestra el nombre del usuario de la sesión", () => {
    render(<SideNav />);
    expect(screen.getByText("Mariana López")).toBeInTheDocument();
  });
});
