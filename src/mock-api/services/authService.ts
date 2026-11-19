import { seedUsers } from "../seed/accounts";

export const SESSION_COOKIE = "session";

export function login(email: string, password: string) {
  const user = seedUsers.find((item) => item.email === email && item.password === password);
  if (!user) return null;
  return { name: user.name, token: "mock-session-token" };
}
