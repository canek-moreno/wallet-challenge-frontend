import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { makeStore } from "@/store";
import { useBalanceVisibility } from "./useBalanceVisibility";

function renderBalanceVisibility() {
  const store = makeStore();
  const wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;
  return renderHook(() => useBalanceVisibility(), { wrapper });
}

describe("useBalanceVisibility", () => {
  it("inicia con los saldos visibles", () => {
    const { result } = renderBalanceVisibility();
    expect(result.current.hidden).toBe(false);
  });

  it("alterna la visibilidad al llamar toggle", () => {
    const { result } = renderBalanceVisibility();

    act(() => result.current.toggle());
    expect(result.current.hidden).toBe(true);

    act(() => result.current.toggle());
    expect(result.current.hidden).toBe(false);
  });
});
