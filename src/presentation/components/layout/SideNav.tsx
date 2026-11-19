"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetSessionQuery } from "@/features/auth";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "../ui/Avatar";
import { isActivePath, navItems } from "./navItems";

export function SideNav() {
  const pathname = usePathname();
  const { data: session } = useGetSessionQuery();

  return (
    <aside className="sticky top-0 hidden h-dvh w-[216px] shrink-0 flex-col gap-8 bg-brand-dark p-6 md:flex">
      <div className="flex flex-col gap-2">
        <p className="text-[32px] font-bold tracking-[-0.64px] text-accent-lime">luma.</p>
        <p className="text-[9px] font-medium tracking-[0.5px] text-brand-muted">TU DINERO, A TU RITMO</p>
      </div>

      <nav aria-label="Principal" className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-nav px-3 py-3.5 text-[13px]",
                active ? "bg-brand-active font-semibold text-white" : "text-brand-muted",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-2.5">
        {session && <Avatar name={session.name} />}
        <div className="flex flex-col">
          <p className="text-xs font-medium text-white">{session?.name ?? ""}</p>
          <p className="text-[10px] text-brand-muted">Cuenta personal</p>
        </div>
      </div>
    </aside>
  );
}
