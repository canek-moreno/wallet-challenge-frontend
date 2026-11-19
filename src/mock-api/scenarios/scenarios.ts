export const SCENARIOS = ["success", "insufficient", "timeout", "generic", "network"] as const;

export type Scenario = (typeof SCENARIOS)[number];

const FUNDS_LIMIT_CENTS = 10_000_000;

export function resolveScenario(
  amountCents: number,
  scenarioHeader: string | null,
  random: () => number = Math.random,
): Scenario {
  if (scenarioHeader && (SCENARIOS as readonly string[]).includes(scenarioHeader)) return scenarioHeader as Scenario;
  if (amountCents >= FUNDS_LIMIT_CENTS) return "insufficient";
  return SCENARIOS[Math.floor(random() * SCENARIOS.length)];
}
