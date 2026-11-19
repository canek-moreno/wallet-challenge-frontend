import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UiState = {
  hideBalances: boolean;
  selectedCardId: string | null;
};

const uiSlice = createSlice({
  name: "ui",
  initialState: { hideBalances: false, selectedCardId: null } as UiState,
  reducers: {
    toggleBalances: (state) => {
      state.hideBalances = !state.hideBalances;
    },
    selectCard: (state, action: PayloadAction<string | null>) => {
      state.selectedCardId = action.payload;
    },
  },
});

export const { toggleBalances, selectCard } = uiSlice.actions;
export default uiSlice.reducer;
