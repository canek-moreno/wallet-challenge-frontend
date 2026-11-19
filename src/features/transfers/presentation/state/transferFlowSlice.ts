import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Destination = { kind: "own" | "contact"; id: string; label: string; detail: string };

export type Receipt = {
  id: string;
  amountCents: number;
  feeCents: number;
  currency: "MXN" | "USD";
  destinationLabel: string;
  createdAt: string;
};

export type TransferFlowState = {
  sourceAccountId: string | null;
  destination: Destination | null;
  amountCents: number;
  concept: string;
  idempotencyKey: string | null;
  receipt: Receipt | null;
};

const initialState: TransferFlowState = {
  sourceAccountId: null,
  destination: null,
  amountCents: 0,
  concept: "",
  idempotencyKey: null,
  receipt: null,
};

const transferFlowSlice = createSlice({
  name: "transferFlow",
  initialState,
  reducers: {
    setSource: (state, action: PayloadAction<string>) => {
      state.sourceAccountId = action.payload;
    },
    setDestination: (state, action: PayloadAction<Destination>) => {
      state.destination = action.payload;
      state.idempotencyKey = null;
    },
    setAmount: (state, action: PayloadAction<number>) => {
      if (action.payload !== state.amountCents) state.idempotencyKey = null;
      state.amountCents = action.payload;
    },
    setConcept: (state, action: PayloadAction<string>) => {
      state.concept = action.payload;
    },
    startAttempt: (state, action: PayloadAction<string>) => {
      state.idempotencyKey = action.payload;
    },
    setReceipt: (state, action: PayloadAction<Receipt>) => {
      state.receipt = action.payload;
      state.idempotencyKey = null;
    },
    resetFlow: () => initialState,
  },
});

export const transferFlowActions = transferFlowSlice.actions;
export const transferFlowReducer = transferFlowSlice.reducer;
export const selectTransferFlow = (state: { transferFlow: TransferFlowState }) => state.transferFlow;
