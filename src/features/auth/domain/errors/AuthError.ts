export type AuthError =
  | { kind: "InvalidCredentials" }
  | { kind: "Unauthorized" }
  | { kind: "Network" }
  | { kind: "Unknown" };
