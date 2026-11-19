import { configureStore } from "@reduxjs/toolkit";
import { transferFlowReducer } from "@/features/transfers/presentation/state/transferFlowSlice";
import { baseApi } from "./baseApi";
import uiReducer from "./uiSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
      transferFlow: transferFlowReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
