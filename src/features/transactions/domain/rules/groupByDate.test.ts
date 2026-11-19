import { describe, expect, it } from "vitest";
import type { Transaction } from "../entities/Transaction";
import { groupByDate } from "./groupByDate";

const tx = (id: string, occurredAt: string): Transaction => ({
  id,
  name: id,
  merchantLogoUrl: null,
  category: "Compras",
  direction: "expense",
  amount: { amountCents: 100, currency: "MXN" },
  occurredAt,
});

describe("groupByDate", () => {
  it("agrupa por día del más reciente al más antiguo", () => {
    const groups = groupByDate([
      tx("a", "2026-11-10T04:00:00.000Z"),
      tx("b", "2026-11-17T09:15:00.000Z"),
      tx("c", "2026-11-17T20:00:00.000Z"),
    ]);

    expect(groups.map((group) => group.date)).toEqual(["2026-11-17", "2026-11-10"]);
    expect(groups[0].items.map((item) => item.id)).toEqual(["c", "b"]);
  });

  it("devuelve una lista vacía sin movimientos", () => {
    expect(groupByDate([])).toEqual([]);
  });
});
