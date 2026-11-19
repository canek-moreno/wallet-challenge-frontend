import { err, ok } from "@/shared/domain/Result";
import { httpGet, httpPost } from "@/shared/infrastructure/http/httpClient";
import type { AuthError } from "../../domain/errors/AuthError";
import type { AuthRepository } from "../../domain/ports/AuthRepository";
import { loginResponseDto, sessionResponseDto } from "../dto/authDto";

export function createHttpAuthRepository(): AuthRepository {
  return {
    async login(credentials) {
      let response: Response;
      try {
        response = await httpPost("/auth/login", credentials);
      } catch {
        return err<AuthError>({ kind: "Network" });
      }
      if (response.status === 401) return err<AuthError>({ kind: "InvalidCredentials" });
      if (!response.ok) return err<AuthError>({ kind: "Unknown" });
      const parsed = loginResponseDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data) : err<AuthError>({ kind: "Unknown" });
    },

    async currentSession() {
      let response: Response;
      try {
        response = await httpGet("/auth/me");
      } catch {
        return err<AuthError>({ kind: "Network" });
      }
      if (response.status === 401) return err<AuthError>({ kind: "Unauthorized" });
      if (!response.ok) return err<AuthError>({ kind: "Unknown" });
      const parsed = sessionResponseDto.safeParse(await response.json().catch(() => null));
      return parsed.success ? ok(parsed.data) : err<AuthError>({ kind: "Unknown" });
    },

    async logout() {
      let response: Response;
      try {
        response = await httpPost("/auth/logout", undefined);
      } catch {
        return err<AuthError>({ kind: "Network" });
      }
      return response.ok ? ok(undefined) : err<AuthError>({ kind: "Unknown" });
    },
  };
}
