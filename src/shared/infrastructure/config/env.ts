export const env = {
  apiBaseUrl:
    typeof window === "undefined"
      ? (process.env.API_BASE_URL ?? "http://localhost:3000/api")
      : "/api",
  mockApiEnabled: process.env.ENABLE_MOCK_API === "true",
  helpCenterUrl: process.env.NEXT_PUBLIC_HELP_CENTER_URL ?? "",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "",
};
