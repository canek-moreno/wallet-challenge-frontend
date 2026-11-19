import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { Account, AccountsSnapshot } from "../../domain/entities/Account";

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAccounts: build.query<AccountsSnapshot, void>({
      queryFn: async () => {
        const result = await container.listAccounts();
        return result.ok ? { data: result.value } : { error: result.error };
      },
      providesTags: ["Accounts"],
    }),
    setAccountFrozen: build.mutation<Account, { accountId: string; frozen: boolean }>({
      queryFn: async ({ accountId, frozen }) => {
        const result = await container.setAccountFrozen(accountId, frozen);
        return result.ok ? { data: result.value } : { error: result.error };
      },
      invalidatesTags: ["Accounts"],
    }),
  }),
});

export const { useGetAccountsQuery, useSetAccountFrozenMutation } = accountsApi;
