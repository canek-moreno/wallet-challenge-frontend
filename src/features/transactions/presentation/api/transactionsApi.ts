import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { TransactionPage, TransactionQuery } from "../../domain/entities/Transaction";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    listTransactions: build.query<TransactionPage, TransactionQuery>({
      queryFn: async (query) => {
        const result = await container.listTransactions(query);
        return result.ok ? { data: result.value } : { error: result.error };
      },
      providesTags: ["Transactions"],
    }),
  }),
});

export const { useListTransactionsQuery } = transactionsApi;
