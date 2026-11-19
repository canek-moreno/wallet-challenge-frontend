const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+[1-9]\d{7,14}$/;
const MAX_EMAIL_LENGTH = 254;

export type IdentifierKind = "email" | "phone";

export function normalizeIdentifier(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) return trimmed.toLowerCase();
  return trimmed.replace(/[\s().-]/g, "");
}

export function identifierKind(value: string): IdentifierKind | null {
  const normalized = normalizeIdentifier(value);
  if (normalized.length > MAX_EMAIL_LENGTH) return null;
  if (EMAIL.test(normalized)) return "email";
  if (PHONE.test(normalized)) return "phone";
  return null;
}
