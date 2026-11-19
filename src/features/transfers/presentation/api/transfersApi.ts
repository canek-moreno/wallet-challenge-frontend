import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { Money } from "../../domain/entities/Money";
import type { TransferReceipt, TransferRequest } from "../../domain/entities/Transfer";

export type SendMoneyArgs = { request: TransferRequest; available: Money };

export const transfersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendMoney: build.mutation<TransferReceipt, SendMoneyArgs>({
      queryFn: async ({ request, available }) => {
        const result = await container.sendMoney(request, available);
        return result.ok ? { data: result.value } : { error: result.error };
      },
      invalidatesTags: ["Accounts", "Transactions"],
    }),
  }),
});

export const { useSendMoneyMutation } = transfersApi;
