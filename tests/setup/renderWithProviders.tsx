import type { ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";

export function renderWithProviders(ui: ReactElement, options?: RenderOptions) {
  const store = makeStore();
  return { store, ...render(<Provider store={store}>{ui}</Provider>, options) };
}
