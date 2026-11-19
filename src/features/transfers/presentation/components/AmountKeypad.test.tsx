import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AmountKeypad, nextAmountDigits } from "./AmountKeypad";

describe("nextAmountDigits", () => {
  it("quita ceros a la izquierda al escribir", () => {
    expect(nextAmountDigits("", "0")).toBe("0");
    expect(nextAmountDigits("0", "5")).toBe("5");
  });

  it("borra el último dígito", () => {
    expect(nextAmountDigits("1250", "⌫")).toBe("125");
  });

  it("no supera el máximo de dígitos", () => {
    expect(nextAmountDigits("1234567890", "1")).toBe("1234567890");
  });
});

describe("AmountKeypad", () => {
  it("notifica el nuevo valor al pulsar una tecla", async () => {
    const onChange = vi.fn();
    render(<AmountKeypad value="12" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "3" }));
    expect(onChange).toHaveBeenCalledWith("123");
  });
});
