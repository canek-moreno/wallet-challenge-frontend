import type { AuthRepository } from "../domain/ports/AuthRepository";

export function makeLogin(repository: AuthRepository) {
  return (credentials: { email: string; password: string }) => repository.login(credentials);
}

export function makeGetSession(repository: AuthRepository) {
  return () => repository.currentSession();
}
