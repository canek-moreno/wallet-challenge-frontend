import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleBalances } from "@/store/uiSlice";

export function useBalanceVisibility() {
  const hidden = useAppSelector((state) => state.ui.hideBalances);
  const dispatch = useAppDispatch();
  return { hidden, toggle: () => dispatch(toggleBalances()) };
}
