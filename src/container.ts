import {
  createHttpAccountRepository,
  makeListAccounts,
  makeSetAccountFrozen,
} from "@/features/accounts";
import { createHttpAuthRepository, makeGetSession, makeLogin, makeLogout } from "@/features/auth";
import { createHttpContactRepository, makeCreateContact, makeListContacts } from "@/features/contacts";
import { createHttpTransactionRepository, makeListTransactions } from "@/features/transactions";
import { createHttpTransferRepository, makeSendMoney } from "@/features/transfers";

const authRepository = createHttpAuthRepository();
const accountRepository = createHttpAccountRepository();
const contactRepository = createHttpContactRepository();

export const container = {
  login: makeLogin(authRepository),
  getSession: makeGetSession(authRepository),
  logout: makeLogout(authRepository),
  sendMoney: makeSendMoney(createHttpTransferRepository()),
  listAccounts: makeListAccounts(accountRepository),
  setAccountFrozen: makeSetAccountFrozen(accountRepository),
  listTransactions: makeListTransactions(createHttpTransactionRepository()),
  listContacts: makeListContacts(contactRepository),
  createContact: makeCreateContact(contactRepository),
};
