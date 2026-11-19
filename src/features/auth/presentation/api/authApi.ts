import { container } from "@/container";
import { baseApi } from "@/store/baseApi";
import type { Session } from "../../domain/entities/Session";
import type { LoginCredentials } from "../../domain/ports/AuthRepository";

export type LoginArgs = LoginCredentials;

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<Session, LoginArgs>({
      queryFn: async (credentials) => {
        const result = await container.login(credentials);
        return result.ok ? { data: result.value } : { error: result.error };
      },
    }),
    logout: build.mutation<void, void>({
      queryFn: async () => {
        const result = await container.logout();
        return result.ok ? { data: undefined } : { error: result.error };
      },
    }),
    getSession: build.query<Session, void>({
      queryFn: async () => {
        const result = await container.getSession();
        return result.ok ? { data: result.value } : { error: result.error };
      },
      providesTags: ["Session"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetSessionQuery } = authApi;
