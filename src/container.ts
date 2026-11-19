import { createHttpAccountRepository, makeListAccounts } from "@/features/accounts";
import { createHttpTransferRepository, makeSendMoney } from "@/features/transfers";

export const container = {
  sendMoney: makeSendMoney(createHttpTransferRepository()),
  listAccounts: makeListAccounts(createHttpAccountRepository()),
};
