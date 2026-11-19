import { NextResponse } from "next/server";
import { mockApiGuard } from "@/mock-api/http";
import { SESSION_COOKIE } from "@/mock-api/services/authService";

export async function POST() {
  const disabled = mockApiGuard();
  if (disabled) return disabled;

  const response = new NextResponse(null, { status: 204 });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
