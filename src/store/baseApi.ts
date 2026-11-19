import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["Accounts", "Transactions", "Transfers", "Session", "Contacts"],
  endpoints: () => ({}),
});
