import { seedUsers } from "../seed/accounts";

export const SESSION_COOKIE = "session";

const SESSION_PREFIX = "session:";

export function login(email: string, password: string) {
  const user = seedUsers.find((item) => item.email === email && item.password === password);
  if (!user) return null;
  return { name: user.name, email: user.email, token: `${SESSION_PREFIX}${user.email}` };
}

export function currentUser(token: string | undefined) {
  if (!token?.startsWith(SESSION_PREFIX)) return null;
  const email = token.slice(SESSION_PREFIX.length);
  const user = seedUsers.find((item) => item.email === email);
  return user ? { name: user.name, email: user.email } : null;
}
