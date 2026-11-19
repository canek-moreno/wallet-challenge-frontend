import Link from "next/link";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[375px] md:max-w-[1440px]">
      <header className="flex items-center justify-between px-4 py-3">
        <span className="text-lg font-semibold">luma.</span>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/products">Mis productos</Link>
          <Link href="/help">Ayuda</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
