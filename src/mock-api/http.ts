import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/shared/infrastructure/config/env";
import { SESSION_COOKIE } from "./services/authService";

export function mockApiGuard(): NextResponse | null {
  return env.mockApiEnabled ? null : new NextResponse(null, { status: 404 });
}

export async function requireSession(): Promise<NextResponse | null> {
  return (await cookies()).has(SESSION_COOKIE) ? null : json({ code: "UNAUTHORIZED" }, 401);
}

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}
