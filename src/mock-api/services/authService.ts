import { seedUser } from "../seed/accounts";

export const SESSION_COOKIE = "session";

export function login(email: string, password: string) {
  if (email !== seedUser.email || password !== seedUser.password) return null;
  return { name: seedUser.name, token: "mock-session-token" };
}
