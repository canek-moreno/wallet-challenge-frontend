import type { Result } from "@/shared/domain/Result";
import type { Session } from "../entities/Session";
import type { AuthError } from "../errors/AuthError";

export interface AuthRepository {
  login(credentials: { email: string; password: string }): Promise<Result<Session, AuthError>>;
  currentSession(): Promise<Result<Session, AuthError>>;
}
