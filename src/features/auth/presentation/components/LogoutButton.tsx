"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/presentation/components/ui";
import { baseApi } from "@/store/baseApi";
import { useAppDispatch } from "@/store/hooks";
import { cn } from "@/shared/lib/cn";
import { useLogoutMutation } from "../api/authApi";

export function LogoutButton({ iconOnly = false, className }: { iconOnly?: boolean; className?: string }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();

  const onClick = async () => {
    const result = await logout();
    if ("error" in result) return;
    dispatch(baseApi.util.resetApiState());
    router.replace("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      aria-label="Cerrar sesión"
      className={cn("flex items-center gap-3 rounded-nav px-3 py-3 text-[13px] disabled:opacity-50", className)}
    >
      <Icon name="logout" />
      {iconOnly ? null : "Cerrar sesión"}
    </button>
  );
}
