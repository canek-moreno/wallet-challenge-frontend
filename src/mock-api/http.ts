import { NextResponse } from "next/server";
import { env } from "@/shared/infrastructure/config/env";

export function mockApiGuard(): NextResponse | null {
  return env.mockApiEnabled ? null : new NextResponse(null, { status: 404 });
}

export function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status });
}
