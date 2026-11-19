import { z } from "zod";
import { json, mockApiGuard } from "@/mock-api/http";
import { login, SESSION_COOKIE } from "@/mock-api/services/authService";

const loginDto = z.object({ email: z.email(), password: z.string().min(1) });

export async function POST(request: Request) {
  const disabled = mockApiGuard();
  if (disabled) return disabled;

  const parsed = loginDto.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return json({ code: "VALIDATION_ERROR" }, 400);

  const session = login(parsed.data.email, parsed.data.password);
  if (!session) return json({ code: "INVALID_CREDENTIALS" }, 401);

  const response = json({ name: session.name });
  response.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
