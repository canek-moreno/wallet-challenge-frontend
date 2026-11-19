import { memoryStore } from "../store/memoryStore";

export function listAccounts() {
  return memoryStore.accounts;
}
