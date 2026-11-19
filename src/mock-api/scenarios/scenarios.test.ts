import { describe, expect, it } from "vitest";
import { resolveScenario, SCENARIOS } from "./scenarios";

describe("resolveScenario", () => {
  it("elige cada escenario según el número aleatorio", () => {
    SCENARIOS.forEach((scenario, index) => {
      const random = () => (index + 0.5) / SCENARIOS.length;
      expect(resolveScenario(1000, null, random)).toBe(scenario);
    });
  });

  it("respeta el escenario indicado en el header", () => {
    expect(resolveScenario(1000, "timeout", () => 0)).toBe("timeout");
    expect(resolveScenario(1000, "network", () => 0)).toBe("network");
  });

  it("ignora un header desconocido y sigue eligiendo al azar", () => {
    expect(resolveScenario(1000, "otro", () => 0)).toBe("success");
  });

  it("devuelve fondos insuficientes para montos de 100,000 o más", () => {
    expect(resolveScenario(10_000_000, null, () => 0)).toBe("insufficient");
  });
});
