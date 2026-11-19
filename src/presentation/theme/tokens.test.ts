import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { colors, radius } from "./tokens";

const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");

const cssValue = (name: string) => css.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();

describe("tokens", () => {
  it.each(Object.entries(colors))("el color %s coincide con globals.css", (key, value) => {
    const name = `color-${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
    expect(cssValue(name)).toBe(value);
  });

  it.each(Object.entries(radius))("el radio %s coincide con globals.css", (key, value) => {
    expect(cssValue(`radius-${key}`)).toBe(value);
  });
});
