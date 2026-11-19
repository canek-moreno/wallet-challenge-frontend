import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Icon } from "./Icon";

describe("Icon", () => {
  it("usa el SVG de Figma cuando existe", () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector("img")).toHaveAttribute("src", "/icons/figma/home.svg");
  });

  it("dibuja un SVG propio cuando Figma no tiene el icono", () => {
    const { container } = render(<Icon name="eyeOff" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg?.querySelector("path")).not.toBeNull();
  });
});
