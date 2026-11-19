import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
  it("refleja el estado y notifica el cambio", async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} label="Apagar producto" />);
    const toggle = screen.getByRole("switch", { name: "Apagar producto" });
    expect(toggle).toHaveAttribute("aria-checked", "false");

    await userEvent.click(toggle);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
