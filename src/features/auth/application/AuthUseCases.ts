import type { AuthRepository, LoginCredentials } from "../domain/ports/AuthRepository";

export function makeLogin(repository: AuthRepository) {
  return (credentials: LoginCredentials) => repository.login(credentials);
}

export function makeGetSession(repository: AuthRepository) {
  return () => repository.currentSession();
}

export function makeLogout(repository: AuthRepository) {
  return () => repository.logout();
}
