import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SegmentedControl } from "./SegmentedControl";

const options = [
  { value: "own", label: "Cuentas propias" },
  { value: "contacts", label: "A contactos" },
] as const;

describe("SegmentedControl", () => {
  it("marca la opción seleccionada y notifica la nueva", async () => {
    const onChange = vi.fn();
    render(<SegmentedControl options={options} value="own" onChange={onChange} label="Destino" />);

    expect(screen.getByRole("radio", { name: "Cuentas propias" })).toHaveAttribute("aria-checked", "true");

    await userEvent.click(screen.getByRole("radio", { name: "A contactos" }));
    expect(onChange).toHaveBeenCalledWith("contacts");
  });
});
