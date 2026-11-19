import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { AccountsSnapshot } from "../../domain/entities/Account";

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccounts: build.query<AccountsSnapshot, void>({
      queryFn: async () => {
        const result = await container.listAccounts();
        return result.ok ? { data: result.value } : { error: result.error };
      },
      providesTags: ["Accounts"],
    }),
  }),
});

export const { useGetAccountsQuery } = accountsApi;
