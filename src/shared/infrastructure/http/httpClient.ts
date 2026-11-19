import { env } from "@/shared/infrastructure/config/env";

const REQUEST_TIMEOUT_MS = 15_000;

function send(method: "GET" | "POST" | "PATCH", path: string, body?: unknown, headers: Record<string, string> = {}) {
  return fetch(`${env.apiBaseUrl}${path}`, {
    method,
    headers: body === undefined ? headers : { "Content-Type": "application/json", ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

export function httpGet(path: string) {
  return send("GET", path);
}

export function httpPost(path: string, body: unknown, headers: Record<string, string> = {}) {
  return send("POST", path, body, headers);
}

export function httpPatch(path: string, body: unknown) {
  return send("PATCH", path, body);
}
