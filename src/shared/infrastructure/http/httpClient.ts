import { env } from "@/shared/infrastructure/config/env";

const REQUEST_TIMEOUT_MS = 15_000;

export function httpGet(path: string) {
  return fetch(`${env.apiBaseUrl}${path}`, {
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

export function httpPost(path: string, body: unknown, headers: Record<string, string> = {}) {
  return fetch(`${env.apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}
