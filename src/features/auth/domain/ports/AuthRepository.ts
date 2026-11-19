import type { Result } from "@/shared/domain/Result";
import type { Session } from "../entities/Session";
import type { AuthError } from "../errors/AuthError";

export type LoginCredentials = { identifier: string; password: string };

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<Result<Session, AuthError>>;
  currentSession(): Promise<Result<Session, AuthError>>;
  logout(): Promise<Result<void, AuthError>>;
}
