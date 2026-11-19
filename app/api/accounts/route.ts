import { cookies } from "next/headers";
import { json, mockApiGuard } from "@/mock-api/http";
import { listAccounts } from "@/mock-api/services/accountsService";
import { SESSION_COOKIE } from "@/mock-api/services/authService";

export async function GET() {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  if (!(await cookies()).has(SESSION_COOKIE)) return json({ code: "UNAUTHORIZED" }, 401);
  return json({ accounts: listAccounts() });
}
