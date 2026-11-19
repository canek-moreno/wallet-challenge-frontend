import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-dvh w-full max-w-[375px] md:max-w-[1440px]">{children}</div>;
}
