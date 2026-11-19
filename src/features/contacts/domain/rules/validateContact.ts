const CLABE = /^[0-9]{18}$/;
const IBAN = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;

export function isValidAccountNumber(value: string) {
  return CLABE.test(value) || IBAN.test(value);
}

export function accountKind(value: string): "CLABE" | "IBAN" | null {
  if (CLABE.test(value)) return "CLABE";
  if (IBAN.test(value)) return "IBAN";
  return null;
}
