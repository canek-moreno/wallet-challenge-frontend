import { createHttpTransferRepository, makeSendMoney } from "@/features/transfers";

export const container = {
  sendMoney: makeSendMoney(createHttpTransferRepository()),
};
