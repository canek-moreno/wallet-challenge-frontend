export type Scenario = "success" | "insufficient" | "timeout" | "generic" | "network";

export function resolveScenario(amountCents: number, scenarioHeader: string | null): Scenario {
  if (scenarioHeader === "network") return "network";
  if (amountCents >= 10_000_000) return "insufficient";
  if (amountCents % 100 === 99) return "timeout";
  if (amountCents % 100 === 50) return "generic";
  return "success";
}
