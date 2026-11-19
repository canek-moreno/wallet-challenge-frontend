import { describe, expect, it, vi } from "vitest";
import { ok } from "@/shared/domain/Result";
import type { AccountRepository } from "../domain/ports/AccountRepository";
import { makeListAccounts } from "./ListAccounts";

describe("ListAccounts", () => {
  it("devuelve el resultado del repositorio sin modificarlo", async () => {
    const snapshot = { netWorthCents: 100, currency: "MXN" as const, accounts: [] };
    const list = vi.fn().mockResolvedValue(ok(snapshot));
    const listAccounts = makeListAccounts({ list, setFrozen: vi.fn() } as AccountRepository);

    await expect(listAccounts()).resolves.toEqual({ ok: true, value: snapshot });
    expect(list).toHaveBeenCalledOnce();
  });
});
