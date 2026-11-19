import type { ReactNode } from "react";
import { AppHeader } from "@/presentation/components/layout/AppHeader";
import { BottomNav } from "@/presentation/components/layout/BottomNav";
import { SideNav } from "@/presentation/components/layout/SideNav";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <div className="flex-1 pb-24 md:pb-10">{children}</div>
        <BottomNav />
      </div>
    </div>
  );
}
