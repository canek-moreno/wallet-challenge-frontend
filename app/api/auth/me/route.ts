import { cookies } from "next/headers";
import { json, mockApiGuard } from "@/mock-api/http";
import { currentUser, SESSION_COOKIE } from "@/mock-api/services/authService";

export async function GET() {
  const disabled = mockApiGuard();
  if (disabled) return disabled;
  const user = currentUser((await cookies()).get(SESSION_COOKIE)?.value);
  return user ? json(user) : json({ code: "UNAUTHORIZED" }, 401);
}
